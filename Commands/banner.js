const Commands = require(`../Structures/Command.js`);
const figlet = require(`util`).promisify(require('figlet'));

module.exports = class extends Commands {

	constructor(...args) {
		super(...args, {
			name: 'banner',
			description: 'Makes the bot display a banner style of your specified word.',
			usage: `<message>`,
			category: 'Utilities'
		});
	}
	async run(message, args) {
		return message.channel.send(await figlet(args), { code: true });
	}

};
