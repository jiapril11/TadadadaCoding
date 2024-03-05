---
title: "Next.js에서 메타데이터 설정하기"
coverTitle: "metadata in Next.js"
date: "2024-02-13"
category: "Next"
published: true
---

Next.js에서 metadata 적용방법

모든 페이지에서 적용될 수 있도록 layout 페이지에 작성  
타이틀은 기본으로 사용할 내용인 default와 페이지에 다른 타이틀을 적용할 경우 해당 문자열이 들어갈 문자열 플레이스홀더를 template에 지정해줌
![layout](/imgs/blog/posts/metadata/layout.png)

동적 페이지에서는 변경될 내용을 변수로 받아오고 metadata에 적용
![dynamic](/imgs/blog/posts/metadata/dynamic.png)

openGraph meatadata img는 하나로만 사용할 예정으로 아래와 같이 파일을 위치시킴
![og_img](/imgs/blog/posts/metadata/og_img.png)

[Optimizing Metadata | Next.js](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

[Generate Metadata | Next.js](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)

[opengraph-image | Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image)
