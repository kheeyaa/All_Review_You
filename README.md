# 🫒 All Review You

![image](https://user-images.githubusercontent.com/76723666/142566229-10907106-4ea2-4255-a53e-59618edfbcab.png)

## 기획 의도

- 모든 리뷰를 모아 한 눈에 볼 수 있는 리뷰 전용 블로그 "All Review You"
- 유저들이 자유롭게 자신이 사용한 상품이나 방문했던 음식점, 시청한 영화/드라마에 대한 리뷰를 작성할 수 있는 리뷰 전용 블로그이다.
- 리뷰에 대한 별점과 관련한 태그를 작성할 수 있다.
- 텍스트 에디터를 사용해 리뷰를 작성하고 게시할 수 있다.
- 리뷰에 대한 다른 유저들의 생각을 댓글로 자유롭게 소통할 수 있다.
- 좋아요 누른 리뷰들도 모아서 볼 수 있다.

![responsive](https://user-images.githubusercontent.com/76723666/142566147-ec6130d6-3653-435a-8947-2526eec60e7b.gif)


## 구성 페이지 기능

### 메인 페이지
- 카테고리(태그) 분류하여 리뷰 렌더링
<img src="https://user-images.githubusercontent.com/50583262/142808306-f090087d-31ac-4967-97a1-f177b444e8f8.gif"  width="600" />

- 최신 순/ 좋아요 순 정렬
- 무한 스크롤

![infinity_scroll](https://user-images.githubusercontent.com/76723666/142565901-4d9befc7-e11d-477d-b801-321c02e19432.gif)

- 로딩시 스피너

![spinner](https://user-images.githubusercontent.com/76723666/142565971-47dcc5f4-e75f-4c82-a1c8-4ad1096b50cc.gif)

- 좋아요 버튼

![likes](https://user-images.githubusercontent.com/76723666/142565983-982b3bdc-a291-4979-a565-3369b6eaf723.gif)


### 검색 페이지

- 검색 기능 구현
- 무한 스크롤

![search](https://user-images.githubusercontent.com/76723666/142566060-96c40d79-0ce1-4003-ba38-0f008b7d57ea.gif)


### 로그인, 회원가입 페이지
- 아이디 저장
<img src="https://user-images.githubusercontent.com/50583262/142808521-38bdca14-8e5a-4a6f-aea8-a31663b749fd.gif"  width="600" />

- 자동 로그인

### 마이 페이지
- 자기가 작성한 리뷰 렌더링
- 자기가 좋아요한 리뷰 렌더링
<img src="https://user-images.githubusercontent.com/50583262/142808812-f7b13fc8-716c-4817-9180-7b699fea6665.gif"  width="600" />

- 최근 본 리뷰 렌더링

### 리뷰 작성 페이지
- 리뷰 작성 (제목, 태그, 별점 설정, 컨텐츠)

![edit](https://user-images.githubusercontent.com/76723666/142566093-bcd54f19-4dae-4ddd-bd5d-05b97f3e9cbb.gif)

- 수정, 삭제

![edit-delete](https://user-images.githubusercontent.com/76723666/142566097-e5438744-4764-4fe3-a5c6-212c78859d47.gif)


### 리뷰 상세 페이지
- 작성된 리뷰 내용 렌더링 (+별점)
- 좋아요 누르기
- 댓글 기능
<img src="https://user-images.githubusercontent.com/50583262/142807180-ecbe232c-856f-4893-8c89-4fadba748b97.gif"  width="600" />

- 태그 기반으로 비슷한 유형의 게시글 렌더링
<img src="https://user-images.githubusercontent.com/50583262/142807203-7b1a5134-621a-4996-bf54-725b1bd3b013.gif"  width="600" />


## 기술 스택

- HTML, CSS JavaScript
- Sass, Babel, Webpack
- **이미지 및 파일 전송**
    - multer
- **로그인 관련**
    - jwt
    - bcrypt
- **에디터**
    - quill
- **무한 스크롤**
    - Intersection Observer API
- **스타 찍기**
    - rater-js
