import axios from 'axios'
import 'dotenv/config'

export const getMatchDetails = async (matchId: string) => {
	const makeRequest = async (): Promise<any> => {
		try {
			const matchDetails = await axios.get(
				`https://api.steampowered.com/IDOTA2Match_570/getMatchDetails/v1?match_id=${matchId}&key=${process.env.STEAM_KEY}`,
			)
			return matchDetails.data
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
			// Re-throw other errors
			console.log(error)
		}
	}
	return await makeRequest()
}

export const getMatchDetailsOpenDota = async (matchId: string) => {
	const makeRequest = async (): Promise<any> => {
		try {
			const matchDetails = await axios.get(`https://api.opendota.com/api/matches/${matchId}`)
			return matchDetails.data
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
			// Re-throw other errors
			console.log(error)
		}
	}
	return await makeRequest()
}

export const getMatchDetailsSequenceId = async (sequenceId: string) => {
	const makeRequest = async (): Promise<any> => {
		try {
			const matchDetails = await axios.get(
				`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistoryBySequenceNum/v1?start_at_match_seq_num=${sequenceId}&matches_requested=1&key=${process.env.STEAM_KEY}`,
			)
			return matchDetails.data
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
		}
	}
	return await makeRequest()
}

export const getMatchHistory = async (accountId: number, numberOfGames: number = 1) => {
	const makeRequest = async (): Promise<any> => {
		try {
			const matchHistory = await axios.get(
				`https://api.steampowered.com/IDOTA2Match_570/GetMatchHistory/v1/?account_id=${accountId}&key=${process.env.STEAM_KEY}&matches_requested=${numberOfGames}`,
			)

			if (matchHistory.data && matchHistory.data.result && Array.isArray(matchHistory.data.result.matches)) {
				const idList = matchHistory.data.result.matches.map((match: any) => match.match_seq_num)
				return idList
			} else {
				// Handle the case where the expected data structure is not present
				return [] // Or throw a custom error, or return undefined, depending on your desired behavior
			}
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
			console.log(error)
		}
	}
	return await makeRequest()
}

export const getAccountList = async () => {
	const makeRequest = async (): Promise<any> => {
		try {
			const accountList = await axios.get(
				`https://raw.githubusercontent.com/connorcam302/whos-playing-constants/main/PLAYERS.json`,
			)
			const idList = accountList.data.map((account: any) => account.id)
			return idList
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
			// Re-throw other errors
			console.log(error)
		}
	}
	return await makeRequest()
}

export const getMatchHistoryOpenDota = async (accountId: number, numberOfGames: number = 1) => {
	const makeRequest = async (): Promise<any> => {
		try {
			const matchHistory = await axios.get(
				`https://api.opendota.com/api/players/${accountId}/matches?limit=${numberOfGames}`,
			)
			const idList = matchHistory.data.map((match: any) => match.match_id)
			return idList
		} catch (error: any) {
			// Check if it's a rate limit error
			if (error.response?.status === 429 || error.response?.statusText === 'Too Many Requests') {
				await new Promise(resolve => setTimeout(resolve, 5000))
				return makeRequest() // Retry recursively
			}
			// Re-throw other errors
			console.log(error)
		}
	}
	return await makeRequest()
}
