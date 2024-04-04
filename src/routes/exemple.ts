import { Router, Response, Request } from "express";
import prisma from "../server";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.json({ message: "Hello from Express Prisma Boilerplate!" });
});

// Create new user
// This is the Route for creating a new user via POST Method
router.post("/users", async (req: Request, res: Response) => {
  //get name and email from the request body
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: {
      name: String(name),
      email: String(email),
      status: "active",
    },
  });
  res.json({ message: "success", data: user });
});

// Get single user
// This is the Route for getting a single user via GET Method
router.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: "success", data: user });
});

// Get all users
// This is the Route for getting all users via GET Method
router.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ message: "success", data: users });
});

// Update user with id
// This is the Route for updating a user via Patch Method
router.patch("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name: String(name),
      email: String(email),
    },
  });
  res.json({ message: "success", data: user });
});

// Delete user with id
// This is the Route for deleting a user via DELETE Method
router.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: "success" });
});

export default router;
