"use client";

import Form from "@/components/Form";
import { Auth } from "@/store/AuthContext";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Upload() {
    const { user,isAdmin } = Auth();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!isAdmin )
            router.replace("/");
    }, [user]);

    return (
        <main className="grid justify-items-center mt-12">
            <Form />
        </main>
    );
}
