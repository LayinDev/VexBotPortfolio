const Event = require(`../../Structures/Event`);
const {
	MessageEmbed
} = require(`discord.js`);
const colors = require(`../../colors.json`);

module.exports = class extends Event {

	async run(member) {
		const channel = member.guild.channels.cache.find(ch => ch.id === '773935758502395934');
		if (!channel) return;

		const embed = new MessageEmbed()
			.setColor(colors.Primary)
			.setAuthor(`New User!`, member.user.avatarURL())
			.setDescription(`**Welcome ${member} to \`${member.guild.name}\`!**`)
			.setTimestamp()
			.setThumbnail(member.user.avatarURL());

		channel.send(embed);
	}

};
