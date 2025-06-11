import prisma from "@/lib/prisma";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) }, include: { author: true } });
    return res.json(post);
  }

  if (req.method === "DELETE") {
    const session = await getSession({ req });
    if (!session) return res.status(401).json({ message: "Unauthorized" });
    const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (post.authorId !== user.id) return res.status(403).json({ message: "Forbidden" });
    await prisma.post.delete({ where: { id: parseInt(id) } });
    return res.json({ message: "Deleted" });
  }
}

