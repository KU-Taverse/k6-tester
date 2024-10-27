import ws from 'k6/ws';
import {check} from 'k6';
import {Counter} from 'k6/metrics';

let messagesReceived = new Counter('messages_received');
export const options = {
    vus: 10,
    iterations: 10
};
export default function () {
    const url = `wss://kutaverse.xyz/game-service/chat`;
    const params = {tags: {my_tag: 'my ws session'}};
    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function open() {
            console.log(`VU ${__VU}: connected`);
            socket.setInterval(function timeout() {
                const message = JSON.stringify({
                    userId: `user${__VU}`,
                    nickname: `유저${__VU}`,
                    content: "나여기 있소"
                })
                //console.log("message" + message)
                socket.send(message);
            }, 100); // 0.1초에 한번씩
        });

        socket.on('message', function (message) {
            messagesReceived.add(1);
            //console.log('message:' + message)
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

    check(res, { 'Connected successfully': (r) => r && r.status === 101 });
}


// {
//     "tagGameStatus": "TAG_GAME_WAITING_FOR_PLAYERS",
//     "request": {
//     "userId":"user1"
// }
// }