import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/guide",
    "/contact",
    "/api/pecs",
    "/api/loadPecsLists",
    "/api/savePecsLists",
    "/api/contact"
  ],
  afterAuth(auth, req) {
    // Protect app routes - redirect to sign in if not authenticated
    if (req.nextUrl.pathname.startsWith("/app") || 
        req.nextUrl.pathname.startsWith("/playback") || 
        req.nextUrl.pathname.startsWith("/search")) {
      if (!auth.userId) {
        const signInUrl = new URL("/sign-in", req.url);
        signInUrl.searchParams.set("redirect_url", req.url);
        return Response.redirect(signInUrl);
      }
    }
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}; 