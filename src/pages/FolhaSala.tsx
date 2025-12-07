import { Filter, Info, Plus, Search } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
  actions: Array<"plus" | "search" | "info">;
};

const initialRows: PatientRow[] = [
  {
    id: "regiane-takahashi",
    name: "Regiane Takahashi",
    actions: ["plus", "info"]
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira da Silva",
    actions: ["search", "info"]
  },
  {
    id: "pedro-henrique",
    name: "Pedro Henrique Almeida Costa",
    actions: ["plus", "info"]
  },
  {
    id: "ana-paula",
    name: "Ana Paula Monteiro",
    actions: ["plus", "info"]
  },
  {
    id: "bruno-rodrigues",
    name: "Bruno Rodrigues Souza",
    actions: ["search", "info"]
  },
  {
    id: "gabriela-mendes",
    name: "Gabriela Mendes Barbosa",
    actions: ["plus", "info"]
  },
  {
    id: "thiago-martins",
    name: "Thiago Martins Cardoso",
    actions: ["plus", "info"]
  }
];

type FolhaSalaProps = {
  onNavigateToMais?: () => void;
};

export function FolhaSala({ onNavigateToMais }: FolhaSalaProps) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialRows;
    return initialRows.filter((row) =>
      row.name.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">
          {t("page.folha-sala")}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label={t("common.filtrar")}
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
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
            />
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="grid grid-cols-[1fr,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
          <span>{t("common.paciente")}</span>
          <span className="text-center">{t("common.acoes")}</span>
        </div>

        <div className="divide-y divide-borderNeutral">
          {filteredRows.map((row, index) => (
            <div
              key={row.id}
              className={clsx(
                "grid grid-cols-[1fr,120px] items-center gap-4 px-6 py-4 text-sm text-[#4f4f4f]",
                index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
              )}
            >
              <span className="font-medium text-[#4f4f4f]">
                {row.name}
              </span>
              <div className="flex items-center justify-end gap-3 text-primary">
                {row.actions.includes("plus") && (
                  <button
                    type="button"
                    onClick={() => {
                      if (row.id === "regiane-takahashi") {
                        onNavigateToMais?.();
                      }
                    }}
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Adicionar ${row.name}`}
                  >
                    <Plus size={18} />
                  </button>
                )}
                {row.actions.includes("search") && (
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Visualizar ${row.name}`}
                  >
                    <Search size={18} />
                  </button>
                )}
                {row.actions.includes("info") && (
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Mais informações sobre ${row.name}`}
                  >
                    <Info size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 px-6 py-4 text-xs font-medium uppercase tracking-[0.08em] text-primary">
          {"<"} 1 - 1 {">"}
        </div>
      </div>
    </section>
  );
}







