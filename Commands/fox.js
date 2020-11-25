const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'fox',
			description: 'Displays a random fox image.',
			category: 'Image'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const { link } = await fetch(`https://some-random-api.ml/img/fox`)
			.then(res => res.json());
		const embed = new MessageEmbed()
			.setAuthor(`Random Fox Image`)
			.setColor(colors.Primary)
			.setImage(link);

		message.channel.send(embed);
	}

};

