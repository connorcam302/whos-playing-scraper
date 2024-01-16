import { sql } from 'drizzle-orm'
import { db } from '../db/database'
import { teamOfTheWeek } from '../db/schema'

const getPOTW = async (ignoredRoles: number[], ignoredPlayers: string[] = ['none']) => {
	const potw = await db.execute(
		sql.raw(`SELECT
                players.username,
                players.id as playerid,
                heroes.name,
                heroes.id as heroid,
                match_data.role,
                AVG(match_data.impact) AS avg_impact
            FROM
                match_data
                INNER JOIN accounts ON accounts.account_id = match_data.player_id
                INNER JOIN players ON players.id = accounts.owner
                INNER JOIN heroes ON heroes.id = match_data.hero_id
                INNER JOIN matches ON match_data.match_id = matches.id
            WHERE
                matches.start_time > ${Math.floor(Date.now() / 1000) - 604800}
                AND match_data.role NOT IN (${ignoredRoles.join(', ')}) 
                AND players.username NOT IN ('${ignoredPlayers.join("', '")}') 
            GROUP BY
                match_data.role,
                players.username,
                players.id,
                heroes.name,
                heroes.id
            ORDER BY
                avg_impact DESC
            LIMIT 1;`),
	)
	console.log(potw)

	return {
		username: (potw[0] as any).username,
		playerId: Number(potw[0].playerid),
		hero: potw[0].name,
		heroId: Number(potw[0].heroid),
		role: Number(potw[0].role),
	}
}

const scrapeTOTW = async () => {
	const potw1 = await getPOTW([0], ['NA'])
	const potw2 = await getPOTW([potw1.role], [potw1.username])
	const potw3 = await getPOTW([potw1.role, potw2.role], [potw1.username, potw2.username])
	const potw4 = await getPOTW([potw1.role, potw2.role, potw3.role], [potw1.username, potw2.username, potw3.username])
	const potw5 = await getPOTW(
		[potw1.role, potw2.role, potw3.role, potw4.role],
		[potw1.username, potw2.username, potw3.username, potw4.username],
	)

	const totw = [potw1, potw2, potw3, potw4, potw5]

	const data = {
		oneHero: totw.find(p => p.role === 1)?.heroId,
		onePlayer: totw.find(p => p.role === 1)?.playerId,
		twoHero: totw.find(p => p.role === 2)?.heroId,
		twoPlayer: totw.find(p => p.role === 2)?.playerId,
		threeHero: totw.find(p => p.role === 3)?.heroId,
		threePlayer: totw.find(p => p.role === 3)?.playerId,
		fourHero: totw.find(p => p.role === 4)?.heroId,
		fourPlayer: totw.find(p => p.role === 4)?.playerId,
		fiveHero: totw.find(p => p.role === 5)?.heroId,
		fivePlayer: totw.find(p => p.role === 5)?.playerId,
	}

	console.log(data)

	//@ts-ignore
	const result = db.insert(teamOfTheWeek).values(data).returning()

	console.log(await result)
}

scrapeTOTW()
