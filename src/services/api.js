const Totalvoice = require('totalvoice-node');
require('dotenv');

const ACCESS_TOKEN = process.env.TOTAL_VOICE_ACCESS_TOKEN;
console.log(ACCESS_TOKEN);

const client = new Totalvoice("089cc6840196a139236ae7ca8fa7e9d7");


async function call(jow) {
    const options = {
        velocidade: 2,
        tipo_voz: 'br-Vitoria',
        resposta_usuario: true
    };

    const message = `Olá ${jow.name}, você foi escalado para atender Ilson amanhã. Digite 1 para confirmar ou 2 para recusar. 
    Atenção: Se você recusar vai estar penalisando o seu caro amigo de casa e, isto não é bom.`;


    client.tts.enviar(jow.phone, message, options)
        .then((response) => {
            console.log(`O ${jow.name} foi avisado.`);
            console.log(`Response: ${response}`)
            return {
                jow: {
                    id: jow.id,
                    name: jow.name
                },
                id: response.dados.id,
                status: 'pending'
            };
        })
        .catch((error) => console.log(`It's was not possible to advice ${jow.name}: because of ${error}`));


}

async function sendSMS(jow) {
    client.sms.enviar(jow.phone, message)
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.error('Erro: ', error)
        });
}

module.exports = {
    call: call,
    sendSMS: sendSMS
}