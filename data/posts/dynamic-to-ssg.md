---
title: "Next.js 동적 렌더링에서 SSG 렌더링으로 변경하기"
coverTitle: "dynamic to SSG in Next.js"
date: "2024-02-08"
category: "Next"
published: true
---

블로그 포스트는 변경될 내용이 적기 때문에 SSG 형태로 변경하기 위해 아래 코드 적용

경로: src/app/posts/[slug]/page.tsx

## Dynamic: server-rendering Slug Page

```javascript
export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  const { frontmatter, content, next, prev } = postData;

  return (
    // ...코드
  );
}
```

![dynamic](/imgs/blog/posts/dynamic-to-ssg/dynamic.png)

## SSG: prerendering Slug Page

```javascript
export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  const { frontmatter, content, next, prev } = postData;

  return (
    // ...코드
  );
}

// generateStaticParams사용하여 slug를 넘겨주고 페이지 미리 생성시킴
export async function generateStaticParams() {
  const posts = getSortedPostsData();

  return posts.map((post) => ({
    slug: post.id,
  }));
}
```

![ssg](/imgs/blog/posts/dynamic-to-ssg/ssg.png)

[☛ 공식문서 generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
