import http from 'k6/http';
import {Counter} from 'k6/metrics';

let messagesReceived = new Counter('messages_received');
let DifferencesSum = new Counter('sum_of_differences');
export const options = {
    vus: 10,
    iterations: 10
};
var nameList=["GM","개발자","김성열","민덕기","박소영","김학수","전영태","김형석","박능수","김기천"]
function getUser(userId){
    return nameList[userId]
}
let counter =1;
export default function () {
    const url = 'https://kutaverse.xyz/user-service/rhythms';


    let user = getUser(__VU)
    const payload = JSON.stringify({
        nickName: user,
        score: counter,
    });
    counter++;

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response=http.post(url, payload, params);


}

export  function teardown() {

    const response = http.get('https://kutaverse.xyz/user-service/rhythms/ranking');
    console.log(JSON.stringify(response.body, null, 4))
}

