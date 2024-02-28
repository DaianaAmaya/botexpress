const qrcode = require('qrcode-terminal'); //llama a la libreria

const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js'); // wsp
const client = new Client({
    authStrategy: new LocalAuth()
});

//Llama para genrar el codigo qr
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

//Mensaje de aviso que inicio el bot
client.on('ready', () => {
    console.log('Client is ready!');
});

let estado = {
    productos: false
}


client.on('message', async (data) => {

    const mensaje = data.body.toLowerCase()
    const from= data.from
   //if(data.from.includes('@g.us) return console.log('Es un grupo)
if(estado.productos){
    if(mensaje === '3'){
        estado.productos = false
    }
}

    
    if(mensaje === '2'|| mensaje === "Mis producto"){
        const media = MessageMedia.fromFilePath('./img/agenda.jpg');
        await client.sendMessage(from,media)
        return
    }

    if(mensaje === '2'|| mensaje === "Mis productos"){
        const media = MessageMedia.fromFilePath('./img/Agenda_2024.png');
        await client.sendMessage(from,media)
        return}

    if(mensaje === '1' || mensaje === "quien soy?"){
        await data.reply('Soy helianthus agenda, hacemos agendas personalizadas que se adapten a tu rutina')
        return

    }
    if(mensaje.includes('hola') || mensaje.includes ('buenas')){
        await data.reply("Hola, como estas? - Soy el asistente virtual de Helianthus agendas")
        await client.sendMessage(from, "¿Cómo puedo ayudarte? \n 1-¿Quién soy? \n 2-Mis productos \n 3-Como hacer para encargar un producto \n 4- Mis redes ")
        await client.sendMessage(from,"Ingresa el número correcto")
        return
    }


})



client.initialize();
