'use strict';

require('dotenv').config();

const ngrok = require('ngrok');
const express = require('express');
const line = require('@line/bot-sdk');
const { CHANNEL_SECRET, CHANNEL_TOKEN, NGROK_AUTH_TOKEN } = process.env;
const PORT = process.env.PORT || 3000;
const config = {
  channelSecret: CHANNEL_SECRET,
  channelAccessToken: CHANNEL_TOKEN
};
const client = new line.Client(config);

async function handleLineWebHook(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  console.log(event.message.text);
  if (event.message.text === '寝る') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: 'おやすみなさい... Zzzz... 🫎'
    });
  } else if (event.message.text === '起きる') {
    return client.replyMessage(event.replyToken, [{
      type: 'text',
      text: 'おはようございます！いろんな動物が罠にかかったようです！'
    },
    {
      type: 'image',
      originalContentUrl: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kimizuka/20231203/20231203111157.png',
      previewImageUrl: 'https://cdn-ak.f.st-hatena.com/images/fotolife/k/kimizuka/20231203/20231203111157.png'
    },
    {
      type: 'text',
      text: '🫎 × 2 🐗 × 1 🦊 × 1'
    },
  ]);
  } else {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '🫎'
    });
  }
}

const app = express();

app.use('/webhook', line.middleware(config));

app.get('/', (_, res) => {
  res.sendStatus(200);
});

app.post('/webhook', (req, res) => {
  if (req.body.events.length === 0) {
    res.sendStatus(200);
    return;
  }

  Promise.all(req.body.events.map(handleLineWebHook)).then((result) => res.json(result));
});

app.listen(PORT);

(async () => {
  const url = await ngrok.connect({
    addr: PORT,
    authtoken: NGROK_AUTH_TOKEN
  });

  console.log(`${ url }/webhook`);
})();