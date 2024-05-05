"use client";

import { Auth } from "@/store/AuthContext";
import Link from "next/link";
import { Button } from "./ui/button";
import { Cross1Icon } from "@radix-ui/react-icons";
import { MouseEvent } from "react";

type Props = {
    open: boolean;
    setOpen: (val: boolean) => void;
};

export default function HamburguerMenu({ open, setOpen }: Props) {
    const { user, isAdmin, googleSignOut } = Auth();

    function clickHandler(e: MouseEvent<HTMLElement>) {
        const element = e.target as HTMLElement;

        if (element) setOpen(false);
    }

    return (
        <>
            {open && (
                <div className="z-40 fixed top-0 left-0 bg-background/70 h-screen w-screen" />
            )}
            <div
                className={`min-h-screen min-w-[300px] fixed top-0 right-0 z-50 bg-background border transition-all ease-in-out ${
                    open ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <ul
                    onClick={clickHandler}
                    className="text-sm text-slate-300 grid gap-4 p-4"
                >
                    <Cross1Icon
                        onClick={() => setOpen(false)}
                        className="justify-self-end cursor-pointer"
                    />
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
                            <div>
                                <Button
                                    variant={"outline"}
                                    onClick={googleSignOut}
                                >
                                    Sair
                                </Button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
}
