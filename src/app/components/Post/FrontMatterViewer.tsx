import Image from "next/image";
import Date from "../Posts/Date";

type Props = {
  frontmatter: {
    title: any;
    date: any;
    cover: any;
  };
};

export default function FrontMatterViewr({ frontmatter }: Props) {
  const { title, cover, date } = frontmatter;
  return (
    <>
      <Image
        src={`/imgs/blog/cover/${cover}.jpeg`}
        alt={`${title} 썸네일`}
        width="1200"
        height="300"
        className="h-96 w-full object-cover object-center"
      />
      <div className="px-3">
        <div className="mb-16">
          <h2 className="text-3xl text-center">{title}</h2>
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
