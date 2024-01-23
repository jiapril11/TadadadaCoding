---
title: "HTTP Status codes"
date: "2024-01-20"
cover: "cover03"
category: "Network"
published: true
---

> 💡 status  
> 1xx: informational  
> 2xx: success  
> 3xx: redirection  
> 4xx: client error  
> 5xx: server error

## 2xx

### 201 Created

client에서 server로 post 요청을 보낸 데이터가 업로드되었음을 알림  
응답으로 header에 리소스가 어디에 저장되어 있는지 포함되어 있으며 그렇지 않은 경우 http request에 의해 지정된 경로임

### 204 No Content

요청이 성공적으로 완료되었고 바디에는 메시지가 없다는 알림

## 4xx

### 400 Bad Request

클라이언트에서 무언가 잘못했다는 의미로 4xx으로 명시하기에 모호한 에러를 나타냄

- url syntax error: 요청 request에 허용되지 않은 문자 있음
- 업로드 파일이 너무 클때
- 로그인 쿠키가 만료되었거나 더이상 유효하지 않을때
- DNS의 클라이언트 캐시가 만료되었거나 손상되었을때

### 401 Unauthorized✨

클라이언트는 요청된 리소스에 액세스하기 전에 유효한 로그인 자격 증명을 제공해야 함. 클라이언트는 시스템에 먼저 로그인거나, 또는 HTTP 요청의 일부로 자격 증명을 제공해야 할 수도 있다. 또한 로그인 자격 증명이 유효하지 않을 수도..

403 Forbidden: 클라이언트에게 작업이 허용되지 않았음을 알림

### 403 Forbidden✨

클라이언트가 리소스에 접근할 권한이 없을 경우(접근이 허용되지 않음). 401과 다르게 다시 시도해도 에러 발생

### 405 Method Not Allowed

요청된 리소스는 존재하지만 http method는 허용되지 않는 경우  
Read-only 리소스에 delete http 메서드 요청같은 경우

## 5xx

### 500 Internal Server Error✨

일반적인 서버 오류로 사용자가 해결할 수 없고 서버 관리자가 액션을 취해야만 고칠 수 있는 경우

### 502 Bad Gateway

서버는 자신이 상위 서버에 대한 프록시 또는 게이트웨이로 작동하고 있다는 것을 나타냄

### 503 Service Unavailable

서버는 기타 이유로 인해 HTTP 요청을 충족시킬 수 없음.  
(트래픽으로 인해 과부하 상태인 경우, 리소스가 잠겨 있는 경우, 서버가 재부팅 중인 경우, 방화벽 설정에 잘못된 구성이 있는 경우 또는 일시적으로 발생하는 여러 가지 문제)  
일부 사이트는 유지 보수 중에도 503 상태 코드를 반환. 유지 보수로 인해 검색 순위가 영향받지 않도록 하는 권장되는 방법

출처  
[http.dev/status](https://http.dev/status)
