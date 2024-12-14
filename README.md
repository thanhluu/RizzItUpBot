# Rizz It Up - Telegram Bot

Rizz It Up is a Telegram bot that helps users create dating bios, witty responses (rizz), and personalized pickup lines for dating apps. The bot uses OpenAI to generate content based on the user's input.

## Features

- **Generate Dating Bio**: The bot helps you create an engaging dating bio suitable for platforms like Tinder, Bumble, and OkCupid.
- **Generate Rizz**: The bot provides witty and humorous replies for dating conversations.
- **Generate Pickup Line**: The bot creates personalized pickup lines based on the user’s input.
- **User Interaction**: Users can answer questions step by step, and the bot processes requests smoothly.

## Requirements

To run this bot, you'll need:

- Node.js (version >= 14)
- `dotenv`, `telegraf`, and `openai` libraries installed
- An OpenAI account and Telegram Bot Token

## Installation

1. **Install Node.js**: If you haven't installed Node.js yet, download and install it from [https://nodejs.org/](https://nodejs.org/).

2. **Install required libraries**:

    Once Node.js is installed, you need to install the dependencies using the following command:
    ```bash
    npm install dotenv telegraf openai
    ```

3. **Create a `.env` file**:

    Create a `.env` file in the root directory of the project and add the following environment variables:

    ```env
    TELEGRAM_BOT_TOKEN=your-telegram-bot-token
    OPENAI_API_KEY=your-openai-api-key
    ```

    Replace `your-telegram-bot-token` and `your-openai-api-key` with your actual tokens.

4. **Run the Bot**:

    After installation, run the bot using the following command:
    ```bash
    node bot.js
    ```

## Usage

1. **Start the bot**: Send the `/start` command to begin using the bot. The bot will display the main menu with the following options:
   - **Generate Bio**: Create a bio for your dating profile.
   - **Generate Rizz**: Generate a witty response for a dating situation.
   - **Generate Pickup Line**: Generate a personalized pickup line.

2. **Generate Bio**: When you choose "Generate Bio", the bot will ask you for information like the platform you’re using (Tinder, Bumble, OkCupid, etc.), personality traits, hobbies, and the type of relationship you're looking for.

3. **Generate Rizz**: When you choose "Generate Rizz", the bot will prompt you for a context or message you want to respond to, and it will create a witty reply.

4. **Generate Pickup Line**: When you choose "Generate Pickup Line", the bot will ask you for some details about the person you're interested in, and it will generate a personalized pickup line.

## Upcoming Features

- **Bio tone options**: Provide options for the tone of the bio (Humorous, Friendly, Romantic, etc.).
- **User data storage**: Store users' generated bios, rizz responses, and pickup lines for future reference.

## Contributing

If you would like to contribute to the project, feel free to create a pull request or open an issue to discuss ideas.

## License

This project is licensed under the MIT License.