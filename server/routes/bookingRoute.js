const express = require('express')
const router = express.Router()
const moment = require('moment')
const Booking = require('../models/booking')
const Room = require('../models/room')
const { v4: uuidv4 } = require('uuid')
const stripe = require('stripe')(
	'sk_test_51JbT72HOzRa38MaPTqjEf0QBlNOjiPVXpPYHczuBlyaXHGLfJgwsSxvk2I13iHvEq8ccXC4wrEfm6VUWcmwUMFcA004CdVr3Ll'
)
// router.get('/', async (req, res) => {
// 	try {
// 	} catch (error) {
// 		return res.status(400).json({ message: error })
// 	}
// })
router.post('/bookroom', async (req, res) => {
	const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body

	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		})
		const payment = await stripe.charges.create(
			{
				amount: totalamount,
				customer: customer.id,
				currency: 'usd',
				receipt_email: token.email,
			},
			{
				idempotencyKey: uuidv4(),
			}
		)
		if (payment) {
			const newbooking = new Booking({
				room: room.name,
				roomid: room._id,
				userid,
				fromdate: moment(fromdate).format('DD-MM-YYYY'),
				todate: moment(todate).format('DD-MM-YYYY'),
				totalamount,
				totaldays,
				transactionid: '1234', //TODO:remove hardcoded value
			})
			const booking = await newbooking.save()

			const roomtemp = await Room.findOne({ _id: room._id })
			roomtemp.currentbookings.push({
				bookingid: booking._id,
				fromdate: moment(fromdate).format('DD-MM-YYYY'),
				todate: moment(todate).format('DD-MM-YYYY'),
				userid: userid,
				status: booking.status,
			})
			await roomtemp.save()
			res.send('Room booked successfully')
		}
		res.send('Payment successfull, Your room is booked')
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.post('/getbookingsbyuserid', async (req, res) => {
	const { userid } = req.body

	try {
		const bookings = await Booking.find({ userid: userid })
		res.send(bookings)
	} catch (error) {
		return res.status(400).json({ error })
	}
})

router.post('/cancelbooking', async (req, res) => {
	const { bookingid, roomid } = req.body

	try {
		const booking = await Booking.findOne({ _id: bookingid })
		booking.status = 'cancelled'
		await booking.save()

		const room = await Room.findOne({ _id: roomid })
		const bookings = room.currentbookings
		const temp = bookings.filter(
			(booking) => booking.bookingid.toString() !== bookingid
		)
		room.currentbookings = temp
		await room.save()

		res.send('Your booking cancelled successfully')
	} catch (error) {
		return res.status(400).json({ error })
	}
})

module.exports = router
