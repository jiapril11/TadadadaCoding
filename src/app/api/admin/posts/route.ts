import { auth } from "@/auth";
import sql from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthroized" }, { status: 401 });
  }

  const data = await sql`
    SELECT * FROM posts ORDER BY date DESC
  `;

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const data = await sql`
    INSERT INTO posts (slug, title, cover_title, date, category, published, content)
    VALUES (
      ${body.slug},
      ${body.title},
      ${body.coverTitle ?? null},
      ${body.date},
      ${body.category ?? null},
      ${body.published ?? true},
      ${body.content ?? null}
    )
    RETURNING *
  `;

  revalidatePath("/posts");
  revalidatePath("/");
  return NextResponse.json(data[0]);
}
