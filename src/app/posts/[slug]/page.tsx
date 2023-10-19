import Date from "@/app/components/Posts/Date";
import { getPostData } from "@/service/posts";
import React from "react";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params: { slug } }: Props) {
  const postData = await getPostData(decodeURIComponent(slug));
  return (
    <div>
      <h2>{postData.title}</h2>
      <p>{postData.id}</p>
      <Date dateString={postData.date} />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </div>
  );
}
