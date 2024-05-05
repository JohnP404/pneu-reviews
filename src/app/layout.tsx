"use client";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/store/AuthContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <meta property="og:title" content="Pneuzin reviews" />
            <meta
                property="og:description"
                content="Reviews de jogos e filmes"
            />
            <meta
                property="og:image"
                content="https://cdn.discordapp.com/attachments/1006361676771233804/1220014106757693471/Screenshot_87.png?ex=660d65ad&is=65faf0ad&hm=926acdf683c6060f01f3e6834d68de096361907de29d355fe68a38fc4a1def75&"
            />
            <meta
                property="og:url"
                content="https://pneuzin-reviews.vercel.app/"
            />
            <title>Pneuzin Reviews</title>

            <body className={`${poppins.className} scrollbox--master`}>
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
