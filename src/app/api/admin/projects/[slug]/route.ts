export const dynamic = "force-dynamic";

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
      UPDATE projects
      SET
        title = ${body.title},
        url = ${body.url},
        date = ${body.date},
        image_path = ${body.imagePath},
        cover = ${body.cover},
        images = ${body.images},
        github = ${body.github},
        people = ${body.people},
        categories = ${body.categories},
        description = ${body.description},
        skills = ${body.skills},
        content = ${body.content}
      WHERE slug = ${params.slug}
      RETURNING *
    `;

  revalidatePath("/projects");
  revalidatePath(`/projects/${params.slug}`);
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
      DELETE FROM projects WHERE slug = ${params.slug}
    `;

  revalidatePath("/projects");
  revalidatePath("/");
  return NextResponse.json({ success: true });
}
