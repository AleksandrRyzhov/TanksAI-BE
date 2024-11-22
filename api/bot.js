const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Добро пожаловать! Выберите один из ресурсов:",
    Markup.inlineKeyboard([
      Markup.button.url(
        "Develop",
        "https://tanks-1678c--develop-2gpq37ce.web.app"
      ),
      Markup.button.url("Prod", "https://tanks-1678c.web.app/"),
    ])
  );
});

bot.command("menu", (ctx) => {
  ctx.reply(
    "Выберите один из ресурсов:",
    Markup.inlineKeyboard([
      Markup.button.url(
        "Develop",
        "https://tanks-1678c--develop-2gpq37ce.web.app"
      ),
      Markup.button.url("Prod", "https://tanks-1678c.web.app/"),
    ])
  );
});

if (process.env.NODE_ENV !== "production") {
  bot.launch().then(() => console.log("Бот запущен локально!"));
}

// Экспорт для Vercel
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
    } catch (err) {
      console.error("Ошибка обработки обновления:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(200).send("Бот работает!");
  }
};
