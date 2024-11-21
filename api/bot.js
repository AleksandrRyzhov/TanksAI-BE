const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать! Выберите один из ресурсов:",
    Markup.inlineKeyboard([
      Markup.button.url("Google", "https://www.google.com"),
      Markup.button.url("Onliner", "https://www.onliner.by"),
    ])
  );
});

bot.command("menu", (ctx) => {
  ctx.reply(
    "Выберите один из ресурсов:",
    Markup.inlineKeyboard([
      Markup.button.url("Google", "https://www.google.com"),
      Markup.button.url("Onliner", "https://www.onliner.by"),
    ])
  );
});

// Экспорт для Vercel
module.exports = async (req, res) => {
  if (req.method === "POST") {
    await bot.handleUpdate(req.body, res);
  } else {
    res.status(200).send("Бот работает!");
  }
};
