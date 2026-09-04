import Link from "next/link";

export default function AuthorFooter() {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-border/40">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <p>
          Built by{" "}
          <Link
            href="https://www.linkedin.com/in/aditya-singh-v"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-amber-500 transition-colors underline underline-offset-4"
          >
            Aditya Singh
          </Link>
        </p>
        <p className="text-muted-foreground/60">
          RankFlow UI &bull; Open-source components for modern web apps
        </p>
      </div>
    </footer>
  );
}
