const amqp = require("amqlib");

async function produce(){
    try{
        const conn = await amqp.connect("amqp://localhost/");
        const channel = await conn.createChannel();
        const queue = 'mensagem';
        await channel.assertQueue(queue, {durable: false});

        let messageCount = 1;

        setInterval(() => {
            const message = 'Mensagem ${messageCount}';
            channel.sendToQueue(queue, Buffer.from(message));
            console.log("enviada: ${message}");
            messageCount++;
        }, 2000);
    }catch (error){
        console.log(error);
    }
}
produce();