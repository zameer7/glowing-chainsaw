"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useTransition } from "react";

export const SearchSection = ({
    page,
    children,
}: {
    page: number;
    children: ReactNode;
}) => {
    const [_, startTransition] = useTransition();

    const router = useRouter();
    const path = usePathname();

    const handlePageChange = (page: number) => {
        startTransition(() => {
            router.push(`${path}?page=${page}`);
        });
    };

    const disablePrev = page > 1;

    return (
        <div className="grid w-full grid-cols-2 items-center justify-center gap-5 sm:px-[--padding-x] md:flex md:gap-10">
            <button
                disabled={!disablePrev}
                onClick={() => {
                    handlePageChange(page - 1);
                }}
                className="text-1xl order-2 mx-auto disabled:opacity-40 md:order-1"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left "
                >
                    <path d="m15 18-6-6 6-6" />
                </svg>
            </button>
            {children}
            <button
                onClick={() => {
                    handlePageChange(page + 1);
                }}
                className="order-3 mx-auto text-2xl"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right "
                >
                    <path d="m9 18 6-6-6-6" />
                </svg>
            </button>
        </div>
    );
};
//
