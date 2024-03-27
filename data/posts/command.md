---
title: 소스 코드와 명령어
coverTitle: "Source code and Commend"
date: "2024-03-27"
category: "System"
published: true
---

## 고급 언어

- 사람이 이해하기 쉽도록 설계된 프로그래밍 언어
- 고급 언어로 작성된 코드는 컴퓨터가 직접 실행하기 전에 컴파일러나 인터프리터를 통해 저급 언어로 번역됨
- Python, Java, C#, JavaScript ...

## 저급 언어

- 컴퓨터가 이해하기 쉽도록 설계된 프로그래밍 언어
- 일반적으로 이진 숫자로 표현되며, 직접 하드웨어에 접근하여 특정한 작업을 수행할 수 있음
- 기계어, 어셈블리어

## 컴파일 언어

- 소스코드를 한 번에 번역하여 실행 파일을 생성
- 실행 속도가 빠르지만, 실행 파일을 생성하는 데 시간이 소요
- 컴파일: 컴파일 언어로 작성된 소스 코드가 컴파일러에 의해 저급언어로 변환되는 것
- 목적코드: 컴파일 결과로 저급 언어인 목적 코드가 생성
- C, C++, Go, Rust ...

## 인터프리트 언어

- 인터프리터에 의해 소스코드를 한 줄씩 해석하여 실행
- 실행 파일을 생성하지 않기 때문에 실행 과정이 빠르지만, 해석하는 과정에서 시간이 소요
- Python, Ruby, JavaScript ...

## 명령어의 구조

- 연산 코드와 오퍼랜드(주소 필드)

### 연산 코드

- 수행할 연산

#### 연산 코드 종류

- 데이터 전송: MOVE, STORE, LOAD(FETCH), PUSH, POP
- 산술/논리 연산: ADD, ICREMENT, AND, OR, COMPARE..
- 제어 흐름 변경: JUMP, CONDITIONAL JUMP, HALT, CALL, RETURN
- 입출력 제어: READ, WRITE, START IO, TEST IO

### 오퍼랜드(주소 필드)

- 연산에 사용될 데이터
- 유효 주소(effective address): 연산에 사용될 데이터가 저장된 위치

#### 명령어 주소 지정 방식

- 즉시 주소 지정 방식(immediate addressing mode)(메모리)
- 직접 주소 지정 방식(direct addressing mode)(메모리)
- 간접 주소 지정 방식(indirect addressing mode)(메모리)
- 레지스터 주소 지정 방식(register addressing mode)
- 레지스터 간접 주소 지정 방식(register indirect addressing mode)

출처:  
[개발자를 위한 컴퓨터공학 1: 혼자 공부하는 컴퓨터구조 + 운영체제](https://www.inflearn.com/course/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B5%AC%EC%A1%B0-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C)
