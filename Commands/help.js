const { MessageEmbed } = require('discord.js');
const Command = require('../Structures/Command');
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'help',
			aliases: ['halp'],
			description: 'Displays all the commands in the bot',
			category: 'Utilities',
			usage: '[command]'
		});
	}

	async run(message, [command]) {
		const embed = new MessageEmbed()
			.setColor(colors.Primary)
			.setAuthor(`${this.client.user.username}'s Help Menu`, this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();

		if (command) {
			const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

			if (!cmd) return message.channel.send(`Invalid Command named. \`${command}\``);

			embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Command Help`, this.client.user.displayAvatarURL());
			embed.setDescription([
				`**• Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(' ') : 'No Aliases'}`,
				`**• Description:** ${cmd.description}`,
				`**• Category:** ${cmd.category}`,
				`**• Usage:** ${cmd.usage}`
			]);

			return message.channel.send(embed);
		} else {
			embed.setDescription([
				`These are the available commands for ${this.client.user.username}`,
				`The bot's prefix is: \`${this.client.prefix}\``,
				`Command Parameters: \`<>\` is strict & \`[]\` is optional`,
				`[Invite Bot](https://discord.com/oauth2/authorize?client_id=746587199671107656&scope=bot&permissions=805314622)`,
				`[Support Server](https://discord.gg/HdY2tT76bf)`
			]);
			let categories;
			if (!this.client.owners.includes(message.author.id)) {
				categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
			} else {
				categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
			}

			for (const category of categories) {
				embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
					cmd.category === category).map(cmd => `\`${cmd.name}\``).join(' '));
			}
			return message.channel.send(embed);
		}
	}

};
