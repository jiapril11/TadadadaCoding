import { parseISO, format, formatDistance } from "date-fns";
import { FaRegCalendarAlt } from "react-icons/fa";

type Props = {
  dateString: string;
};
export default function DateNormal({ dateString }: Props) {
  const date = parseISO(dateString);
  return (
    <p className="flex justify-end items-center gap-2 text-sm text-gray-500">
      <FaRegCalendarAlt />
      {format(date, "MMM dd, yyyy")}
    </p>
  );
}

export function DateDistance({ dateString }: Props) {
  const date = parseISO(dateString);
  const today = new Date();
  return (
    <p className="flex justify-end items-center gap-2 text-sm text-gray-500">
      <FaRegCalendarAlt />
      {formatDistance(date, today, { addSuffix: true })}
    </p>
  );
}
