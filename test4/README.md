### 테스트3
- 1명의 유저들이 10초 동안 초당 10번의 요청을 보내였을때, 나머지 유저가 동일한 데이터를 순서대로 받을 수 있는 지 확인한다.

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
//중략
```
### 실행결과
```

     ✓ Connected successfully

     checks................: 100.00% 10 out of 10
     data_received.........: 118 kB  11 kB/s
     data_sent.............: 15 kB   1.4 kB/s
     iteration_duration....: avg=11.13s min=11.13s med=11.13s max=11.14s p(90)=11.14s p(95)=11.14s
     iterations............: 10      0.897379/s
     messages_received.....: 990     88.84054/s
     vus...................: 10      min=10       max=10
     vus_max...............: 10      min=10       max=10
     ws_connecting.........: avg=1.13s  min=1.12s  med=1.13s  max=1.14s  p(90)=1.14s  p(95)=1.14s
     ws_msgs_received......: 990     88.84054/s
     ws_msgs_sent..........: 99      8.884054/s
     ws_session_duration...: avg=11.13s min=11.12s med=11.13s max=11.14s p(90)=11.14s p(95)=11.14s
     ws_sessions...........: 10      0.897379/s

```
### 결과
- 총 10회를 진행
- 메트릭 값중 sent data와 received data를 측정
- 데이터를 순서 대로 받는 것을 확인
- 아래는 실행 결과 일부
```js
[36mINFO[0m[0001] message{"userId":"user1","nickname":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 5 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 10 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 4 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 8 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 7 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 2 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 3 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 9 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 1 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
[36mINFO[0m[0001] user: 6 message:{"userId":"user1","nickName":"유저1","content":"암호는4"} 
```

