const lightClient = require(`./Structures/lightClient`);
const config = require(`./config.json`);

// eslint-disable-next-line new-cap
const client = new lightClient(config);
client.start();
