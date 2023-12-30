import { heroes } from './laneRates.js'


/* Returns the role of a hero based on the team composition and farm distribution
* @param {string} heroName - The name of the hero to get the role for
*/

function getHeroRolesWithFarm(heroName, team) {
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
    return heroRoles.find(hero => hero.name === heroName).role;
}

// Example usage:
const teamData = {
    'Warlock': 321, 'Troll Warlord': 570, 'Doom': 465, 'Enigma': 297, 'Zeus': 419
};

const result = getHeroRolesWithFarm('Enigma', teamData);
console.log(result);
