const mongoose = require('mongoose')
const { Schema } = mongoose

const roomSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		maxcount: {
			type: Number,
			required: true,
		},
		phonenumber: {
			type: Number,
			required: true,
		},
		rentperday: {
			type: Number,
			required: true,
		},
		imageurls: [],
		currentbookings: [],
		type: {
			type: String,
			required: true,
		},

		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
)
module.exports = mongoose.model('Room', roomSchema)
