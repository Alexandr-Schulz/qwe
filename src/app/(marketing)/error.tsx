"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="p-10">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <pre className="mt-4 text-sm opacity-70 whitespace-pre-wrap">{error?.message}</pre>
    </div>
  );
}



