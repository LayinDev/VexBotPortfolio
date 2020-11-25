/* eslint-disable prefer-destructuring */
const Command = require(`../Structures/Command`);
const {
	MessageEmbed
} = require(`discord.js`);
const ud = require(`urban-dictionary`);
const color = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'urban',
			aliases: ['urbandictionary', 'ud', 'udictionary'],
			description: 'Displays the urban dictionary definition of the word/phrase provided!',
			usage: '<word/phrase>',
			category: 'Utilities'
		});
	}

	async run(message, args) {
		const term = args.join(' ');
		let def, example, upvote, downvote, link;
		if (!term) {
			message.channel.send(`Please provide a word to look up!`);
			return;
		}
		let noDef = 0;

		await ud.term(term).then((result) => {
			const entry = result.entries;
			def = entry[0].definition;
			example = entry[0].example;
			upvote = entry[0].thumbs_up;
			downvote = entry[0].thumbs_down;
			link = entry[0].permalink;
		}).catch(error => {
			if (error) {
				noDef = 1;
			}
		});

		if (noDef === 1) {
			message.channel.send(`There is no available definitions for the term: \`${term}\`!`);
			return;
		} else {
			const embed = new MessageEmbed()
				.setColor(color.Primary)
				.setAuthor(`Urban Dictionary: ${term}`, `https://cdn2.iconfinder.com/data/icons/minimalism/512/dictionary.png`)
				.setDescription(`
		    **❯ Word:** \`${term}\`
		    **❯ Defenition:** \`${def}\`
		    **❯ Example:** \`${example}\`

		    [Read More](${link})
		    `)
				.setTimestamp()
				.setThumbnail(`https://cdn2.iconfinder.com/data/icons/minimalism/512/dictionary.png`)
				.setFooter(`👍: ${upvote} 👎: ${downvote}`);

			message.channel.send(embed);
		}
	}

};
