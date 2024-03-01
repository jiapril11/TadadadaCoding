---
title: "Next.js의 이미지 최적화"
date: "2024-03-01"
cover: "virtual_dom.jpeg"
category: "Next"
published: true
---

> **ℹ️ 읽기전에 아래 3가지 개념 먼저 확인하기!**
>
> **웹 페이지 무게(page weight)**
> : 웹 페이지 무게란 웹 페이지가 로드될 때 필요한 데이터의 양을 가리킵니다. 이는 주로 페이지의 파일 크기와 로드하는 데 걸리는 시간으로 나타납니다. 웹 페이지의 무게가 높을수록 페이지가 느리게 로드되고 사용자 경험이 저하될 수 있습니다. 따라서 웹 개발자들은 웹 페이지의 무게를 최적화하여 빠른 로딩 속도와 효율적인 사용자 경험을 제공하기 위해 노력합니다. 웹 페이지의 무게를 줄이는 방법으로는 이미지나 스크립트 파일의 최적화, CSS와 JavaScript의 압축, 캐싱 기능의 활용 등이 있습니다.
>
> **LCP(Largest Contentful Paint)**  
> : LCP는 "Largest Contentful Paint"의 약어로, 웹 성능 측정 지표 중 하나입니다. 이는 웹 페이지의 가장 큰 콘텐츠가 화면에 렌더링되는 시간을 측정하는 것으로, 사용자가 페이지를 로드하는 데 걸리는 시간을 나타냅니다. LCP가 짧을수록 페이지가 더 빨리 시각적으로 완료되었다고 볼 수 있습니다. 이는 사용자 경험을 향상시키고 SEO에도 도움이 됩니다. LCP는 Core Web Vitals 중 하나로, Google 검색 알고리즘에서 중요한 요소 중 하나로 간주됩니다.
>
> **CLS(Cumulative Layout Shift): layout shift**  
> : 누적 레이아웃 시프트(Cumulative Layout Shift, CLS)는 웹 페이지가 로딩되는 과정에서 발생하는 레이아웃의 안정성을 평가하는 지표입니다. 이는 페이지의 콘텐츠가 로딩되는 동안 예상치 못한 레이아웃 이동량을 측정합니다. 이러한 이동은 사용자에게 불편을 줄 수 있으며, 특히 사용자가 잘못된 요소를 클릭하거나 페이지에서 위치를 잃게 할 수 있습니다.  
> CLS 점수는 0에서 1 사이의 값으로, 0에 가까울수록 최소한의 레이아웃 이동과 더 나은 사용자 경험을 나타내며, 1에 가까울수록 중요한 레이아웃 불안정성을 나타냅니다.  
> [🔗 CLS | Next.js](https://nextjs.org/learn-pages-router/seo/web-performance/cls)

이미지는 웹사이트의 무게와, LCP 성능에 많은 영향을 미치는데 Next.js 이미지 컴포넌트는 HTML의 `<img>` 요소를 확장한 것으로 아래와 같은 이미지 최적화를 자동으로 제공한다.

- Size Optimization: 기기별로 변경한 사이즈를 WebP, AVIF와 같은 현대적인 이미지 포맷으로 변경해서 제공
- Visual Stability: 이미지 로딩될때 자동으로 layout shift를 방지
- Faster Page Loads: viewport 안에 들어올때만 이미지가 보여질 수 있도록 브라우저 lazy loading 자동 적용. 블러 플레이스홀더는 선택적
- Asset Flexibility: 원격 서버에 저장된 이미지라고 하더라도 on-demand 이미지는 리사이징됨

## Usage

### Local Images

- local image를 사용하기 위해서는 먼저 이미지 파일을 `import` 해와야함
- Next.js에서 `import`된 이미지를 베이스로 너비와 높이값을 자동으로 결정한다. 이미지가 로딩되는 동안 CLS를 방지하기 위해 사용된다.
- `await import()` 또는 `require()` 동적 `import`는 지원하지 않는다. 정적인 `import`만 빌드 타임에 분석할 수 있다.

  ```javascript
  import Image from "next/image";
  import profilePic from "./me.png";

  export default function Page() {
    return (
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="data:..." automatically provided
        // placeholder="blur" // Optional blur-up while loading
      />
    );
  }
  ```

### Remote Images

- 원격 이미지를 사용하기 위해서는 `src`가 URL 이어야함
- Next.js는 빌드 프로세스 동안 원결 파일 접근을 허용하지 않기 때문에, `width`, `height`, `blurDataURL`(optional)을 작성해야한다.
- `width`, `height은` 올바른 이미지의 비율과 이미지 로딩 동안 레이아웃 이동을 피하기 위해 사용되기 때문에 렌더된 이미지 사이즈를 결정하지 않는다.
- `next.config.js` 파일에 이미지 URL을 작성해줘야한다. 악의적인 사용을 방지하기 위해 가능한 자세히 작성한다.

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-bucket/**",
      },
    ],
  },
};
```

### Domains

- 원격 이미지를 최적화하고 싶지만 내장된 Next.js 이미지 최적화 API를 사용해야 하는 경우 로더를 기본 설정으로 두고 이미지 `src` 프로퍼티에 절대 URL을 입력한다.
- 악의적인 사용자로부터 애플리케이션을 보호하려면 `next/image` 컴포넌트와 함께 사용할 원격 호스트 이름 목록을 `remotePatters`에 정의해야 한다.

### Loaders

- 로더는 이미지의 URL을 생성하는 함수로 제공된 `src`를 수정하고 다양한 크기의 이미지를 요청하기 위해 여러 URL을 생성한다.
- 이러한 여러 URL은 자동 `srcset` 생성에 사용되므로 사이트 방문자에게 뷰포트에 적합한 크기의 이미지가 제공된다.
- 기본 로더는 내장된 이미지 최적화 API를 사용하여 이미지를 최적화한 다음 Next.js 웹 서버에서 직접 이미지를 제공한다.
- CDN이나 이미지 서버에서 직접 이미지를 제공하려는 경우 자체 로더 함수를 작성할 수 있다.
- 로더 프로퍼티를 사용하여 이미지별로 로더를 정의하거나 `loaderFile` 구성을 사용하여 애플리케이션 수준에서 로더를 정의할 수 있다.

## Priority

- 각 페이지의 LCP가 될 요소에 `priority` 속성을 추가해야 로딩할 이미지의 우선순위를 지정할 수 있으므로 LCP를 향상시킬 수 있다.
- LCP 요소는 페이지 뷰포트의 가장 큰 이미지 또는 텍스트 블록
- LCP 요소에 `priority`가 없으면 `next dev` 실행시 console에서 warning 메시지를 볼 수 있다.

## Image Sizing

*layout shift*는 이미지 성능을 저하시키는 가장 큰 원인중 하나로 이미지가 로드될때 다른 요소들을 밀어내는 것. CLS라고 부름
이러한 문제를 방지하기 위해 이미지에 사이즈를 작성하므로써 이미지가 로드되기 전에 브라우저가 미리 이미지의 공간을 확보할 수 있다.

`next/image`는 좋은 퍼포먼스 결과를 보장할 수 있게 디자인되었다. 아래 3가지 방식 중 하나로 사이즈가 지정되어야 한다.

1. `static import` 사용으로 자동 적용됨
2. 명시적으로 `width`, `height` 작성
3. 이미지가 부모 요소를 채우도록 이미지를 확장하는 `fill`을 사용함으로써 암묵적 적용

## Styling

- `className`, `style`, `styled-jsx` 사용
  - `className` 사용 추천. import된 CSS Module, global stylesheet를 사용할 수 있음.
  - inline style로 `style` prop 사용 가능
  - 현재 컴포넌트로 범위가 지정되기 때문에 `styled-jsx` 사용 가능
- `fill`을 사용할 경우, 부모 요소는 `position: relative`여야 한다
- `fill`을 사용할 경우, 부모 요소는 `display: block`여야 한다

[Image Optimization | Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/images)
