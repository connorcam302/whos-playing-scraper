import 'dotenv/config'
import { getMatchDetails, getMatchHistory, getAccountList, getMatchHistoryOpenDota } from './connector'
import { db } from '../db/database'
import { matchData, matches, players } from '../db/schema'
import { getRole } from './role'
import { getImpactScore } from './impact'
import dayjs from 'dayjs'
const { whyIsNodeStillRunning } = require('why-is-node-still-running')

const debug = false
const debugLog = (message: any) => {
	if (debug) {
		console.log(message)
	}
}

const log = (message: any) => {
	console.log(`${dayjs()}: ${message}`)
}

const main = async () => {
	const accountList: number[] = await getAccountList()

	let playerCount = accountList.length
	for (const accountId of accountList) {
		const matchIds = await getMatchHistoryOpenDota(accountId, Number(process.argv[2]) || 1)

		log(`Processing account: ${accountId}`)
		let matchCount = matchIds.length
		for (const matchId of matchIds) {
			try {
				const { result } = await getMatchDetails(matchId)

				try {
					await db.insert(matches).values({
						id: result.match_id,
						gameMode: result.game_mode,
						startTime: result.start_time,
						duration: result.duration,
						winner: result.radiant_win ? 'radiant' : 'dire',
						lobby: result.lobby_type,
					})

					debugLog('Inserted match: ' + result.match_id)
				} catch (e: any) {
					if (e.code !== '23505') {
						debugLog(e)
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
					})

					debugLog('Inserted match data: match=' + result.match_id + ' account=' + accountId)
				} catch (e: any) {
					if (e.code !== '23505') {
						debugLog(e)
					} else {
						debugLog('Match data already exists: match=' + result.match_id + ' account=' + accountId)
					}
				}
			} catch (e) {
				log(`Failed to get match details: ${matchId}`)
			}
			if (process.env.ENVIRONMENT == 'dev') {
				if (matchCount !== matchIds.length) {
					process.stdout.write('\x1B[1A\x1B[2K')
				}
				matchCount--
				log(`Matches remaining: ${matchCount}`)
			}
		}
		log(`Finished processing account: ${accountId}`)
		playerCount--
		log(`Accounts remaining: ${playerCount}`)
	}
}

main().then(() => {
	process.exit(0)
})
