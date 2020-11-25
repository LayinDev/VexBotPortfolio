const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const colors = require(`../colors.json`);
const fetch = require(`node-fetch`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'dog',
			aliases: ['woof'],
			description: 'Displays a random dog image.',
			category: 'Image'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const { link } = await fetch(`https://some-random-api.ml/img/dog`)
			.then(res => res.json());
		const embed = new MessageEmbed()
			.setAuthor(`Random Dog Image`)
			.setColor(colors.Primary)
			.setImage(link);

		message.channel.send(embed);
	}

};

