---
title: "UI Landing — Universe"
url: "https://www.tadadadacoding.com/ui/landing-universe"
date: "2025-05"
imagePath: "landing-universe"
cover: "universe.jpeg"
images:
  - "universe.jpeg"
  - "universe02.jpeg"
  - "universe03.jpeg"
  - "universe04.jpeg"
github: "https://github.com/jiapril11/TadadadaCoding/tree/dev/src/app/ui/landing-universe"
people: "1명(Frontend-1)"
categories:
  - "Next"
  - "UI"
description: "소설 '헤일 메리 프로젝트'를 테마로 한 스크롤 인터랙션 랜딩 페이지"
skills:
  - "Next.js"
  - "TypeScript"
  - "GSAP"
  - "ScrollTrigger"
  - "WebGL"
  - "Tailwindcss"
---

## Section 1 — 우주 배경 타이틀

- `GSAP ScrollTrigger`의 `scrub`을 활용해 스크롤에 따라 텍스트 3줄이 모이며 타이틀이 완성되는 애니메이션 구현
- `scale(20)` → `scale(1)` 트랜지션으로 우주에서 줌인하는 효과 연출

## Section 2 — 태양계 가로 스크롤

- 행성 카드 9개를 가로로 배치하고 `GSAP` 수평 스크롤 애니메이션 구현
- `pinSpacing`과 `scrub`으로 세로 스크롤을 가로 이동으로 변환

## Section 3 — WebGL 유기체

- `WebGL`과 GLSL 셰이더로 살아 움직이는 유기체 파티클 필드 구현
- `IntersectionObserver`로 화면 밖에서는 `requestAnimationFrame`을 중단해 성능 최적화
- 섹션 진입 시 인용구가 페이드인으로 오버레이 표시

## Section 4 — 엔딩 이미지

- 우주 배경 이미지 위에 인용구가 페이드인으로 등장하는 엔딩 장면 구현

## 반응형

- 모바일/데스크톱 레이아웃 분리 (`md:hidden` / `hidden md:block`)
- 모바일에서는 `GSAP sticky` 대신 단순 `h-screen` 섹션으로 구성해 브라우저 호환성 확보
- `overflow-x: clip`으로 가로 스크롤 방지 및 `position: sticky` 동작 보장
