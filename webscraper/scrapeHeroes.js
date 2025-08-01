import puppeteer from 'puppeteer'
import { writeFile } from 'fs/promises'
import { heroIdArray, heroMap } from '../heroMap.js'

const getHeroData = async heroId => {
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport: null,
	})

	const page = await browser.newPage()

	await page.goto(`https://stratz.com/heroes/${heroId}?rankBracketHeroTimeDetail=DIVINE_IMMORTAL`, {
		waitUntil: 'networkidle0',
	})

	await page.waitForTimeout(1000)

	const data = await page.evaluate(() => {
		const roles = document.querySelectorAll('.hitagi__sc-1ah81hi-0.dkgsoB')
		return Array.from(roles).map(role => role.innerText.trim())
	})

	await browser.close()

	return data
}

const getDataForHeroes = async () => {
	const heroes = []
	for (const heroId of heroIdArray) {
		const heroData = heroMap.get(heroId)
		const data = await getHeroData(heroId)

		heroes.push({
			id: heroId,
			name: heroData.name,
			data: data,
		})
	}

	await writeFile('./heroData.json', JSON.stringify(heroes, null, 2))
}

// Call the function to start the process
getDataForHeroes()
