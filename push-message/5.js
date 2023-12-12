'use strict';

require('dotenv').config();

const line = require('@line/bot-sdk');
const { CHANNEL_SECRET, CHANNEL_TOKEN } = process.env;
const config = {
    channelSecret: CHANNEL_SECRET,
    channelAccessToken: CHANNEL_TOKEN
};
const client = new line.Client(config);
const messages = [{
  type: 'image',
  originalContentUrl: 'https://www.pokemonsleep.net/wp/wp-content/uploads/2023/05/pokemon-img-1.png',
  previewImageUrl: 'https://www.pokemonsleep.net/wp/wp-content/uploads/2023/05/pokemon-img-1.png'
},{
  type: 'text',
  text: 'ポケモンスリープに似ているな。と'
}];

const main = async () => {
  try {
    await client.broadcast(messages);
  } catch (error) {
    console.log(`${ error.statusMessage }`);
    console.log(error.originalError.response.data);
  }
}

main();