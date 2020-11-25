const Command = require(`../Structures/Command`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'purge',
			aliases: ['clear', 'msgclear'],
			description: 'Used to clear messages that are younger than 7 days!',
			usage: '[number of messages to clear]',
			category: 'Moderation'
		});
	}

	async run(message, args) {
		let number;
		if (!args[0]) {
			number = 50;
		} else {
			number = parseInt(args[0]);
		}
		if (isNaN(number)) {
			message.channel.send(`That is not a number! Please provide a valid number`);
			return;
		}
		if (!message.member.hasPermission('MANAGE_MESSAGES')) {
			message.channel.send(`You do not have permission to run this command!`);
			return;
		}
		message.channel.bulkDelete(number + 1).catch(err => {
			console.log(err);
			message.channel.send(`Something went wrong executing this command!`);
		});
		message.channel.send(`Successfully cleared ${number} messages!`).then(msg => msg.delete({ timeout: 2500 }));
	}

};
