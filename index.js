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

// List of random responses for free chat
const randomResponses = [
  "I'm here to help you create the perfect bio! 😎 Tell me more!",
  "Are you ready to spice things up with some rizz? 😏",
  "Feeling lucky? I’ve got pickup lines waiting for you! 😘",
  "Hey there! Ready to create some magic with words? ✨",
  "Need help? I’m always here to make things interesting. 😜",
  "Just say the word, and I’ll generate something awesome! 🚀",
  "Let’s make your online dating profile stand out! 📸",
  "You can talk to me anytime! I love chatting about bios, rizz, and more. 💬"
];

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
  ctx.reply('Let’s create your perfect dating bio! 🙌\nFirst, which platform are you using? (Tinder, Bumble, OkCupid, etc.)\nYou can type "skip" to skip this question.');
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

  // Check if session exists for chatId and initialize if necessary
  if (!sessions[chatId]) {
    sessions[chatId] = {};
  }

  if (userInput === '/start' || userInput === '/bio' || userInput === '/rizz' || userInput === '/pickup') return;

  // Handle bio-related input
  if (sessions[chatId].step === 'bio') {
    if (!sessions[chatId].platform) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].platform = 'Unknown';
        ctx.reply('Skipping the platform question! Now, tell me about your personality (e.g., fun-loving, adventurous, etc.)');
      } else {
        sessions[chatId].platform = userInput;
        ctx.reply('Perfect! Now, tell me about your personality (e.g., fun-loving, adventurous, etc.)');
      }
    } else if (!sessions[chatId].personality) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].personality = 'No preference';
        ctx.reply('Skipping the personality question! What are some of your hobbies?');
      } else {
        sessions[chatId].personality = userInput;
        ctx.reply('Nice! What are some of your hobbies?');
      }
    } else if (!sessions[chatId].hobbies) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].hobbies = 'None specified';
        ctx.reply('Skipping the hobbies question! How would you describe your sense of humor?');
      } else {
        sessions[chatId].hobbies = userInput;
        ctx.reply('Great! How would you describe your sense of humor?');
      }
    } else if (!sessions[chatId].humor) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].humor = 'No preference';
        ctx.reply('Skipping the humor question! What are your main interests?');
      } else {
        sessions[chatId].humor = userInput;
        ctx.reply('Got it! What are your main interests?');
      }
    } else if (!sessions[chatId].interests) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].interests = 'None specified';
        ctx.reply('Skipping the interests question! Lastly, what type of relationship are you looking for?');
      } else {
        sessions[chatId].interests = userInput;
        ctx.reply('Awesome! Lastly, what type of relationship are you looking for?');
      }
    } else if (!sessions[chatId].relationshipType) {
      if (userInput.toLowerCase() === 'skip') {
        sessions[chatId].relationshipType = 'Any';
        ctx.reply('Skipping the relationship type question! Let me generate your bio now.');
      } else {
        sessions[chatId].relationshipType = userInput;
      }

      // Generate bio after collecting all details
      const generatedBio = await generateBio(
        sessions[chatId].platform,
        sessions[chatId].personality,
        sessions[chatId].hobbies,
        sessions[chatId].humor,
        sessions[chatId].interests,
        sessions[chatId].relationshipType
      );
      
      ctx.reply(`Here’s your personalized bio 📝:\n\n${generatedBio}`, {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🔄 Generate Another Bio', callback_data: 'bio' }],
          ],
        },
      });

      // Save the generated bio to session
      sessions[chatId].generatedBio = generatedBio;

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
          [{ text: '🔄 Generate Another Rizz', callback_data: 'rizz' }],
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
          [{ text: '🔄 Generate Another Pickup Line', callback_data: 'pickup' }],
        ],
      },
    });
    sessions[chatId].step = null; // Reset step after generating pickup line
  }
  
  // Handle free chat (random responses)
  else {
    const randomResponse = randomResponses[Math.floor(Math.random() * randomResponses.length)];
    ctx.reply(randomResponse);
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
