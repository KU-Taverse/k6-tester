### 테스트3
- 10명의 유저들이 10초 동안 초당 10번의 요청을 보내였을때, 나머지 유저가 동일한 데이터를 순서대로 받을 수 있는 지 확인한다.

#### 설정
- 가상 유저(VU) 10명 생성
- 100 밀리초 마다 채팅 요청을 하도록 설정
- 송신자 1명은 매번 채팅 내용에 암호값을 변경하여 송신

```js
//중략
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
k6 run --console-output=./test5/output.log ./test5/http-ranking-get-test.js
//중략
```
### 실행결과
```
36mINFO[0m[0000] user: 1 message:{"userId":"user1","nickName":"유저1","content":"암호는1"} 
[36mINFO[0m[0000] user: 7 message:{"userId":"user1","nickName":"유저1","content":"암호는1"} 
[36mINFO[0m[0000] user: 4 message:{"userId":"user1","nickName":"유저1","content":"암호는1"} 
[36mINFO[0m[0000] user: 3 message:{"userId":"user4","nickName":"유저4","content":"암호는1"} 
[36mINFO[0m[0000] user: 9 message:{"userId":"user1","nickName":"유저1","content":"암호는1"} 
[36mINFO[0m[0000] user: 5 message:{"userId":"user1","nickName":"유저1","content":"암호는1"} 
[36mINFO[0m[0000] user: 2 message:{"userId":"user4","nickName":"유저4","content":"암호는1"} 
[36mINFO[0m[0000] user: 4 message:{"userId":"user4","nickName":"유저4","content":"암호는1"} 
[36mINFO[0m[0000] user: 3 message:{"userId":"user6","nickName":"유저6","content":"암호는1"} 
[36mINFO[0m[0000] user: 4 message:{"userId":"user6","nickName":"유저6","content":"암호는1"} 
[36mINFO[0m[0000] user: 2 message:{"userId":"user6","nickName":"유저6","content":"암호는1"} 
[36mINFO[0m[0000] user: 1 message:{"userId":"user4","nickName":"유저4","content":"암호는1"} 
[36mINFO[0m[0000] user: 1 message:{"userId":"user6","nickName":"유저6","content":"암호는1"} 
[36mINFO[0m[0000] user: 6 message:{"userId":"user6","nickName":"유저6","content":"암호는1"} 
[36mINFO[0m[0000] user: 9 message:{"userId":"user4","nickName":"유저4","content":"암호는1"} 
//일부분
```
### 결과
- 총 10회를 진행


