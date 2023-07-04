module.exports = async (client, guild) => {
    try {
        const owner = await guild.fetchOwner();
        await owner.send(`
Thanks for adding ${client.user.username}!
_${client.user.username} has been added to ${guild.name} (Server ID: ${guild.id})_
Slash commands should work!
**❓Need support?**
Join my support server: ${require('../config/bot.json').support}

||The bot is currently on discord.js V14||`);
    } catch (error) {
        console.log(`Failed to send message to server owner: ${error.message}`);
    }
};
