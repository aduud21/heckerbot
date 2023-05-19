const start_up_message = true; // Possible values: true, false
const fetch_all_guilds = false; // Possible values: true, false
const guilds_leave = false; // Possible values: true, false
const { ActivityType } = require('discord.js');
console.log(
    '⏳ -> [LOGIN] Trying to login with provided token, if this takes longer than 5 minutes it might be cause you provided a invaild token'
);
const fs = require('fs');
if (!fs.existsSync('./LICENSE')) {
    return;
}
module.exports = async (client) => {
    const shardId = client.shard.ids.length > 0 ? client.shard.ids[0] : 0;
    const activityText = `servers | Shard${shardId}`;
    console.log(`☑️ -> [LOGIN] Logged into token as user ${client.user.tag}`);
    if (fetch_all_guilds) {
        client.guilds.cache.forEach(async (guild) => {
            console.log(guild.name, guild.id);
        });
    }
    if (guilds_leave) {
        const guildLeave = client.guilds.cache.get('374071874222686211');
        guildLeave.leave();
        console.log(`Left ${guildLeave.id}/${guildLeave.name}`);
    }
    client.user.setActivity(activityText, { type: ActivityType.Listening });
    try {
        if (start_up_message) {
            const channel = client.channels.cache.get('957439649142407248');
            channel.send(`🤖 Bot restarted 🤖`);
        }
    } catch (error) {
        console.log(
            'Could not send restart message in selected channel, ready.js in events folder'
        );
        return;
    }
};
