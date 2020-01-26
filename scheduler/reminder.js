const api = require('../services/api');
const { getJows, confirm } = require('../utils/jows');

var notifications = [];

function start(){
    console.log(`Starting scheduler...`);
    setInterval(checkCalendar, 100000);
    setInterval(checkPendingState, 50000);
}

const checkCalendar = async()=>{
    console.log(`Checking calendar...${new Date}`);
    
    const jows = getJows();
    const jow =  await findWhoIsTheNext(jows);

    console.log(`Sua vez: ${jow.name}`);
    try{
        const response = await api.call(jow);
        notification.push(response);
    }catch(error){
        console.log(`Error calling ${jow.name}. ${error}`);
    }
};

async function findWhoIsTheNext(jows){
    return jows.reduce((previos, next ) => { return previos.count < next.count ? previos : next}, {count: Number.MAX_VALUE});
}

async function checkPendingState(){
    for(notification of notifications){
        if(notification.status == "pending"){
            try{
                const response = await client.tts.buscar(notification.id);
                console.log(response);

                if(response.dados.resposta == 1){
                    console.log(`${notification.jow.name} confirm the availability.`);
                    notification.status = 'success';
                    confirm(notification.jow)
                }

                if(response.dados.resposta == 2){
                    console.log(`${notification.jow.name} refuse the schedule.`);
                    notification.status = 'success';
                }

            }catch(error){
                console.log(`Error checking notification status for id: ${notification.id}`);
            }
        }
    }
}

module.exports = {
    start: start,
    checkCalendar: checkCalendar
}

