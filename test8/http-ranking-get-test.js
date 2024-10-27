import http from 'k6/http';
import {Counter} from 'k6/metrics';

let messagesReceived = new Counter('messages_received');
let DifferencesSum = new Counter('sum_of_differences');
export const options = {
    vus: 2,
    duration: '10s',
};



export default function () {
    const response = http.get('https://kutaverse.xyz/user-service/rhythms/ranking');
}

