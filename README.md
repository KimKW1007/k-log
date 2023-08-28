# k : log
<p align="center">
K : Log는 개발공부를 기록하는 블로그 입니다.
</p>
<p align="center">
개인적으로 한번 만들어보고 싶어서 작업해 보았습니다.
</p>
<p align="center">
<a href="https://port-0-k-log-ac2nll9brvee.sel3.cloudtype.app" target="_blank">K : Log 바로가기</a>
</p>


## 기술 스택
### **FrontEnd**
<div>
  <img src="https://img.shields.io/badge/Next13-000000?style=for-the-badge&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-black?style=for-the-badge&logo=Recoil&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tanstack Query-FF4154?style=for-the-badge&logo=ReactQuery&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Hook Form-EC5990?style=for-the-badge&logo=ReactHookForm&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/Styled Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>
</div>


### **BackEnd**
<div>
  <img src="https://img.shields.io/badge/Next.js-E0234E?style=for-the-badge&logo=NestJs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/typeorm-FF8700?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/multer-18A497?style=for-the-badge"/>
</div>

## 상세 설명 및 미리보기
### **Client**

#### 현재 K : Log 는 반응형으로 이루어져 있습니다.

> 메인 배너
  
![banner](https://github.com/KimKW1007/k-log/assets/90603614/f474a78f-a796-416d-b886-2914d65836d0)
 - 일반적인 fade-in-out, slide가 아닌 제가 이쁘다고 생각햇고 만들어보고 싶었던 배너입니다.<br/>
  하나의 아이템 마다 삼각기둥으로 설정이 되어있고 index + duration 을 넣어줬습니다.
<br/>
<br/>

> 홈 컨텐츠

![image](https://github.com/KimKW1007/k-log/assets/90603614/1b2dd608-7ced-43ce-8e0b-00569f01f605)
 - 최신 게시물 순으로 총 7개가 나타납니다.<br/>
   제일 최신은 왼쪽 / 그 다음 순으로 오른쪽에 6개가 나열됩니다.(추후 이미지 수정 하겠습니다.)
<br/>
<br/>

> 프로젝트 배너

![project](https://github.com/KimKW1007/k-log/assets/90603614/93d37ef6-7c87-4964-ba0d-705288ec4f95)
  - 예전에 이랜드이츠 사이트를 클론했었던 기억이있는데 브랜드배너를 보고 벤치마킹한 배너입니다.<br/>
    지금까지 만들었던 프로젝트들(퍼블리싱)을 보실 수 있습니다.
<br/>
<br/>

> 검색기능

![search](https://github.com/KimKW1007/k-log/assets/90603614/a33fd09d-c3ae-4488-bb16-c2565502f935)
 - 따로 검색페이지를 만들지 않고 팝업으로 생성해보았습니다.<br/>
   개인적으로 깔끔해서 보기 좋은것 같습니다.<br/>
   기능적으로 살펴 보자면 영어는 toLowerCase를 사용해 대문자든 소문자든 검색이 되게 했습니다.<br/>
   클릭해서 게시물 페이지로 갔을 시 Localstorage에 저장이 됩니다.(최대 3개)<br/>
   검색은 title/contents 와 tags 로 나뉘고 각각 최대 5개씩 나오게 됩니다.
<br/>
<br/>

> 카테고리 페이지로 이동 시

![pagemove](https://github.com/KimKW1007/k-log/assets/90603614/4f9c9738-9ada-4266-a2ff-1434ae093f3a)
 - 카테고리에서 하나를 선택해 이동 시 모습입니다.

![write](https://github.com/KimKW1007/k-log/assets/90603614/5f71c68d-a85c-4a57-9c9b-527647e22799)
  - 하위 카테고리로 이동을 해야 글쓰기 버튼이 보이고 글쓰기 버튼은 관리자만 보입니다.
<br/>
<br/>

> 게시물 페이지로 이동 시

![detail](https://github.com/KimKW1007/k-log/assets/90603614/e7630b4a-2036-492a-84f5-997c4078ff9f)
 - 해당 게시물의 디테일 페이지 입니다.<br/>
   게시물의 내용 및 태그/ 댓글을 볼 수 있습니다.
<br/>
<br/>

> 댓글

![guestcomment](https://github.com/KimKW1007/k-log/assets/90603614/f6fd671d-51a5-4740-9c4d-d7f27b121da7)

![admincomment](https://github.com/KimKW1007/k-log/assets/90603614/9eca284f-ac56-4f73-91a5-509a9919211c)

 - 댓글의 스타일이 관리자와 일반 유저는 다르게 표시 됩니다.


<br/>
<br/>

> 글 수정 및 삭제

![detailUDBtn](https://github.com/KimKW1007/k-log/assets/90603614/7133130b-fed0-4be8-ac6e-c41fd2186022)

 - 해당 기능은 관리자만 가능합니다.<br/>
   물방울 처럼 분리되는 느낌으로 스타일링을 해보았습니다.


<br/>
<br/>

> 계정 설정

![accountEdit](https://github.com/KimKW1007/k-log/assets/90603614/00c7b7bb-6784-4f53-a7e8-13a74fb6c498)

 - 해당 페이지의 기능 중 카테고리 및 배너설정 기능은 관리자만 가능합니다.<br/>
   일반 유저는 이미지 변경, 내정보 변경, 비밀번호 변경, 회원탈퇴 만 가능합니다.


## 시스템 아키텍쳐

![Frame 11](https://github.com/KimKW1007/k-log/assets/90603614/3513944e-0ba6-4106-b88d-22ad9fcb56f2)

![Frame 12](https://github.com/KimKW1007/k-log/assets/90603614/94514547-08cd-4736-8eec-2a662c598095)

<br/>
<br/>

## 기능 목록

![Frame 14](https://github.com/KimKW1007/k-log/assets/90603614/78702c54-337a-47ae-adcc-c2dc74d3d262)



