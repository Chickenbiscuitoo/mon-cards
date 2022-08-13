import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../db'

interface PokemonObject {
	id: number
	name: string
	weight: number
	height: number
	sprite_id: number
}

interface SpriteObject {
	id: number
	sprite: string
}

interface DataObject {
	pokemon: PokemonObject
	pokemonSprite: SpriteObject
}

interface DataError {
	message: string
}

export default async function getRandomPokemon(
	req: NextApiRequest,
	res: NextApiResponse<DataObject | DataError>
) {
	const { method } = req

	if (method !== 'GET') {
		return res
			.status(400)
			.json({ message: 'Only GET method is accepted' })
	}

	// Get last pokemon
	const lastPokemon = await prisma.pokemon.findMany({
		orderBy: {
			id: 'desc',
		},
		take: 1,
	})

	const lastPokemonId = lastPokemon[0].id
	const randomId = Math.floor(Math.random() * (lastPokemonId - 1)) + 1

	// Get pokemon from DB
	const pokemon = await prisma.pokemon.findUnique({
		where: {
			id: randomId ? randomId : 1,
		},
	})

	if (!pokemon) {
		return res.status(500).json({ message: 'Pokemon not found' })
	}

	// Get pokemon sprite
	const pokemonSprite = await prisma.sprite.findUnique({
		where: {
			id: pokemon.sprite_id,
		},
	})

	if (!pokemonSprite) {
		return res
			.status(500)
			.json({ message: 'Pokemon Sprite not found' })
	}

	return res.status(200).json({ pokemon, pokemonSprite })
}
