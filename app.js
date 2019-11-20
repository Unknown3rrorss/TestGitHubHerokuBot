const Discord = require('discord.js')
const bot = new Discord.Client();

const prefix = '>';

bot.login('NTI5MTIzNDY5MjgwMTQ5NTA1.XdTB4g.3rq5I4zGVFXyFgMBY0jvyEcgomw');

bot.on('message', async message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (!message.content.startsWith(prefix)) return;
    if (sender.id === bot.user.id) { return; }

    if (msg.startsWith(prefix + 'PING')) {
        message.channel.send(`Pinging`).then((m) => {
            m.edit(`Pong took ${m.createdTimestamp - message.createdTimestamp}ms`)
        })
    }

});

bot.on('ready', () => {
    console.log(bot.user.tag + ' is online')
    bot.user.setActivity(`Spoitfy | ${prefix}ping`, {type:'LISTENING'})
})