import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const data = await sql`
      UPDATE posts
      SET
        title = ${body.title},
        cover_title = ${body.coverTitle},
        date = ${body.date},
        category = ${body.category},
        published = ${body.published},
        content = ${body.content}
      WHERE slug = ${params.slug}
      RETURNING *
    `;

  revalidatePath("/posts");
  revalidatePath(`/posts/${params.slug}`);
  revalidatePath("/");
  return NextResponse.json(data[0]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await sql`
      DELETE FROM posts WHERE slug = ${params.slug}
    `;

  revalidatePath("/posts");
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
