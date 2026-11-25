
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import * as schema from "./schema";

export function createDatabase(connectionUrl: string) {
  const client = postgres(connectionUrl, {
    max: 10,
    idle_timeout: 20,
    connect_timeout: 10,
  });

  const db = drizzle(client, { schema });

  return {
    db,
    client,
  };
}

export type Database = ReturnType<typeof createDatabase>["db"];
