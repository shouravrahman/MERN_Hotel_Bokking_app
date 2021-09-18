import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'

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
		<div className='container text-right'>
			<div className='row justify-content-center mt-5 '>
				{loading ? (
					<Loader />
				) : rooms.length > 1 ? (
					rooms.map((room) => {
						return (
							<div className='col-md-9 my-3'>
								<Room room={room} />
							</div>
						)
					})
				) : (
					<Error />
				)}
			</div>
		</div>
	)
}

export default Home
