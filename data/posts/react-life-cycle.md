---
title: "React Life Cycle"
date: "2024-01-17"
cover: "life_cycle.jpg"
category: "React"
published: true
---

## 📌 class component

**Mounting**:  
constructor → getDerivedStateFromProps → render → (React DOM 및 refs 업데이트) → componentDidMount  
**Updation**:  
getDerivedStateFromProps → shouldComponentUpdate (true) → render → getSnapshotBeforeUpdate → (React DOM 및 refs 업데이트) → componentDidUpdate  
**Unmounting**:  
componentWillUnmount

![Lifecyle Image](/imgs/blog/posts/react-life-cycle/life-cycle.png)
https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

클래스형 컴포넌트에서만 사용 할 수 있으며 함수형 컴포넌트에서는 useEffect가 비슷한 역할을 수행.  
 **Mounting**:  
마운트될 때 `constructor`가 가장 먼저 실행되며 state값을 초기화하거나 메서드를 바인딩할 수 있습니다. props로 받아온 값을 state에 넣어주고 싶을 때는 `getDerivedStateFromProps` 메서드를 사용.  
 그 후에 컴포넌트를 렌더링하고 첫번째 렌더링이 끝나면 `componentDidMount` 메서드가 호출 됨. 데이터 요청을 하거나 돔의 속성을 읽거나 변경하는 작업을 진행.  
 **Updation**:  
 데이터가 업데이트되면 `getDerivedStateFromProps` → `shouldComponentUpdate`(컴포넌트 리렌더링 여부 결정 / React.memo와 비슷) → `render` → `getSnapshotBeforeUpdate`(업데이트 직전 돔의 상태를 가져와 특정 값을 반환 → `componentDidUpdate` 실행(리렌더링 후 업데이트 반영 후 호출되는 메서드)
**Unmounting**:  
언마운트는 컴포넌트가 화면에서 사라지는 것을 의미하며 `componentWillUnmount`는 컴포넌트 언마운트 직전에 호출되는 메서드. 돔에서 직접 등록한 이벤트 제거, setTimeout 클리어 혹은 외부 라이브러리의 dispose기능 등을 호출.

참고: [25. LifeCycle Method · GitBook](https://react.vlpt.us/basic/25-lifecycle.html)

## 📌 functional component

useEffect를 사용하며 해당 훅은 컴포넌트가 mount 될 때, defendency array의 데이터가 변경될 때, 컴포넌트가 unmount 될 때 작성한 함수가 실행됨
