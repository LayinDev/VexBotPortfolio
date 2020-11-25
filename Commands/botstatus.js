/* eslint-disable no-unused-vars */
const Command = require(`../Structures/Command.js`);
const {
	MessageEmbed,
	version
} = require(`discord.js`);
const {
	devID
} = require(`../config.json`);
const os = require(`os`);
const moment = require(`moment`);
const mdf = require(`moment-duration-format`);
const ms = require(`ms`);
const colors = require(`../colors.json`);

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			name: 'status',
			aliases: ['bs', 'botstats', 'botstatus'],
			description: 'Displays Light.gg\'s current status.',
			category: 'Developer'
		});
	}

	async run(message, args) {
		const cpuName = os.cpus()[0].model;
		const totalMem = os.totalmem();
		const freeMem = os.freemem();
		const usedMem = totalMem - freeMem;
		const usageMem = `${((usedMem / totalMem) * 100).toFixed(2)}%`;
		const uptime = `\`${ms(this.client.uptime, { long: true })}\``;

		const embed1 = new MessageEmbed()
			.setAuthor(`${this.client.user.username}'s Current Status`, this.client.user.displayAvatarURL())
			.setColor(colors.Primary)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Light.gg Developer Module`)
			.addField(`CPU Model`, `\`\`\`${cpuName}\`\`\``)
			.addField(`CPU Architechture`, `\`${os.arch()}\``, true)
			.addField(`CPU Platform`, `\`${os.platform()}\``, true)
			.addField(`Memory Usage`, `${usageMem}`, true)
			.addField(`Memory Status`, `${(usedMem / 1024 / 1024 / 1024).toFixed(2)}gb / ${(totalMem / 1024 / 1024 / 1024).toFixed(2)}gb`, true)
			.addField(`Library Version`, `Discord.js: \`v${version}\``, true)
			.addField(`Node Version`, `\`${process.version}\``, true)
			.addField(`Bot Version`, `\`v0.0.1\``, true)
			.addField(`Developer`, `<@376308669576511500>`, true)
			.addField(`Uptime`, `${uptime}`, true)
			.addField(`API Latency`, `\`${this.client.ws.ping}ms\``, true)
			.setTimestamp();

		if (!this.client.owners.includes(message.author.id)) {
			message.channel.send(`You do not have access to this command.`);
			return;
		}
		const msg = await message.channel.send(embed1);
		const latency = msg.createdTimestamp - message.createdTimestamp;

		const embed2 = new MessageEmbed()
			.setAuthor(`${this.client.user.username}'s Current Status`, this.client.user.displayAvatarURL())
			.setColor(colors.Primary)
			.setThumbnail(this.client.user.displayAvatarURL())
			.setFooter(`Light.gg Developer Module`)
			.addField(`CPU Model`, `\`\`\`${cpuName}\`\`\``)
			.addField(`CPU Architechture`, `\`${os.arch()}\``, true)
			.addField(`CPU Platform`, `\`${os.platform()}\``, true)
			.addField(`Memory Usage`, `${usageMem}`, true)
			.addField(`Memory Status`, `${(usedMem / 1024 / 1024 / 1024).toFixed(2)}gb / ${(totalMem / 1024 / 1024 / 1024).toFixed(2)}gb`, true)
			.addField(`Library Version`, `Discord.js: \`v${version}\``, true)
			.addField(`Node Version`, `\`${process.version}\``, true)
			.addField(`Bot Version`, `\`v0.0.1\``, true)
			.addField(`Developer`, `<@376308669576511500>`, true)
			.addField(`Uptime`, `${uptime}`, true)
			.addField(`Bot Latency`, `\`${latency}ms\``, true)
			.addField(`API Latency`, `\`${this.client.ws.ping}ms\``, true)
			.setTimestamp();

		msg.edit(embed2);
	}

};
