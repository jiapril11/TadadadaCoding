---
title: "useCallback Hook"
coverTitle: "React Hooks - useCallback"
date: "2024-04-02"
category: "React"
published: true
---

- `useCallback`를 사용함으로써 콜백 함수를 캐싱하여 필요하지 않은 경우에 다시 계산되지 않게 한다.
- `useCallback`의 의존성 값이 업데이트 된 경우에만 실행된다.
- `useCallback`을 사용하는 이유 중 하나는 props가 변경되지 않는 한 컴포넌트가 다시 렌더링되지 않도록 하기 위함이다.
- `useMemo`와 `useCallback`의 주요 차이점은 `useMemo`는 memoized된 값을 리턴하고 `useCallback`은 memoized된 함수를 리턴한다.

```javascript
import { useState, useCallback } from "react";
import "./styles.css";
import Box from "../Box";

export default function App() {
  const [size, setSize] = useState(100);
  const [theme, setTheme] = useState("light");

  const createBoxStyle = useCallback(() => {
    return {
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: "salmon",
    };
  }, [size]);

  return (
    <div
      className="App"
      style={{
        height: "100vh",
        backgroundColor: theme === "light" ? "white" : "black",
      }}
    >
      <div>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Change Theme
        </button>
      </div>
      <input
        type="number"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <Box createBoxStyle={createBoxStyle} />
    </div>
  );
}
```

박스 사이즈와 배경 색상을 변경하는 `state가` 있는데, 배경색을 클릭하여 변경하면 박스 사이즈와는 상관이 없는 부분인데도 불구하고 상위 컴포넌트가 리렌더링될 때마다 자식인 Box도 리렌더링 되는 것을 콘솔로 통해 확인할 수 있다.
따라서 자식 컴포넌트가 부모 컴포넌트의 리렌더링에 영향을 받지 않도록 하려면 `useCallback`을 사용하여 `createBoxStyle` 함수를 메모이제이션하고, 해당 함수가 사용하는 상태가 변경될 때만 새로운 함수를 생성하도록 해야 한다. 이렇게 하면 자식 컴포넌트는 부모 컴포넌트의 리렌더링과는 관련이 없어진다.

출처:  
[useCallback 짱 쉬운 강의 | 리액트 훅스 시리즈](https://www.youtube.com/watch?v=XfUF9qLa3mU&list=PLZ5oZ2KmQEYjwhSxjB_74PoU6pmFzgVMO&index=7)
