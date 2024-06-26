---
title: "CPU Scheduling"
coverTitle: "CPU Scheduling"
date: "2024-04-08"
category: "System"
published: true
---

## CPU 스케줄링(Scheduling)

CPU 스케줄링은 어떤 프로세스가 언제 CPU를 사용할지를 결정하고 조정

### CPU 스케줄링 목적

1. 공정성(Fairness): 모든 프로세스가 CPU를 공평하게 이용
2. 효율성(Efficiency): CPU를 최대한 활용하여 시스템 성능을 향상
3. 응답시간(Response Time): 사용자의 요청에 대한 응답시간을 최소화하여 빠른 시스템 응답을 제공
4. 반환시간(Turnaround Time): 프로세스가 완료될 때까지 걸리는 시간을 최소화하여 작업 처리 속도를 향상
5. 대기시간(Waiting Time): 프로세스가 CPU를 할당받기까지 대기하는 시간을 최소화하여 프로세스들의 대기 시간을 줄임
6. 처리량(Throughput): 시스템이 단위 시간당 처리하는 프로세스의 양을 최대화하여 작업 처리량을 향상시킴

### 우선순위(Priority)

- 빨리 처리해야하는 프로세스(입출력 집중 프로세스들이 해당)
- 운영체제는 각 프로세스의 PCB에 우선순위를 명시하고, PCB에 적힌 우선순위를 기준으로 먼저 처리할 프로세스를 결정

**입출력 집중 프로세스(I/O bound process)**

- 비디오 재생, 디스크 백업 작업 등
- 입출력 버스트(I/O burst: 입출력 장치를 기다리는 작업)가 많은 프로세스

**CPU 집중 프로세스(CPU bound process)**

- 수학 연산, 컴파일, 그래픽 처리
- CPU 버스트(CPU burst: CPU를 이용하는 작업)가 많은 프로세스

### 스케줄링 큐

메모리에 적재되고 싶어하는 프로세스, 입출력 장치를 사용하고 싶어하는 프로세스, 하드디스크를 사용하고 싶어하는 프로세스 등을 분류하여 줄을 세우는데 이 줄은 스케줄링 큐로 구현하고 관리함. 큐는 자료구조에서처럼 FIFO 방식일 필요는 없음

![ready queue, waiting queue](/imgs/blog/posts/cpu-scheduling/ready_waiting_queue.png)

#### 준비 큐(ready queue)

CPU를 이용하고 싶은 프로세스들

#### 대기 큐(waiting queue)

입출력장치를 이용하기 위해 대기상태에 있는 프로세스들

**선점형 스케줄링(preemptive scheduling)**

: 프로세스가 CPU를 비롯한 자원을 사용하고 있더라도 운영체제가 프로세스로부터 자원을 강제로 빼앗아 다른 프로세스에 할당

- 하나의 프로세스의 자원 독점을 막고 프로세스들에 골고루 자원을 배분할 수 있음
- 문맥 교환 과정에서 오버헤드가 발생할 수 있음

**비전섬형 스케줄링(non-preemptive scheduling)**

: 하나의 프로세스가 자원을 사용하고 있다면 그 프로세스가 종료되거나 스스로 대기상태로 변경되지 전까지 다른 프로세스가 끼어들수 없음

- 문맥 교환에서 발생하는 오버헤드가 적음
- 하나의 프로세스가 자원을 사용중이라면 당장 자원을 사용해야 하는 상황에서도 무작정 기다리는 수 밖에 없음

### CPU 스케줄링 알고리즘

#### 선입 선처리 스케줄링(FCFS: First Come First served Scheduling)

- 준비 큐에 삽입된 순서대로 프로세스들을 처리
- 비선점형 스케줄링 방식
- 호위 효과(convoy effect) 발생 (1번 프로세스 실행시간(20ms), 2번 프로세스 실행시간(4ms), 3번 프로세스 실행시간(2ms) → 3번 프로세스가 2ms를 실행하기 위해 기다려야하는 시간 24ms)

