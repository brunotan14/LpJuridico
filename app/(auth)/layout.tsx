export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-gold-500/30 bg-gold-500/5">
          <span className="font-serif text-2xl font-semibold leading-none text-gold-500">
            LP
          </span>
        </div>
        <div className="text-center">
          <h1 className="font-serif text-xl font-medium text-zinc-50">
            Leandro Pedrosa
          </h1>
          <p className="text-sm text-zinc-500">Advocacia Criminal</p>
        </div>
      </div>
      {children}
    </div>
  );
}
