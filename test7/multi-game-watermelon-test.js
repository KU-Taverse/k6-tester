import ws from 'k6/ws';
import {check} from 'k6';
import {Counter} from 'k6/metrics';

let messagesReceived = new Counter('messages_received');
let DifferencesSum = new Counter('sum_of_differences');
export const options = {
    vus: 2,
    iterations: 2
};


function createTagGameStatus(status, roomId, userId, data) {
    return JSON.stringify({
        miniGameRequestType: status,
        roomId: roomId,
        userId: userId,
        interrupt: 0,
        score: 0,
        actorInfoArray: [
            data
        ]
    });
}

function createActorInfo(level, x, z, yaw) {
    return {
        level: level,
        x: x,
        z: z,
        yaw: yaw
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export default function () {
    const url = __ENV.GAME_URL;
    const params = {tags: {my_tag: 'my ws session'}};
    const res = ws.connect(url, params, function (socket) {
        let canStart=false;
        let CustomCounter = 0;
        socket.on('open', function open() {
            console.log(`VU ${__VU}: connected`);
            const roomId = "user1-user2"
            const userId = "user" + __VU

            const data =createActorInfo("Level1",0,2.111,2.333);
            const json1 = createTagGameStatus("WAIT", roomId,userId,data)
            //console.log("message: " + JSON.stringify(json1, null, 2));
            socket.send(json1);

            const delay = 2000; // 2초(2000ms) 대기


            socket.setInterval(function timeout() {
                if(canStart) {
                    CustomCounter += 1;
                    const data = createActorInfo("Level1",  CustomCounter, 2.111, 2.333);
                    const json1 = createTagGameStatus("RUNNING", roomId, userId, data)
                    console.log("send" + json1)
                    socket.send(json1);
                }
            }, 33); // 30프레임


        });

        socket.on('message', function (message) {
            messagesReceived.add(1);

            console.log('user: ' + __VU + ' message:' + message)
            console.log(message==="게임 시작")
            if(message==="게임 시작"){
                canStart=true;
            }
            if(message.length<100)
                return;
            const dataArray = JSON.parse(message);
            const data= dataArray.actorInfoArray
            //console.log("receive message: " + JSON.stringify(data, null, 2));
            const receiveCounter  = data[0].x
            const difference = CustomCounter-receiveCounter;
            DifferencesSum.add(difference)
            //console.log(",receive,"+__VU+","+receivedRotationPitch+","+Date.now())
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
            if(__VU===1) {
                console.log(`Closing the socket forcefully 3s after graceful LEAVE`);
                const lastData = createActorInfo("Level1", 1.111 + CustomCounter, 2.111, 2.333);
                const json1 = createTagGameStatus("OVER", roomId, userId, lastData)
                console.log("send" + json1)
                socket.send(json1);
            }
            socket.close();
        }, 10000);
    });

    check(res, {'Connected successfully': (r) => r && r.status === 101});
}

