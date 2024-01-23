---
title: "CORS"
date: "2024-01-13"
cover: "cors.jpg"
category: "Network"
published: true
---

## CORS?

**Origin이 다른 곳에 요청을 보내는 것**

→ Origin? 프로토콜, 도메인, 포트로 이루어짐(https://www.google.com:80), 셋 중 하나라도 다를 경우 같지 않다고 봄(포트는 보통 생략되어 있음)

### 역사

- 브라우저측 자바스크립트에 네트워크 관련 메서드가 없던 시절
- 한 사이트의 스크립트에서 다른 사이트에 있는 콘텐츠에 접근할 수 없는 제약이 있었음(악의적인 접근을 막기위함) → 꼼수(form + iframe, script-src)
- 브라우저측 자바스크립트에 네트워크 관련 메서드가 생긴 이후 크로스 오리진 요청 허용

### 요청

#### 안전한 요청(Safe request)

> 💡 안전한 요청의 조건
>
> - 안전한 메서드(safe method) - GET, POST, HEAD를 사용한 요청
> - 안전한 헤더(safe header) - 다음 목록에 속하는 헤더
> - Accept
> - Accept-Language
> - Content-Language
> - Content-Type 값이 application/x-www-form-urlencoded 나 multipart/form-data, text/plain

**CORS와 안전한 요청**

- 크로스 오리진 요청을 보낼 경우 브라우저는 항상 `Origin`이라는 헤더를 요청에 추가함

https://a.com/page에서 https://b.com/request에 요청을 보낸다고 할때 아래와 같은 헤더 형태가 됨.

```jsx
Get /request
Host: b.com
Origin: https://a.com
```

`Origin`헤더에는 요청이 이뤄지는 페이지 경로(/page)가 아닌 오리진(프로토콜, 도메인, 포트) 정보가 담기게 됨.

- 브라우저의 역할

1. 크로스 오리진 요청 시 `Origin`에 값이 제대로 설정, 전송되었는지 확인
2. 서버로부터 받은 응답에 `Access-Control-Allow-Origin` 이 있는지 확인하고 서버가 크로스 오리진 요청을 허용하는지 확인.

**응답 헤더**

- 크로스 오리진 요청이 이뤄진 경우, 자바스크립트는 ‘안전한’ 응답 헤더에 접속할 수 있음
- 안전한 응답 헤더
  - Cache-Control
  - Content-Language
  - Content-Type
  - Expires
  - Last-Modified
  - Pragma
- 안전하지 않은 응답 헤더에 접근하려면 서버에서 `Access-Control-Expose-Headers` 라는 헤더를 보내줘야 함.

```jsx
200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c3ad9agka9d
Access-Control-Allow-Origin: https://a.com
Access-Control-Expose-Headers: Content-Langth, API-Key
```

→ `Content-Length` 와 `API-Key`를 읽을 수 있음

#### 안전하지 않은 요청

- 안전한 요청 이외의 요청 (ex: `PATCH`, `DELETE` ..)
- 안전하지 않은 요청이 이뤄지는 경우 `preflight`요청이라는 사전 요청을 보내 권한이 있는지 확인

preflight 요청(OPTIONS 메서드 사용)

- `Access-Control-Request-Method` 헤더 - 안전하지 않은 요청에서 사용하는 메서드 정보
- `Access-Control-Request-Headers` 헤더 - 안전하지 않은 요청에서 사용하는 헤더 목록

preflight 응답(상태코드 200)

- `Access-Control-Allow-Origin` - `*` 이나 요청을 보낸 오리진(https://a.com)
- `Access-Control-Allow-Methods` - 허용된 메서드 정보
- `Access-Control-Allow-Headers` - 허용된 헤더 목록
- `Acess-Control-Max-Age` - 퍼미션 체크 여부를 몇초간 캐싱해 놓을지 명시. 명시한 시간동안 preflight 요청을 생략한 채 안전하지 않은 요청을 보낼 수 있음

### 자격 증명

자바스크립트로 크로스 오리진 요청을 보내는 경우, 기본적으로 쿠키나 HTTP 인증 같은 자격 증명이 할께 전송되지 않음

→ 사용자 동의 없이 자바스크립트로 민감한 정보에 접근할 수 있기 때문
→ 서버에서 허용하고 싶다면 헤더를 명시적으로 허용하겠다는 세팅을 해야함(`credentials: “include”`)

출처:
[CORS](https://ko.javascript.info/fetch-crossorigin)

관련:
[토스페이먼츠 개발자센터](https://docs.tosspayments.com/resources/glossary/cors)
[CORS는 왜 이렇게 우리를 힘들게 하는걸까?](https://evan-moon.github.io/2020/05/21/about-cors/)
