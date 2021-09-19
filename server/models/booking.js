const mongoose = require('mongoose')
const { Schema } = mongoose

const bookingSchema = new Schema(
	{
		room: {
			type: String,
			required: true,
		},
		roomid: {
			type: String,
			required: true,
		},
		userid: {
			type: String,
			required: true,
		},
		fromdate: {
			type: String,
			required: true,
		},
		todate: {
			type: String,
			required: true,
		},
		totalamount: {
			type: Number,
			required: true,
		},
		totaldays: {
			type: Number,
			required: true,
		},
		totaldays: {
			type: Number,
			required: true,
		},
		transactionid: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'booked ',
		},
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Booking', bookingSchema)
