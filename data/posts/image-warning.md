---
title: "Next.js Image warning 수정하기"
coverTitle: "props and configuration options for Image in Next.js"
date: "2024-03-06"
category: "Next"
published: true
---

## Warning

![image was detected as the Largest Contentful Paint(LCP), image has either width or height modified, but not the other.](/imgs/blog/posts/image-warning/error_priority_size.png)

```typescript
// 수정 전
<Image
  key={i}
  src={`/imgs/projects/${imagePath}/${image}`}
  alt={`${title} 이미지`}
  width={600}
  height={500}
  className="mx-auto"
/>
```

### 1. priority

LCP(Largest Contentful Paint )는 페이지 로딩 시 가장 큰 콘텐츠 요소가 렌더링되는 시점을 의미하며 비교적 용량이 큰 이미지에서 발생된다. 페이지 성능을 개선하기 위해서 이미지 요소에 priority를 추가하여 LCP워닝을 해결할 수 있다.

### 2. size of image

이미지 스타일 `width` `height`를 설정하여 이미지 비율을 유지하라는 메시지이다. (\* 기존에 작성된 width={600}, height={500}은 렌더될 이미지의 사이즈가 아닌 로딩동안 레이아웃 이동을 피하기 위한 것임)
기존 이미지의 사이즈를 지정하지 않아서 발생하는 문제로 이미지 사이즈를 지정하여 워닝을 해결 할 수 있다.

```typescript
// 수정 후
<Image
  key={i}
  src={`/imgs/projects/${imagePath}/${image}`}
  alt={`${title} 이미지`}
  // 첫번째 이미지에만 priority 설정
  priority={i === 0 ? true : false}
  width={600}
  height={500}
  className="mx-auto w-full max-w-[500px] lg:max-w-full h-auto max-h-[413px]"
/>
```

### 3. fill

![image has fill but is missing sizes prop](/imgs/blog/posts/image-warning/error_size.png)

`fill`은 이미지 크기를 알 수 없을 때 부모의 크기만큼 채우기 위해 사용하는데, 반응형에 맞게 사이즈를 예측하여 페이지 성능을 향상시킬 수 있도록 sizes속성을 지정하라는 워닝이다.

```typescript
// 수정 전
<Image
  src={`/imgs/projects/${project.imagePath}/${project.cover}`}
  alt={`${project.title} 썸네일`}
  fill={true}
  className="object-cover"
/>

// 수정 후
<Image
  src={`/imgs/projects/${project.imagePath}/${project.cover}`}
  alt={`${project.title} 썸네일`}
  priority
  fill={true}
  // 뷰포트에 따라 이미지 사이즈를 다르게 지정해줌.
  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="object-cover"
/>
```

참고:
[Image API | Next.js](https://nextjs.org/docs/app/api-reference/components/image)
