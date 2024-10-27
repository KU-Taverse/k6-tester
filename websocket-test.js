import ws from 'k6/ws';
import { check } from 'k6';



const positionX = 1.111;
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
    const url = 'ws://3.37.143.131:8080/map';
    const params = { tags: { my_tag: 'hello' } };
    const userId = `1`;
    let pongCount = 0;
    let messageCount = 0;
    let frameCount = 0;
    let variable = 0;

    const res = ws.connect(url, params, function (socket) {


        socket.on('open',function open(){
            console.log("열림");
            const intervalId = socket.setInterval(function () {
                const message = JSON.stringify(
                    {
                        mapRequestType: "SAVE",
                        userId: userId + frameCount,
                        positionX: positionX + frameCount,
                        positionY: positionY + frameCount,
                        positionZ: positionZ + frameCount,
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
                socket.send(message); // 메시지 전송
                console.log('Message sent:', message); // 전송된 메시지 출력
                frameCount++; // 프레임 카운터 증가
            }, 33); // 약 33ms 간격으로 메시지 전송 (1초 / 30프레임)

            //시간설정
            socket.setTimeout(function () {
                console.log('닫힘');
                console.log('갯수', messageCount);
                socket.close();
            }, 10000);//일단 0.1초만 테스트
        },33)

        socket.on('message', (data) => {
            messageCount++;
            console.log('Message received: ', data)
        });
        socket.on('close', () => console.log('disconnected'));

        socket.on('error', (e) => {
            if (e.error() != 'websocket: close sent') {
                console.log('An unexpected error occurred: ', e.error());
            }
        });






    });

    check(res, { 'status is 101': (r) => r && r.status === 101 });
}