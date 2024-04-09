---
title: "z-index가 동작하지 않는 경우 4가지"
coverTitle: "z-index"
date: "2024-04-09"
category: "CSS"
published: true
---

1. 이전 요소 위에 후자 요소가 표시된다.

2. 포지션이 있는 요소가 없는 요소의 위에 표시 된다. (z-index 설정을 안해도)

3. opacity 또는 transform 을 적용하면 z-index가 0 인것처럼 작동한다.(z-index, positon 설정을 안해도)

4. A요소 > B요소 ^ C요소

A요소 z-index 설정있는 상태에서 C요소가 A요소의 z-index 보다 크다면 B요소는 C요소보다 위에 표시될 수 없다.

(A요소(1) > B요소(100) ^ C요소(5))

-> a. B요소를 A요소 바깥으로 꺼낸다.

-> b. A요소의 z-index 설정을 없앤다.

출처:  
[4 reasons your z-index isn’t working (and how to fix it)](https://coder-coder.com/z-index-isnt-working/)
