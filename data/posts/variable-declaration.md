---
title: "variable declaration in javascript"
date: "2024-02-21"
cover: "variable_declaration.jpeg"
category: "Javascript"
published: true
---

| keyword | 스코프                                     | 재선언   | 재할당   | 호이스팅                      | 초기화 선언                   |
| ------- | ------------------------------------------ | -------- | -------- | ----------------------------- | ----------------------------- |
| var     | global or function scope (선언위치에 따라) | 재선언 o | 재할당 o | 호이스팅 됨. 초기화 undefined | 초기화하지 않은 상태에서 선언 |
| let     | block scope {}                             | 재선언 x | 재할당 o | 호이스팅 됨 초기화 x          | 초기화하지 않은 상태에서 선언 |
| const   | block scope {}                             | 재선언 x | 재할당 x | 호이스팅 됨 초기화 x          | 선언과 동시에 초기화 필요     |
