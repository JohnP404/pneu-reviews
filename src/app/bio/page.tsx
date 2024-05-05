"use client";

import { useState } from "react";

export default function Page() {
    const [hover, setHover] = useState(false);
    return (
        <main className="p-7 grid gap-5 justify-center items-center pt-10">
            <article className="max-w-2xl">
                <h1 className="text-3xl font-semibold mb-2">Quem sou eu?</h1>
                <p className="text-slate-300">
                    Meu nome é Jonathas Paes &#40;mais conhecido como Pneu&#41;.
                    Sou um amante de jogos desde a infância e crítico de cinema
                    a mais de 7 anos. Minhas opiniões são <b>sempre</b> 100%
                    válidas e baseadas em afirmações 100% verídicas. Fui
                    premiado diversas vezes por escrever análises e resenhas que
                    detalham e avaliam os principais aspectos dos filmes os
                    quais assisto e dos <i>games</i> que jogo, porém sempre
                    livre de spoilers com o objetivo de oferecer aos leitores
                    uma experiência incrível, marcante e inesquecível
                </p>
            </article>

            <div className="flex gap-5">
                <img
                    className={`transition-[transform] duration-1000 rounded-lg ${
                        hover
                            ? "-rotate-12 translate-y-4 translate-x-20"
                            : " translate-x-full"
                    }`}
                    src="tire1.webp"
                    alt="pneu"
                    width={350}
                />
                <img
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    className="rounded-lg z-20 shadow-[0_0_8px] shadow-black/40"
                    src="pneu-china.jpeg"
                    alt="pneu"
                    width={350}
                />
                <img
                    className={`transition-[transform] duration-1000 rounded-lg ${
                        hover
                            ? "rotate-12 translate-y-4 -translate-x-20"
                            : "-translate-x-full"
                    }`}
                    src="tire2.jpeg"
                    alt="pneu"
                    width={350}
                />
            </div>
        </main>
    );
}
