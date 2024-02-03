"use client";

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return <div className="flex flex-col min-h-screen w-full items-center justify-center ">
      <div className="space-y-5 text-center">
          <div className="text-2xl">{error.message}</div>
          <button onClick={reset} className="bg-black px-4 py-2 rounded-lg text-gray-100">Reset</button>
      </div>
    </div>
}