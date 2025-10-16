export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-sm text-foreground/70 flex items-center justify-between">
        <span>© {year} App. All rights reserved.</span>
        <nav className="flex gap-4">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </nav>
      </div>
    </footer>
  );
}



