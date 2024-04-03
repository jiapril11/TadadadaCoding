---
title: "memo로 컴포넌트 최적화하기"
coverTitle: "React.memo"
date: "2024-04-03"
category: "React"
published: true
---

## React.memo

- 리액트에서 제공하는 고차컴포넌트(HOC)로 어떤 컴포넌트를 최적화된 컴포넌트로 제공
- Props를 체크해서 재사용 여부 판단
- 컴포넌트를 메모이징할 때 메모리를 사용함으로 꼭 필요할때만 사용

### memo를 사용할 때는

- 컴포넌트가 같은 Props로 자주 렌더링 될 때
- 컴포넌트가 렌더링 될 때마다 복잡한 로직을 처리해야할 때

> `React.memo`: **컴포넌트**를 memoizing  
> `useMemo`: **값**을 memoizing  
> `useCallback`: **함수**를 memoizing

```javascript
// Parent
import { useState, useMemo, useCallback } from "react";
import Child from "./Child";

export default function App() {
  console.log("parent render");
  const [parentAge, setParentAge] = useState(30);
  const [childAge, setChildAge] = useState(30);
  const handleParentAge = () => setParentAge(parentAge + 1);
  // string variable
  const firstTalking = "Hello world!";
  // object variable
  const name = useMemo(
    () => ({
      firstName: "John",
      lastName: "Doe",
    }),
    []
  );
  // function variable
  const addAge = useCallback(() => setChildAge(childAge + 1), [childAge]);
  return (
    <div>
      <h1>Parents</h1>
      <p>age: {parentAge}</p>
      <button onClick={handleParentAge}>Age + 1</button>
      <Child
        firstTalking={firstTalking}
        name={name}
        age={childAge}
        addAge={addAge}
      />
    </div>
  );
}
```

```javascript
// Child
import { memo } from "react";

function Child({ firstTalking, name, age, addAge }) {
  console.log("child render");
  return (
    <>
      <h2>Child</h2>
      <p>My first talking is {firstTalking}</p>
      <div>
        name: {name.lastName}, {name.firstName}
      </div>
      <div>age: {age}</div>
      <button onClick={addAge}>Age + 1</button>
    </>
  );
}

export default memo(Child);
```

`setParentAge`가 적용된 button을 클릭할 때마다 `state`의 변경으로 `Parent` 컴포넌트가 리렌더링 되고 그로인해서 `Child` 컴포넌트도 리렌더링 된다.  
`Child`에서 받는 `props`가 변경되지 않는데 리렌더링 되는 걸 방지하기 위해 `Child` 컴포넌트에 `React.memo`를 감싸주어 리턴할 수 있다.  
그런데 `Parent`에서 내려주는 name과, addAge를 `useMemo`와 `useCallback`으로 감싸주지 않으면 이전과 동일하게 `Child`가 리렌더링되는데 그 이유는 `Parent`가 리렌더링 될 때 함수 내 모든 내용이 초기화가 되는데 이때 name과 addAge의 data type이 `object`이기 때문에 데이터가 담긴 주소가 바뀌기 떄문에 `props`가 변경된다고 보기 때문이다.  
이렇듯 컴포넌트를 최적화 하기 위해서는 `React.memo`를 사용하고 값과 함수를 memoizing 하기 위해서는 `React Hooks`인 `useMemo`와 `useCallback`을 사용할 수 있다.

출처:  
[React.memo로 컴포넌트 최적화하기 | 리액트 훅스 시리즈](https://www.youtube.com/watch?v=oqUgcxwrnSY&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=9)
