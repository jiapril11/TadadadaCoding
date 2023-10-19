import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
};
export default function Date({ dateString }: Props) {
  const date = parseISO(dateString);
  return <p>{format(date, "LLLL dd, yyyy")}</p>;
}
