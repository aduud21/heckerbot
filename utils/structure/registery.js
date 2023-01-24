const { MessageEmbed, Message } = require("discord.js")

module.exports = (client) => {

    // Changing stuff system lol owo uwu

    client.alreadyEnabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Enabled already`)

    client.alreadyDisabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Disabled already`)

     client.guarded = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} You cannot change that command`);

    // nani

    client.aintCommandSherlock = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`❔ Unknown command`)
    // show ur self

    client.noMember = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`❔ Unknown Member`)

    // very incorrect

    client.noUser = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`❔ Unknown user`)

    // checks role lol
    client.roleHigher = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} User is higher role than me`)
    //  no no no bot 

    client.incorrectOP = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} There are only \`ban, kick\` bot punishments `)

    client.incorrectUserPunish = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} There are only \`ban, kick, remove_roles\` user punishments`)

    // mod settings lol

    client.noUserDB = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} User not found in database`)

    client.userstaff = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Cannot use commands on mod/admin or users higher rank than that`)

    client.userNoWarns = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} _No warnings found for this user_`)


    client.cantDelOwnWarn = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} _You may not delete your own warning_`)


    client.amountNum = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Amount must be a number`)

    // is that guy can have guild cmds lol

    client.guildOnlyCmd = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Guild only command`)
    // idk what dat channel is

    client.noChannel = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`❔ Unknown Channel `)
    // oups, pass your turn

    client.disabled = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail} Error, That command is disabled`)
     
    client.noperms = new MessageEmbed()
    .setColor(client.color)
    .setDescription(`${client.fail}Member missing required permissions`)

}
