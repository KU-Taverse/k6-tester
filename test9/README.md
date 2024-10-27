### 테스트9
- 리듬 게임 저장 API 동시성 테스트

#### 설정
- 가상 유저(VU) 10명 생성
- 리듬 게임 저장 API 호출
- 리듬 게임 랭킹 조회로 정확성 테스트


### 실행결과

```
//중략
     {
    "isSuccess": true,
    "response": [
        {
            "characterName": "전영태",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.142727368"
        },
        {
            "characterName": "박소영",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.134619519"
        },
        {
            "characterName": "박능수",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.149943378"
        },
        {
            "characterName": "민덕기",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.13730165"
        },
        {
            "characterName": "김형석",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.146633125"
        },
        {
            "characterName": "김학수",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.140008315"
        },
        {
            "characterName": "김성열",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.132559673"
        },
        {
            "characterName": "김기천",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.15711865"
        },
        {
            "characterName": "개발자",
            "score": 1,
            "createdAt": "2024-10-27T07:48:34.130997072"
        }
    ]
}


//중략
```
### 결과
- 총 10회를 진행
- 메트릭 값중 sent data와 received data를 측정

| 횟수 | 평균 처리 시간 | 최대 처리 시간 | 보낸 요청 갯수 |
|:---|:--------:|:--------:|:--------:|
| 1  | 34.61ms   |64.87ms       |      1427  |
| 2  | 32.06ms   |363.14ms       |      1530  |
| 3  |    |       |        |
| 4  |    |       |        |
| 5  |    |       |        |
| 6  |    |       |        |
| 7  |    |       |        |
| 8  |    |       |        |
| 9  |    |       |        |
| 10 |    |       |        |






