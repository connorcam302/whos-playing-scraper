import { pgTable, foreignKey, pgEnum, bigint, boolean, varchar, unique, text } from 'drizzle-orm/pg-core'
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

export const matchData = pgTable(
	'match_data',
	{
		playerId: bigint('player_id', { mode: 'number' })
			.notNull()
			.references(() => players.id),
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
		partySize: bigint('party_size', { mode: 'number' }),
		aghanimsScepter: bigint('aghanims_scepter', { mode: 'number' }),
		aghanimsShard: bigint('aghanims_shard', { mode: 'number' }),
		goldPerMin: bigint('gold_per_min', { mode: 'number' }),
		lastHits: bigint('last_hits', { mode: 'number' }),
		xpPerMin: bigint('xp_per_min', { mode: 'number' }),
		itemNeutral: bigint('item_neutral', { mode: 'number' }).references(() => items.id),
		role: bigint('role', { mode: 'number' }),
		impact: bigint('impact', { mode: 'number' }),
	},
	table => {
		return {
			matchDataPlayerIdMatchIdKey: unique('match_data_player_id_match_id_key').on(table.playerId, table.matchId),
		}
	},
)

export const matches = pgTable('matches', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	gameMode: bigint('game_mode', { mode: 'number' }).notNull(),
	startTime: bigint('start_time', { mode: 'number' }).notNull(),
	duration: bigint('duration', { mode: 'number' }).notNull(),
	winner: text('winner').notNull(),
	lobby: bigint('lobby', { mode: 'number' }).notNull(),
})

export const players = pgTable('players', {
	id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
	username: text('username').notNull(),
})
