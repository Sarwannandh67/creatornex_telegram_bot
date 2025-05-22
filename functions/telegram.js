const { Telegraf } = require('telegraf');
require('dotenv').config();

// Initialize bot with token from environment variable
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Basic error handling
bot.catch((err, ctx) => {
  console.error('Telegram bot error:', err);
  ctx.reply('An error occurred while processing your message.');
});

// Handle text messages
bot.on('text', async (ctx) => {
  try {
    await ctx.reply('Hello from CreatorNex Bot! 🚀');
  } catch (error) {
    console.error('Error sending message:', error);
    await ctx.reply('Sorry, I encountered an error while processing your message.');
  }
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse and validate the request body
    const body = JSON.parse(event.body);
    
    // Process the update
    await bot.handleUpdate(body);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Success' })
    };
  } catch (error) {
    console.error('Error processing webhook:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process webhook' })
    };
  }
};