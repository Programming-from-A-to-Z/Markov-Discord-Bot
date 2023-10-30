import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';
import * as thesis from './commands/thesis.js';

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

function readyDiscord() {
  console.log('🚂 ', client.user.tag);
}

async function handleInteraction(interaction) {
  if (!interaction.isCommand()) return;
  if (interaction.commandName === 'thesis') {
    await thesis.execute(interaction);
  }
}

client.once(Events.ClientReady, readyDiscord);
client.on(Events.InteractionCreate, handleInteraction);
client.login(process.env.TOKEN);
