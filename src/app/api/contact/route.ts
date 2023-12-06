import { sendEamil } from "@/service/email";
import * as yup from "yup";

const boySchema = yup.object().shape({
  from: yup.string().email().required(),
  title: yup.string().required(),
  message: yup.string().required(),
});

export async function POST(req: Request) {
  const body = await req.json();
  if (!boySchema.isValidSync(body)) {
    return new Response(JSON.stringify({ message: "전송 실패" }), {
      status: 400,
    });
  }

  return sendEamil(body) //
    .then(
      () =>
        new Response(JSON.stringify({ message: "성공적으로 전송됨" }), {
          status: 200,
        })
    )
    .catch((error) => {
      console.log(error);
      return new Response(JSON.stringify({ message: "전송 실패" }), {
        status: 500,
      });
    });
}
