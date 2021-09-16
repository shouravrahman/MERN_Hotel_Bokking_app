import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'

const Home = () => {
	const [rooms, setRooms] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const getallrooms = async () => {
		try {
			setLoading(true)
			// const data = await axios.get('/api/rooms/getallrooms')
			const data = (await axios.get('/api/rooms/getallrooms')).data
			console.log(data)
			setRooms(data)
			setLoading(false)
		} catch (error) {
			setError(true)
			console.log(error)
			setLoading(false)
		}
	}
	useEffect(() => {
		getallrooms()
	}, [])

	return (
		<div className='container text-start'>
			<div className='row justify-content-center mt-5'>
				{loading ? (
					<h1>Loading...</h1>
				) : error ? (
					<h1>Error</h1>
				) : (
					rooms.map((room) => {
						return (
							<div className='col-md-9 my-3'>
								<Room room={room} />
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

export default Home
