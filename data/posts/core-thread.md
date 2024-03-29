---
title: "CPU 성능 향상 기법"
coverTitle: "CPU performance enhancement"
date: "2024-03-29"
category: "System"
published: true
---

## 클럭

- 컴퓨터 부품들은 '클럭 신호'에 맞춰 움직인다.
- CPU는 '명령어 사이틀'이라는 정해진 흐름에 맞춰 명령어들을 실행한다.
- 클럭 속도가 높아지면 CPU는 명령어 사이클을 더 빠르게 반복하여 클럭 속도는 CPU 속도 단위로 간주되기도 함
- 클럭 속도는 헤르츠(Hz)단위로 측정됨(클럭이 1초에 100번 반복되면 100Hz, 2.5GHz -> 25억-2.5\*10(9))
- 클럭 속도가 높아지면 발연 문제 발생

## 코어와 멀티 코어

- CPU: 명령어를 실행하는 부품 -> 코어: 명령어를 실행하는 부품을 여러 개 포함하는 부품
- 멀티코어 프로세서: 여러개의 코어를 포함하고 있는 CPU
  | | |
  |:---:|:---:|
  |1|싱글코어(single core)|
  |2|듀얼코어(dual core)|
  |3|트리플코어(triple core)|
  |4|쿼드코어(quad core)|
  |6|헥사코어(hexa core)|
  |8|옥타코어(octa core)|
  |10|데카코어(deca core)|
  |12|도데카코어(dodeca core)|
- CPU의 연산 속도는 꼭 코어 수에 비례하여 증가하지 않음.
- 코어마다 처리할 명령어들을 얼마나 적절하게 분배하는지에 따라 연산속도가 달라짐.

## 스레드와 멀티스레드

- 스레드: 실행 흐름 단위
- 하드웨어적 스레드: 하나의 코어가 동시에 처리하는 명령어 단위
- 소프트웨어적 스레드: 하나의 프로그램에서 독립적으로 실행되는 , 1코어 1스레드 CPU도 여러 소프트웨어적 스레드를 만들 수 있음
- 멀티스레드 프로세서: 하나의 코어로 여러 개의 명령어를 동시에 실행할 수 있는 CPU를 말함

## 명령어 병렬 처리 기법(ILP: Instruction-Level Parallelism)

### 명령어 파이프라이닝

- 명령어 인출, 명령어 해석, 명령어 실행, 결과 저장의 클럭 단위로 나눔
- 같은 단계가 겹치지 않는다면 동시에 여러 개의 명령어를 겹쳐 실행
- 파이프라인 위험(Pipeline hazard): 데이터 위험, 제어 위험, 구조적 위험

#### 데이터 위험(data hazard)

- 데이터 의존성에 의해 발생
- 어떤 명령어는 이전 명령어를 끝까지 실행해야함 실행할 수 있는 경우에 해당

#### 제어 위험(control hazard)

- 프로그램 카운터의 갑작스러운 변화에 의해 발생
- 프로그램 카운터는 '현재 실행중인 명령어의 다음 주소'로 갱신됨
- 프로그램 실행 흐름이 바뀌어 명령어가 실행되면 프로그램 카운터 값에 변화가 생기고 미리 가지고 와서 처리중이던 명령어들은 쓸모가 없어짐
- 제어 위험을 방지하기 위해 분기 예측(branch prediction) 기술이 사용됨.
- 분기예측: 어디로 분기할지 미리 예측한 후 그 주소를 인출

#### 구조적 위험(structural hazard)(= 자원 위험 resource hazard)

- 서로 다른 명령어가 동시에 ALU, 레지스터 등과 같은 CPU 부품을 사용하려고 할 떄 발생

### 슈퍼스칼라(superscalar)

- CPU 내부에 여러개의 명령어 파이프라인을 포함 구조
- 매 클럭 주기마다 동시에 여러 명령어를 인출할 수도, 실행할 수도 있어야함

### 비순차적 명령어 처리(OdOE: Out-of-order execution)

- 명령어를 순차적으로만 실행하지 않고 순서를 바꿔 실행해도 무방한 명령어를 먼저 실행하여 명령어 파이프라인이 멈추는 것을 방지

## ISA(명령어 집합 instruction set, 명령어 집합 구조 ISA:Instruction Set Architecture)

- CPU가 이해할 수 있는 명령어들의 모음
- 하드웨어가 소프트웨어를 어떻게 이해할지에 대한 약속

|                 CISC                 |                 RISC                 |
| :----------------------------------: | :----------------------------------: |
|        복잡하고 다양한 명령어        |         단순하고 적은 명령어         |
|           가변 길이 명령어           |           고정 길이 명령어           |
|        다양한 주소 지정 방식         |         적은 주소 지정 방식          |
| 프로그램을 이루는 명령어의 수가 적음 | 프로그램을 이루는 명령어의 수가 많음 |
|     여러 클럭에 걸쳐 명령어 수행     |       1클럭 내외로 명령어 수행       |
|       파이프라이닝하기 어려움        |        파이프라이닝하기 쉬움         |

CISC(Complex Instruction Set Computer)  
RISC(Reduced Instruction Set Computer)(Road-store 구조)

출처:  
[개발자를 위한 컴퓨터공학 1: 혼자 공부하는 컴퓨터구조 + 운영체제](https://www.inflearn.com/course/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B5%AC%EC%A1%B0-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C)