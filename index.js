const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
require('dotenv').config()

//UPTIME ROBOT (WEB)
const { get } = require("snekfetch");
const express = require('express');
const http = require('http');
const app = express();
app.get("/", (request, response) => {
  
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 2800);
// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.status(200).send("OK");
});
client.on("ready", async () => {
  console.log(`${client.user.username} is ready Created by rayhantech#4999!`);
  client.user.setActivity(`${config.prefix}help`, {type: "PLAYING"}); //UBAH PRESENCE/STATUS BOT DISINI
});

client.on("message", async message => {
  
  //CMD HANDLER
  if (message.author.bot) return null;
  if (message.content.indexOf(config.prefix) !== 0) return null;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g); // (" ");
  const cmd = args.shift().toLowerCase();
  try {
    const commandsFile = require(`./commands/${cmd}.js`);
    commandsFile.run(client, message, args);
  } catch (e) {
    console.log(e.message)
  } finally {
    console.log(`${message.author.tag} menggunakan command ${config.prefix}${cmd}`);
  }
  
});

client.login(process.env.TOKEN);
