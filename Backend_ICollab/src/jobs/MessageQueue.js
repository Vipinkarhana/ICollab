import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import amqp from 'amqplib';

const MONGO_URI = 'mongodb+srv://naman:87CMhtTbWR57eJMu@cluster0.wmdqegu.mongodb.net/ProdCopy?retryWrites=true&w=majority';
const QUEUE_NAME = 'orA5Zw:MessageQueue';

const batchSize = 20;
const timeLimit = 30 * 1000;

let batch = [];
let timer = null;

function resetTimer(saveBatch) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        if (batch.length > 0) saveBatch();
    }, timeLimit);
}

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
messageSchema.index({ group: 1, createdAt: -1 });

const Message = mongoose.model("Message", messageSchema);


async function start() {
    await mongoose.connect(MONGO_URI, {});

    const conn = await amqp.connect({
        protocol: 'amqps',
        hostname: 'us-east-1-a-queue.ably.io',
        port: 5671,
        username: 'orA5Zw.F8atHA',
        password: 'Lb2QOr1_2jA6Fj1eHt72G34BRXhEMQ3KA5E_g8W6414',
        vhost: 'shared',
    });

    const ch = await conn.createChannel();
    //   await ch.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`🟢 Listening to queue: ${QUEUE_NAME}`);

    const saveBatch = async () => {
        console.log("Saving Started");
        try {
            const docs = batch.map(msg => ({
                text: msg.message,
                sender: msg.clientId,
                group: msg.groupId,
                room: msg.roomId,
                createdAt: new Date(msg.timestamp),
            }));
            await Message.insertMany(docs);
            console.log(`✅ Inserted ${docs.length} messages`);
        } catch (err) {
            console.error('❌ Failed to insert batch:', err);
        } finally {
            batch = [];
            resetTimer(saveBatch);
        }
    };

    ch.consume(QUEUE_NAME, (msg) => {
        if (!msg) return;

        try {
            const payload = JSON.parse(msg.content.toString());
            const ablyMessage = payload?.messages?.[0];

            if (ablyMessage?.name !== 'message') return;
            const dataObj = JSON.parse(ablyMessage.data);  // parse JSON string into object
            const data = { ...dataObj, clientId: ablyMessage.clientId };  // add clientId field
            console.log("data pushed in batch:", data);
            batch.push(data);

            if (batch.length >= batchSize) {
                saveBatch();
            } else {
                resetTimer(saveBatch);
            }

            ch.ack(msg);
        } catch (e) {
            console.error('❌ Error parsing message:', e);
            ch.nack(msg, false, false); // Reject bad message
        }
    });
}

start().catch(console.error);
