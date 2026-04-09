---
title: "Haru"
url: "haru-lac.vercel.app"
date: "2026-03 ~ 2026-04"
imagePath: "bookmark_todo"
cover: "landing.png"
images:
  - "landing.png"
  - "todos.png"
  - "calendar.png"
  - "bookmarks.png"
  - "bookmark-add.png"

github: "https://github.com/jiapril11/haru"
people: "1명(Frontend-1)"
categories:
  - "Next"
  - "Typescript"

description: "북마크와 할일을 한 곳에서 관리하는 웹 애플리케이션. URL 저장 시 메타데이터를 자동 수집하고, 투두는 기간·우선순위·달력으로 체계적으로 관리한다."

skills:
  - "Next.js"
  - "TypeScript"
  - "Supabase"
  - "TanStack Query"
  - "Tailwind CSS"
  - "dnd-kit"
  - "date-fns"
  - "HTML5"
  - "CSS3"
  - "git"
  - "github"
---

## 북마크

- URL 입력 시 `og:title`, `description`, `favicon`을 자동 수집하는 API Route 구현
- 태그 기반 필터링과 제목·URL·태그 통합 검색 기능 구현
- `TanStack Query`로 데이터를 캐싱하여 필터·검색 시 서버 재요청 없이 클라이언트에서 즉시 필터링

## 투두

- 오늘·이번 주·이번 달·전체 탭으로 마감일 기반 분류
- `dnd-kit`을 사용한 드래그 앤 드롭 순서 변경 구현 및 `sort_order` DB 동기화
- 단일 마감일과 기간(start~end) 두 가지 타입 지원, 기간 투두는 날짜 그리드로 일별 체크

## 달력

- `date-fns`로 월별 달력을 직접 구현 (라이브러리 미사용)
- 기간 투두의 경우 범위 내 모든 날짜에 도트 표시 및 날짜 클릭 시 해당 투두 목록 노출

## 인증 · 데이터

- `Supabase Auth`로 이메일 로그인·회원가입 구현
- Row Level Security(RLS)로 DB 수준에서 본인 데이터만 접근 가능하도록 설정
- `@supabase/ssr`과 Next.js `proxy`(middleware)로 서버·클라이언트 세션 동기화

## UI

- CSS 변수 기반 다크·라이트 모드 구현 (`next-themes`)
- 모바일에서는 하단 탭바로 전환되는 반응형 레이아웃
- Pretendard 폰트 `next/font/local`로 최적화 적용
