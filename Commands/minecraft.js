const Command = require(`../Structures/Command`);
const {
	MessageEmbed
} = require(`discord.js`);
const colors = require(`../colors.json`);
const fetch = require(`node-fetch`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'minecraft',
			aliases: ['mc'],
			description: 'Shows information on a premium minecraft account.',
			usage: '<username>',
			category: 'Fun'
		});
	}

	async run(message, args) {
		const username = args[0];
		if (!args[0]) {
			message.channel.send(`Please provide a username for me to search for.`);
			return;
		}
		const {
			data,
			success
		} = await fetch(`https://playerdb.co/api/player/minecraft/${username}`)
			.then(res => res.json());

		if (success === false) {
			message.channel.send(`We were not able to find any information regarding \`${username}\`!`);
			return;
		}

		const embed = new MessageEmbed()
			.setAuthor(`${username}'s Profile`, `${data.player.avatar}`)
			.setThumbnail(`https://crafatar.com/renders/body/${data.player.raw_id}?size=512`)
			.setColor(colors.Primary)
			.setTimestamp()
			.setDescription(`
			**❯ Username:** \`${data.player.username}\`
			**❯ UUID:** ${data.player.id}
			**❯ Name Changes:** ${data.player.meta.name_history.length}

			[Skin](https://crafatar.com/skins/${data.player.raw_id})
			[Avatar](https://crafatar.com/renders/body/${data.player.raw_id}?size=512)
			`)
			.setFooter(`Command Ran By: ${message.member.user.username}`);

		message.channel.send(embed);
	}

};
