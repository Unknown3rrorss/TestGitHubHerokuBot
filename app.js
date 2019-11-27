const Discord = require('discord.js')
const bot = new Discord.Client();

const prefix = '>';
const token = process.env.token;

bot.login(token);

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

    if (msg.startsWith(prefix + 'HOST')) {
        message.channel.send('GitHub')
    }
    
    if (msg.startsWith(prefix + 'RANDOM')) {
        var r;
        r = Math.floor(Math.random() * 9999) + 1;
        message.channel.send(r)
    }
    
    if (msg.startsWith(prefix + 'FLIPACOIN')) {
        var r;
        let coin;
        r = Math.floor(Math.random() * 100) + 1;
        if (r >= 50){
            coin = "Heads"
        }
        else{
            coin = "Tails"
        }
        message.channel.send(coin)
    }
    
    if (msg.startswith(prefix + 'PURGE')) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            async function purge() {
                message.delete();

                if (isNaN(args[0])) {
                    message.channel.send(`Please say a number after purge \n Usage: ${prefix}purge <amount>`);
                    return;
                }

                const fetched = await message.channel.fetchMessages({limit: args[0]});
                console.log(fetched.size + ' messages found, deleting...');

                message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`));

            }
            purge();
        }
        else {
            message.channel.send(`Sorry ${message.member} but you do not have the correct permissions to use this command`);
        }
    }

});

bot.on('ready', () => {
    console.log(bot.user.tag + ' is online')
    bot.user.setActivity(`Netlix | ${prefix}ping`, {type:'WATCHING'})
})
