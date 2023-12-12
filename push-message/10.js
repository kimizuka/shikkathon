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
  text: '今後、シッカソンを定期開催する際、サンプルコードとして公開し、宿泊時にも使ってもらいます'
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