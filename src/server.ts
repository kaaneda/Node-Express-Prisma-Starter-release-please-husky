import { PrismaClient } from "@prisma/client";
import app from "./app";

const port = 3010;
let databaseUrl: string | undefined;

if (process.env.NODE_ENV) {
  databaseUrl = process.env.DATABASE_URL;
} else {
  databaseUrl = process.env.DEV_DATABASE_URL;
}

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl,
    },
  },
});
const databaseConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    throw new Error(error as string);
  }
};

const initServer = async () => {
  try {
    await databaseConnect();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log("Could not connect to database", error);
  }
};

initServer();

export default prisma;
