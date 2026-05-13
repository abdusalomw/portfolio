  const express = require("express");
  const TelegramBot = require("node-telegram-bot-api");
  const fs = require("fs");
  const cors = require("cors");
  const path = require("path");

  const app = express();

  app.use(cors());

  app.use(express.static(__dirname));

  const TOKEN = "8831405808:AAHa_cuh46iIArt6rUXdZyxgyPgnsII3Q2c";

  const bot = new TelegramBot(TOKEN, {
    polling: true
  });

  const FILE = "./news.json";

  function getNews() {

    if (!fs.existsSync(FILE)) {
      return [];
    }

    return JSON.parse(
      fs.readFileSync(FILE)
    );

  }

  function saveNews(news) {

    fs.writeFileSync(
      FILE,
      JSON.stringify(news, null, 2)
    );

  }

  bot.on("message", async (msg) => {

    let news = getNews();

    let post = {
      text: msg.text || "",
      date: new Date()
    };

    if (msg.photo) {

      const photo =
        msg.photo[msg.photo.length - 1];

      const file =
        await bot.getFile(photo.file_id);

      post.image =
        `https://api.telegram.org/file/bot${TOKEN}/${file.file_path}`;

    }

    news.unshift(post);

    news = news.slice(0,3);

    saveNews(news);

    console.log("NEW POST:", post);

  });

  app.get("/news", (req,res)=>{

    res.json(getNews());

  });

  app.get("/", (req,res)=>{

    res.sendFile(
      path.join(__dirname,"index.html")
    );

  });

  app.listen(3000, ()=>{

    console.log("SERVER ISHLADI 3000");

  });
