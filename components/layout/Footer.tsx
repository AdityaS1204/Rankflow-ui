export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 pb-10 pt-20 text-center">
      {/* Big wordmark */}
      <p className="select-none font-mono text-[clamp(3rem,12vw,9rem)] font-extrabold leading-none tracking-tighter text-white/5">
        rankflow-ui
      </p>

      {/* Copyright */}
      <p className="mt-6 text-xs text-neutral-600">
        © {new Date().getFullYear()} RankFlow UI. Open source under MIT.
      </p>
    </footer>
  );
}
