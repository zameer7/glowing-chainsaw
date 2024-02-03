"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = ({ defaultValue }: { defaultValue?: string }) => {
    const router = useRouter();
    const [search, setSearch] = useState<string>(
        defaultValue ? defaultValue : "",
    );
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (!search) return;
                router.push(`/${search}`);
            }}
            className="order-1 col-span-2  flex h-14 w-full items-center justify-center rounded-full bg-white px-4 text-gray-500 transition-all duration-100 focus-within:border-2 focus-within:border-gray-500 md:order-2 md:w-2/3 lg:w-1/2"
        >
            <input
                type="text"
                name="search"
                id="search"
                className="h-full flex-1 rounded-full px-4 text-black outline-none"
                placeholder="Search...."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button
                type="submit"
                className="material-symbols-outlined active:text-black"
            >
                search
            </button>
        </form>
    );
};

export default SearchBar;
