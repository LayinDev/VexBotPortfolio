const Command = require(`../Structures/Command`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'nick',
			aliases: ['nickname', 'rename'],
			description: 'Use to change your own or another members nickname.',
			usage: '[user] <nickname>',
			category: 'Utilities'
		});
	}

	async run(message, args) {
		let user = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]) || message.member;
		let nickname;
		if (!args[0] || user.id === message.member.id) {
			nickname = args.join(' ');
			user = message.member;
		} else {
			nickname = args.slice(1).join(' ');
		}
		if (!message.member.hasPermission('CHANGE_NICKNAME' || 'MANAGE_NICKNAMES')) {
			message.channel.send(`You do not have permission to run this command!`);
			return;
		}
		if (nickname.length > 32) {
			message.channel.send(`That nickname is too long! Try a nicname that is less than 32 characters long.`);
			return;
		}
		if (nickname.length <= 0 || nickname.isEmpty || nickname === '') {
			message.channel.send(`Please provide a nickname that I will rename the user to!`);
			return;
		}
		if (nickname === 'off'.toLowerCase() || nickname === 'clear'.toLowerCase()) {
			user.setNickname(user.user.username).catch(err => {
				if (err) {
					message.channel.send(`It seems like I cannot change that users nickname!`);
					return;
				}
				message.channel.send(`Successfully cleared <@${user.id}>'s Nickname!`);
			});
			return;
		}
		user.setNickname(nickname).catch(err => {
			if (err) {
				message.channel.send(`It seems like I cannot change that users nickname!`);
				return;
			}
			message.channel.send(`Successfully changed <@${user.id}>'s Nickname!`);
		});
	}

};
