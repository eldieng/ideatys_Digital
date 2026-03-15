import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@ideatysdigital.com";
  const password = "Admin@2026!";
  const name = "Admin IDEATYS";

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    console.log("L'utilisateur admin existe déjà");
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

  console.log("✅ Utilisateur admin créé avec succès !");
  console.log(`   Email: ${user.email}`);
  console.log(`   Mot de passe: ${password}`);
  console.log("\n⚠️  IMPORTANT: Changez ce mot de passe après la première connexion !");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
