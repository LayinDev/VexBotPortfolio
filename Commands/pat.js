const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'pat',
			aliases: ['pats'],
			description: 'Pats the user mentioned',
			category: 'Interaction'
		});
	}

	async run(message, args) {
		if (!args[0]) {
			message.channel.send(`Please provide a members name, id, or mention a member!`);
			return;
		}

		// eslint-disable-next-line id-length
		const user = message.guild.members.cache.find(u => u.name === args[0] || u.id === args[0]) || message.mentions.members.first();

		if (!user) {
			message.channel.send(`That is an invalid user!`);
			return;
		}

		const { link } = await fetch(`https://some-random-api.ml/animu/pat`)
			.then(res => res.json());

		const embed = new MessageEmbed()
			.setAuthor(`${message.author.username} patted ${user.user.username}`)
			.setColor(colors.Primary)
			.setImage(link);

		message.channel.send(embed);
	}

};

