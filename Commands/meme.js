const Command = require('../Structures/Command');
const { MessageEmbed } = require('discord.js');
const fetch = require(`node-fetch`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'meme',
			description: 'Displays a random meme image.',
			category: 'Image'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const { image, caption } = await fetch(`https://some-random-api.ml/meme`)
			.then(res => res.json());
		const embed = new MessageEmbed()
			.setAuthor(caption)
			.setColor(colors.Primary)
			.setImage(image);

		message.channel.send(embed);
	}

};

