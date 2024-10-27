import ws from 'k6/ws';
import {check} from 'k6';
import {Counter} from 'k6/metrics';

export const options = {
    vus: 4,
    iterations: 4
};
export default function () {
    const url = `wss://kutaverse.xyz/game-service/taggame`;
    const params = {tags: {my_tag: 'my ws session'}};
    const res = ws.connect(url, params, function (socket) {
        socket.on('open', function open() {
            //websocket open 이면 메세지를 보낸다
            console.log(`VU ${__VU}: connected`);

            const message = JSON.stringify({
                tagGameStatus: 'TAG_GAME_WAITING_FOR_PLAYERS',
                request: {
                    userId: 'user' + __VU,
                },
            });
            console.log('send message'+message)
            socket.send(message);
        });

        socket.on('message', function (message) {
            //messagesReceived.add(1);
            console.log('message:' + message)
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