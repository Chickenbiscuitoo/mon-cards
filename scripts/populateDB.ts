import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function populateSprite() {
	await prisma.sprite.createMany({
		data: [
			{
				sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
			},
			{
				sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
			},
			{
				sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
			},
		],
	})
}

async function populatePokemon() {
	await prisma.pokemon.createMany({
		data: [
			{
				name: 'Bulbasaur',
				height: 7,
				weight: 70,
				sprite_id: 1,
			},
			{
				name: 'Ivysaur',
				height: 10,
				weight: 130,
				sprite_id: 2,
			},
			{
				name: 'Venusaur',
				height: 1000,
				weight: 20,
				sprite_id: 3,
			},
		],
	})
}

// populatePokemon()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	})

// populateSprite()
// 	.then(async () => {
// 		await prisma.$disconnect()
// 	})
// 	.catch(async (e) => {
// 		console.error(e)
// 		await prisma.$disconnect()
// 		process.exit(1)
// 	})
