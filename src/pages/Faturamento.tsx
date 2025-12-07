import { useState } from "react";
import { Filter, Search, Upload, Trash2, FileText } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const mockFiles = [
  {
    id: "nota-fiscal",
    name: "Nota_fiscal.pdf",
    type: "pdf"
  }
];

export function Faturamento() {
  const { t } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState("Regiane Takahashi");
  const [observacoes, setObservacoes] = useState("");
  const [files] = useState(mockFiles);

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">
          {t("page.faturamento-cs")}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Filtrar pacientes"
          >
            <Filter size={20} />
          </button>
          <div className="relative flex h-11 items-center rounded-lg border border-borderNeutral bg-white px-4">
            <Search
              size={18}
              className="mr-3 text-borderNeutral"
              aria-hidden
            />
            <input
              type="search"
              placeholder={t("common.pesquise-paciente")}
              className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
            />
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-borderNeutral pb-4">
          <input
            value={selectedPatient}
            onChange={(event) => setSelectedPatient(event.target.value)}
            className="flex-1 rounded-lg border border-transparent bg-[#f5f8fb] px-4 py-3 text-sm text-[#4f4f4f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-primary transition hover:text-primary/80"
            aria-label="Pesquisar paciente"
          >
            <Search size={22} />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <button
            type="button"
            className="flex w-full max-w-xs items-center justify-between rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primaryHover"
          >
            {t("field.anexar-nota-fiscal")}
            <Upload size={18} />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center gap-2 text-primary">
              <span className="flex size-12 items-center justify-center rounded-xl border border-primary bg-[#e8f3fb]">
                <FileText size={24} />
              </span>
              <span className="text-xs font-medium">{files[0].name}</span>
            </div>
            <button
              type="button"
              className="flex size-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
              aria-label="Remover arquivo"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        <div className="mt-8">
          <label
            htmlFor="observacoes"
            className="block text-[11px] font-medium uppercase tracking-[0.08em] text-textMuted"
          >
            {t("field.observacoes")}
          </label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
              placeholder={t("field.observacoes") + "..."}
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-between">
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full bg-[#b0b0b0] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#9b9b9b]"
        >
          Voltar
        </button>
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          Enviar
        </button>
      </div>
    </section>
  );
}






