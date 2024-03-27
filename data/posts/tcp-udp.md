---
title: "TCP와 UDP"
coverTitle: "TCP vs UDP"
date: "2024-01-20"
category: "System"
published: true
---

# TCP(Transmission Control Protocol)

TCP는 **트랜스포트 계층**의 프로토콜의 하나로서 웹이나 이메일, FTP와 같이 정확한 데이터 전달이 필요한 통신에 사용된다. TCP는 데이터 전송에 **신뢰성**을 더하고 여러가지 문제를 처리하여 **무결성**을 유지하기 위해 **데이터를 세그먼트(segment)라는 단위로 분할한다.** 수신측에서 이 세그먼트를 재조립하여 원본 데이터를 재구성하고 전송 속도를 조정하며, 데이터가 제대로 전달되지 않았을 경우 재전송을 하게 된다.

## TCP 헤더 구조

![tcp header](/imgs/blog/posts/tcp-udp/tcp_header.png)

### header 구성 요소들

1. 송신지 포트 번호 (Source Port): 송신자의 포트 번호입니다.
2. 수신지 포트 번호 (Destination Port): 수신자의 포트 번호입니다.
3. **일련 번호 (Sequence Number)**: 데이터 세그먼트에 포함된 바이트의 순서를 나타냄. **데이터가 전송된 순서대로 수신되고 있는지 확인.** **송신한 바이트 수**
4. **확인 응답 번호 (Acknowledgment Number)**: 수신 측에서 전송된 데이터의 성공적인 수신을 보장하기 위해 발신 측에 보내는 신호. **수신한 바이트 수**
5. 데이터 옵셋 (Data Offset): TCP 헤더의 길이를 나타냅니다.
6. 예약 (Reserved): 예약된 비트입니다.
7. **컨트롤 비트 (Flags, Control bits)**: 여러 상태 정보를 담고 있는데, 예를 들면 **SYN, ACK, FIN 등이** 있습니다.
8. **윈도우 사이즈 (Window Size)**: 수신측이 현재 수용할 수 있는 **데이터의 크기**입니다.
9. **체크섬 (Checksum)**: 오류 검출을 위해 사용됨. 수신 측은 체크섬을 사용하여 수신된 데이터가 손상되었는지 여부를 판별.
10. 긴급 포인터 (Urgent Pointer): 긴급한 데이터의 위치를 가리킵니다.
11. 옵션 설정 (Options): 필요한 경우 TCP 옵션을 포함할 수 있습니다.
12. 패딩 (Padding): 헤더를 채우기 위한 패딩입니다.

## 무결점 동작 방식

무결점 검사 기능은 데이터 전송 과정에서 발생할 수 있는 **오류를 감지**하고, 재전송이나 수정을 통해 데이터의 **무결성을 보장**. 이를 통해 신뢰성 있는 데이터 전송이 이루어짐. 검사 항목은 크게 세가지로 **일련번호, 확인응답번호, 체크섬** 임.

## 3 way handshake

![3 way handshake](/imgs/blog/posts/tcp-udp/handshake3.png)

## 4 way handshake

![4 way handshake](/imgs/blog/posts/tcp-udp/handshake4.png)

## UDP(User Datagram Protocol)

UDP는 TCP에 비해 상당히 간단한 프로토콜로서 단순히 데이터를 보내는 역할만 한다. 접속이 맺어졌는지 확인하지 않고 바로 송신한다(비연결형). 통신과정에서 데이터 손실이 발생할 수 있는데, 음성이나 동영상 스트리밍 서비스는 일부 데이터가 누락되거나 왜곡되더라도 큰 문제가 없기 때문에 주로 UDP를 사용한다.

## TCP vs UDP

|          | TCP      | UDP        |
| -------- | -------- | ---------- |
| 연결방식 | 연결형   | 비연결형   |
| 전송순서 | 순서보장 | 순서보장 x |
| 혼잡제어 | O        | X          |
| 속도     | 느림     | 빠름       |
| 신뢰성   | 높음     | 낮음       |
