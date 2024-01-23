import Link from "next/link";
import { HiOutlinePlusSm } from "react-icons/hi";

export default function Heading2({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <div className="flex justify-between items-center mb-5">
      <h2 className="text-xl font-medium">{title}</h2>
      <Link
        href={link}
        className="flex items-center gap-0.5 font-semibold hover:underline"
      >
        <HiOutlinePlusSm />
        more
      </Link>
    </div>
  );
}
