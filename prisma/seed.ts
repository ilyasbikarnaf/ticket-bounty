import { hash } from "@node-rs/argon2";
import prisma from "@/lib/prisma";

const users = [
  {
    username: "admin",
    email: "admin@admin.com",
  },
  {
    username: "ilyas",
    email: "9441hamou@gmail.com",
  },
];

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from database",
    status: "DONE" as const,
    bounty: 150,
    deadline: "2026-1-10",
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from database",
    status: "OPEN" as const,
    bounty: 150,
    deadline: "2026-1-10",
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from database",
    status: "IN_PROGRESS" as const,
    bounty: 150,
    deadline: "2026-1-10",
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Starting seed....");

  await prisma.user.deleteMany({});
  await prisma.ticket.deleteMany({});

  const passwordHash = await hash("secret");

  const dbUsers = await prisma.user.createManyAndReturn({
    data: users.map((user) => ({ ...user, passwordHash })),
  });

  for (const ticket of tickets) {
    await prisma.ticket.create({ data: { ...ticket, userId: dbUsers[0].id } });
  }

  const t1 = performance.now();
  console.log(`Seed finished: (${t1 - t0}ms)`);
};

seed();
