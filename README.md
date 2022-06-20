# 원티드 프리온보딩 백엔드 코스 선발과제

## 개발 환경
- OS: macOS
- Editor: Visual Studio Code
- DBMS: MySQL (8.0.29)
- Language: Typescript
- Platform: Node.js (16.15.1)
- Framework: NestJS
- ORM: TypeORM

## RDB Modeling
### Entities
- Company(회사), Job(채용공고), User(유저), Apply_History(지원내역)
### Relationship
- Company <-> Job 
  - 회사는 채용공고를 여러 개 작성할 수 있다. (일대다 관계 성립)
- User <-> Job
  - 하나의 채용공고에 서로 다른 유저가 지원할 수 있고 한 명의 유저 또한 여러 채용공고에 지원할 수 있다. (다대다 관계 성립)
  - 다대다 관계이므로 Apply-History라는 조인 테이블을 둔다.
### ERD 
![wanted_pre_onboarding_ERD](https://user-images.githubusercontent.com/68889506/174551795-32ed0507-a567-4630-9d6f-944214252828.png)

## Restful API Reference
<img width="498" alt="스크린샷 2022-06-20 오후 4 07 00" src="https://user-images.githubusercontent.com/68889506/174552035-324414f7-5382-4a58-b174-6551760017b1.png">

구현한 모든 API는 링크를 통해 확인해주세요 -> https://shininggiver.gitbook.io/wanted_pre_onboarding/

## 실행 방법

### 사전 설치가 필요한 소프트웨어
- MySQL (8.0.29) 다운로드 -> https://dev.mysql.com/downloads/installer/
- Node.js (16.15.1) 다운로드 -> https://nodejs.org/ko/

### 프로젝트 실행 준비
- git clone 명령어를 통해 프로젝트를 로컬에 다운받는다.
- npm install 명령어를 통해 프로젝트의 dependency를 모두 다운받는다.
- 아래 사진과 같이 .env 파일의 MYSQL_USERNAME, MYSQL_PASSWORD 부분을 자신의 mysql 계정 정보에 맞게 수정해주세요.
  <img width="466" alt="스크린샷 2022-06-20 오후 5 01 34" src="https://user-images.githubusercontent.com/68889506/174556848-869ef045-cf14-4c45-9e88-dc331252f930.png">

- local에서 본인 계정으로 mysql server에 접속하여 'wanted_pre_onboarding' 데이터베이스를 만들어주세요. (SQL 명령어 -> CREATE DATABASE wanted_pre_onboarding)

### 프로젝트 실행 명령어
- npm run start:dev 
- 프로젝트 실행시 임의의 유저 10명과 회사 3곳의 데이터가 seeding 됩니다. 채용공고 데이터와 지원내역 데이터는 seeding 하지 않았습니다.
- <img width="921" alt="스크린샷 2022-06-20 오후 5 17 56" src="https://user-images.githubusercontent.com/68889506/174557359-64571c7f-d362-434e-86cf-a07d6040e8cc.png">

### 테스트 명령어
- npm run test
