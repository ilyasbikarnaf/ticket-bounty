import prisma from "@/lib/prisma";

const tickets = [
  {
    title: "Ticket 1",
    content: "This is the first ticket from database",
    status: "DONE" as const,
  },
  {
    title: "Ticket 2",
    content: "This is the second ticket from database",
    status: "OPEN" as const,
  },
  {
    title: "Ticket 3",
    content: "This is the third ticket from database",
    status: "IN_PROGRESS" as const,
  },
];

const seed = async () => {
  const t0 = performance.now();
  console.log("Starting seed....");

  await prisma.ticket.deleteMany({});
  await prisma.ticket.createMany({ data: tickets });

  const t1 = performance.now();
  console.log(`Seed finished: (${t1 - t0}ms)`);
};

seed();
