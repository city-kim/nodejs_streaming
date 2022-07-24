1. fontend에서 영상을 chunk file로 분할하여 서버로 업로드 합니다
2. 서버에서는 받은 파일을 merge 하여 영상파일로 만든 뒤 스트리밍합니다
3. 서버에 ffmpeg 가 설치되어있지 않으면 썸네일을 제작할 수 없기때문에 canvas로 video를 캡쳐하여 서버로보냅니다


------------

### git checkout 후
```
yarn run start

npm run start
```

#### 프론트 빌드시
```
cd frontend
yarn run build
```

------------

1. 파일 업로드 (분할 및 머지)
![sample1](https://user-images.githubusercontent.com/26377698/180644782-91dc650b-2906-4f02-ae4c-104ec6ce3767.gif)

2. 파일 스트리밍
![sample2](https://user-images.githubusercontent.com/26377698/180644786-b007fb6c-26a9-4d44-b5d8-e106acab6f56.gif)

3. custom video control 조작
![sample3](https://user-images.githubusercontent.com/26377698/180644788-970fd046-9726-47c1-8a11-a53d9ee8a568.gif)

4. 파일 정보수정
![sample4](https://user-images.githubusercontent.com/26377698/180644790-2e1a76b8-3472-4ebd-bba4-696353455025.gif)

5. 파일 삭제
![sample5](https://user-images.githubusercontent.com/26377698/180644792-dbedbbc1-8ad9-4dde-8a41-7235a4ab586a.gif)

6. responsive 대응 (row 수 변동)
![sample6](https://user-images.githubusercontent.com/26377698/180644795-10680e8d-7dcb-43eb-a943-1f0cd8bc490c.gif)

7. pc or mobile에 따른 aside 변동
![sample7](https://user-images.githubusercontent.com/26377698/180644796-13d78a82-cbea-4967-8623-fa4bced2eff3.gif)

8. 검색기능
![sample8](https://user-images.githubusercontent.com/26377698/180644800-9fec6c30-8805-4ded-bfd5-6654db2b0a82.gif)
