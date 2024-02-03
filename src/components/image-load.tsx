"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ImageLoad({ photo }: { photo: any }) {
    const router = useRouter();

    const [reveal, setReveal] = useState(false);

    return (
        <div
            className="break-inside relative mb-5 cursor-pointer transition-all"
            onClick={() => {
                router.push(photo.src.original);
            }}
        >
            <div className={`relative ${reveal ? "" : "min-h-[18rem]"}`}>
                <Image
                    className={`images h-full w-full transition-all ${
                        reveal ? "visible" : "invisible"
                    } duration-200`}
                    src={photo.src.original}
                    alt={photo.alt}
                    fill
                    sizes="100vw"
                    priority={false}
                    onLoad={() => setReveal(true)}
                />
                <span
                    className={`absolute inset-0 h-full w-full animate-pulse bg-gray-400 text-slate-100 transition-all ${
                        reveal ? "hidden" : "block"
                    }`}
                ></span>
            </div>
        </div>
    );
}
