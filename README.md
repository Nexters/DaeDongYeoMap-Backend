# `데동여지도` 🗺️❤️

> 위치기반 데이트 기록/공유 웹

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

<!-- TOC -->

- [`데동여지도` 🗺️❤️](#데동여지도-️️)
  - [1. 프로젝트 실행(local)](#1-프로젝트-실행local)
  - [2. 의존성 세팅](#2-의존성-세팅)
  - [3. 프로젝트 세팅](#3-프로젝트-세팅)
  - [4. 프로젝트 구조](#4-프로젝트-구조)

<!-- /TOC -->

## 1. 프로젝트 실행(local)

```
npm run start:dev
```

## 2. 의존성 세팅

- 의존성

```bash
# mongo
npm i @nestjs/mongoose mongoose
npm i -D @types/mongoose

# DTO 재사용
npm i @nestjs/mapped-types

# https://github.com/typestack/class-validator#validation-decorators
# for dto validation
npm i class-validator


# https://docs.nestjs.com/techniques/serialization
# serialization(before return Response)
# 필드 exclude등 유용하게 활용
npm i class-transformer

# import { Request } from 'express';
# Request object를 세부적으로 다루기 위해 필요
npm i @types/express
```

## 3. 프로젝트 세팅

> [realworld-example-app](https://github.com/lujakob/nestjs-realworld-example-app)를 best-practice로 구조 참조

```bash
nest g mo user
nest g mo emoji
nest g mo comment
nest g mo spot
nest g mo place
cd src && mkdir shared
```

## 4. 프로젝트 구조

```bash
├── src
│   ├── comment
│   ├── emoji
│   ├── place
│   ├── shared
│   ├── spot
│   └── user
```

기본적으로 모듈 폴더가 각 도메인(entity)을 담당합니다.

- `comment/`
  - `spot`에 대한 댓글
- `emoji/`
  - 지도에 보여질 emoji 스티커
  - `spot`에 대한 emoticon 스티커 개념
- `place/`
  - `네이버 API`를 통해 받아올 장소에 대한 정보
  - 매번 유저가 쿼리를 보낼 때마다, api로 장소 데이터를 받아오는게 비효율적이라면, 한번 요청된 데이터는 캐싱한다. (mongo 재활용 또는 redis 사용)
- `shared/`
  - 각 domain들이 공통으로 사용할 util
- `spot/`
  - `place` + `comment` `||` `emoji`
  - 기본적으로 `place/`데이터는 캐시는 되어도, db에 저장되지 않기 때문에, 상태를 가지게 되면 spot이라는 entity를 활용해 db에 저장시킵니다.
- `user`
  - 사용자 도메인

slack 테스트
