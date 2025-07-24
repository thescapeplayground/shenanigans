export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full flex justify-center max-w-300 mx-auto p-5 flex flex-col gap-5">
      {children}
    </main>
  );
}
