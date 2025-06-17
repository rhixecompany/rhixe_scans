/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
      const protectedPaths = [
        /\/profile/,
        /\/user\/(.*)/,
        /\/bookmark\/(.*)/,
        /\/admin/,
      ];

      // Get pathname from the req URL object
      const { pathname } = request.nextUrl;
      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      // Check for session bookmark cookie
      if (!request.cookies.get('sessionBookmarkId')) {
        // Generate new session bookmark id cookie
        const sessionBookmarkId = crypto.randomUUID();

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });

        // Set newly generated sessionBookmarkId in the response cookies
        response.cookies.set('sessionBookmarkId', sessionBookmarkId);

        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
