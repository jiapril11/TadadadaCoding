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
  - "Vibe Coding"
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
  - "Claude Code"
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

## AI 활용 (바이브코딩):

> 이 프로젝트는 **Claude Code**를 활용한 **바이브코딩(Vibe Coding)** 방식으로 개발되었습니다.

- **요구사항 중심 개발**: 구현하고 싶은 기능을 자연어로 전달하고, AI가 생성한 코드를 직접 검토·수정하며 빠르게 프로토타이핑
- **복잡한 로직 협업**: `web-push` 알림 스케줄링, Supabase RLS 정책 설계, 낙관적 업데이트 등 복잡한 구현을 AI와 함께 설계하고 최적화
- **디버깅 효율화**: UTC/KST 날짜 불일치 이슈, PWA Service Worker 등록 오류 등 까다로운 버그를 AI와 페어 디버깅으로 신속하게 해결
- **코드 품질 유지**: AI가 생성한 코드를 단순히 붙여넣는 것이 아니라, 코드를 이해하고 프로젝트 컨벤션에 맞게 리팩토링하며 오너십 유지

<!-- AI 도구를 적극적으로 활용해 **혼자서도 풀스택 기능을 빠르게 완성**하는 개발 역량을 갖추고 있습니다. -->
