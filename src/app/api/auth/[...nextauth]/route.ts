import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { User } from "next-auth";

// Initialize Prisma client with connection pooling
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Extend the User type to include role
interface ExtendedUser extends User {
  role?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isAdmin: { label: "Admin Login", type: "checkbox" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          // Check if this is an admin login
          if (credentials.isAdmin === "true") {
            // Admin authentication (using environment variables)
            console.log("Admin login attempt - raw input email:", credentials.email);
            console.log("Admin login attempt - env vars available:", {
              adminEmailAvailable: !!process.env.ADMIN_EMAIL,
              adminPasswordAvailable: !!process.env.ADMIN_PASSWORD
            });
            
            const isValidAdmin = 
              credentials.email === process.env.ADMIN_EMAIL && 
              credentials.password === process.env.ADMIN_PASSWORD;
            
            // Debugging but without exposing actual values
            console.log("Admin login attempt - matching:", {
              emailMatch: credentials.email === process.env.ADMIN_EMAIL,
              passwordMatch: credentials.password === process.env.ADMIN_PASSWORD
            });
            
            if (isValidAdmin) {
              return {
                id: "admin",
                name: "Admin",
                email: process.env.ADMIN_EMAIL || "",
                role: "admin",
                image: null
              };
            } else {
              throw new Error("Invalid admin credentials");
            }
          } else {
            // Regular user authentication (using database)
            try {
              const user = await prisma.user.findUnique({
                where: {
                  email: credentials.email
                },
              });

              if (!user) {
                throw new Error("User not found");
              }

              // Compare hashed passwords
              const isValidPassword = await bcrypt.compare(
                credentials.password,
                user.hashedPassword || ""
              );

              if (!isValidPassword) {
                throw new Error("Invalid password");
              }

              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image
              };
            } catch (error: any) {
              // If there's a Prisma error related to missing tables, provide a helpful message
              if (error.code === 'P2021') {
                console.error("Database error: User table does not exist. Database might not be set up yet.");
                throw new Error("Database not set up. Please contact administrator or try admin login.");
              }
              // Re-throw other errors
              throw error;
            }
          }
        } catch (error: any) {
          console.error("Auth error:", error);
          // Return null to indicate authentication failure but with a cleaner error for the user
          throw new Error(error.message || "Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // When a user signs in, add their role to the token
      if (user) {
        token.role = (user as ExtendedUser).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user's role and ID to the session
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/signin", // Error page for auth issues
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 