/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: any;
};

function createPrismaClient(): any {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

    const dbPath = path.join(process.cwd(), "dev.db");
    const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
    return new PrismaClient({ adapter });
  } catch (error) {
    console.warn("[AI Studio] Database not connected — using mock fallback", error);
    const noOp = {
      findMany: async () => [],
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (d: any) => d?.data ?? {},
      update: async (d: any) => d?.data ?? {},
      delete: async () => ({}),
      count: async () => 0,
      upsert: async (d: any) => d?.create ?? {},
    };
    return new Proxy({}, {
      get: () => new Proxy(noOp, {
        get: (target: any, prop: string) => target[prop] ?? (async () => null),
      }),
    });
  }
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;