#### 최단 작업 우선 스케줄링(SJF: Shortest Job First Scheduling)

- 준비 큐에 삽입된 프로세스들 중 CPU 이용 시간의 길이가 가장 짧은 프로세스부터 실행
- 비선점형 스케줄링 방식

#### 라운드 로빈 스케줄링(Round Robin Scheduling)

- 선입 선처리 스케줄링에 타임 슬라이스만큼의 시간동안 돌아가며 CPU 이용
- 선점형 스케줄링 방식
- 정해진 시간 내에 프로세스가 완료되지 않으면 큐의 맨 뒤에 삽입됨 → 문맥 교환
- 타임 슬라이스의 크기가 중요(너무 크면 호위 효과 발생, 너무 작으면 문맥 교환에 발생하는 비용이 커짐)

#### 최소 잔여 시간 우선 스케줄링(SRT: Shortest Remaining Time)

- 최단 작업 우선 스케줄링 + 라운드 로빈 스케줄링: 최소 잔여 시간 우선 스케줄링에서 프로세스들은 정해진 타임 슬라이스만큼 CPU를 사용하고, CPU를 사용할 다름 프로세스는 남아있는 작업시간이 가작 적은 프로세스가 선택됨

#### 우선순위 스케줄링(Priority Scheduling)

- 프로세스들에 우선순위를 부여하고 가장 높은 우선 순위를 가진 프로세스부터 실행
- 우선순위가 동일한 경우 선입 선처리 스케줄링 처리
- 최단 작업 우선 스케줄링 → 작업 시간이 짧은 프로세스에 높은 순위 부여, 최소 잔여 시간 우선 스케줄링 → 남은 시간이 짧은 프로세스에 높은 순위 부여
- 기아(starvation) 현상: 우선 순위가 낮은 프로세스는 우선순위가 높은 프로세스에 의해 실행이 계속 연기되는 현상
- 에이징(aging) 기법: 기아 현상을 방지하기 위한 기법으로 오래 대기한 프로세스의 우선순위를 점차 높이는 방식

#### 다단계 큐 스케줄링(Multilevel Queue Scheduling)

- 우선 순위별로 준비 큐를 여러 개 사용하는 방식
- 프로세스 유형별로 우선순위를 구분하여 실행하는 것이 편리함
- 큐별로 타임 슬라이스 다르게 지정하거나 다른 스케줄링 알고리즘을 사용할 수 있음
- 기아 현상 발생할 수 있음

#### 다단계 피드백 큐 스케줄링(Multilevel Feedback Queue Scheduling)

- 기아 현상을 보완하기 위한 방법
- 프로세스들이 큐 사이를 이동할 수 있음
- 프로세스의 CPU 이용 시간이 길면 낮은 우선 순위로 큐를 이동시킴
  - 새로 준비 상태가 된 프로세스가 있으면 우선순위가 가장 높은 우선순위 큐에 삽입되고 타임 슬라이스동안 실행됨 → 만약 해당 프로세스가 해당 큐에서 실행이 끝나지 않으면 다음 우선순위 큐에 삽입되어 실행됨 → 반복 → CPU를 오래 사용해야하는 프로세스는 점차 우선순위가 낮아짐(CPU 버스트가 많은 프로세스 → 우선순위 낮아짐, 입출력 버스트가 많은 프로세스 → 우선 순위 높아짐)
- 낮은 우선순위에서 프로세스가 너무 오래 기다리면 에이징 기법을 적용하여 점차 높은 우선순위 큐로 이동시킴

출처:
[혼자 공부하는 컴퓨터 구조+운영체제](https://product.kyobobook.co.kr/detail/S000061584886?utm_source=google&utm_medium=cpc&utm_campaign=googleSearch&gad_source=1&gclid=Cj0KCQiAzoeuBhDqARIsAMdH14GeU5OJpwRGzE6DkX9i8xKc7p7iwKsF0GbC_P-pP-GccWSHKRkKmJ4aAtbTEALw_wcB)
