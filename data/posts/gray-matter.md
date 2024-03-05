---
title: "gray-matter와 마크다운 (with front matter)"
coverTitle: "Front Matter & Content in markdown with gray-matter"
date: "2024-02-16"
category: "React"
published: true
---

블로그 포스트의 마크다운 파일 형태

```markdown
---
title: "Post title"
date: "2024-01-01"
cover: "cover.jpg"
category: "React"
published: true
---

# H1

## H2

...content...
```

gray-matter를 사용해 마크다운 파일의 front matter와 content를 리턴

```javascript
import path from "path";
import fs from "fs";
import matter from "gray-matter";

//...

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);
  const frontmatter = {
    title: data.title,
    date: data.date,
    cover: data.cover,
    category: data.category,
  };

  const postList = getSortedPostsData();
  const currPost = postList.find((post) => post.id === id);
  const index = postList.indexOf(currPost!);
  const next = index > 0 ? postList[index - 1] : null;
  const prev = index < postList.length - 1 ? postList[index + 1] : null;

  return {
    id,
    frontmatter,
    content,
    next,
    prev,
  };
}
```

[Github gray-matter](https://github.com/jonschlinkert/gray-matter)
