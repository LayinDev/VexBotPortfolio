/* eslint-disable indent */
const Command = require(`../Structures/Command.js`);
const colors = require(`../colors.json`);
const {
	MessageEmbed
} = require(`discord.js`);
const moment = require(`moment`);
const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'userinfo',
			description: "Used to show a user's information!",
			usage: '[user]',
			aliases: ['ui', 'useri', 'uinfo'],
			category: 'Information'
		});
	}

	async run(message, args) {
		// eslint-disable-next-line max-len
		// || message.guild.members.cache.find(member => member.user.tag === args[0]) || message.guild.members.cache.find(member => member.user.username === args[0])
		const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const roles = user.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);
		const userFlags = user.user.flags.toArray();
		const embed = new MessageEmbed()
			.setColor(colors.Primary)
			.setAuthor(`${user.user.username}'s Profile`, user.user.avatarURL())
			.setDescription(`**${user.user.username}'s Information**
            **❯ Username:** \`${user.user.tag}\`
            **❯ ID:** \`${user.id}\`
            **❯ Flags:** \`${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}\`
            **❯ Avatar:** [Link to avatar](${user.user.displayAvatarURL({ dynamic: true })})
            **❯ User Joined Discord:** \`${moment(user.user.createdTimestamp).format('LT')} ${moment(user.user.createdTimestamp).format('LL')} ${moment(user.user.createdTimestamp).fromNow()}\`
        
            **${user.user.username}'s Member Information**
            **❯ Highest Role:** \`${user.roles.highest.id === message.guild.id ? 'None' : user.roles.highest.name}\`
            **❯ Joined Server:** \`${moment(user.joinedAt).format('LL LTS')}\`
            **❯ Hoist Role:** \`${user.roles.hoist ? user.roles.hoist.name : 'None'}\`
            **❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}
        `)
			.setTimestamp()
			.setThumbnail(user.user.avatarURL())
			.setFooter(`Command ran by: ${user.user.tag}`);
		message.channel.send(embed);
	}

};
