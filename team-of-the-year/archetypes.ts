// @ts-nocheck
import { sql } from 'drizzle-orm'
import { db } from '../db/database'

const heroStyles = {
	'1': {
		displayName: 'Anti-Mage',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
		],
	},
	'2': {
		displayName: 'Axe',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'3': {
		displayName: 'Bane',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 3,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'4': {
		displayName: 'Bloodseeker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'5': {
		displayName: 'Crystal Maiden',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'6': {
		displayName: 'Drow Ranger',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'7': {
		displayName: 'Earthshaker',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'8': {
		displayName: 'Juggernaut',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'9': {
		displayName: 'Mirana',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'10': {
		displayName: 'Morphling',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'11': {
		displayName: 'Shadow Fiend',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 3,
			},
		],
	},
	'12': {
		displayName: 'Phantom Lancer',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'13': {
		displayName: 'Puck',
		style: [
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'disabler',
				level: 3,
			},
		],
	},
	'14': {
		displayName: 'Pudge',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'15': {
		displayName: 'Razor',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'16': {
		displayName: 'Sand King',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'17': {
		displayName: 'Storm Spirit',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'18': {
		displayName: 'Sven',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'19': {
		displayName: 'Tiny',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'20': {
		displayName: 'Vengeful Spirit',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'21': {
		displayName: 'Windranger',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'22': {
		displayName: 'Zeus',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
		],
	},
	'23': {
		displayName: 'Kunkka',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'25': {
		displayName: 'Lina',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'26': {
		displayName: 'Lion',
		style: [
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 3,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'27': {
		displayName: 'Shadow Shaman',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 3,
			},
			{
				name: 'support',
				level: 2,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'28': {
		displayName: 'Slardar',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'29': {
		displayName: 'Tidehunter',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'30': {
		displayName: 'Witch Doctor',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'31': {
		displayName: 'Lich',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'32': {
		displayName: 'Riki',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'33': {
		displayName: 'Enigma',
		style: [
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'34': {
		displayName: 'Tinker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'35': {
		displayName: 'Sniper',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
		],
	},
	'36': {
		displayName: 'Necrophos',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'37': {
		displayName: 'Warlock',
		style: [
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'38': {
		displayName: 'Beastmaster',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'39': {
		displayName: 'Queen of Pain',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 3,
			},
		],
	},
	'40': {
		displayName: 'Venomancer',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'41': {
		displayName: 'Faceless Void',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'42': {
		displayName: 'Wraith King',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'43': {
		displayName: 'Death Prophet',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'44': {
		displayName: 'Phantom Assassin',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 1,
			},
		],
	},
	'45': {
		displayName: 'Pugna',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'46': {
		displayName: 'Templar Assassin',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
		],
	},
	'47': {
		displayName: 'Viper',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'48': {
		displayName: 'Luna',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'49': {
		displayName: 'Dragon Knight',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'50': {
		displayName: 'Dazzle',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'51': {
		displayName: 'Clockwerk',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'52': {
		displayName: 'Leshrac',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'53': {
		displayName: "Nature's Prophet",
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'54': {
		displayName: 'Lifestealer',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'55': {
		displayName: 'Dark Seer',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'56': {
		displayName: 'Clinkz',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'57': {
		displayName: 'Omniknight',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'58': {
		displayName: 'Enchantress',
		style: [
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'59': {
		displayName: 'Huskar',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
		],
	},
	'60': {
		displayName: 'Night Stalker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'61': {
		displayName: 'Broodmother',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'62': {
		displayName: 'Bounty Hunter',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
		],
	},
	'63': {
		displayName: 'Weaver',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
		],
	},
	'64': {
		displayName: 'Jakiro',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'65': {
		displayName: 'Batrider',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'66': {
		displayName: 'Chen',
		style: [
			{
				name: 'support',
				level: 2,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'67': {
		displayName: 'Spectre',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
		],
	},
	'68': {
		displayName: 'Ancient Apparition',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'69': {
		displayName: 'Doom',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'70': {
		displayName: 'Ursa',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'71': {
		displayName: 'Spirit Breaker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'72': {
		displayName: 'Gyrocopter',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'73': {
		displayName: 'Alchemist',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'74': {
		displayName: 'Invoker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'75': {
		displayName: 'Silencer',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'76': {
		displayName: 'Outworld Destroyer',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'77': {
		displayName: 'Lycan',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'78': {
		displayName: 'Brewmaster',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'79': {
		displayName: 'Shadow Demon',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'80': {
		displayName: 'Lone Druid',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'pusher',
				level: 3,
			},
		],
	},
	'81': {
		displayName: 'Chaos Knight',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'82': {
		displayName: 'Meepo',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'83': {
		displayName: 'Treant Protector',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'84': {
		displayName: 'Ogre Magi',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'85': {
		displayName: 'Undying',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'86': {
		displayName: 'Rubick',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'87': {
		displayName: 'Disruptor',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'88': {
		displayName: 'Nyx Assassin',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'89': {
		displayName: 'Naga Siren',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 1,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'90': {
		displayName: 'Keeper of the Light',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'91': {
		displayName: 'Io',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'92': {
		displayName: 'Visage',
		style: [
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
			{
				name: 'pusher',
				level: 1,
			},
		],
	},
	'93': {
		displayName: 'Slark',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'94': {
		displayName: 'Medusa',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'95': {
		displayName: 'Troll Warlord',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'96': {
		displayName: 'Centaur Warrunner',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'97': {
		displayName: 'Magnus',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'98': {
		displayName: 'Timbersaw',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'durable',
				level: 2,
			},
		],
	},
	'99': {
		displayName: 'Bristleback',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 3,
			},
		],
	},
	'100': {
		displayName: 'Tusk',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'101': {
		displayName: 'Skywrath Mage',
		style: [
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'102': {
		displayName: 'Abaddon',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'103': {
		displayName: 'Elder Titan',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'104': {
		displayName: 'Legion Commander',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'105': {
		displayName: 'Techies',
		style: [
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'106': {
		displayName: 'Ember Spirit',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'107': {
		displayName: 'Earth Spirit',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'108': {
		displayName: 'Underlord',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'109': {
		displayName: 'Terrorblade',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'pusher',
				level: 2,
			},
		],
	},
	'110': {
		displayName: 'Phoenix',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'111': {
		displayName: 'Oracle',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'112': {
		displayName: 'Winter Wyvern',
		style: [
			{
				name: 'nuker',
				level: 1,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 3,
			},
		],
	},
	'113': {
		displayName: 'Arc Warden',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 1,
			},
		],
	},
	'114': {
		displayName: 'Monkey King',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'initiator',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'119': {
		displayName: 'Dark Willow',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'120': {
		displayName: 'Pangolier',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 1,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'121': {
		displayName: 'Grimstroke',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 2,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'123': {
		displayName: 'Hoodwink',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'126': {
		displayName: 'Void Spirit',
		style: [
			{
				name: 'carry',
				level: 2,
			},
			{
				name: 'escape',
				level: 3,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'128': {
		displayName: 'Snapfire',
		style: [
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'nuker',
				level: 3,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'129': {
		displayName: 'Mars',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'131': {
		displayName: 'Ringmaster',
		style: [
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 2,
			},
		],
	},
	'135': {
		displayName: 'Dawnbreaker',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'durable',
				level: 2,
			},
		],
	},
	'136': {
		displayName: 'Marci',
		style: [
			{
				name: 'carry',
				level: 1,
			},
			{
				name: 'escape',
				level: 1,
			},
			{
				name: 'initiator',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
			{
				name: 'support',
				level: 1,
			},
		],
	},
	'137': {
		displayName: 'Primal Beast',
		style: [
			{
				name: 'initiator',
				level: 3,
			},
			{
				name: 'durable',
				level: 3,
			},
			{
				name: 'disabler',
				level: 2,
			},
		],
	},
	'138': {
		displayName: 'Muerta',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'nuker',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
	'145': {
		displayName: 'Kez',
		style: [
			{
				name: 'carry',
				level: 3,
			},
			{
				name: 'escape',
				level: 2,
			},
			{
				name: 'disabler',
				level: 1,
			},
		],
	},
}

function generatePlayerClass(roles) {
	// Sort the roles to ensure consistency
	roles = roles.sort()

	// Define the class names based on role combinations
	const roleCombinations = {
		'carry, nuker, pusher': 'Kratos (God of War)',
		'carry, nuker, support': 'Lara Croft (Tomb Raider)',
		'carry, nuker, disabler': 'Link (The Legend of Zelda)',
		'carry, support, disabler': 'Pikachu (Pokémon)',
		'nuker, support, disabler': 'Ellie (The Last of Us)',
		'carry, support, escape': 'Nathan Drake (Uncharted)',
		'escape, nuker, disabler': 'Max Payne (Max Payne)',
		'escape, nuker, durable': 'Geralt of Rivia (The Witcher)',
		'escape, disabler, durable': 'Arthur Morgan (Red Dead Redemption 2)',
		'durable, support, disabler': 'Aloy (Horizon Zero Dawn)',
		'durable, disabler, initiator': 'Ellen Ripley (Alien: Isolation)',
		'durable, initiator, pusher': 'The Doom Slayer (DOOM)',
		'disabler, initiator, pusher': 'Ciri (The Witcher 3)',
		'nuker, initiator, pusher': 'Isaac Clarke (Dead Space)',
		'carry, jungler, support': 'The Hunter (Bloodborne)',
		'support, jungler, pusher': 'Geralt of Rivia (The Witcher 3)',
		'pusher, durable, disabler': 'Ryu (Street Fighter)',
		'pusher, support, nuker': 'Jodie Holmes (Beyond: Two Souls)',
		'pusher, nuker, carry': "Mighty Thor (Marvel's Avengers)",
	}

	// Handle 2-role combinations
	const twoRoleCombinations = {
		'carry, nuker': 'Kratos (God of War)',
		'carry, support': 'Lara Croft (Tomb Raider)',
		'carry, disabler': 'Link (The Legend of Zelda)',
		'nuker, support': 'Samus Aran (Metroid)',
		'nuker, disabler': 'Alice (Resident Evil)',
		'support, disabler': 'Ellie (The Last of Us)',
		'carry, escape': 'Nathan Drake (Uncharted)',
		'escape, nuker': 'Max Payne (Max Payne)',
		'escape, disabler': 'Geralt of Rivia (The Witcher)',
		'escape, durable': 'Arthur Morgan (Red Dead Redemption 2)',
		'durable, support': 'Aloy (Horizon Zero Dawn)',
		'durable, disabler': 'Ellen Ripley (Alien: Isolation)',
		'durable, initiator': 'The Doom Slayer (DOOM)',
		'disabler, initiator': 'Ciri (The Witcher 3)',
		'nuker, initiator': 'Isaac Clarke (Dead Space)',
		'carry, jungler': 'The Hunter (Bloodborne)',
		'support, jungler': 'Geralt of Rivia (The Witcher 3)',
		'pusher, durable': 'Ryu (Street Fighter)',
		'pusher, support': 'Jodie Holmes (Beyond: Two Souls)',
		'pusher, nuker': "Mighty Thor (Marvel's Avengers)",
	}

	// Create a key from the sorted roles to look up the class
	const key = roles.join(', ')

	// Return the corresponding class or a default value
	return roleCombinations[key] || twoRoleCombinations[key] || 'Custom Playstyle'
}

// Function to get the top 3 hero styles for a specific player
async function getTopHeroStyles(playerId) {
	const topHeroes = await db.execute(sql`
    WITH filtered_matches AS (
      SELECT m.id AS match_id
      FROM matches m
      WHERE m.start_time >= EXTRACT(EPOCH FROM NOW() - INTERVAL '1 year')
    ),
    player_heroes AS (
      SELECT md.hero_id, COUNT(*) AS hero_play_count
      FROM match_data md
      JOIN filtered_matches fm ON md.match_id = fm.match_id
      JOIN accounts a ON md.player_id = a.account_id
      JOIN players p ON a.owner = p.id
      WHERE p.id = ${playerId}
      GROUP BY md.hero_id
    )
    SELECT hero_id
    FROM player_heroes
    ORDER BY hero_play_count DESC
    LIMIT 10;
  `)

	// Assuming the topHeroes result is an array of hero IDs
	const heroRoles = {}
	const heroCounts = {}

	topHeroes.forEach(heroId => {
		const hero = heroStyles[heroId.hero_id]
		if (!hero) return // Skip if the hero isn't found in heroStyles

		hero.style.forEach(style => {
			// Sum the total level of each role across heroes
			if (!heroRoles[style.name]) {
				heroRoles[style.name] = 0
			}
			heroRoles[style.name] += style.level
		})

		// Count the hero play counts for assigning 3-match and 2-match characters
		heroCounts[heroId.hero_id] = (heroCounts[heroId.hero_id] || 0) + 1
	})

	// Sort roles by their total level (in descending order) and get the top 3 roles
	const sortedRoles = Object.entries(heroRoles)
		.sort((a, b) => b[1] - a[1]) // Sort by total level
		.slice(0, 3) // Take the top 3 roles

	// Assign the 3-match and 2-match heroes
	const matchHeroes = Object.keys(heroCounts).filter(heroId => heroCounts[heroId] >= 2)

	// Look for a 3-match hero and a 2-match hero
	const threeMatchHero = matchHeroes.find(heroId => heroCounts[heroId] >= 3) || null
	const twoMatchHero = matchHeroes.find(heroId => heroCounts[heroId] === 2) || null

	// Return the sorted top roles and the 3-match/2-match heroes
	return {
		topRoles: sortedRoles.map(([role, totalLevel]) => ({
			role,
			totalLevel,
		})),
		threeMatchHero,
		twoMatchHero,
	}
}

// Function to run for all players
async function getAllPlayersTopHeroStyles() {
	// Fetch all players with their usernames from the database
	const players = await db.execute(sql`
    SELECT id, username
    FROM players
  `)

	// Iterate over each player and get their top 3 roles by totaling hero roles
	const allPlayerRoles = []

	for (const player of players) {
		const { topRoles, threeMatchHero, twoMatchHero } = await getTopHeroStyles(player.id)

		// Push formatted data with the username and top roles
		allPlayerRoles.push({
			username: player.username,
			topRoles,
			threeMatchHero,
			twoMatchHero,
		})
	}

	// Output the result using console.table
	const tableData = allPlayerRoles.map(player => {
		const roles = player.topRoles.map(role => `${role.role}: Level ${role.totalLevel}`).join(', ')
		return {
			Username: player.username,
			'Top Roles': roles,
			'3-Match Character': player.threeMatchHero || 'null',
			'2-Match Character': player.twoMatchHero || 'null',
		}
	})

	// Display the result in a table format
	console.table(tableData)
}

// Run the function to get the roles for all players
getAllPlayersTopHeroStyles().catch(err => {
	console.error('Error fetching player roles:', err)
})
