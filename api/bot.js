const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply(
    "Welcome! Choose one of the options:",
    Markup.keyboard([
      [
        Markup.button.webApp(
          "Develop",
          "https://tanks-1678c--develop-2gpq37ce.web.app"
        ),
      ],
      [Markup.button.webApp("Prod", "https://tanks-1678c.web.app/")],
      ["Start"],
    ])
      .resize()
      .oneTime(false)
  );
});

bot.hears("Start", (ctx) => {
  ctx.reply(
    "Welcome again! Choose one of the options:",
    Markup.keyboard([
      [
        Markup.button.webApp(
          "Develop",
          "https://tanks-1678c--develop-2gpq37ce.web.app"
        ),
      ],
      [Markup.button.webApp("Prod", "https://tanks-1678c.web.app/")],
      ["Start"],
    ])
      .resize()
      .oneTime(false)
  );
});

bot.command("menu", (ctx) => {
  ctx.reply(
    "Choose one of the options:",
    Markup.keyboard([
      [
        Markup.button.webApp(
          "Develop",
          "https://tanks-1678c--develop-2gpq37ce.web.app"
        ),
      ],
      [Markup.button.webApp("Prod", "https://tanks-1678c.web.app/")],
      ["Start"],
    ])
      .resize()
      .oneTime(false)
  );
});

if (process.env.NODE_ENV !== "production") {
  bot.launch().then(() => console.log("Bot is running locally!"));
}

// Экспорт для Vercel
module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      await bot.handleUpdate(req.body, res);
    } catch (err) {
      console.error("Error handling update:", err);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(200).send("Bot is running!");
  }
};
