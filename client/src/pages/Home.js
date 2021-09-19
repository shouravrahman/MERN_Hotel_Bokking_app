import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Room from '../components/Room'
import Loader from '../components/Loader'
import Error from '../components/Error'
import 'antd/dist/antd.css'
import { DatePicker, Space } from 'antd'
import moment from 'moment'

const Home = () => {
	const [rooms, setRooms] = useState([])
	const [duplicaterooms, setDuplicateRooms] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [fromdate, setFromdate] = useState()
	const [todate, setTodate] = useState()

	const { RangePicker } = DatePicker
	const getallrooms = async () => {
		try {
			setLoading(true)
			// const data = await axios.get('/api/rooms/getallrooms')
			const data = (await axios.get('/api/rooms/getallrooms')).data
			console.log(data)
			setRooms(data)
			setDuplicateRooms(data)
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

	const filterByDate = (dates) => {
		console.log(dates)
		setFromdate(moment(dates[0]).format('DD-MM-YYYY'))
		setTodate(moment(dates[1]).format('DD-MM-YYYY'))

		let temprooms = []
		let availability = false

		for (let room of duplicaterooms) {
			if (room.currentbookings.length > 0) {
				for (let booking of room.currentbookings) {
					if (
						!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(
							booking.fromdate,
							booking.todate
						) &&
						!moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(
							booking.fromdate,
							booking.todate
						)
					) {
						if (
							moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
							moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
							moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
							moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
						) {
							availability = true
						}
					}
				}
			}
			if (availability === true || room.currentbookings.length === 0) {
				temprooms.push(room)
			}
			setRooms(temprooms)
		}
	}

	return (
		<div className='container text-right'>
			<div className='row mt-5'>
				<div className='col-md-3'>
					<RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
				</div>
			</div>

			<div className='row justify-content-center mt-5 '>
				{loading ? (
					<Loader />
				) : rooms.length > 1 ? (
					rooms.map((room) => {
						return (
							<div className='col-md-9 my-3'>
								<Room room={room} fromdate={fromdate} todate={todate} />
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
