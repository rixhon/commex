import { useLanguage } from "../contexts/LanguageContext";

export function Teste() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="teste-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1
          id="teste-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.teste")}
        </h1>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white px-6 py-5 shadow-sm">
        <p className="text-sm text-[#4f4f4f]">
          Esta é a página de teste.
        </p>
      </div>
    </section>
  );
}

