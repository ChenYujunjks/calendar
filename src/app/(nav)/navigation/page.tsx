export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-12 bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Bruce Chen</h1>
      </header>

      {/* About */}
      <section className="space-y-4 leading-relaxed flex-grow">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p>
          I&apos;m a senior CS student at <strong>NYU Shanghai</strong> (Class
          of 2025), passionate about decentralized systems,
          cryptocurrency&nbsp;⚙️. Recent projects include a blockchain-based
          messaging app and an interactive WebGL tool.
        </p>
        <p>
          Skills:Go · TypeScript · React/Next.js · MySQL · Python · Solidity
        </p>
      </section>

      {/* Contact */}
      <section className="space-y-2 mb-6">
        <h2 className="text-xl font-semibold">Contact Me</h2>
        <ul className="list-inside list-disc text-sm">
          <li>
            Email:&nbsp;
            <a
              href="mailto:yc5508@nyu.edu"
              className="underline hover:text-blue-600"
            >
              yc5508@nyu.edu
            </a>
          </li>
          <li>
            GitHub:&nbsp;
            <a
              href="https://github.com/yitan-li"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              https://github.com/ChenYujunjks
            </a>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t pt-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Bruce Chen. All rights reserved.
      </footer>
    </main>
  );
}
