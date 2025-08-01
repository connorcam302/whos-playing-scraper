import 'dotenv/config'
import {
	getMatchDetails,
	getMatchHistory,
	getAccountList,
	getMatchHistoryOpenDota,
	getMatchDetailsOpenDota,
	getMatchDetailsSequenceId,
} from './connector'
import { db } from '../db/database'
import { matchData, matches, players } from '../db/schema'
import { getRole } from './role'
import { getImpactScore } from './impact'
import dayjs from 'dayjs'
import { debuglog } from 'util'

const debug = process.env.DEBUG === 'true' || false
const debugLog = (message: any) => {
	if (debug) {
		console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}: [DEBUG] ${message}`)
	}
}

const log = (message: any) => {
	console.log(`${dayjs().format('YYYY-MM-DD HH:mm:ss')}: ${message}`)
}

const main = async () => {
	const accountList: number[] = await getAccountList()
	debugLog('Account list: ' + JSON.stringify(accountList))

	let playerCount = accountList.length
	let totalGamesScraped = 0
	let totalErrors = 0

	for (const accountId of accountList) {
		const matchIds = await getMatchHistory(accountId, Number(process.argv[2]) || 1)
		if (!matchIds) {
			continue
		}

		debugLog(`Processing account: ${accountId}`)
		let matchCount = matchIds.length
		let accountGamesScraped = 0
		let accountErrors = 0

		for (const matchId of matchIds) {
			try {
				let result: any
				if (process.argv[3] == 'opendota') {
					const data = await getMatchDetailsOpenDota(matchId)
					result = data
				} else {
					//const data = await getMatchDetails(matchId)
					const data = await getMatchDetailsSequenceId(matchId)
					result = data.result.matches[0]
				}

				let isNewMatch = false
				let isNewMatchData = false

				try {
					await db.insert(matches).values({
						id: result.match_id,
						gameMode: result.game_mode,
						startTime: result.start_time,
						duration: result.duration,
						winner: result.radiant_win ? 'radiant' : 'dire',
						lobby: result.lobby_type,
						sequenceNumber: result.match_seq_num,
					})

					isNewMatch = true
					debugLog('Inserted match: ' + result.match_id)
				} catch (e: any) {
					if (e.code !== '23505') {
						debugLog('Error inserting match: ' + e.message)
					} else {
						debugLog('Match already exists: ' + result.match_id)
					}
				}

				const playerData = result.players.find((player: any) => player.account_id === accountId)
				const teamData = result.players.filter(player => {
					const playerTeam = player.player_slot <= 127 ? 'radiant' : 'dire'
					return playerTeam === (playerData.player_slot <= 127 ? 'radiant' : 'dire')
				})
				const role = await getRole(playerData.hero_id, teamData)
				try {
					// @ts-ignore
					await db.insert(matchData).values({
						playerId: accountId,
						matchId: result.match_id,
						heroId: playerData.hero_id,
						team: playerData.player_slot <= 127 ? 'radiant' : 'dire',
						kills: playerData.kills,
						deaths: playerData.deaths,
						assists: playerData.assists,
						level: playerData.level,
						item0: playerData.item_0,
						item1: playerData.item_1,
						item2: playerData.item_2,
						item3: playerData.item_3,
						item4: playerData.item_4,
						item5: playerData.item_5,
						backpack0: playerData.backpack_0,
						backpack1: playerData.backpack_1,
						backpack2: playerData.backpack_2,
						aghanimsScepter: playerData.aghanims_scepter,
						aghanimsShard: playerData.aghanims_shard,
						goldPerMin: playerData.gold_per_min,
						lastHits: playerData.last_hits,
						xpPerMin: playerData.xp_per_min,
						itemNeutral: playerData.item_neutral,
						heroDamage: playerData.hero_damage,
						towerDamage: playerData.tower_damage,
						role: role,
						impact: getImpactScore(playerData, role, result.duration),
						facet: playerData.hero_variant,
					})

					isNewMatchData = true
					debugLog('Inserted match data: match=' + result.match_id + ' account=' + accountId)
				} catch (e: any) {
					if (e.code !== '23505') {
						debugLog('Error inserting match data: ' + e.message)
					} else {
						debugLog('Match data already exists: match=' + result.match_id + ' account=' + accountId)
					}
				}

				// Only log successful scraping when new data is added
				if (isNewMatch || isNewMatchData) {
					log(`✓ Scraped match ${result.match_id} for account ${accountId}`)
					accountGamesScraped++
					totalGamesScraped++
				}
			} catch (e) {
				log(`✗ Error scraping match ${matchId}: ${e instanceof Error ? e.message : String(e)}`)
				debugLog(e)
				accountErrors++
				totalErrors++
			}

			if (debug && process.env.ENVIRONMENT == 'dev') {
				if (matchCount !== matchIds.length) {
					process.stdout.write('\x1B[1A\x1B[2K')
				}
				matchCount--
				debugLog(`Matches remaining: ${matchCount}`)
			}
		}

		// Only log account summary if games were scraped or errors occurred
		if (accountGamesScraped > 0 || accountErrors > 0) {
			debugLog(`Finished account ${accountId}: ${accountGamesScraped} games scraped, ${accountErrors} errors`)
		}
		playerCount--
		debugLog(`Accounts remaining: ${playerCount}`)
	}

	// Only log final summary if games were scraped or errors occurred
	if (totalGamesScraped > 0 || totalErrors > 0) {
		log(`Scraping complete: ${totalGamesScraped} games scraped, ${totalErrors} errors`)
	}
}

main().then(() => {
	process.exit(0)
})
