const amqplib = require("amqplib");
const urlModule = require("url");

class Connnection {
  constructor(url, queue, onMessage) {
    this.url = url;
    this.queue = queue;
    this.onMessage = onMessage;
  }

  getChannel() {
    return this.channel;
  }

  async consume(service) {
    const { channel, conn } = await this.createConnection();
    this.channel = channel;
    this.conn = conn;
    await channel.assertQueue(this.queue);
    console.log(`${service} Consumer listening on queue ${this.queue}`);
    const consumer = await channel.consume(this.queue, (msg) => {
      this.onMessage(msg);
    });
    return consumer;
  }

  async publish(id, bodyData) {
    const { channel, conn } = await this.createConnection();
    const data = {
      id,
      bodyData
    }
    this.channel = channel;
    this.conn = conn;
    await channel.assertQueue(this.queue);
    const publisher = await channel.sendToQueue(
      this.queue,
      Buffer.from(JSON.stringify(data))
    );
    console.log(`Published message to ${this.queue}`);
    console.log(`message to ${data}`);

    
  }

  async close() {
    if (!this.channel || !this.conn) {
      throw new Error("No connection");
    }
    await this.channel.close();
    await this.conn.close();
  }
  async error() {
    // handle error
    this.conn.on("error", async (err) => {
        console.log(`AMQP errored ${error}`);
      
    });
  }

  async createConnection() {
    const { hostname } = urlModule.parse(this.url);
    const conn = await amqplib.connect(this.url, { servername: hostname });
    console.log(`AMQP connected successfully on ${hostname}`);
    const channel = await conn.createChannel();
    channel.prefetch(50);
    return { conn, channel };
  }
}

module.exports = { Connnection };
