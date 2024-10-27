### 테스트3
- 2명의 유저들이 10초 동안 수박게임을 플레이할때, 서버에서 처리시간을 측정

#### 설정
- 가상 유저(VU) 2명 생성
- 30프레임 단위로 송신


### 실행결과
```
//중략
    checks................: 100.00% 2 out of 2
    data_received.........: 124 kB  12 kB/s
    data_sent.............: 122 kB  12 kB/s
    iteration_duration....: avg=10.13s   min=10.13s   med=10.13s   max=10.13s   p(90)=10.13s   p(95)=10.13s
    iterations............: 2       0.197318/s
    messages_received.....: 606     59.787315/s
    vus...................: 2       min=2       max=2
    vus_max...............: 2       min=2       max=2
    ws_connecting.........: avg=129.55ms min=127.13ms med=129.55ms max=131.97ms p(90)=131.49ms p(95)=131.73ms
    ws_msgs_received......: 606     59.787315/s
    ws_msgs_sent..........: 608     59.984632/s
    ws_session_duration...: avg=10.13s   min=10.13s   med=10.13s   max=10.13s   p(90)=10.13s   p(95)=10.13s
    ws_sessions...........: 2       0.197318/s

//중략
```
### 결과
- 총 10회를 진행
- 메트릭 값중 sent data와 received data를 측정

| 횟수 | 보낸 데이터 갯수  | 받은 데이터 갯수 | 편차 합 |
|:---|:----------:|:---------:|:----:|
| 1  |    568    |    566   |  -1  |
| 2  |     573   |    572   | -87  |
| 3  |    606    |    604   |  -1  |
| 4  |    594    |    592   | -247 |
| 5  |     550   |    552   |  -4  |
| 6  |     550   |   549    | -145 |
| 7  |     608   |    607   | -28  |
| 8  | 590       |    589   |  0   |
| 9  |    569    |    568  | -138 |
| 10 |   608     |    606   |  0   |


// GAME_URL="wss://kutaverse.xyz/dis-game-service-2/game" k6 run ./test7/http-ranking-get-test.js



