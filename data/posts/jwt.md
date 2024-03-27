---
title: "JWT(JSON Web Tokens)"
coverTitle: "Understanding JWT"
date: "2024-03-08"
category: "System"
published: true
---

## **What is JSON Web Token?**

- 당사자 간에 정보를 안전하게 전송하기 위한 간결하고 독립적인 방법을 정의하는 개방형 표준
- 서명된 토큰: 검증되고 신뢰할 수 있고 무결성 확인 할 수 있음
- 암호화된 토큰: 공개/개인키 사용하여 키를 보유한 당사자만이 토큰에 서명했음을 증명

## **When should you use JSON Web Tokens?**

### 권한 부여 Authorization

- JWT를 사용하는 가장 일반적인 시나리오. 사용자가 로그인하면 각 요청에 JWT가 포함되어 사용자가 해당 토큰으로 허용된 경로, 서비스 및 리소스에 액세스할 수 있다.
- Single Sign On\*은 오버헤드가 적고 여러 도메인에서 쉽게 사용할 수 있기 때문에 오늘날 널리 사용되는 기능이다.
  - "싱글 사인 온(Single Sign-On, SSO)"은 사용자가 한 번의 로그인으로 여러 서비스나 애플리케이션에 접근할 수 있는 인증 방식이다. 사용자가 여러 시스템에 대해 별도의 로그인을 할 필요 없이, 한 번의 인증으로 여러 서비스에 접근할 수 있도록 하는 메커니즘이다.

### 정보 교환(Information Exchange)

- 공개/개인 키 쌍을 사용하여 JWT에 서명할 수 있으므로 발신자가 본인이 맞는지 확인할 수 있음
- 서명은 헤더와 페이로드를 사용하여 계산되므로 콘텐츠가 변조되지 않았는지 확인할 수 있음.

## **What is the JSON Web Token structure?**

- JSON Web Tokens는 닷으로 구분되 3개의 파트로 구성되어 있다.
  - Header
  - Payload
  - Signature
  - xxxxx.yyyyy.zzzzz

### Header

- JWT의 첫번째 부분 - Base64Url로 인코드 됨
- 일반적으로 2개의 파트로 구성되어 있음:
  - 토큰 타입 (JWT)
  - 서명 알고리즘 (HMAC SHA256, RSA ..)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### payload

- JWT의 두번째 부분 - Base64Url로 인코드 됨
- 클레임은 엔티티(사용자)와 추가 데이터
- 등록된 클레임
  - 필수는 아니지만 권장되는 미리 정의된 클레임들(이름은 세 글자만 사용할 수 있음)
  - iss(issuer), exp(expiration time), sub(subject), aud(audience) 등
  - 간결성을 위해 이름은 3글자로만 구성됨
- 공개 클레임
  - JWT를 사용하는 사람이 마음대로 정의 가능하지만 충돌 방지를 위해 IANA JSON 웹 토큰 레지스트리에 정의하거나 충동 방지 네임스페이스가 포함된 URI로 정의해야 함.
- 비공개 클레임
  - 사용하기로 동의한 당사자 간에 정보를 공유하기 위해 만든 사용자 지정 클레임으로 등록 또는 공개 클레임이 아님.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

- 서명된 토큰의 정보는 변조로부터 보호되지만 누구나 읽을 수 있기 때문에 JWT의 페이로드 또는 헤더요소에 비밀 정보를 넣으면 안됨

### signature

- 서명 부분을 만들려면 인코딩된 헤더, 인코딩된 페이로드, 시크릿, 헤더에 지정된 알고리즘을 가져와서 서명해야한다.
- 서명은 메시지가 도중에 변경되지 않았는지 확인하는데 사용되며, 개인 키로 서명된 토큰의 경우 JWT의 발신자가 본인이 맞는지 확인할 수 있다.
- 아래는 HMAC SHA256 알고리즘을 사용하는 경우이다.

```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

### putting all together

- 점으로 구분된 3개의 Base64Url 문자열로 출력되며, HTML, HTTP 환경에서 쉽게 전달할 수 있으며 SAML과 같은 XML 기반 표준과 비교할 때 더 간결하다.

```json
// 이전 헤더와 페이로드가 인코딩되어 있고 비밀로 서명된 JWT
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

## **How do JSON Web Tokens work?**

- 인증에서 사용자가 자격증명을 사용하여 로그인에 성공하면 JSON 웹 토큰이 반환됨.
- 일반적으로 필요 이상으로 오래 보관해서는 안되며 브라우저 저장소에 민감한 세션 데이터를 저장해서는 안 됨.
- 사용자가 보호된 리소스에 액세스하려고 할 때마다 사용자 에이전트는 일반적으로 Bearer 스키마를 사용하여 권한 헤더에 JWT를 보내야함. `Authorization: Bearer <token>`
- HTTP 헤더를 통해 JWT 토큰을 전송하는 경우 토큰이 너무 커지지않도록 해야함. 일부 서버는 헤더에 8KB 이상 허용하지 않음. → 많은 정보를 포함하려면 Auth0 세분화된 권한 부여와 같은 대체 솔루션 필요
- 토큰이 `Authorization` 헤더로 전송되는 경우, CORS는 쿠키를 사용하지 않으므로 문제가 되지 않음.

![jwt](/imgs/blog/posts/jwt/jwt.png)

1. 애플리케이션이 인증 서버에 인증 요청
2. 권한이 부여되면 권한 부여 서버는 애플리케이션에 액세스 토큰을 반환
3. 애플리케이션은 액세스 토큰을 사용하여 보호된 리소스에 액세스

> ⚠️ 서명된 토큰을 사용하면 토큰에 포함된 모든 정보가 노출되어 비밀정보를 넣어서는 안되며, 내용을 변경할 수 없음.

## **Why should we use JSON Web Tokens?**

- JSON은 XML보다 장황하지 않기 때문에 인코딩할 때 그 크기도 작아져 JWT가 SAML(Security Assertion Markup Language Tokens)보다 컴팩트해서 HTML 및 HTTP 환경에서 전달하기 좋음
- 보안적으로는 SWT(Simple Web Tokens)는 HMAC 알고리즘을 사용하는 공유 비밀로만 대칭적으로 서명할 수 있지만 JWT 및 SAML 토큰은 공개/개인 키 쌍을 사용하여 서명할 수 있음.
- JSON 파서는 객체에 직접 매핑되기 때문에 대부분의 프로그래밍 언어에서 일반적이지만 XML에는 자연스러운 문서와 객체간 매칭이 없음. → 작업이 쉽다.

출처:  
[JWT.IO - JSON Web Tokens Introduction](https://jwt.io/introduction)
