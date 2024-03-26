---
title: HTTPS의 보안 - SSL, TLS
coverTitle: "SSL(Secure Sockets Layer) & TLS(Transport Layer Security)"
date: "2024-03-26"
category: "OS"
published: true
---

## SSL(Secure Sockets Layer)과 TLS(Transport Layer Security)

- 웹사이트가 SSL/TLS 인증서로 보호될때 HTTPS가 됨.
- SSL은 서버와 클라이언트(또는 두 서버 사이)에 전송되는 데이터를 암호화하여 인터넷 연결을 보호하기 위한 보안 계층.
- HTTP - SSL/TLS - TCP - IP 순으로 계층이 이루어짐 (HTTP는 Application layer에 속하고 FTP, SMTP과 같은 프로토몰과 조합해서 사용할 수 있음)
- TLS는 SSL의 향상된 버전으로 현재 SSL을 사용하고 있지 않음에도 익숙한 SSL로 부르고 있음.

### 대칭키 기법

- 하나의 키로 데이터를 암호화, 복호화 함
- 한 번에 많은 양의 데이터를 암호화하거나 복호화하는데 사용

### 공개키 기법

- 공개키, 개인키 2개의 키로 암호화 복호화
- 공개키는 누구나 소유가능, 개인키는 소유자 한 명만 소유
- 공개키로 암호화한 데이터는 개인키로만 복호화 가능
- 개인키로 암호화한 데이터는 공개키로만 복호화 가능

## SSL/TLS 동작 과정

1. **Client Hello**(client -> server)

- 랜덤한 데이터와 현재 지원할 수 있는 암호화 방식을 서버에게 전달하여 어떤 암호화 방식을 사용할 지 협의함

2. **Sever Hello**(server -> client)

- 클라이언트가 전달한 내용과 동일한 랜덤 데이터 전달
- 지원 가능한 암호화 방식 전달
- CA(Certificate Authority)에서 발급받은 개념 인증서 전달

3. **서버로부터 전달받은 인증서 검증**(client)

- CA가 발급한 인증서 목록 중에 전달받은 인증서 있는지 확인
- CA에서 공유하는 공개키를 가지고 인증서가 복호화되는지 확인(-> 서버의 개인키로 암호화했다는게 검증됨)

4. **대칭키 임시 생성/전달**(client -> server)

- 앞전에 서버와 클라이언트가 주고받은 랜덤 데이터를 조합해서 임시 키(pre mater secret) 생성
- 생성한 임시키를 앞전에 갖고 있던 공개키로 암호화해서 서버에 전달

5. **비밀키로 복호화**(server)

- 받은 임시 대칭키를 갖고있던 비밀키로 복호화

6. **세션키 생성**(client, server)

- 클라이언트와 서버의 임시 키는 세션 키로 바뀌고 본격적으로 서로간 통신 가능

출처:  
[그림으로 쉽게 보는 HTTPS, SSL, TLS](https://brunch.co.kr/@swimjiy/47)  
[정보통신기술용어해설 | SSL/TLS](http://www.ktword.co.kr/test/view/view.php?m_temp1=1957)  
[SSL, TLS, HTTPS는 무엇인가요?](https://www.digicert.com/kr/what-is-ssl-tls-and-https)
