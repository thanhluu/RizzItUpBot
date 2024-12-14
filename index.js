require('dotenv').config();
const { Telegraf } = require('telegraf');
const { OpenAI } = require('openai'); // Updated import for OpenAI

// Initialize Telegram bot and OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Session store to keep track of user steps
const sessions = {};

// Main Menu (Inline keyboard with callback data)
const mainMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '💬 Generate Bio', callback_data: 'bio' }],
      [{ text: '🤩 Generate Rizz', callback_data: 'rizz' }],
      [{ text: '💌 Generate Pickup Line', callback_data: 'pickup' }],
    ],
  },
};

// Start command - main entry point for the bot
bot.start((ctx) => {
  ctx.reply(
    `Welcome to Rizz It Up! 🎉\nChoose an option below to get started, and I’ll guide you through the process.`,
    mainMenu
  );
});

// Handle /bio command - Generate bio for dating apps
const handleBio = async (ctx) => {
  ctx.reply('Let’s create your perfect dating bio! 🙌\nFirst, which platform are you using? (Tinder, Bumble, OkCupid, etc.)');
  sessions[ctx.chat.id] = { step: 'bio' };
};

// Handle /rizz command - Generate witty response for dating situations
const handleRizz = async (ctx) => {
  ctx.reply('Let’s get your Rizz going! ✨\n\nTell me a bit about the context or the message you want to reply to.');
  sessions[ctx.chat.id] = { step: 'rizz' };
};

// Handle /pickup command - Generate pickup line
const handlePickup = async (ctx) => {
  ctx.reply('Ready for a fun pickup line? 😏\n\nTell me a little about the person you’re interested in (e.g., their hobbies, personality traits).');
  sessions[ctx.chat.id] = { step: 'pickup' };
};

// Generate bio using OpenAI
const generateBio = async (platform, personality, hobbies, humor, interests, relationshipType) => {
  const bioPrompt = `
    Create a personalized dating bio based on the following information:
    - Platform: ${platform}
    - Personality: ${personality}
    - Hobbies: ${hobbies}
    - Humor: ${humor}
    - Interests: ${interests}
    - Relationship Type: ${relationshipType}

    The bio should be engaging, fun, and appropriate for the platform the user is on. If the platform is Tinder, the tone should be casual and fun. For Bumble, the tone should be a mix of casual and serious, and for OkCupid, it should lean more towards meaningful and thoughtful.

    Keep the language light-hearted, and make the user sound approachable and exciting!`;

  try {
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: bioPrompt }],
    });

    return openaiResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error generating bio:', error);
    return 'Sorry, there was an issue generating your bio. Please try again later.';
  }
};

// Function to generate a witty rizz response
const generateRizz = async (context) => {
  try {
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that generates witty and fun replies for dating situations.' },
        { role: 'user', content: `Generate a witty response to: ${context}` },
      ],
    });

    return openaiResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error generating rizz:', error);
    return 'Sorry, there was an issue generating your response. Please try again later.';
  }
};

// Function to generate a pickup line
const generatePickupLine = async (details) => {
  try {
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an assistant that generates witty and personalized pickup lines based on user input.' },
        { role: 'user', content: `Generate a pickup line based on the following details: ${details}` },
      ],
    });

    return openaiResponse.choices[0].message.content;
  } catch (error) {
    console.error('Error generating pickup line:', error);
    return 'Sorry, there was an issue generating your pickup line. Please try again later.';
  }
};

// Listen for user messages
bot.on('message', async (ctx) => {
  const userInput = ctx.message.text.trim();
  const chatId = ctx.chat.id;

  if (userInput === '/start' || userInput === '/bio' || userInput === '/rizz' || userInput === '/pickup') return;

  // Handle bio-related input
  if (sessions[chatId].step === 'bio') {
    if (!sessions[chatId].platform) {
      sessions[chatId].platform = userInput;
      ctx.reply('Perfect! Now, tell me about your personality (e.g., fun-loving, adventurous, etc.)');
    } else if (!sessions[chatId].personality) {
      sessions[chatId].personality = userInput;
      ctx.reply('Nice! What are some of your hobbies?');
    } else if (!sessions[chatId].hobbies) {
      sessions[chatId].hobbies = userInput;
      ctx.reply('Great! How would you describe your sense of humor?');
    } else if (!sessions[chatId].humor) {
      sessions[chatId].humor = userInput;
      ctx.reply('Got it! What are your main interests?');
    } else if (!sessions[chatId].interests) {
      sessions[chatId].interests = userInput;
      ctx.reply('Awesome! Lastly, what type of relationship are you looking for?');
    } else if (!sessions[chatId].relationshipType) {
      sessions[chatId].relationshipType = userInput;

      // Generate bio after collecting all details
      const generatedBio = await generateBio(
        sessions[chatId].platform,
        sessions[chatId].personality,
        sessions[chatId].hobbies,
        sessions[chatId].humor,
        sessions[chatId].interests,
        sessions[chatId].relationshipType
      );
      
      ctx.reply(`Here’s your personalized bio 📝:\n\n${generatedBio}`, mainMenu);

      // Clear session after bio generation
      delete sessions[chatId];
    }
  }

  // Handle rizz-related input
  else if (sessions[chatId].step === 'rizz') {
    const rizzResponse = await generateRizz(userInput);
    ctx.reply(rizzResponse, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🔄 Generate Another Rizz', callback_data: 'rizz' },
            { text: '📋 Copy Rizz', callback_data: 'copy_rizz' },
          ],
        ],
      },
    });
    sessions[chatId].step = null; // Reset step after generating rizz
  }

  // Handle pickup line input
  else if (sessions[chatId].step === 'pickup') {
    const pickupLine = await generatePickupLine(userInput);
    ctx.reply(pickupLine, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🔄 Generate Another Pickup Line', callback_data: 'pickup' },
            { text: '📋 Copy Pickup Line', callback_data: 'copy_pickup' },
          ],
        ],
      },
    });
    sessions[chatId].step = null; // Reset step after generating pickup line
  }
});

// Handle callback queries to trigger the right actions
bot.on('callback_query', async (ctx) => {
  const callbackData = ctx.callbackQuery.data;

  if (callbackData === 'bio') {
    handleBio(ctx);
  } else if (callbackData === 'rizz') {
    handleRizz(ctx);
  } else if (callbackData === 'pickup') {
    handlePickup(ctx);
  }
});

// Launch the bot
bot.launch().then(() => console.log('Rizz It Up bot is running!'));

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
