import dynamic from "next/dynamic";

const PropagateLoader = dynamic(
  () => import("react-spinners").then((lib) => lib.PropagateLoader),
  {
    ssr: false,
  }
);

type Props = { color?: string };

export default function PropagateLoaderSpinner({ color = "#38bdf8" }: Props) {
  return <PropagateLoader color={color} speedMultiplier={1} />;
}
