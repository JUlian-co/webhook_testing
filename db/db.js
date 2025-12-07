import { drizzle } from "drizzle-orm/neon-http";

export const db = drizzle(
  "postgresql://neondb_owner:npg_nsMqt2ib9gWd@ep-twilight-silence-ago4h67j-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
);
