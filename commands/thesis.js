import { SlashCommandBuilder } from 'discord.js';
import { MarkovGenerator } from '../markov.js';

import he from 'he';
import fs from 'fs';

import axios from 'axios';
import https from 'https';

// Create an HTTPS agent and configure it to ignore certificate errors
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const titleMarkov = new MarkovGenerator(6, 40);
const elevatorMarkov = new MarkovGenerator(6, 1000);

async function loadData() {
  // Load venues.json
  const data = JSON.parse(fs.readFileSync('./venues.json', 'utf8'));
  for (let venue of data.venues) {
    console.log(`Loading ${venue.name}`);
    let id = venue.id;
    let url = `https://itp.nyu.edu/projects/public/projectsJSON_ALL.php?venue_id=${id}`;
    let response = await axios(url, { httpsAgent: agent });
    process(response.data);
  }
  console.log('finished loading data');
}

function process(data) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].project_name) {
      let title = he.decode(data[i].project_name);
      titleMarkov.feed(title);
    }

    if (data[i].elevator_pitch) {
      let elevator = he.decode(data[i].elevator_pitch);
      // Just in case anything leftover
      elevator = elevator.replace(/&lt;br \/&gt;/g, '\n');
      elevator = elevator.replace(/<br.*?>/g, '\n');
      elevatorMarkov.feed(elevator);
    }
  }
}

loadData();

export const data = new SlashCommandBuilder()
  .setName('thesis')
  .setDescription('Generate a thesis idea.');

export async function execute(interaction) {
  let title = titleMarkov.generate();
  let description = elevatorMarkov.generate();

  await interaction.reply({
    content: '**Thesis Idea**',
    embeds: [
      {
        title: title,
        description: description,
      },
    ],
  });
}
