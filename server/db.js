const mongoose = require('mongoose')

mongoose
	.connect(process.env.DATABASE_URL, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('database connected'))
	.catch((error) => console.log(error.message))
// mongoose.connection.on('connected', () => {
// 	console.log('connected')
// })
module.exports = mongoose
