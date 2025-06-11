import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
    return res.json(posts);
  }

  if (req.method === "POST") {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const { title, content } = req.body;
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    const post = await prisma.post.create({ data: { title, content, authorId: user.id } });
    return res.json(post);
  }
}
