const fs = require('fs').promises

async function readJsonArrayFromFile() {
	try {
		// Read the content of the file asynchronously
		const fileContent = await fs.readFile('./webscraper/laneRates.json', 'utf-8')

		// Parse the JSON array string to a JavaScript array
		return JSON.parse(fileContent)

		// Now 'jsArray' is a JavaScript array
	} catch (error) {
		console.error('Error reading or parsing the file:', error)
	}
}

/*
 * Gets the role of a specific hero based on the hero's name and team data.
 *
 * @param {string} heroName - The name of the hero.
 * @param {Object.<string, number>} team - Team data containing hero names as keys and last hits as values.
 * @returns {string} - The role of the specified hero. If the hero is not found, returns 'Unknown'.
 *
 * @example
 * const teamData = {
 *   'Warlock': 321,
 *   'Troll Warlord': 570,
 *   'Doom': 465,
 *   'Enigma': 297,
 *   'Zeus': 419
 * };
 * getHeroRolesWithFarm('Enigma', teamData) // Output: '3' (Offlane)
 */

export const getRole = async (heroId, team) => {
	const heroes = await readJsonArrayFromFile()
	const heroIds = team.map(hero => hero.hero_id)
	const roles = ['1', '2', '3', '4', '5']
	const heroRoles: any[] = []

	roles.forEach(role => {
		const eligibleHeroes = heroes
			.filter(
				hero => heroIds.includes(hero.id) && hero.data.length > 0 && !heroRoles.some(entry => entry.role === role),
			)
			.sort((a, b) => {
				const percentageA = parseFloat(a.data[roles.indexOf(role)].replace('%', ''))
				const percentageB = parseFloat(b.data[roles.indexOf(role)].replace('%', ''))
				const lastHitsA = team.find(hero => hero.heroId === a.id)?.last_hits || 0
				const lastHitsB = team.find(hero => hero.heroId === b.id)?.last_hits || 0

				// Weighted average calculation
				const weightedAverageA = percentageA * 0.8 + lastHitsA * 0.2
				const weightedAverageB = percentageB * 0.8 + lastHitsB * 0.2

				return weightedAverageB - weightedAverageA
			})

		if (eligibleHeroes.length > 0) {
			// Assign the role based on the first eligible hero
			heroRoles.push({ id: eligibleHeroes[0].id, name: eligibleHeroes[0].name, role: Number(role) })
			// Remove the assigned hero from the list to avoid duplicate assignments
			heroIds.splice(heroIds.indexOf(eligibleHeroes[0].id), 1)
		} else {
			// If no eligible hero for the role, assign 'Unknown'
			heroRoles.push({ id: 0, name: undefined, role: role })
		}
	})

	return heroRoles.find(hero => hero.id === heroId).role
}
