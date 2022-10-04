
const config = {
	mongo: {
		uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/real-state'
	}
};

exports.config = config;
