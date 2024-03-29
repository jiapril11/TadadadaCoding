---
title: CPU 작동원리
coverTitle: "The operation of a CPU"
date: "2024-03-28"
category: "System"
published: true
---

## CPU 구성

![CPU 구성](/imgs/blog/posts/cpu-operation/cpu.png)

### ALU

#### IN

- 레지스터로부터 피연산자를 받아들이고 제어장치로부터 제어 신호를 받아들임

#### OUT

- 받아들인 데이터의 결과값을 레지스터에 저장
- 연산 결과값에 대한 부가 정보 플래그를 플래그 레지스터에 저장
- 플래그 종류: 부호, 제로, 캐리(올림/빌림수), 오버플로우, 인터럽트(인터럽트 가능여부), 슈퍼바이저(커널/사용자 모드)

### 제어장치

#### IN

- 클럭: 컴퓨터의 모든 부품을 일사분란하게 움직일 수 있게 하는 시간 단위
- 명령어 레지스터(해석할 명령어)
- 플래그 레지스터(플래그)
- 제어 신호

#### OUT

- 제어 신호(CPU 내부-레지스터, ALU- 전달, CPU 외부-메모리, 입출력장치- 전달)

### 레지스터

- CPU 내부 작고 빠른 임시 저장 장치
- 프로그램속 명령어/데이터는 실행 전후로 레지스터에 저장
- CPU 내부에서 직접적으로 접근할 수 있는 가장 빠른 메모리 유형

#### 프로그램 카운터

- 다음에 실행할 명령어의 주소를 가지고 있음
- 명령어가 실행될 때마다 자동으로 다음 명령어의 주소로 업데이트됨
- 프로그램의 흐름 제어와 순차적인 명령어 실행

#### 명령어 레지스터

- 현재 실행 중인 명령어를 저장
- 저장된 명령어는 CPU 내부에서 디코딩되어 실행됨
- 명령어를 가져와 해독하여 실행하는 프로세스에서 중요한 역할

#### 메모리 주소 레지스터

- 현재 CPU가 접근하고자 하는 메모리의 위치(주소)를 저장
- 저장된 주소를 기반으로 메모리에서 데이터를 읽거나 씀
- 메모리와의 상호 작용을 통제하고 데이터의 위치를 추적하는 데 사용됨

#### 메모리 버퍼 레지스터

- CPU와 메모리 간 데이터 전송에 사용되는 레지스터
- 메모리와 CPU 간 데이터의 임시 저장소로 작동
- 데이터의 안정적인 전송을 보장하는 데 기여

#### 플래그 레지스터

- 연산 결과 또는 CPU 상태에 대한 부가적인 정보
- 명령어 실행 중에 발생하는 여러 상태 정보를 저장
- 제로, 사인(음수), 캐리(캐리, 빌로우), 오버플로우...

#### 범용 레지스터

- 여러 목적으로 사용할 수 있는 레지스터
- 주요 목적은 데이터의 일시적인 보관 및 연산을 위함
- 범용 레지스터의 수와 크기는 CPU의 성능과 효율성에 영향을 미침

#### 스택 포인터

- 현재 스택의 최상단을 가리키는 레지스터
- 스택 메모리 영역에 접근하는 데 필수적이며, 스택의 상태를 관리하고 제어

#### 베이스 레지스터

- 주소 지정 방식(Addressing Mode) 중 하나인 베이스 주소 지정(Base Addressing)에서 사용되는 레지스터
- 베이스 주소 지정은 주소를 계산할 때 상대적인 위치에 따라 베이스 레지스터에 저장된 주소를 기준으로 하는 방식
- 데이터 블록이나 배열의 시작 위치를 가리키는 데 사용됨
- 프로그램이 메모리의 다른 위치로 이동해도 상대적인 주소 계산이 그대로 유지될 수 있음

### 명령어 사이클

- 인출-실행 사이클 또는 인출-간접-실행 사이클 실행

### 인터럽트

- CPU가 먼저 처리해야 할 다른 작업이 생겼을 때 발생

#### 동기 인터럽트(예외 Exception)

- CPU가 예기치 못한 상황을 접했을 때 발생

#### 비동기 인터럽트(하드웨어 인터럽트)

- 입출력 장치에 의해 발생
- 입출력 작업 도중에 CPU가 다른 작업을 함으로써 효율적으로 명령어를 처리하기 위해 사용
- 막을 수 있는 인터럽트(maskable Interrupt)와 막을 수 없는 인터럽트(non maskable interrupt)가 있음

**비동기 인터럽트 처리 순서**

1. 입출력 장치가 CPU에 인터럽트 요청 신호를 보냄
2. CPU는 실행 사이클이 끝나고 명령어를 인출하기 전 항상 인터럽트 여부 확인
3. CPU는 인터럽트 요청을 확인하고 인터럽트 플래그를 통해 형재 인터럽트를 받아들일 수 있는지 여부 확인
4. 인터럽트를 받아들일 수 있다면 CPU는 지금까지의 작업 백업
5. CPU는 인터럽트 벡터를 참조하여 인터럽트 서비스 루틴을 실행
6. 인터럽트 서비스 루틴 실행이 끝나면 백업해둔 작업을 복구하여 실행 재개

![명령어 사이클](/imgs/blog/posts/cpu-operation/cycle.png)

출처:  
[개발자를 위한 컴퓨터공학 1: 혼자 공부하는 컴퓨터구조 + 운영체제](https://www.inflearn.com/course/%ED%98%BC%EC%9E%90-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%EC%BB%B4%ED%93%A8%ED%84%B0%EA%B5%AC%EC%A1%B0-%EC%9A%B4%EC%98%81%EC%B2%B4%EC%A0%9C)