const { Telegraf, Markup } = require("telegraf");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Главная клавиатура
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

// Обработчик команды /start
bot.start((ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "there";
  ctx.reply(`Hi, ${username}!`, mainKeyboard(username)); // Приветствие с именем
});

// Обработчик кнопки Start
bot.hears("Start", (ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "there";
  ctx.reply(`Welcome back, ${username}!`, mainKeyboard(username)); // Приветствие с именем
});

// Обработчик кнопки Info
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

// Обработчик команды /menu
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

// Обработчик всех остальных сообщений
bot.on("message", (ctx) => {
  const username = ctx.from.username || ctx.from.first_name || "there";
  ctx.reply(`Hi, ${username}! Choose an option:`, mainKeyboard(username));
});

// Запуск бота
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
