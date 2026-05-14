import { auth } from "@/auth";

export default auth((req) => {
  const isAdmin = req.nextUrl.pathname.startsWith("/admin");
  const isLogin = req.nextUrl.pathname === "/admin/login";

  if (isAdmin && !isLogin && !req.auth) {
    return Response.redirect(new URL("/admin/login", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
