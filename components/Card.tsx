import React from 'react'
import type { NextComponentType } from 'next'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import styles from '../styles/Card.module.css'

const Card: NextComponentType = () => {
	const queryClient = useQueryClient()

	const getPokemon = async () => {
		const response = await axios.get(
			'http://localhost:3000/api/pokemon'
		)
		return response.data
	}

	const query = useQuery(['pokemon'], getPokemon)

	const pokemonImg = query.data?.pokemonSprite.sprite
	const name = query.data?.pokemon.name
	const weight = query.data?.pokemon.weight
	const height = query.data?.pokemon.height

	if (query.isError) {
		return <div>Error</div>
	}

	const handleClick = () => {
		query.refetch()
	}

	return (
		<div className={styles.card_container}>
			<div className={styles.card}>
				<div className={styles.img_container}>
					<img src={pokemonImg} alt="" />
				</div>
				<div className={styles.content}>
					<h3>{name}</h3>
					<p>Weight: {weight}</p>
					<p>Height: {height}</p>
				</div>
			</div>
			<div className={styles.button_container}>
				<button className={styles.button} onClick={handleClick}>
					New Pokemon!
				</button>
			</div>
		</div>
	)
}

export default Card
