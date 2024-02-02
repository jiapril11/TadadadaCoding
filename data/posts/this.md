---
title: "this"
date: "2024-02-02"
cover: "this.jpg"
category: "Javascript"
published: true
---

## 전역 스코프의 this

### 엄격 모드(`”use strict”`)

→ `undefined`

### 느슨한 모드

node → `globalThis(module)`  
browser → `window`

## 호출 위치에 따른 this

**함수**에서 this는 전역객체(Node: global, browser: window)

**메소드**(호출주체가 있는)에서의 this는 호출한 주체

1. 이벤트문 안쪽에서의 this

   - 이벤트가 발생한 대상
   - addEventListener 안에서 this는 항상 호출한 주체의 element를 return 하도록 설계되었음

2. **일반함수 안에서의 this**

   - window or global 객체를 지칭
   - 메서드의 내부라 해도 함수로서 호출한다면 this는 전역 객체를 의미

   ```jsx
   let first = "printed first";
   console.log(window.first); // printed first

   let sayFirst = function () {
     console.log(this.first); // this는 전역에 바인딩 됨
   };

   sayFirst(); // printed first
   ```

3. 콜백함수 안쪽에서의 this

   - 콜백함수가 발생한 대상

4. **객체안에서의 this**

   - 해당객체 자신을 지칭

     : 메서드 내부 코드에서 사용된 this 는 해당 메서드를 호출한 객체로 바인딩

     ```jsx
     let **firstObj** = {
       name: 'tom',
       sayName: function() {
         console.log(this.name)
       }
     }

     let secondObj = {
       name: 'ann'
     }

     secondObj.sayName = firstObj.sayName;

     firstObj.sayName(); // tom
     secondObj.sayName(); // ann
     ```

     - 객체 내 메서드 작성 권고

       ```jsx
       const obj1 = {
         name: "obj1",
         // X
         // 프로토타입까지 생성되어 무겁고, 생성자함수로도 불려질 수 있음
         printHeavy: function () {
           console.log("hi");
         },
         // O
         printLight() {
           console.log("hello");
         },
       };

       const test1 = new obj1.printHeavy();
       console.log(test1);
       const test2 = new obj1.printLight();
       console.log(test2);
       ```

5. **생성자함수 안에서의 this**

   1. 앞으로 복사될 인스턴스를 지칭

   ```jsx
   var Person = function (name) {
     this.name = name;
   };

   var john = new Person("john");
   console.log(john.name); // john
   ```

6. 즉시실행함수는 호출의 주체가 없다고 보면 됨

7. 화살표 함수는 this binding을 안함, 상위의 this를 바라봄(참고: https://ko.javascript.info/arrow-functions)

- 내부함수의 this 바인딩 동작을 보여주는 예제 **(일반 함수와 객체 안에서의 this 비교)**

  ```jsx
  var value = 100;

  var myObj = {
  	value: 1,
  	func1: function() {
  		this.value += 1;
  		console.log(this.value)

  		func2: function() {
  			this.value += 1;
  			console.log(this.value)

  			func3: function() {
  				this.value += 1;
  				console.log(this.value)
  			} // end func3
  			func3();
  		} // end func2
  		func2();
  	} // end func1
  }

  myObj.fun1();

  // 2
  // 101
  // 102

  ```

## 정적 바인딩

1. bind 함수 사용 → this를 영구적으로 (call, apply → this 마음대로 지정)
2. 화살표 함수 사용

### 화살표 함수 특징

1. 생성자 함수로서 사용이 불가능(무거운 프로토타입을 만들지 않음)
2. 함수 자체 arguments 생성하지 않음
3. **this에 대한 바인딩이 정적으로 결정됨(생성될 당시 가장 근접한 상위 스코프의 this에 바인딩 됨)**
4. this 가 없음

출처:  
[메서드와 this](https://ko.javascript.info/object-methods)  
[화살표 함수 다시 살펴보기](https://ko.javascript.info/arrow-functions)  
[인사이드 자바스크립트](https://product.kyobobook.co.kr/detail/S000001057490)
