export default function NotFound() {
  return (
    <div id="404-container" className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 p-6 font-sans">
      <div id="404-content" className="max-w-md text-center space-y-4">
        <h2 id="404-title" className="text-3xl font-bold tracking-tight">404 - Page Not Found</h2>
        <p id="404-desc" className="text-sm text-zinc-500 dark:text-zinc-400">
          We could not find the page you were looking for. Feel free to return home.
        </p>
        <a
          id="404-home-link"
          href="/"
          className="inline-block px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
