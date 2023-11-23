import { parseISO, format } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

type Props = {
  dateString: string;
};
export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  return (
    <p className="flex justify-end items-center gap-2 text-sm text-gray-500">
      <FaRegCalendarAlt />
      {/* TODO: main 페이지에 최신 블로그 카드 불러올 때는 포맷 formatDistance 형식으로 */}
      {format(date, "MMM dd, yyyy")}
    </p>
  );
}
