const Discord = require("discord.js");
const client = new Discord.Client();
client.config = require("./config.json");
const fs = require("file-system");
// const Enmap = require("enmap");
// client.guildConfs = new Enmap({name: "settings"});

// client.on("guildCreate", guild => {
//   client.guildConfs.set(guild.id, client.config.defaultSettings);
// });

client.on("ready", () => {
  console.log("Discord bot up");
});

client.on("message", msg => {
  client.args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
  client.cmd = client.args.shift().toLowerCase();

  if (!msg.content.startsWith(client.config.prefix) || !msg.guild || msg.author.bot) return;

  if (client.config.cmds.includes(client.cmd)) {
    var cmdFile = require("cmds/" + client.cmd + ".js");
    cmdFile.run(client, msg);
  } else {
    var cmdFile = require("cmds/404.js");
    cmdFile.run(client, msg);
  }
});

client.on("guildMemberAdd", memb => {
  var channels = memb.guild.channels;
  var defaultChannel;
  if (defaultChannel = channels.find("name", "welcome")) {
    defaultChannel.send("Welcome, ${memb}");
  } else if (defaultChannel = channels.find("name", "chat")) {
    defaultChannel.send("Welcome, ${memb}");
  } else if (defaultChannel = channels.find("name", "general")) {
    defaultChannel.send("Welcome, " + memb.user);
  }

});

client.login(process.env.clientToken);