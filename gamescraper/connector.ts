import axios from 'axios'
import 'dotenv/config'

export const getMatchDetails = async (matchId: string) => {
	const matchDetails = await axios.get(
		`https://api.steampowered.com/IDOTA2Match_570/getMatchDetails/v1?match_id=${matchId}&key=${process.env.STEAM_KEY}`,
	)
	return await matchDetails.data
}

export const getMatchHistory = async (accountId: number, numberOfGames: number = 1) => {
	const matchHistory = await axios.get(
		`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?account_id=${accountId}&key=${process.env.STEAM_KEY}&matches_requested=${numberOfGames}`,
	)

	const idList = matchHistory.data.result.matches.map((match: any) => match.match_id)

	return await idList
}

export const getAccountList = async () => {
	const accountList = await axios.get(
		`https://raw.githubusercontent.com/connorcam302/whos-playing-constants/main/PLAYERS.json`,
	)

	const idList = accountList.data.map((account: any) => account.id)

	return idList
}

export const getMatchHistoryOpenDota = async (accountId: number, numberOfGames: number = 1) => {
	const matchHistory = await axios.get(
		`https://api.opendota.com/api/players/${accountId}/matches?limit=${numberOfGames}`,
	)

	const idList = matchHistory.data.map((match: any) => match.match_id)

	return await idList
}
