import { sendEamil } from "@/service/email";

export async function POST(req: Request) {
  const body = await req.json();

  return sendEamil(body) //
    .then(
      () =>
        new Response(JSON.stringify({ message: "전송 성공" }), {
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
