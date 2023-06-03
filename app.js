// const qrcode = require('qrcode-terminal'); // qrcode
// import { Client, LocalAuth} from "whatsapp-web.js" // wweb
import qrcode from 'qrcode-terminal'
import { ChatGPTAPI } from 'chatgpt' // chatgpt
import pkg from "whatsapp-web.js"
const {Client, LocalAuth, Buttons, List, MessageMedia} = pkg
import fetch from 'node-fetch';

import nHentai from "shentai";
const sHentai = new nHentai;

// const fs = require('fs');
import YoutubeMp3Downloader from "youtube-mp3-downloader";
import fs, { link } from "fs";

// const client = new Client();
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
 
//variabel global
const GL_namaBot = "AoBot";
const GL_developer = "Agung"
// const GL_prefix = "."
const GL_versiBot = "0.2.2 2023";
// End variabel global

// bagian Menu
client.on('message', (message) => {
    if (message.body.toLowerCase() === '.menu') {
      message.reply(
  `*AoBot by @AoGung shap melayani*
  ~~ Fitur ~~
  ‣ tag everyone: @everyone _(hati-hati)_
  ‣ Bikin stiker: .stiker _(kirim gambar beserta command-nya)_
  ‣ Convert YT to MP3: .yt _<link vidoe yt>_
  ‣ info: ao
  ‣ Main Menu: .menu
  ‣ Cek Ping server: .ping
  ‣ ChaGPT: .gpt (masukan pertanyaan)
  ‣ Fitur tambahan
  .sapa
  .hi
  .versi
  `);
    const media = MessageMedia.fromFilePath("img/hqdefault.jpg");
    client.sendMessage(message.from,media, {sendMediaAsSticker: true});
    }
  
  });

 // bagian summon
client.on("message", (m) => {
    if(m.body.toLowerCase() === "ao"){
      let date = new Date();
      // let text = `Sekarang jam ${date.getHours()}:${date.getMinutes()} WIB`
      client.sendMessage( m.from, `Shap bos 🤡\nAda apa yah?`)
    }
  })
  
  // bagian cek versi 
  client.on("message", m => {
    if(m.body.toLowerCase() === ".versi"){
      m.reply(`${GL_developer} ‣ ${GL_namaBot} • ${GL_versiBot}`);
    }
  })

// bagian mention @everyone 
client.on('message', async (msg) => {
    if(msg.body === '@everyone') {
      const chat = await msg.getChat();
      
      let text = "";
      let mentions = [];
      
      for(let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
            
        mentions.push(contact);
        text += `@${participant.id.user} `;
      }
      
      await chat.sendMessage(text, { mentions });
    }
  });
  
  // bagian ping
  
  client.on('message', (message) => {
    if (message.body === '.ping') {
      let rand = Math.floor(Math.random()*1000);
      let text = `Pong! Lt ${rand}ms`
      message.reply(text);
    }
  });

// bagian bikin stiker 
client.on('message', async msg => {
    if(msg.hasMedia &&  msg.body.toLowerCase() === ".stiker") {
        const media = await msg.downloadMedia();
        // media setelah didonglot
        console.log("media downloaded")
        try {
          client.sendMessage(msg.from, media, {sendMediaAsSticker: true, stickerAuthor: "Ao - Bot", stickerName: "🐱‍👤", stickerCategories: "stiker"})
        } catch {
          client.sendMessage(msg.from, "Nope")
        }
         
    }
  });

  // bagian jadwal kelas
  client.on("message", msg => {
    if(msg.body == ".jadwal"){
      let media = new MessageMedia("./img/jadwal.PNG")
      // client.sendMessage(msg.from, media)
      message.reply(media)
    }
  })

  // Bagian chatGPT
  // apikey wisma23 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
client.on('message', (message) => {
  if (message.body.substring(0, 4) === '.gpt') {
    let context = message.body.substring(5, message.body.length)
    // client.sendMessage(`inisialisasi untuk "${context}"`)
    // message.reply(`triggered, konten: ${context}`);
    
      let balesan = chatgpt(context).then(n => {
        console.log(n)
        message.reply(n)
      }).catch(err => message.reply("Gpt error"));
      
      console.log(balesan)
    // message.reply(balesan)
  }
});

// GPT ayaka
client.on('message', (message) => {
  if (message.body.substring(0, 4) === '.aya') {
    let context = message.body.substring(5, message.body.length)
    
    fetch('https://chatgpt-api.shn.hk/v1/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
      { role: 'user', content: `${context}` }
      ]
  })
})
.then(response => response.json())
.then(data => {
  // Menggunakan respon dari server
  const hasil = JSON.stringify(data)
  console.log(hasil);
})
.catch(error => {
  // Menangani kesalahan
  console.error(error);
});


  }
});

