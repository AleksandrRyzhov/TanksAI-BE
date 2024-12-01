const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const mainKeyboard = (username) =>
  Markup.keyboard([
    [
      Markup.button.webApp(
        "Prod",
        `https://tanks-1678c.web.app/?username=${encodeURIComponent(username)}`
      ),
      Markup.button.webApp(
        "Develop",
        `https://tanks-1678c--develop-2gpq37ce.web.app/?username=${encodeURIComponent(
          username
        )}`
      ),
    ],
    ["Info", "Start"],
  ])
    .resize()
    .persistent();

bot.start((ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "Player";
  ctx.reply("Welcome! Choose an option:", mainKeyboard(username));
});

bot.hears("Start", (ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "Player";
  ctx.reply("Choose an option:", mainKeyboard(username));
});

bot.hears("Info", (ctx) => {
  ctx.reply(
    "Here are some useful resources:",
    Markup.inlineKeyboard([
      Markup.button.url(
        "React ECS Docs",
        "https://react-ecs.ldlework.com/docs/"
      ),
      Markup.button.url(
        "GitHub: React ECS",
        "https://github.com/mattblackdev/react-entity-component-system"
      ),
      Markup.button.url("npm: Bitecs", "https://www.npmjs.com/package/bitecs"),
    ])
  );
});

bot.command("menu", (ctx) => {
  ctx.reply(
    "Choose a resource to visit:",
    Markup.inlineKeyboard([
      Markup.button.url(
        "React ECS Docs",
        "https://react-ecs.ldlework.com/docs/"
      ),
      Markup.button.url(
        "GitHub: React ECS",
        "https://github.com/mattblackdev/react-entity-component-system"
      ),
      Markup.button.url("npm: Bitecs", "https://www.npmjs.com/package/bitecs"),
    ])
  );
});

bot.on("message", (ctx) => {
  if (
    !ctx.message.text ||
    ctx.message.text === "/start" ||
    ctx.message.text === "/menu"
  )
    return;
  ctx.reply("Choose an option:", mainKeyboard());
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
