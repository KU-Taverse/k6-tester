import ws from 'k6/ws';
import {check} from 'k6';
import {Counter} from 'k6/metrics';

let messagesReceived = new Counter('messages_received');
let DifferencesSum = new Counter('sum_of_differences');
export const options = {
    vus: 4,
    iterations: 4
};

var positionX = 1.111;
var positionY = 1.111;
var positionZ = 1.111;
var rotationPitch = 1.111;
var rotationYaw = 1.111;
var rotationRoll = 1.111;
let CustomCounter = 0;

function createTagGameStatus(status, requestData) {
    return JSON.stringify({
        tagGameStatus: status,
        request: {
            ...requestData
        }
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default function () {
    const url = `wss://kutaverse.xyz/game-service/taggame`;
    const params = {tags: {my_tag: 'my ws session'}};
    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function open() {
            console.log(`VU ${__VU}: connected`);
            const json1 = createTagGameStatus("TAG_GAME_WAITING_FOR_PLAYERS", {
                userId: "user" + __VU
            });
            //console.log("message: " + JSON.stringify(json1, null, 2));
            socket.send(json1);

            const delay = 2000; // 2초(2000ms) 대기


                socket.setInterval(function timeout() {
                    CustomCounter += 1;
                    let message = {
                        userId: `user${__VU}`,
                        positionX: positionX++,
                        positionY: positionY++,
                        positionZ: positionZ++,
                        rotationPitch: rotationPitch++,
                        rotationYaw: rotationYaw++,
                        rotationRoll: rotationRoll++
                    }
                    const json1 = createTagGameStatus("TAG_GAME_PLAYING_MOVING", message);
                    //console.log("message" + JSON.stringify(json1, null, 2))
                    socket.send(json1);
                }, 33); // 30프레임





        });

        socket.on('message', function (message) {
            messagesReceived.add(1);

            //console.log('user: ' + __VU + ' message:' + message)

            if(message.length<100)
                return;
            const dataArray = JSON.parse(message);
            const data= dataArray[0]
            //console.log("receive message: " + JSON.stringify(data, null, 2));
            const receivedRotationPitch  = data.rotationPitch
            const difference = receivedRotationPitch-rotationPitch;
            //console.log(",receive,"+__VU+","+receivedRotationPitch+","+Date.now())
            DifferencesSum.add(difference); // 누적
        });

        // WebSocket 닫힘 이벤트
        socket.on('close', function () {
            console.log(`VU ${__VU}: disconnected`);
        });

        // WebSocket 오류 처리
        socket.on('error', function (e) {
            console.error(`VU ${__VU} error: ${e.error()}`);
        });
        socket.setTimeout(function () {
            console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
            socket.close();
        }, 10000);
    });

    check(res, {'Connected successfully': (r) => r && r.status === 101});
}
