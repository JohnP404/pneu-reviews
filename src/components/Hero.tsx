"use client";

import { useEffect, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import { Auth } from "@/store/AuthContext";
import styles from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
    const [highlight, setHighlight] = useState(false);
    const { googleSignIn, user } = Auth();

    useEffect(() => {
        setTimeout(() => {
            setHighlight(true);
        }, 500);
    }, []);

    return (
        <>
            <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-gradient-to-tl from-primary/30 to-black opacity-50" />
            <div className={styles.bg}></div>
            <section className="px-14 py-10 relative z-20">
                <h1 className="text-6xl max-w-xl font-bold mb-5">
                    As{" "}
                    <span
                        className={`transition-colors duration-1000 ease-in ${
                            highlight && "text-primary"
                        }`}
                    >
                        melhores
                    </span>{" "}
                    reviews de jogos e filmes em um só lugar.
                </h1>
                <p className="max-w-xl text-md text-slate-300 text-justify mb-4">
                    Ficou na dúvida se um jogo ou filme realmente vale a pena e
                    é pra você? Relaxe meu nobre, você acaba de vir ao lugar
                    perfeito. Aqui você encontra reviews precisas dos mais
                    diversos filmes e jogos escritas por um dos mais renomados
                    críticos de <i>games</i> e cinema do Brasil e da atualidade.
                </p>
                {!user && <Button onClick={googleSignIn}>Inscreva-se</Button>}
                {user && (
                    <Link className={buttonVariants()} href={"/reviews"}>
                        Ver Reviews
                    </Link>
                )}
            </section>
        </>
    );
}
