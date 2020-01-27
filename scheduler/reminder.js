const api = require('../services/api');
const { getJows, confirm } = require('../utils/jows');

var notifications = [];

function start(){
    console.log(`Starting scheduler...`);
    setInterval(checkCalendar, 100000);
    setInterval(checkPendingState, 50000);
}


function checkCalendar(day){
    console.log(`Checking calendar...${new Date()}`);

    const today = new Date();
    const tomorrow = new Date(day | today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    //0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday. More info: https://www.w3resource.com/javascript/object-property-method/date-getDay.php
    if(tomorrow.getDate() == 3 || tomorrow.getDate() == 5){
        adviceNext();
    }
   
}


const adviceNext = async()=>{    
    
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

function findWhoIsTheNext(jows){
    return new Promise((resolve, reject) =>{
        try{
            let jow = jows.reduce((previos, next ) => { return previos.count < next.count ? previos : next}, {count: Number.MAX_VALUE});
            resolve(jow);
        }catch(error){
            reject(`cannot find who is the next one. error: ${error}`);
        }
    });
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
                    confirm(notification.jow);
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