// bagian addParticipant
client.on('message', (message) => {
  if (message.body.substring(0, 4) === '.addd') {
    let context = message.body.substring(5, message.body.length)
    // client.sendMessage(`inisialisasi untuk "${context}"`)
    // message.reply(`triggered, konten: ${context}`);
    
    // +62 818-699-081
    client.getChats().then((chats) => {
      const myGroup = chats.find((chat) => chat.name === myGroupName);
      console.log(myGroupName)
      client.getContacts().then((contacts) => {
        // const contactToAdd = contacts.find(
        //   // Finding the contact Id using the contact's name
        //   (contact) => contact.name === contactName
        // );

          myGroup
            .addParticipants(["6285217117840@c.us"]) // Pass an array of contact IDs [id1, id2, id3 .....]
            .then(() =>
              console.log(
                `Successfully added ${contactName} to the group ${myGroupName}`
              )
            );
      });
    });
    // const myGroup = client.gr
      
      // console.log(balesan)
    // message.reply(balesan)
  }
});

async function chatgpt(msg) {
  const api = new ChatGPTAPI({
    // apiKey: process.env.OPENAI_API_KEY
    apiKey: "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"
    // apiKey: "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"
  })

  let res = await api.sendMessage(msg).catch();
  // console.log(res.text)
  // message.reply(res.text)
  return res.text
}

client.on("message", (async message => {
  if(message.body == ".pp"){
    let chat = await message.getChat()
    console.log(chat)
    let contact = await chat.getContact()
    console.log(contact.id)
    console.log(contact.id.user)
    // client.sendMessage(`@${contact.user}`)
  }
}))

// shnetai
client.on('message', async (message) => {
  if (message.body.substring(0, 4) === '.hen') {
      let kode = message.body.substring(5, message.body.length)
      
      // if(kode.toLowerCase === "random"){
        let douj = await fetch("https://www.nhentai/g/230404/1.jpg");
        message.reply("t")
        message.reply(await henRandom())
        message.reply("s")
      // }
      
      // console.log(balesan)
      // message.reply(balesan)
    }
  });

  client.on("message", async (message) => {
    if(message.body.substring(0, 3) === ".ym"){
      console.log("yak musiks")
      let chat = await message.getChat();

      // download dulu
      var YD = new YoutubeMp3Downloader({
        "ffmpegPath": "ffmpeg",        // FFmpeg binary location
        "outputPath": "./music",    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 10000,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false                      // Enable download from WebM sources (default: false)
    });
      let linkFull = message.body.substring(5, message.body.length);
      let kodeUtama = linkFull.slice(-11);
      let pathMusik = "";
      let persentase = 0;
      YD.download(`${kodeUtama}`);
      client.sendMessage(message.from, `Download mulai.`)
      YD.on("progress", function(progress) {
        persentase = Math.ceil(progress.progress.percentage);
          client.sendMessage(message.from, `Download progress: ${persentase}%`)
      });
      YD.on("finished", async function(err, data) {
        // let jsonn = JSON.parse(data)
        // console.log(data);
        console.log(`Path: ${data.file}`)
        pathMusik = data.file
        const audioFilePath = pathMusik;
        const audioFile = fs.readFileSync(audioFilePath, {encoding: "base64"});
  
        // Mengirim file audio
        // await client.sendMessage(message.from, audioFile);
        
        const media = new MessageMedia('audio/mp3', audioFile);
        await chat.sendMessage(media, { sendAudioAsVoice: true});
        client.sendMessage(message.from, `Done: "${data.title}"`)
        console.log('File audio berhasil dikirim');
      });


      }
  })

  client.on("message", (m) => {
    if(m.body.substring(0,12).toLowerCase() == "terima kasih" || m.body.substring(0,5).toLowerCase() == "thank"){
      client.sendMessage(m.from,"sama-sama brad")
    }
  })

  client.on("message", (m) => {
    if(m.body == "a5u"){
      for (let i = 0; i < 115; i++) {
        client.sendMessage(m.from,"Lmao kali kamu gan wkwkwk")
      }
    }
  })

  async function henRandom(){
    // await sHentai.getRandom().then(doujin => { message.reply(doujin); console.log(doujin)}).catch(e => console.log(e))

    const doujin = await sHentai.getRandom()
    return doujin;

  }

