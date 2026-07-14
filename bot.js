require("dotenv").config();

const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once("ready", async () => {
    console.log(`✅ Logged in as ${client.user.tag}`);

    try {
        const channel = await client.channels.fetch(process.env.CHANNEL_ID);

        await channel.send("🛍️ **Dropshipping Bot is Online!**");

        console.log("✅ Test message sent.");
    } catch (err) {
        console.error("❌ Couldn't send message:", err);
    }
});

client.login(process.env.TOKEN);

module.exports = client;