import Image from "next/image";

type Props = {
  frontmatter: {
    title: any;
    date: any;
    cover: any;
  };
};

export default function HeroImage({ frontmatter }: Props) {
  const { title, cover } = frontmatter;
  return (
    <>
      <div className={`relative h-[300px] overflow-auto`}>
        <Image
          src={`/imgs/blog/cover/${cover}`}
          alt={`${title} 썸네일`}
          // placeholder="blur"
          fill
          sizes="100vw"
          className="m-0"
          style={{ objectFit: "cover" }}
          // className="h-96 w-full object-cover object-center"
        />
      </div>
    </>
  );
}
