---
title: "교착상태"
coverTitle: "Deadlock"
date: "2024-04-11"
category: "System"
published: true
---

- 다수의 프로세스나 스레드가 각자 필요로 하는 자원을 얻지 못하고 무한정 대기하는 상태
- 자원은 서로가 필요로하며 각각 다른 자원을 점유한 상태에서 대기하고 있어서 진행이 불가능한 상태
- 이러한 상황에서는 시스템이 멈추게 되어 추가적인 작업 불가능

## 자원 할당 그래프(resource-allocation graph)

### 규칙

1. 프로세스는 원으로, 자원의 종류는 사각형으로 표현
2. 사용할 수 있는 자원의 개수는 자원 사각형 내에서 점으로 표현
3. 프로세스가 어떤 자원을 할당받아 사용중이라면 자원에서 프로세스를 향해 화살표를 표시
4. 프로세스가 어떤 자원을 기다리고 있다면 프로세스에서 자원으로 화살표 표시

## 교착 상태 발생 조건

- 상호배제: 자원은 동시에 오직 하나의 프로세스 또는 스레드에 의해서만 사용될 수 있어야함
- 점유와 대기: 최소한 하나의 자원을 점유한 상태에서 추가적으로 다른 자원을 기다리고 있어야함
- 비선점: 다른 프로세스나 스레드에 의해 자원이 각제로 빼앗길 수 없음
- 원형 대기: 프로세스나 스레드 집합이 각각이 다음에 필요로하는 자원을 다른 프로세스나 스레드에 의해 점유된 상태에서 대기하는 형태로 원형의 순환을 이루어 있어야함

## 교착 상태 예방

### 상호배제 제거

- 모든 자원을 공유 가능하게 함
- 현실적으로 모든 자원의 상호배제 없앨 수 없음(프린트 같은 경우)

### 점유와 대기 제거

- 프로세스가 필요한 모든 자원을 동시에 얻을 수 있을 때마 자원을 요청하도록하거나
- 필요한 자원을 한 번에 모두 얻을 수 없을 때는 현재 점유하고 있는 자원 모두 반납하고 다시 요청하도록 함
- 자원 활용률이 낮아질 수 있음

### 비선점 제거

- 자원을 이용 중인 프로세스로부터 해당 자원을 빼앗을 수 있음
- 선점하여 사용할 수 있는 일부 자원에 대해서는 효과적
- 모든 자원이 선점 가능한 것이 아니기 때문에 범용성이 떨어짐

### 순환대기 제거

- 자원에 번호를 할당하고 프로세스가 자원을 요청할 때 번호가 작은 순서대로 요청
- 모든 자원에 번호를 할당하는 작업이 쉽지 않고 번호에 따라 활용률이 떨어질 수 있음

## 교착 상태 회피

### 안전 상태(safe state)

- 교차상태가 발생하지 않고 모든 프로세스가 정상적으로 자원을 할당받고 종료될 수 있는 상태

### 불안전 상태(unsafe state)

- 안전 순서열이 없는 상황으로 교착상태가 발생하지 않는 상태

## 교착 상태 검출 후 회복

### 선점을 통한 회복

- 교착상태가 발생했을 때 시스템이 특정 프로세스의 자원 할당을 선점하여 해결
- 프로세스가 자원을 강제로 반환하도록하여 해당 자원을 다른 프로세스가 사용할 수 있도록 함
- 일반적으로 우선순위가 낮은 프로세스의 자원 할당이 선점됨
- 다른 프로세스의 실행을 중단시킬 수 있는 단점이 있음

### 프로세스 강제 종료를 통한 회복

- 교착상태가 발생했을때 교착상태에 관련된 프로세스 중 하나 이상을 강제로 종료시켜 해결
- 보통은 교착상태에 포함된 프로세스들 중 하나를 선택하여 종료시켜 자원을 반환하게 함
- 종료된 프로세스가 중요한 작업을 수행 중이었을 경우 시스템에 부정적인 영향을 줄 수 있음

출처:
[혼자 공부하는 컴퓨터 구조+운영체제](https://product.kyobobook.co.kr/detail/S000061584886?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gad_source=1&gclid=Cj0KCQiAzoeuBhDqARIsAMdH14GeU5OJpwRGzE6DkX9i8xKc7p7iwKsF0GbC_P-pP-GccWSHKRkKmJ4aAtbTEALw_wcB)