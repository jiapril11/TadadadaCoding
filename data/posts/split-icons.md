---
title: "react-icons 재사용성을 위해 분리하기"
coverTitle: "Creating Reusable Icon Components"
date: "2024-03-05"
category: "React"
published: true
---

현재 블로그에서는 포스트 내용에 따라 아이콘을 사용하고 있는데, 총 2군데에서 따로 작성되어 있어 유지 보수를 위해 분리 작업을 하던 도중 아래와 같은 에러 발생함.
![에러 정보](/imgs/blog/posts/split-icons/error.png)

`<BiLogoReact />`는 JSX 문법을 사용한 양식으로 해당 아이콘 컴포넌트를 생성하고 있는 문법이라서 객체를 생성하려고 하니까 에러가 발생함.

객체를 생성할 때는 JSX 문법을 사용하는 것이 아니므로 `React.createElement` 함수를 사용하여 React Element를 직접 생성함. 이 함수는 첫번째 인수로 컴포넌트 타입을, 두번째 인수로는 컴포넌트의 속성을 받음.  
![수정 후](/imgs/blog/posts/split-icons/modified.png)
