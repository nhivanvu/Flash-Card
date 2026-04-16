import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlashyCardy - Interactive Flash Cards",
  description: "Create, study, and master topics with interactive flash cards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            baseTheme: dark,
          } as any}
        >
          <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                FlashyCardy
              </div>
              <div className="flex items-center gap-3">
                <Show when="signed-out">
                  <SignInButton />
                  <SignUpButton />
                </Show>
                <Show when="signed-in">
                  <UserButton />
                </Show>
              </div>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
