const Command = require(`../Structures/Command`);
const colors = require(`../colors.json`);
const { MessageEmbed } = require(`discord.js`);
const moment = require(`moment`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'guildinfo',
			aliases: ['ginfo', 'serverinfo', 'sinfo'],
			description: "Displays the guild's information!",
			category: 'Information'
		});
	}

	// eslint-disable-next-line no-unused-vars
	async run(message, args) {
		const user = message.member;
		let inviteLink;

		await message.guild.fetchInvites().then(async inv => {
			const invite = inv.find(invites => invites.maxAge === 0 && invites.maxUses === 0 && !invites.temporary);
			if (!invite) {
				inviteLink = null;
			} else {
				inviteLink = invite.url;
			}
		});

		if (inviteLink === null || inviteLink === '') {
			await message.channel.createInvite({
				maxAge: 0,
				maxUses: 0
			});
			await message.guild.fetchInvites().then(async inv => {
				const invite = inv.find(invites => invites.maxAge === 0 && invites.maxUses === 0 && !invites.temporary);
				if (!invite) {
					inviteLink = null;
				} else {
					inviteLink = invite.url;
				}
			});
		}

		const embed = new MessageEmbed()
			.setAuthor(`${message.guild.name}'s Information`, message.guild.iconURL())
			.setDescription(`
        **❯ Server Name:** ${message.guild.name}
        **❯ Server Description:** ${message.guild.description || 'No Description Provided.'}
        **❯ Server ID:** ${message.guild.id}
        **❯ Owner:** ${message.guild.owner}
        **❯ Region:** ${message.guild.region}
        **❯ Boost Level:** ${message.guild.premiumTier}
        **❯ Custom Emojis:** ${message.guild.emojis.cache.size}
        **❯ Member Count:** ${message.guild.members.cache.filter(member => !member.user.bot).size}
		**❯ Server Creation Date:** ${moment(message.guild.createdAt).format('LL LTS')}
		
		[Server Invite](${inviteLink})
        `)
			.setColor(colors.Primary)
			.setFooter(`Command Ran By: ${user.user.username}`)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL());

		message.channel.send(embed);
	}

};
