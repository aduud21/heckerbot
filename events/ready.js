const start_up_message = false; // Possible values: true, false. if the bot is getting popular (a lot of shards) it is recommended to set this to false
const { ActivityType } = require('discord.js');
console.log(
    '⏳ -> [LOGIN] Trying to login with the provided token. If this takes longer than 5 minutes, it might be because you provided an invalid token.'
);
module.exports = async (client) => {
    const activityText = `servers | Cluster${client.cluster.id}`;
    console.log('Fetching user tag');
    if (client.user) {
        console.log(`☑️ -> [LOGIN] Logged into token as user ${client.user.tag}`);
        client.user.setActivity(activityText, { type: ActivityType.Watching });
        try {
            if (start_up_message) {
                const channel = client.channels.cache.get('957439649142407248');
                channel.send(`🤖 Client restarted, Cluster${client.cluster.id} 🤖`);
            }
        } catch (error) {
            console.log(
                'Could not send restart message in selected channel, ready.js in events folder'
            );
            return;
        }
    } else {
        console.log('Client user object is null. Failed to login with the provided token.');
    }
};
