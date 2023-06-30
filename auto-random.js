const { MessageEmbed } = require("discord.js");
const random = require("random-number-csprng");
const { laysodep } = require("../../util/util");
module.exports = {
  name: "play-random",
  category: "💲Tiền Tệ",
  cooldown: 30,
  aliases: ["prd", "rnd"],
  usage: "<PREFIX>rnd <bet>",
  description: `Chơi random:
  Bạn và computer sẽ đều được hệ thống random ra 1 số trong tầm 1 - 9999.
  Nếu số của bạn cao hơn số của computer thì bạn sẽ thắng và lụm tiền
  Còn nếu số của bạn nhỏ hơn số của computer thì bạn thua và bay tiền`,
  run: async (client, message, args) => {
    let bet
    let bal = await client.db.fetch(client, message.author.id);
    let money = bal.money
    if (!args[0]) return client.func.error(`${client.emoji.x} Số tiền không hợp lệ`, message.channel)
    if (args[0] == Math.floor(args[0])) {
      bet = parseInt(args[0])
    } else if (args[0].toLowerCase() == "all") {
      bet = money
      if (bet > 10000000000) bet = 10000000000
    } else return client.func.error(`${client.emoji.x} Số tiền không hợp lệ`, message.channel)
    if (bet > 10000000000) {
      return client.func.error(`${client.emoji.x} Tối đa đặt được 10,000,000,000 ${client.emoji.money}`, message.channel)
    }
    if (bet < 0) {
      return client.func.error(
        `${client.emoji.x} Số tiền không hợp lệ`,
        message.channel
      )
    }
    if (money < bet || money == 0) return client.func.error(`${client.emoji.x} Bạn không đủ tiền để chơi game`, message.channel)

    let player_random = await random(1, 9999);
    let computer_random = await random(1, 9999);


    if (player_random > computer_random) {
        await client.db.addmoney(client, message.author.id, bet);
        message.reply(`
            Bạn random ra số ${player_random} và máy random ra số ${computer_random}
            Và bạn đã thắng do số của bạn cao hơn máy
        `)
    }
    
    
    else if (player_random < computer_random) {
        await client.db.submoney(client, message.author.id, bet);
        message.reply(`
        Bạn random ra số ${player_random} và máy random ra số ${computer_random}
        Và bạn đã thua do số của bạn thấp hơn máy
        `)
    }

    else if (player_random === computer_random) {
        message.reply(`
        Bạn random ra số ${player_random} và máy random ra số ${computer_random}
        Và bạn đã hoà
        `)
    }



  },
}; 
