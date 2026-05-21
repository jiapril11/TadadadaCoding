export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await sql`
      SELECT * FROM projects ORDER BY date DESC
    `;

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const data = await sql`
        INSERT INTO projects (
          slug, title, url, date, image_path, cover,
          images, github, people, categories, description, skills, content
        )
        VALUES (
          ${body.slug},
          ${body.title},
          ${body.url},
          ${body.date},
          ${body.imagePath},
          ${body.cover},
          ${body.images},
          ${body.github},
          ${body.people},
          ${body.categories},
          ${body.description},
          ${body.skills},
          ${body.content}
        )
        RETURNING *
      `;

    revalidatePath("/projects");
    revalidatePath("/");
    return NextResponse.json(data[0]);
  } catch (err: any) {
    console.error("프로젝트 저장 오류:", err);
    return NextResponse.json(
      { error: err?.message ?? "DB 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
