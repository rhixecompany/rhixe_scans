import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
// console.log(connectionString);
// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pool: any = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    comic: {
      rating: {
        compute(comic) {
          return comic.rating.toString();
        },
      },
      // updated_at: {
      //   compute(comic) {
      //     const dateStr = comic.updated_at;
      //     const dateObj = new Date(dateStr);
      //     const isoDate = dateObj.toISOString();
      //     return isoDate;
      //   },
      // },
    },
    // chapter: {
    //   updated_at: {
    //     compute(chapter) {
    //       const dateStr = chapter.updated_at;
    //       const dateObj = new Date(dateStr);
    //       const isoDate = dateObj.toISOString();
    //       return isoDate;
    //     },
    //   },
    // },
  },
});
