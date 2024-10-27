### 테스트8
- 랭킹 조회 API 부하 테스트

#### 설정
- 가상 유저(VU) 20명 생성
- 초당 10회


### 실행결과
```
//중략
     data_received..................: 1.4 MB 138 kB/s
     data_sent......................: 121 kB 12 kB/s
     http_req_blocked...............: avg=11.64µs  min=1.86µs  med=2.13µs   max=10.27ms  p(90)=2.21µs   p(95)=2.25µs
     http_req_connecting............: avg=768ns    min=0s      med=0s       max=900.63µs p(90)=0s       p(95)=0s    
     http_req_duration..............: avg=6.11ms   min=4.3ms   med=5.95ms   max=13.75ms  p(90)=7.28ms   p(95)=7.73ms
       { expected_response:true }...: avg=6.11ms   min=4.3ms   med=5.95ms   max=13.75ms  p(90)=7.28ms   p(95)=7.73ms
     http_req_failed................: 0.00%  0 out of 3225
     http_req_receiving.............: avg=312.16µs min=22.6µs  med=229.91µs max=2.36ms   p(90)=790.58µs p(95)=1.02ms
     http_req_sending...............: avg=42.65µs  min=29.45µs med=38.3µs   max=367.91µs p(90)=53.45µs  p(95)=63.92µs
     http_req_tls_handshaking.......: avg=7.82µs   min=0s      med=0s       max=9.01ms   p(90)=0s       p(95)=0s    
     http_req_waiting...............: avg=5.75ms   min=4.11ms  med=5.6ms    max=13.44ms  p(90)=6.79ms   p(95)=7.2ms 
     http_reqs......................: 3225   322.356539/s
     iteration_duration.............: avg=6.18ms   min=4.38ms  med=6.02ms   max=20.05ms  p(90)=7.34ms   p(95)=7.8ms 
     iterations.....................: 3225   322.356539/s
     vus............................: 2      min=2         max=2
     vus_max........................: 2      min=2         max=2


//중략
```
### 결과
- 총 10회를 진행
- 메트릭 값중 sent data와 received data를 측정

| 횟수 | 평균 처리 시간 | 최대 처리 시간 | 보낸 요청 갯수 |
|:---|:--------:|:--------:|:--------:|
| 1  |  6.99ms  |   22.15ms    |    2825    |
| 2  |  6.43ms  |   15.85ms    |   3068    |
| 3  |  6.07ms  |   11.89ms    |    3246    |
| 4  |  6.11ms  |   13.75ms    |  3225   |
| 5  |  6.05ms  |  13.1ms    |    3257    |
| 6  |   6.12ms    |   12.78ms    |   3222   |
| 7  |   5.96ms    |   14.64ms    |   3306    |
| 8  |   6.26ms    |   11.08ms    |    3148     |
| 9  |   6.1ms    |   14.99ms    |   3218   |
| 10 |   6.04ms    |   14.1ms    |    3262     |





