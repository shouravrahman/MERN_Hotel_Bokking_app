import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Error from '../components/Error'

const Booking = ({ match }) => {
	const [room, setRoom] = useState()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState()

	const getaroom = async () => {
		try {
			// setLoading(true)
			// const data = await axios.get('/api/rooms/getallrooms')
			const data = (
				await axios.post('/api/rooms/getroombyid', { roomid: match.params.roomid })
			).data
			// console.log(data)
			setRoom(data)
			setLoading(false)
		} catch (error) {
			setError(true)
			// console.log(error)
			setLoading(false)
		}
	}
	useEffect(() => {
		getaroom()
	}, [room])

	return (
		<div>
			{loading ? (
				<Loader />
			) : room ? (
				<div className='m-5 '>
					<div className='row justify-content-center m-5 bs '>
						<div className='col-md-6'>
							<h1>{room.name}</h1>
							<img src={room.imageurls[0]} className='bigimg' alt={room.name} />
						</div>

						<div className='col-md-6 text-right'>
							<div>
								<h1>Booking Details</h1>
								<hr />
								<p>
									<b>Name :</b> {room.name}
								</p>
								<p>
									<b>From Date :</b>
								</p>
								<p>
									<b>To Date :</b>
								</p>
								<p>
									<b>Max Count :</b> {room.maxcount}
								</p>
							</div>

							<div>
								<h1>Amount Details</h1>
								<hr />
								<p>
									<b>Total Days :</b>
								</p>
								<p>
									<b>Rent Per Day : {room.rentperday}</b>
								</p>
								<p>
									<b>Total Amount :</b>
								</p>
							</div>

							<div>
								<button className='btn btn-primary'>Pay Now</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Error />
			)}
		</div>
	)
}

export default Booking
