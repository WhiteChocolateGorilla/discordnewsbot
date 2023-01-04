// Created by Alex, Reach out to me with any questions you may have
// Discord:VanillaGorilla#5617
// Email: vanillagorilla@aimbotter.xyz
// By default once setup the bot will post news every 24 hours from your requested website. I will add more options to this in the near future.


const Discord = require('discord.js');
const client = new Discord.Client();
const newsAPIKey = "YOUR_NEWS_API_KEY";
const channelId = "YOUR_CHANNEL_ID";
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsAPIKey}`;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Set a timer to post news updates every 24 hours
  setInterval(postNewsUpdates, 24 * 60 * 60 * 1000);
});

client.on('message', message => {
  if (message.content === '!news') {
    postNewsUpdates();
  }
});

function postNewsUpdates() {
  // Get the news from the News API
  const request = require('request');
  request(newsApiUrl, { json: true }, (err, res, body) => {
    if (err) {
      console.log(err);
      return;
    }

    // Get the specified Discord channel
    const channel = client.channels.cache.get(channelId);

    // Construct the news message
    let newsMessage = "**Daily News Update:**\n";
    for (let i = 0; i < body.articles.length && i < 5; i++) {
      const article = body.articles[i];
      newsMessage += `\n${article.title}\n${article.url}`;
    }

    // Send the news message to the Discord channel
    channel.send(newsMessage);
  });
}

client.login('YOUR_DISCORD_BOT_TOKEN');