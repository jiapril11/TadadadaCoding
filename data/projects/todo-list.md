---
title: "React Todo App"
url: "https://jiapril11.github.io/react-todo"                       
date: "2026-02"                                           
imagePath: "react_todo"
cover: "react_todo.png"
images:
  - "react_todo.png"
  - "react_todo02.png"
  - "react_todo03.png"
github: "https://github.com/jiapril11/react-todo"
people: "1명(Frontend-1)"
categories:
  - "React"
  - "Javascript"
description: "할 일을 추가, 삭제, 완료 처리할 수 있는 Todo 앱"
skills:
  - "React"
  - "Javascript"
  - "Redux"
  - "React Router"
  - "Styled Components"
  - "git"
  - "github"
---

## Todo List

- `Redux`로 todo 데이터를 전역 상태로 관리하고 추가, 삭제, 완료 상태 변경 기능 구현
- WORKING / DONE 목록을 분리하여 `isDone` 상태에 따라 필터링하여 표시

## Todo Detail

- `React Router`의 동적 라우팅(`:id`)을 활용하여 각 todo의 상세 페이지 구현
- `useNavigate`로 이전 페이지로 돌아가는 네비게이션 처리

## Responsive Layout

- Styled Components 내 미디어 쿼리 헬퍼(`breakpoints.js`)를 모듈화하여 일관된 반응형 스타일 관리
- 태블릿(768px) 이하에서 WORKING / DONE 섹션이 세로로 배치되도록 grid 레이아웃 조정