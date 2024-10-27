import { randomString, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import ws from 'k6/ws';
import { check} from 'k6';
import { Trend , Counter } from 'k6/metrics';



const sessionDuration = 10000; // user session between 10s and 1m
let messagesReceived = new Counter('messages_received');
let DifferencesSum = new Counter('sum_of_differences');
let averageSquaredDifference = new Trend('average_squared_difference');
export const options = {
    vus: 10,
    iterations: 10,
};

const userId = `user${__VU}`;
var positionX = 1.111;
const positionY = 1.111;
const positionZ = 1.111;
const rotationPitch = 1.111;
const rotationYaw = 1.111;
const rotationRoll = 1.111;
const velocityX = 1.111;
const velocityY = 1.111;
const velocityZ = 1.111;
const status = "STAND";
const aurora = 1;
const title = 2;
export default function () {
    const url = `wss://kutaverse.xyz/game-service/map`;
    const params = { tags: { my_tag: 'my ws session' } };
    const res = ws.connect(url,params, function (socket) {
        socket.on('open', function open() {
            //websocket open 이면 메세지를 보낸다
            console.log(`VU ${__VU}: connected`);


            //메세지를 2-8초에 한번식 보낸다
            socket.setInterval(function timeout() {
                const message = JSON.stringify({
                    mapRequestType: "SAVE",
                    userId: userId,
                    positionX: positionX,
                    positionY: positionY,
                    positionZ: positionZ,
                    rotationPitch: rotationPitch,
                    rotationYaw: rotationYaw,
                    rotationRoll: rotationRoll,
                    velocityX: velocityX,
                    velocityY: velocityY,
                    velocityZ: velocityZ,
                    status: status,
                    aurora: aurora,
                    title: title
                })
                console.log(",send,"+__VU+","+positionX+","+Date.now())
                socket.send(message);
                positionX+=1
            }, 33); // say something every 2-8seconds

        });
        socket.on('ping', function () {
            console.log('PING!');
        });

        socket.on('pong', function () {
            console.log('PONG!');
        });

        socket.on('close', function () {
            console.log(`VU ${__VU}: disconnected`);
        });

        socket.on('message', function (message) {
            messagesReceived.add(1);


                // JSON 배열 파싱
            //console.log("message: ",message)
            if(message.length<20)
                return;
            const cleanedMessage = message.slice(1, -1); // {} 제거
            //console.log(cleanedMessage)
            const dataArray = JSON.parse(`[${cleanedMessage}]`);
            //console.log(`[${cleanedMessage}]`)
            //console.log('Parsed message:', dataArray[0]);
            const data= dataArray[0]

            // 현재 VU에 해당하는 userId의 데이터를 찾음
            const receivedPositionX  = data.positionX
            const difference = positionX-receivedPositionX;
            console.log(",receive,"+__VU+","+receivedPositionX+","+Date.now())
            DifferencesSum.add(difference); // 누적

            //console.log(dataArray);
        });


        socket.setTimeout(function () {
            console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
            socket.close();
        }, sessionDuration);

    });

    check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}

export function teardown() {
    const totalVUs = options.vus;

    // 새로운 Metric에 결과 기록
    //averageSquaredDifference.add(averageDifference);
    //console.log(`Average squared difference: ${averageDifference}`);
}