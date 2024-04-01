---
title: "useMemo Hook"
coverTitle: "React Hooks - useMemo"
date: "2024-04-01"
category: "React"
published: true
---

- `useMemo`를 사용함으로써 값을 캐싱하여 필요하지 않은 경우에 다시 계산되지 않게 한다.
- `useMemo`의 의존성 값이 업데이트 된 경우에만 실행된다.
- `useMemo`와 `useCallback`의 주요 차이점은 `useMemo`는 memoized된 값을 리턴하고 `useCallback`은 memoized된 함수를 리턴한다.
- 값비싸고 리소스 집약적인 함수가 불필요하게 실행되는 것을 방지할 수 있다.

```javascript
import { useState, useMemo } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  // useMemo 사용 전/후
  // const calculation = expensiveCalculation(count);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const handleAddCount = () => {
    setCount((prev) => prev + 1);
  };
  const handleAddTodo = () => {
    setTodos((prev) => [...prev, "New Todo"]);
  };
  return (
    <div className="App">
      <h3>Todo</h3>
      {todos.map((todo, i) => (
        <p key={i}>{todo}</p>
      ))}
      <button onClick={handleAddTodo}>Add Todo</button>
      <hr />
      <h3>Count: {count}</h3>
      <button onClick={handleAddCount}>Add + 1</button>
      <h3>expensiveCalculation: {calculation}</h3>
    </div>
  );
}
const expensiveCalculation = (num) => {
  console.log("Calculating...");
  for (let i = 0; i < 100000000; i++) {
    num += 1;
  }
  return num;
};
```

Todo 텍스트를 생성하는 함수를 실행하면, state의 내용이 변경되어 리렌더링되고 `expensiveCalculation` 함수도 호출되어 매번 비용이 큰 계산이 수행된다.  
이러한 문제를 해결하기 위해 `useMemo` 훅을 사용하여 `expensiveCalculation` 함수의 결과를 캐싱하고, count가 변경될 때만 `expensiveCalculation` 함수가 호출될 수 있게 수정하여 불필요한 계산을 피하고 성능을 최적화할 수 있다.

출처:  
[React useMemo Hook | w3schools](https://www.w3schools.com/react/react_usememo.asp)
