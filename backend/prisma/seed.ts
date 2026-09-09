import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { slug: "action", name: "Action", color: "b8433f" },
  { slug: "rpg", name: "RPG", color: "6b4fa0" },
  { slug: "survival", name: "Survival", color: "2f6f76" },
  { slug: "strategy", name: "Strategy", color: "c08a2e" },
  { slug: "racing", name: "Racing", color: "1f6fb2" },
  { slug: "indie", name: "Indie", color: "b85c7a" },
];

function image(color: string, title: string) {
  return `https://placehold.co/600x400/${color}/ffffff?text=${encodeURIComponent(title)}`;
}

const productsByCategory: Record<
  string,
  { name: string; description: string; price: number; stock: number }[]
> = {
  action: [
    {
      name: "Risk of Rain 2",
      description: "Escape a chaotic alien planet by fighting through hordes of frenzied monsters - with your friends, or on your own. Combine loot in surprising ways and master each character until you become the havoc you feared upon your first crash landing.",
      price: 19.99,
      stock: 12,
    },
    {
      name: "Plants vs Zombies GW2: Deluxe Edition",
      description: "Ready the Peashooters and prepare for the craziest, funniest shooter in the universe: Plants vs. Zombies Garden Warfare 2.",
      price: 19.99,
      stock: 8,
    },
    {
      name: "Call of Duty: Black Ops III",
      description: "Call of Duty®: Black Ops III Zombies Chronicles Edition includes the full base game plus the Zombies Chronicles content expansion.",
      price: 29.99,
      stock: 3,
    },
    {
      name: "Cyberpunk 2077",
      description: "An immersive story game where the player must fight their way through different enemies, can customize their character, find loot such as guns and add them to their loadout.",
      price: 34.99,
      stock: 20,
    },
    {
      name: "test1",
      description: "test2",
      price: 44.99,
      stock: 5,
    },
  ],
  rpg: [
    {
      name: "Persona 5",
      description: "Turn-based RPG",
      price: 24.99,
      stock: 10,
    },
    {
      name: "Deltarune",
      description: "2D pixel Turn-based RPG",
      price: 59.99,
      stock: 6,
    },
    {
      name: "Test3",
      description: "Test4",
      price: 49.99,
      stock: 15,
    },
    {
      name: "Test5",
      description: "Test6",
      price: 39.99,
      stock: 0,
    },
    {
      name: "Test7",
      description: "Test8",
      price: 44.99,
      stock: 9,
    },
  ],
  survival: [
    {
      name: "The Forest",
      description: "Survival Horror game where the goal is to save your son from a crazy father who kidnapped your son after your plane crashed. Stranded on an island, will you survive the horrors of the forest?",
      price: 34.99,
      stock: 18,
    },
    {
      name: "Sons of the Forest",
      description: "Sequel to the forest, Since your helicopter crew crashed down, you're now stuck on an island. Can you survive your way through, discover the mysteries of the island and escape once and for all?",
      price: 14.99,
      stock: 11,
    },
    {
      name: "Test9",
      description: "Test10",
      price: 39.99,
      stock: 7,
    },
    {
      name: "Stranded Deep",
      description: "While you were goint to your destination, your plane suddenly crashed in the ocean and now you're stuck on a few islands. Can you find a way to return to your destination and survive the islands on your own?",
      price: 2.99,
      stock: 14,
    },
    {
      name: "Test11",
      description: "Test12",
      price: 32.99,
      stock: 0,
    },
  ],
  strategy: [
    {
      name: "Dead by Daylight",
      description: "An asymmetrical 4v1 horror game, where you can play as either one of the four survivors who must repair generators and open the exit gate to escape the killer in the fog or the killer who has to stop the survivors and kill them by sacrificing them to the entity by putting them on a meat hook.",
      price: 9.99,
      stock: 13,
    },
    {
      name: "Test13",
      description: "Test14",
      price: 49.99,
      stock: 9,
    },
    {
      name: "Test15",
      description: "Test16",
      price: 34.99,
      stock: 16,
    },
    {
      name: "Test17",
      description: "Test18",
      price: 39.99,
      stock: 4,
    },
    {
      name: "Test19",
      description: "Test20",
      price: 29.99,
      stock: 10,
    },
  ],
  racing: [
    {
      name: "Forza Horizon 6",
      description: "Fast-paced racing game, customize your car and race with your friends or foes online!",
      price: 29.99,
      stock: 12,
    },
    {
      name: "Test21",
      description: "Test22",
      price: 44.99,
      stock: 8,
    },
    {
      name: "Test23",
      description: "Test24",
      price: 39.99,
      stock: 0,
    },
    {
      name: "Test25",
      description: "Test26",
      price: 34.99,
      stock: 17,
    },
    {
      name: "Test27",
      description: "Test28",
      price: 54.99,
      stock: 6,
    },
  ],
  indie: [
    {
      name: "Hollow Knight: Silk song",
      description: "Visually pleasing 2D fighter/platformer game, defeat bosses and explore the environment!",
      price: 14.99,
      stock: 25,
    },
    {
      name: "Test29",
      description: "Test30",
      price: 19.99,
      stock: 20,
    },
    {
      name: "Test31",
      description: "Test32",
      price: 9.99,
      stock: 30,
    },
    {
      name: "Test33",
      description: "Test34",
      price: 12.99,
      stock: 22,
    },
    {
      name: "Test35",
      description: "Test36",
      price: 17.99,
      stock: 0,
    },
  ],
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  console.log("Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  for (const category of categories) {
    const created = await prisma.category.create({
      data: { slug: category.slug, name: category.name },
    });

    const products = productsByCategory[category.slug];
    for (const product of products) {
      await prisma.product.create({
        data: {
          name: product.name,
          slug: slugify(product.name),
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: image(category.color, product.name),
          categoryId: created.id,
        },
      });
    }
  }

  await prisma.user.create({
    data: {
      name: "Demo Speler",
      email: "demo@example.com",
      password: "demo1234",
      address: "demostreet 1",
      postalCode: "1234 AB",
      city: "s-Hertogenbosch",
    },
  });

  console.log("Seeding klaar. Demo-account: demo@example.com / demo1234");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
