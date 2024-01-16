export const getImpactScore = (match, role, duration) => {
	let impact = 0
	let csMinRating: number
	const csMin = match.last_hits / (duration / 60)
	const deathsPerMin = match.deaths / (duration / 60)

	// Carry
	if (role === 1) {
		// Heroes with lower returns for high CS/min
		// Anti-mage, Naga Siren, Medusa, Luna, Terrorblade
		if ([1, 89, 94, 48, 109].includes(match.hero_id)) {
			csMinRating = csMin ** 1.3 / 25
		} else {
			csMinRating = csMin ** 1.3 / 20
		}
		const deathRating = 3 / (20 * deathsPerMin + 1)
		const kapmRating = ((match.kills * 2 + match.assists * 0.75) / (duration / 60)) ** 2
		impact = kapmRating * 0.4 + deathRating * 0.4 + csMinRating * 0.2

		// Mid
	} else if (role === 2) {
		// Heroes with lower returns for high CS/min
		// Templar Assassin, Arc Warden, Shadow Fiend
		if ([46, 113, 11].includes(match.hero_id)) {
			csMinRating = csMin ** 1.3 / 23
		} else {
			csMinRating = csMin ** 1.3 / 18
		}
		const deathRating = 4 / (24 * deathsPerMin + 1)
		const kapmRating = ((match.kills * 1.7 + match.assists * 1.3) / (duration / 60)) ** 2
		impact = kapmRating * 0.6 + deathRating * 0.2 + csMinRating * 0.1

		// Offlane
	} else if (role === 3) {
		csMinRating = csMin ** 1.3 / 18
		const deathRating = 4.5 / (23 * deathsPerMin + 1)
		let kapmRating: number
		// Lower returns on kills for Axe
		kapmRating = ((match.kills * 1.5 + match.assists * 1.5) / (duration / 60)) ** 2
		impact = kapmRating * 0.65 + deathRating * 0.3 + csMinRating * 0.05

		// Support
	} else if (role === 4 || role === 5) {
		const deathRating = 5 / (24 * deathsPerMin + 1)
		const kapmRating = ((match.kills * 0.65 + match.assists * 1.35) / (duration / 60)) ** 2
		if ([20, 105].includes(match.hero_id)) {
			impact = kapmRating * 0.7 + deathRating * 0.3
		} else {
			impact = kapmRating * 0.55 + deathRating * 0.45
		}
	} else {
		return 0
	}

	return Math.floor(impact * 100)
}
