---
title: "스로틀과 디바운스"
coverTitle: "Throttle & Debounce"
date: "2024-02-26"
category: "React"
published: true
---

## Throttle(스로틀):

Throttle은 지정된 시간 동안 일정한 간격으로 이벤트 핸들러가 실행되도록 보장한다.  
**이벤트가 연속적으로 발생할 경우 첫 번째 이벤트를 받은 후 일정 시간 동안 다음 이벤트를 무시함.**  
이후 지정된 시간이 지나면 다시 이벤트를 받을 수 있다.
연속적인 이벤트에서 핸들러의 실행 빈도를 제어하여 성능을 최적화 한다.  
예를 들어, 사용자의 마우스 이동에 따라 핸들러를 실행한다고 하면 일정 시간 간격으로 핸들러를 실행하여 불필요한 연산을 줄일 수 있음.

## Debounce(디바운스):

Debounce는 **연속적으로 발생하는 이벤트 중 마지막 이벤트에 대해서만 핸들러를 실행함**  
일정 시간 동안 새로운 이벤트가 발생하지 않을 때까지 기다린 후 마지막으로 발생한 이벤트에 대해 핸들러를 실행한다.  
이는 연이어 발생하는 이벤트에서 마지막 이벤트에만 관심이 있는 경우 유용하다.  
예를 들어, 사용자의 검색 입력에 따라 API 호출을 수행한다고 하면 사용자가 타이핑을 완료한 후 일정 시간이 지난 후에 API를 호출하여 불필요한 요청을 방지할 수 있음.

이러한 throttle과 debounce는 리액트에서 주로 Lodash와 같은 라이브러리를 사용하여 구현되거나, 간단한 custom hook을 만들어 사용된다.

```javascript
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let timerId = null;

  // 셋타임아웃이 실행되는동안 클릭해서 발생한 이벤트들은 다 무효처리하고 먼저 실행되던 이벤트만 진행하여 끝냄
  // -> 딜레이 시간안에 연속으로 버튼을 누를 경우 처음 클릭만 실행중.
  const throttle = (delay) => {
    if (timerId) {
      return;
    }
    console.log(`API processing, click not accepted`);
    timerId = setTimeout(() => {
      console.log(`after ${delay}! u can click!`);
      timerId = null;
    }, delay);
    console.log(timerId);
  };

  // 반복적인 이벤트 이후, delay가 지나면 function
  // 딜레이 시간이 안되었는데 계속 버튼을 누르면 클리어타임아웃으로 셋타임아웃 제거되고 재할당되어 누르는 순간 타이머 다시 시작됨.
  // -> 딜레이 시간안에 연속으로 버튼을 누를 경우 마지막 클릭이 실행됨
  const debounce = (delay) => {
    console.log(timerId);
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`debounce, delay: ${delay}`);
      timerId = null;
    }, delay);
    console.log(timerId);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }
  });
  return (
    <div>
      <h1>Button Example</h1>
      <button onClick={() => throttle(2000)}>throttle</button>
      <button onClick={() => debounce(1000)}>debounce</button>
      <br />
      {/* 메모리 누수: 위 누르고 페이지 이동하면 버튼 이벤트가 계속 진행중 -> useEffect Unmount 활용  */}
      <button onClick={() => navigate("/company")}>go to Company</button>
    </div>
  );
}
```
