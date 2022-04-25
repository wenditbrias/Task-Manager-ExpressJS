const mongoose = require('mongoose');

let uri = `mongodb://127.0.0.1:27017/${process.env.DB_NAME}`;

async function connect() {
	try {
		await mongoose.connect(uri, {
			useNewUrlParser:true, 
			useUnifiedTopology:true
		});
		console.log('success connect');
	} catch(err) {
		console.log(err);
	}
}

module.exports = connect;