---
title: "useEffect Hook"
coverTitle: "React Hooks - useEffect"
date: "2024-03-27"
category: "React"
published: true
---

`useEffect`는 React 함수형 컴포넌트에서 컴포넌트의 상태나 DOM을 변화시키는 작업을 수행하기 위해 사용되는 Hook 중 하나이다.  
`useEffect`는 클래스형 컴포넌트의 생명주기 메서드인 `componentDidMount`(컴포넌트가 마운트될 때), `componentDidUpdate`(컴포넌트가 업데이트될 떄), `componentWillUnmount`(컴포넌트가 언마운트될 때)와 비슷한 역할을 함

[클래스형 컴포넌트의 생명주기](https://www.tadadadacoding.com/posts/react-life-cycle)

```javascript
useEffect(() => {
  // 1. 부수 효과를 수행하는 코드
  return () => {
    // 3. cleanup 함수 (언마운트 시에 호출됨)
  };
}, [dependency]); // 2. 의존성 배열
```

1. 컴포넌트가 렌더링될 때마다 호출되는 함수
2. 의존성(dependency) 배열로 의존성 배열이 비어 있다면 컴포넌트가 마운트될 때 한 번만 실행되며, 의존성 배열이 있는 경우 해당 배열 내 값이 변경될 때마다 실행됨.
3. cleanup 함수를 반환하며 언마운트될 때 또는 의존성 배열이 변경될 때마다 호출되며, 부수 효과 함수가 다음으로 호출되기 전에 실행됨.
