import { pgTable, foreignKey, pgEnum, bigint, boolean, varchar, text, unique } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const keyStatus = pgEnum('key_status', ['expired', 'invalid', 'valid', 'default'])
export const keyType = pgEnum('key_type', [
	'stream_xchacha20',
	'secretstream',
	'secretbox',
	'kdf',
	'generichash',
	'shorthash',
	'auth',
	'hmacsha256',
	'hmacsha512',
	'aead-det',
	'aead-ietf',
])
export const requestStatus = pgEnum('request_status', ['ERROR', 'SUCCESS', 'PENDING'])
export const factorType = pgEnum('factor_type', ['webauthn', 'totp'])
export const factorStatus = pgEnum('factor_status', ['verified', 'unverified'])
export const aalLevel = pgEnum('aal_level', ['aal3', 'aal2', 'aal1'])
export const codeChallengeMethod = pgEnum('code_challenge_method', ['plain', 's256'])

export const accounts = pgTable('accounts', {
	owner: bigint('owner', { mode: 'number' })
		.notNull()
		.references(() => players.id),
	accountId: bigint('account_id', { mode: 'number' }).primaryKey().notNull(),
	smurf: boolean('smurf').notNull(),
})

export const heroes = pgTable('heroes', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	name: varchar('name').notNull(),
	img: varchar('img').notNull(),
})

export const items = pgTable('items', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	name: varchar('name'),
	img: varchar('img'),
})

export const matches = pgTable('matches', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	gameMode: bigint('game_mode', { mode: 'number' }).notNull(),
	startTime: bigint('start_time', { mode: 'number' }).notNull(),
	duration: bigint('duration', { mode: 'number' }).notNull(),
	winner: text('winner').notNull(),
	lobby: bigint('lobby', { mode: 'number' }).notNull(),
	sequenceNumber: bigint('sequence_number', { mode: 'number' }),
})

export const players = pgTable('players', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	username: text('username').notNull(),
})

export const matchData = pgTable(
	'match_data',
	{
		id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
		playerId: bigint('player_id', { mode: 'number' })
			.notNull()
			.references(() => accounts.accountId),
		matchId: bigint('match_id', { mode: 'number' })
			.notNull()
			.references(() => matches.id),
		heroId: bigint('hero_id', { mode: 'number' })
			.notNull()
			.references(() => heroes.id),
		team: varchar('team').notNull(),
		kills: bigint('kills', { mode: 'number' }).notNull(),
		deaths: bigint('deaths', { mode: 'number' }).notNull(),
		assists: bigint('assists', { mode: 'number' }).notNull(),
		item0: bigint('item_0', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		item1: bigint('item_1', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		item2: bigint('item_2', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		item3: bigint('item_3', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		item4: bigint('item_4', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		item5: bigint('item_5', { mode: 'number' })
			.notNull()
			.references(() => items.id),
		aghanimsScepter: bigint('aghanims_scepter', { mode: 'number' }),
		aghanimsShard: bigint('aghanims_shard', { mode: 'number' }),
		goldPerMin: bigint('gold_per_min', { mode: 'number' }),
		lastHits: bigint('last_hits', { mode: 'number' }),
		xpPerMin: bigint('xp_per_min', { mode: 'number' }),
		itemNeutral: bigint('item_neutral', { mode: 'number' }).references(() => items.id),
		role: bigint('role', { mode: 'number' }).notNull(),
		impact: bigint('impact', { mode: 'number' }).notNull(),
		backpack0: bigint('backpack_0', { mode: 'number' }).references(() => items.id),
		backpack1: bigint('backpack_1', { mode: 'number' }).references(() => items.id),
		backpack2: bigint('backpack_2', { mode: 'number' }).references(() => items.id),
		heroDamage: bigint('hero_damage', { mode: 'number' }),
		level: bigint('level', { mode: 'number' }),
		towerDamage: bigint('tower_damage', { mode: 'number' }),
		facet: bigint('facet', { mode: 'number' }),
	},
	table => {
		return {
			matchDataPlayerIdMatchIdKey: unique('match_data_player_id_match_id_key').on(table.playerId, table.matchId),
		}
	},
)

export const teamOfTheWeek = pgTable('team_of_the_week', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	onePlayer: bigint('1_player', { mode: 'number' })
		.notNull()
		.references(() => players.id),

	oneHero: bigint('1_hero', { mode: 'number' }).references(() => heroes.id),
	twoPlayer: bigint('2_player', { mode: 'number' }).references(() => players.id),
	twoHero: bigint('2_hero', { mode: 'number' }).references(() => heroes.id),
	threePlayer: bigint('3_player', { mode: 'number' }).references(() => players.id),
	threeHero: bigint('3_hero', { mode: 'number' }).references(() => heroes.id),
	fourPlayer: bigint('4_player', { mode: 'number' }).references(() => players.id),
	fourHero: bigint('4_hero', { mode: 'number' }).references(() => heroes.id),
	fivePlayer: bigint('5_player', { mode: 'number' }).references(() => players.id),
	fiveHero: bigint('5_hero', { mode: 'number' }).references(() => heroes.id),
	oneMatch: bigint('1_match', { mode: 'number' }).references(() => matches.id),
	twoMatch: bigint('2_match', { mode: 'number' }).references(() => matches.id),
	threeMatch: bigint('3_match', { mode: 'number' }).references(() => matches.id),
	fourMatch: bigint('4_match', { mode: 'number' }).references(() => matches.id),
	fiveMatch: bigint('5_match', { mode: 'number' }).references(() => matches.id),
})

export const flopOfTheWeek = pgTable('flop_of_the_week', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	onePlayer: bigint('1_player', { mode: 'number' })
		.notNull()
		.references(() => players.id),
	oneHero: bigint('1_hero', { mode: 'number' }).references(() => heroes.id),
	oneMatch: bigint('1_match', { mode: 'number' }).references(() => matches.id),
	twoPlayer: bigint('2_player', { mode: 'number' }).references(() => players.id),
	twoHero: bigint('2_hero', { mode: 'number' }).references(() => heroes.id),
	twoMatch: bigint('2_match', { mode: 'number' }).references(() => matches.id),
	threePlayer: bigint('3_player', { mode: 'number' }).references(() => players.id),
	threeHero: bigint('3_hero', { mode: 'number' }).references(() => heroes.id),
	threeMatch: bigint('3_match', { mode: 'number' }).references(() => matches.id),
	fourPlayer: bigint('4_player', { mode: 'number' }).references(() => players.id),
	fourHero: bigint('4_hero', { mode: 'number' }).references(() => heroes.id),
	fourMatch: bigint('4_match', { mode: 'number' }).references(() => matches.id),
	fivePlayer: bigint('5_player', { mode: 'number' }).references(() => players.id),
	fiveHero: bigint('5_hero', { mode: 'number' }).references(() => heroes.id),
	fiveMatch: bigint('5_match', { mode: 'number' }).references(() => matches.id),
})
