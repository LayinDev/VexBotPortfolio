const Command = require(`../Structures/Command`);
const {
	MessageEmbed
} = require(`discord.js`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'poll',
			aliases: ['polls'],
			description: 'Used to create a poll on the server!',
			category: 'Utilities',
			usage: '<question>'
		});
	}

	async run(message, args) {
		const question = args.join(' ');
		if (question >= 2000) {
			return message.channel.send(`This message is too long!`);
		}
		if (!args[0]) {
			return message.channel.send(`Please provide a question for the poll!`);
		}
		if (!question.endsWith('?')) {
			return message.channel.send(`That doesn't seem to be a question. Please try again.`);
		}

		const embed = new MessageEmbed()
			.setAuthor(`${message.member.user.username}'s Poll`, message.member.user.avatarURL())
			.setDescription(question)
			.setColor(colors.Primary)
			.setTimestamp()
			.setFooter(`Command ran by: ${message.member.user.tag}`);

		return message.channel.send(embed).then(async msg => {
			await msg.react(`👍`);
			await msg.react(`👎`);
		});
	}

};
