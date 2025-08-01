import { and, desc, eq, gte, inArray, sql } from 'drizzle-orm'
import { db } from '../db/database'
import { accounts, heroes, matchData, matches, players } from '../drizzle/schema'
import dayjs from 'dayjs'

async function getTopHeroesForAllPlayers(
	offset: number,
	roleFilter: number[],
	lobbyFilter: number[],
	heroFilter: number[],
	smurfFilter: boolean,
) {
	const result = await db
		.select({
			playerId: players.id,
			playerName: players.username,
			heroData: {
				heroId: heroes.id,
				heroName: heroes.name,
				heroImg: heroes.img,
				matchCount: sql<number>`cast(count(${matchData.matchId}) as int)`,
			},
		})
		.from(matchData)
		.innerJoin(accounts, eq(accounts.accountId, matchData.playerId))
		.innerJoin(players, eq(accounts.owner, players.id))
		.innerJoin(matches, eq(matches.id, matchData.matchId))
		.innerJoin(heroes, eq(heroes.id, matchData.heroId))
		.where(
			and(
				gte(matches.startTime, dayjs().subtract(offset, 'day').unix()), // Filter by time range
				eq(matches.gameMode, 22), // Example game mode
				inArray(matchData.role, roleFilter),
				inArray(matches.lobby, lobbyFilter),
				inArray(matchData.heroId, heroFilter),
				inArray(accounts.smurf, [false, smurfFilter]),
			),
		)
		.groupBy(players.id, heroes.id)
		.orderBy(desc(sql<number>`count(${matchData.matchId})`))
		.limit(3) // Get top 3 heroes
		// @ts-ignore
		.map(player => ({
			playerName: player.playerName,
			topHeroes: player.heroData.map(hero => ({
				heroName: hero.heroName,
				heroImg: hero.heroImg,
				matchCount: hero.matchCount,
			})),
		}))

	return result
}

console.log(getTopHeroesForAllPlayers())
