---
title: "String.prototype.padStart()"
coverTitle: "padStart() & padEnd()"
date: "2024-02-19"
category: "Javascript"
published: true
---

padStart(길이값, 빈길이만큼채울값);
padEnd(길이값, 빈길이만큼채울값);

```javascript
const one = 1;
const newOne = one.toString().padStart(2, 0);
console.log(newOne); // '01'

const id = "abcdefgh";
const sliced = id.slice(0, 4);
const bluredId = sliced.padEnd(id.length, "*");
console.log(bluredId); // 'abcd****'
```

참고:
[padStart | mdn web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)
