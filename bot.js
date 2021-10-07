require('dotenv').config()
const { Telegraf, Markup } = require('telegraf')
const api = require('covid19-api');
const COUNTRIES_LIST = require('./constatns.js')

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => ctx.reply(`
Hello ${ctx.message.from.first_name}!
Узнай статистику по короновирусу!
Введи на английском название страны и получи статистику 
Посмотеть весь список стран /help.`,
    Markup.keyboard([
        ['US', 'Russia'],
        ['Ukraine', 'Kazakhstan'],
    ]).resize()



));

bot.help((ctx) => ctx.reply(COUNTRIES_LIST));

bot.on('text', async(ctx) => {
    let data = {}

    try {
        data = await api.getReportsByCountries(ctx.message.text);

        let formatData = `
Страна:  ${data[0][0].country}
Случаи: ${data[0][0].cases}
Смерти: ${data[0][0].deaths}
Вылечились: ${data[0][0].recovered}
    `;
        ctx.reply(formatData);
    } catch {
        console.log("Erorr");
        ctx.reply("Такой страны не существует!!!")
    }
});

bot.launch()
console.log('Бот запущен')