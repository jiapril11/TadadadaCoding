---
title: "실행 컨텍스트와 렉시컬 환경"
date: "2024-01-15"
cover: "cover02"
category: "Javascript"
published: true
---

# 실행 컨텍스트(Execution Context)

- 콜스택(call stack)에 들어가는 실행 정보
- 코드의 실행 순서와 스코프를 기억
- 실행 가능한 자바스크립트 코드 블록이 실행되는 환경

## 실행 컨텍스트 형성 조건

1. 전역 코드
2. 함수 안의 코드 실행
3. eval() 함수 실행

## 실행 컨텍스트 동작 방식

1. 현재 실행되는 컨텍스트가 있음
2. 현재 실행되는 컨텍스트와 관련 없는 실행 코드가 실행됨
3. 새로운 컨텍스트가 생성되어 스택에 들어감
4. 제어권이 그 컨텍스트로 이동

```js
console.log("global-context");

function exContext() {
  console.log("exContext func");
}

exContext();

// 실행 순서
// global-context
// exContext func
```

![실행 컨텍스트](/imgs/blog/posts/execution-context-lexical-env/execution_context.png)

# 스코프(Scope)

- 식별자(변수, 함수, 클래스 이름)가 유효한 범위
- 선언된 위치에 따라 유효범위가 결정됨
- 블록 `{...}` 안에서 유효

## 스코프 접근 범위

스코프 밖에서 안으로 접근 불가하지만 **안에서는 밖으로는 접근 가능**

→ 스코프 안에는 렉시컬 환경이 있는데 외부 환경 참조를 스코프 체인을 통해 참조하기 때문에 가능

# 렉시컬 환경(Lexical Environment)

## 렉시컬 환경을 갖는 요소

1. 실행중인 함수
2. 코드 블록 `{...}`
3. 스크립트 전체

## 렉시컬 환경 구성 요소

1. **환경 레코드(Environment Record)**: 모든 지역 변수를 프로퍼티로 저장하고 있는 객체. `this` 값과 같은 기타 정보도 저장되어 있음.
2. **외부 렉시컬 환경(Outer Lexical Environment)에 대한 참조** - 외부 코드와 연관됨.

## 렉시컬 환경(함수)과 동작방식

- 모든 함수는 함수가 호출된 곳의 렉시컬 환경이 아닌 **생성된 곳의 렉시컬 환경을 기억함**.
  함수는 숨김 프로퍼티인 `[[Environment]]` 를 갖고 있는데 여기에 함수가 만들어진 곳의 렉시컬 환경에 대한 참조가 저장됨

```js
var value = "value1";

function printValue() {
  return value;
}

function printFunc(func) {
  var value = "value2";
  console.log(func());
}

printFunc(printValue);
```

- 콘솔로 찍히는 value 값은?  
  value1
- 동작 방식
  1. 코드에서 변수에 접근할 때 내부의 렉시컬 환경을 검색범위로 잡음
  2. 내부 렉시컬 환경에 원하는 변수가 없는 경우, 검색 범위를 내부 렉시컬 환경이 참조하는 외부 렉시컬 환경으로 확장 → 스코프 체인
  3. 검색 범위가 전역 렉시컬 환경이 될 때까지 1, 2 동작을 반복
  4. 전역 렉시컬에도 변수를 찾지 못하면, 엄격 모드에선 에러가 발생.
