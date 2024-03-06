---
title: "font override 문제"
coverTitle: "Failed to find font override values for font"
date: "2024-03-06"
category: "Next"
published: true
---

![failed to find font override values for font 'Pixelify Sans'](/imgs/blog/posts/failed-font-override/error.png)

기본적으로 `font-display`는 `swap`을 사용하는데 `swap`은 브라우저가 폰트를 다운로드할 때까지 기본 시스템 폰트 또는 다른 대체 폰트를 사용하여 렌더링을 지속하다가 폰트가 다운로드 되면 폰트를 적용하는 방식이다.

검색을 해보니 `adjustFontFallback`을 사용하여 문제를 해결한 것을 확인할 수 있었는데 공식문서에서 설명하는 `adjustFontFallback`은 `next/font/google`을 사용하는 경우 누적 레이아웃 이동을 줄이기 위해 자동 대체 글꼴을 사용할지 여부를 설정하는 불리언 값이며 기본값은 `true`이다.

원인은 `Pixelify Sans` 폰트를 오버라이드할 자동 대체 글꼴을 찾지 못해 발생하는 문제인 듯 싶다. (찾아보니 다른 폰트에도 위와 같은 에러가 발생한 것을 확인할 수 있었다.)
그래서 자동대체하는 글꼴을 사용하지 않도록 false 설정하니 에러는 사라진 것을 확인할 수 있었다.

```typescript
const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  adjustFontFallback: false,
});
```

참고:  
[font | Next.js](https://nextjs.org/docs/app/api-reference/components/font#adjustfontfallback)  
[github](https://github.com/vercel/next.js/issues/47115#issuecomment-1807197912)  
[stack overflow](https://stackoverflow.com/questions/76478043/next-js-always-fail-at-downloading-fonts-from-google-fonts)
