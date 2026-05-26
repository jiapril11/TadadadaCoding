---
title: "해냄!"
url: "https://haenaem-jet.vercel.app/"
date: "2026-04 ~ "
imagePath: "haenaem"
cover: "haenaem.png"
images:
  - "haenaem.png"
  - "haenaem02.png"
  - "haenaem03.png"
  - "haenaem04.png"
github: "https://github.com/jiapril11/haenaem"
people: "1명(Frontend-1)"
categories:
  - "Next"
  - "Typescript"
  - "Supabase"
description: "목표를 세우고 매일 기록하는 습관 형성 앱"
skills:
  - "Next.js"
  - "Typescript"
  - "Supabase"
  - "Tailwindcss"
  - "TanStack Query"
  - "date-fns"
  - "web-push"
  - "PWA"
  - "Google OAuth"
  - "Vercel"
  - "git"
  - "github"
---

## 홈 (목표 관리):

- 오늘 완료한 목표 수와 목표별 스트릭 배지를 표시하여 달성 동기부여 제공
- 점 기록(DotRow)과 진행률 바로 목표 진행 현황 시각화
- `TanStack Query`를 활용한 **낙관적 업데이트**로 기록 체크/해제 즉시 반영

## 통계:

- 이번 주 / 이번 달 **히트맵**으로 날짜별 달성 현황 시각화
- 요일별 달성 패턴 바 차트와 현재·최장 스트릭 지표 제공

## 커뮤니티:

- 공개 설정한 목표를 피드 형식으로 표시하고 **응원(하트)·댓글 기능** 구현
- 서버 액션에서 **비속어 필터링** 처리 및 `Supabase` RLS를 적용하여 댓글
  작성자 본인만 삭제 가능하도록 처리

## 인증:

- `Supabase` **Google OAuth**로 소셜 로그인 구현
- 최초 로그인 시 닉네임 설정 **온보딩 플로우** 추가

## 알림:

- `web-push`와 PWA Service Worker를 이용해 **목표별 지정 시간 알림** 구현
- 비 PWA 환경(일반 브라우저)에서는 알림 설정 UI를 **비활성화 처리하여 분기**

## 날짜 처리:

- 서버·클라이언트 전반에서 `date-fns-tz`를 활용해 **KST 기준 날짜 계산** 처리
- UTC 기반 서버 환경에서 자정 기준 날짜 오차가 발생하는 **이슈** → KST 변환
  유틸 함수를 분리하여 일관성 있게 적용
