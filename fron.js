import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({ data: { email, password: hashedPassword } });
  res.json(user);
}
