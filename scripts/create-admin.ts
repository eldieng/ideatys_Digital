import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const password = process.env.ADMIN_PASSWORD;
  const name = process.env.ADMIN_NAME?.trim() || "Admin IDEATYS";

  if (!email || !password || password.length < 12) {
    console.error(
      "Définissez ADMIN_EMAIL et ADMIN_PASSWORD (12 caractères minimum) avant de lancer ce script."
    );
    process.exit(1);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("Un utilisateur avec cet email existe déjà");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      role: "ADMIN",
    },
  });

  console.log("Utilisateur admin créé.");
  console.log(`Email: ${user.email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
