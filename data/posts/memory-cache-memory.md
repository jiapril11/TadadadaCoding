---
title: "메모리와 캐시 메모리"
coverTitle: "Memory and Cache Memory"
date: "2024-04-01"
category: "System"
published: true
---

## RAM의 특징과 종류

### RAM의 특징

- **휘발성 저장 장치(volatile memory)**: 전원을 끄면 RAM에 저장된 명령어와 데이터가 날아감. <-> **비휘발성 저장 장치(non-volatile memory)**: 전원이 꺼져도 저장된 내용이 유지(보조기억장치: SSD, CD-ROM, USB...)
- CPU는 보조기억장치에 직접 접근하지 못해서 실행하고 싶은 프로그램이 보조기억장치에 있다면 RAM으로 복사하여 저장한 뒤 실행
- 보조기억장치에는 보관할 대상을, RAM에는 실행할 대상을 저장

### RAM의 용량과 성능

- RAM 용량↓: 보조기억장치에서 실행할 프로그램을 가져오는 일이 잦아 실행시간이 길어짐
- RAM 용량↑: 보조기억장치에서 많은 데이터를 가져와 미리 RAM에 저장할 수 있어 많은 프로그램을 동시에 실행하는데 유리

### RAM의 종류

|           |      DRAM       |    SRAM     |
| :-------: | :-------------: | :---------: |
|  재충전   |     필요함      |  필요없음   |
|   속도    |      느림       |    빠름     |
|   가격    |     저렴함      |    비쌈     |
|  집적도   |      높음       |    낮음     |
| 소비 전력 |      적음       |    높음     |
| 사용 용도 | 주기억장치(RAM) | 캐시 메모리 |

#### SDRAM(Synchronous Dynamic RAM)

- 클럭 신호와 동기화된, 발전된 형태의 DRAM
- 클럭 타이밍에 맞춰 CPU와 정보를 주고 받을 수 있음

#### DDR SDRAM(Double Data Rate SDRAM)

- 대역폭(data rate: 데이터를 주고 받는 길의 너비)를 넓혀 속도를 빠르게 만든 SDRAM
- 최근 가장 흔히 사용됨
- SDRAM(1클럭에 하나씩)-DDR SDRAM(2배)-DDR2 SDRAM(4배)-DDR3 SDRAM(16배)

## 메모리의 주소 공간

### 물리 주소

- 정보가 실제로 저장된 하드웨어상의 주소

### 논리 주소

- CPU가 이해하는 주소
- 실행 중인 프로그램에게 각각 부여된 0번지부터 시작되는 주소

### 메모리 관리 장치(MMU: Memory Management Unit)

- 논리 주소와 물리 주소 간의 변환

## 캐시 메모리(Cache memory)

- CPU와 메모리 사이에 위치하여 CPU의 연산 속도와 메모리 접근 속도 차이를 줄임
- 레지스터보다 용량이 크고 메모리보다 빠른 SRAM 기반의 저장 장치
- CPU와 가까운 순으로 L1(Level 1) - L2 - L3 캐시라고 부름
- 일반적으로 L1, L2 캐시는 코어(CPU) 내부에, L3는 코어 외부에 위치함

![저장 장치 계층 구조](/imgs/blog/posts/cache-memory/memory_hierarchy.png)

### 참조 지역성 원리(locality of reference, principle of locality)

1. CPU는 최근 접근했던 메모리 공간에 다시 접근하려는 경향이 있다.
2. 공간 지역성(spatial locality): CPU는 접근한 메모리 공간 근처를 접근하려는 경향이 있다

- 캐시 히트(cache hit): 캐시 메모리가 사용될 것으로 예측한 데이터가 실제로 CPU에서 활용될 경우
- 캐시 미스(cache miss): 예측이 틀려 CPU가 필요한 데이터를 메모리에 직접 가져올 경우
- 캐시 적중률(cache hit ration): 캐시가 히트되는 비율 -> 캐시 히트 횟수 / (캐시 히트 횟수 + 캐시 미스 횟수)
- 참조 지역성의 원리에 따라 데이터를 예측하여 캐시 적중률을 높임

출처:  
[개발자를 위한 컴퓨터공학 1: 혼자 공부하는 컴퓨터구조 + 운영체제](https://www.inflearn.com/course/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B5%AC%EC%A1%B0-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C)
