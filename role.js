import fs from 'fs/promises';

async function readJsonArrayFromFile() {
    try {
        // Read the content of the file asynchronously
        const fileContent = await fs.readFile('./webscraper/laneRates.json', 'utf-8');

        // Parse the JSON array string to a JavaScript array
        console.log(fileContent)
        return JSON.parse(fileContent);

        // Now 'jsArray' is a JavaScript array
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
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

export const getHeroRolesWithFarm = async (heroName, team) => {
    const heroes = await readJsonArrayFromFile();
    const heroNames = Object.keys(team)
    const roles = ['1', '2', '3', '4', '5'];
    const heroRoles = [];

    roles.forEach(role => {
        const eligibleHeroes = heroes
            .filter(hero => heroNames.includes(hero.name) && hero.data.length > 0 && !heroRoles.some(entry => entry.role === role))
            .sort((a, b) => {
                const percentageA = parseFloat(a.data[roles.indexOf(role)].replace('%', ''));
                const percentageB = parseFloat(b.data[roles.indexOf(role)].replace('%', ''));
                const lastHitsA = team[a.name] || 0;
                const lastHitsB = team[b.name] || 0;

                // Weighted average calculation
                const weightedAverageA = (percentageA * 0.85) + (lastHitsA * 0.15);
                const weightedAverageB = (percentageB * 0.85) + (lastHitsB * 0.15);

                return weightedAverageB - weightedAverageA;
            });

        if (eligibleHeroes.length > 0) {
            // Assign the role based on the first eligible hero
            heroRoles.push({ name: eligibleHeroes[0].name, role: role });
            // Remove the assigned hero from the list to avoid duplicate assignments
            heroNames.splice(heroNames.indexOf(eligibleHeroes[0].name), 1);
        } else {
            // If no eligible hero for the role, assign 'Unknown'
            heroRoles.push({ name: undefined, role: role });
        }
    });
    console.log(heroRoles)
    return heroRoles.find(hero => hero.name === heroName).role;
}
