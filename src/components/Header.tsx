"use client";

import { Auth } from "@/store/AuthContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import HamburguerMenu from "./HamburguerMenu";

export default function Header() {
    const [screenWidth, setScreenWidth] = useState<number>(0);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { googleSignOut, user, isAdmin } = Auth();
    const [showSignOut, setShowSignOut] = useState(false);

    useEffect(() => {
        setScreenWidth(window.innerWidth);

        window.addEventListener("resize", () =>
            setScreenWidth(window.innerWidth)
        );
    }, [screenWidth]);

    return (
        <>
            <HamburguerMenu open={showMobileMenu} setOpen={setShowMobileMenu} />
            <header className="bg-black/20 backdrop-blur-md border-b border-primary/50">
                <nav className="p-4 flex justify-between items-center">
                    <Link href={"/"}>
                        <h1 className="text-slate-300 font-semibold">
                            Pneu Reviews
                        </h1>
                    </Link>
                    {screenWidth > 500 && (
                        <ul className="text-sm text-slate-300 flex gap-4 items-center">
                            {user && (
                                <>
                                    <li>
                                        <Link
                                            className="transition-colors hover:text-primary"
                                            href={"/reviews"}
                                        >
                                            Reviews
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="transition-colors hover:text-primary"
                                            href={"/favorites"}
                                        >
                                            Favoritos
                                        </Link>
                                    </li>
                                </>
                            )}
                            <li>
                                <Link
                                    className="transition-colors hover:text-primary"
                                    href={"/bio"}
                                >
                                    Sobre o Pneu
                                </Link>
                            </li>
                            {isAdmin && (
                                <li>
                                    <Link
                                        className="transition-colors hover:text-primary"
                                        href={"/review/upload"}
                                    >
                                        Upload
                                    </Link>
                                </li>
                            )}

                            {user && (
                                <li>
                                    <img
                                        src={
                                            user.providerData[0]?.photoURL || ""
                                        }
                                        alt={user.displayName || ""}
                                        width={40}
                                        height={40}
                                        referrerPolicy="no-referrer"
                                        className="cursor-pointer rounded-full z-20"
                                        onClick={() =>
                                            setShowSignOut((state) => !state)
                                        }
                                    />

                                    <Button
                                        className={`absolute right-3 transition-all ${
                                            showSignOut
                                                ? "animate-slide-in pointer-events-auto"
                                                : "opacity-0 -translate-y-4 pointer-events-none -z-10"
                                        }`}
                                        variant={"outline"}
                                        onClick={googleSignOut}
                                    >
                                        Sair
                                    </Button>
                                </li>
                            )}
                        </ul>
                    )}
                    {screenWidth < 500 && (
                        <HamburgerMenuIcon
                            onClick={() => setShowMobileMenu(true)}
                            className="cursor-pointer"
                            width={20}
                            height={20}
                        />
                    )}
                </nav>
            </header>
        </>
    );
}
