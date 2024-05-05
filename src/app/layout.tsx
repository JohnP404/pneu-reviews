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
            <meta property="og:title" content="Pneu reviews" />
            <meta
                property="og:description"
                content="Reviews de jogos e filmes feitas pelo renomado crítico de cinema e jornalista de games Jonathas Paes (Pneu)"
            />
            <meta
                property="og:image"
                content="https://cdn.discordapp.com/attachments/1006361676771233804/1236684653348388956/screenshot.png?ex=6638e7d5&is=66379655&hm=25567ea72d1e5de246dde137911e74d67b37e2f066a9b16300f34fff20506599&"
            />
            <meta
                property="og:url"
                content="https://pneu-reviews.vercel.app/"
            />
            <title>Pneu Reviews</title>

            <body className={`${poppins.className} scrollbox--master`}>
                <AuthProvider>
                    <Header />
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
