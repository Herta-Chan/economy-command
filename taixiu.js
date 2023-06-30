const { MessageEmbed } = require("discord.js");
const random = require("random-number-csprng");
const { laysodep } = require("../../util/util");
const taixiu = [
  "<:dice1:1103673488507682898>",
  "<:dice2:1103673482769858670>",
  "<:dice3:1103673484678283294>",
  "<:dice4:1103673481201193032>",
  "<:dice5:1103673485521342484>",
  "<:dice6:1103673494602006558>",
]
function wait(ms) {
  let start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

module.exports = {
  name: "play-taixiu",
  category: "💲Tiền Tệ",
  cooldown: 30,
  aliases: ["ptx", "txiu"],
  usage: "<PREFIX>tx <bet>",
  description: "Chơi game tài xỉu",
  run: async (client, message, args) => {
    const cowoncy = "<:diamond_coin:1123162296869474315>";
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
    var choice = 'Tài';
    if (args[1] != undefined)
      args[1] = args[1].toLowerCase();
    if (args[1] == 'tài' || args[1] == 't' || args[1] == 'tai' || args[1] == 'Tài' || args[1] == 'Tai' )
      choice = 'Tài';
    else if (args[1] == 'xỉu' || args[1] == 'x' || args[1] == 'xiu' || args[1] == 'Xỉu' || args[1] == 'Xiu' )
      choice = 'Xỉu';

    const emo = '<a:dice:1103673496325861496>'
    let r1 = await random(0, taixiu.length - 1)
    let r2 = await random(0, taixiu.length - 1)
    let r3 = await random(0, taixiu.length - 1)
    const i1 = taixiu[r1]
    const i2 = taixiu[r2]
    const i3 = taixiu[r3]
    const diem = (r1 + 1) + (r2 + 1) + (r3 + 1)
    const msg = await message.channel.send(` ${emo}  ${emo}  ${emo}`)
    await wait(1000)
    await msg.edit(` ${i1}  ${emo}  ${emo}`)
    await wait(1000)
    await msg.edit(` ${i1}  ${i2}  ${emo}`)
    await wait(1000)
    await msg.edit(` ${i1}  ${i2}  ${i3}`)
    let taixiuu
    if (diem >= 1 && diem <= 10) {
      taixiuu = "Xỉu"
    } else if (diem > 10 && diem <= 18) {
      taixiuu = "Tài"
    }
    const message2 = await message.channel.send(`Bạn đã lắc được: **${diem} điểm • ${taixiuu}**`)

    if (taixiuu == choice) {
      message.channel.send(`
      Bạn chọn ${choice}. Hệ thống roll ra ${taixiuu}
      Bạn thắng`)
      await client.db.addmoney(client, message.author.id, bet)
    }
    else if (taixiuu != choice) {
      message.channel.send(`
      Bạn chọn ${choice}. Hệ thống roll ra ${taixiuu}
      Bạn thua`)
      await client.db.submoney(client, message.author.id, bet)
    }

  },
};
