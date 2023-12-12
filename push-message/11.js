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
  type: 'text',
  text: 'これによって、農業被害の解決に、間接的に多大な貢献が期待できることでしょう'
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