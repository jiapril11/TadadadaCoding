---
title: "useRef Hook"
coverTitle: "React Hooks - useRef"
date: "2024-04-04"
category: "React"
published: true
---

1. 변화를 감지해야하지만 변화가 렌더링을 발생시키지 않아야하는 값을 다룰때
2. DOM 요소 접근

```javascript
import React, { useState, useRef, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(1);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current = renderCount.current + 1;
    console.log("rendering" + renderCount.current);
  });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Up!</button>
    </div>
  );
};

export default App;
```

리렌더링 될 때 변하는 값인 `renderCount`는 `useRef`를 사용하여 렌더링을 발생시키지 않기 때문에 무한 루프나 다른 영향 없이 사용될 수 있음.

```javascript
import React, { useEffect, useRef } from "react";

const App = () => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="username" />
      <button onClick={login}>로그인</button>
    </div>
  );
};
```

`useRef`를 사용하여 DOM 요소를 접근하여 최조 렌더링이 될 때, `input` 태그에 포커스를 줌

출처:  
[useRef 완벽 정리 1# 변수 관리 | 리액트 훅스 시리즈](https://www.youtube.com/watch?v=VxqZrL4FLz8&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=3)  
[useRef 완벽 정리 2# DOM 요소 접근 | 리액트 훅스 시리즈](https://www.youtube.com/watch?v=EMK8oUUwP5Q&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=4)
