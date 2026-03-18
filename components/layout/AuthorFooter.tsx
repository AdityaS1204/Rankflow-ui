import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto py-10 border-t border-border/40">
      <div className="container flex flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-muted-foreground">
          Build by{" "}
          <Link
            href="https://www.linkedin.com/in/aditya-singh-v"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:text-amber-500 transition-colors underline underline-offset-4"
          >
            Aditya Singh
          </Link>
        </p>
      </div>
    </footer>
  );
}
