const Event = require('../Structures/Event');

module.exports = class extends Event {

	constructor(...args) {
		super(...args, {
			once: true
		});
	}
	run() {
		setInterval(() => {
			let usercount = 0;
			const guilds = this.client.guilds.cache;
			// eslint-disable-next-line id-length
			usercount = guilds.reduce((a, g) => a + g.memberCount, 0);
			this.client.user.setPresence({ activity: { name: `Watching over ${usercount} users!` }, status: 'online' });
		}, 5000);
		console.log(`Logged in as ${this.client.user.username}`);
	}

};
