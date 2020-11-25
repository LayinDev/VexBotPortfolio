const Command = require(`../Structures/Command.js`);
const { MessageEmbed } = require(`discord.js`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: '8ball',
			description: 'Magic 8ball displays an answer to your question.',
			usage: `<question>`,
			category: 'Fun'
		});
	}
	async run(message, args) {
		const response = [
			'Yes',
			'No',
			'Maybe',
			'Definitely Not',
			'Most Definitely',
			'Outlook Not So Good',
			'Outlook Very Good',
			'Probably',
			'Try Again',
			'No U <3',
			"I'm not sure"
		];

		const question = args.join(` `).endsWith(`?`);

		const responseEmbed = new MessageEmbed()
			.setAuthor(response[Math.floor(Math.random() * response.length)], `https://thumbs.gfycat.com/KeenVerifiableCavy-size_restricted.gif`)
			.setColor(colors.Primary);

		if (!args[0]) {
			message.channel.send(`Please provide a question for the 8ball to answer!`);
			return;
		}

		if (!question) {
			message.channel.send(`That doesn't seem to be a question. Please try again.`);
			return;
		}

		message.channel.send(responseEmbed);
	}

};
