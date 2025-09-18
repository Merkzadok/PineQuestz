import { Request, Response } from "express";
import { prisma } from "../../utils/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const guestUser = async (req: Request, res: Response) => {
  if (req.method === "POST") {
    const username = `guest_${Math.floor(Math.random() * 10000)}`;
    const email = `${username}@example.com`;

    const user = await prisma.user.create({
      data: {
        username,
        email,
      },
    });

    res.status(200).json(user);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

export default guestUser;
