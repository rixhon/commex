import { Filter, Search, Plus, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
  actions: Array<"plus" | "search" | "trash">;
};

const initialRows: PatientRow[] = [
  { id: "regiane", name: "Regiane Takahashi", actions: ["plus", "trash"] },
  { id: "lucas", name: "Lucas Ferreira da Silva", actions: ["plus", "trash"] },
  {
    id: "pedro",
    name: "Pedro Henrique Almeida Costa",
    actions: ["search", "trash"]
  },
  { id: "ana", name: "Ana Paula Monteiro", actions: ["plus", "trash"] },
  { id: "bruno", name: "Bruno Rodrigues Souza", actions: ["plus", "trash"] },
  {
    id: "gabriela",
    name: "Gabriela Mendes Barbosa",
    actions: ["search", "trash"]
  },
  { id: "thiago", name: "Thiago Martins Cardoso", actions: ["plus", "trash"] }
];

type OrdemCompraProps = {
  onNavigateToAnexar?: () => void;
};

export function OrdemCompra({ onNavigateToAnexar }: OrdemCompraProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return initialRows;
    return initialRows.filter((row) =>
      row.name.toLowerCase().includes(query)
    );
  }, [searchTerm]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">{t("page.ordem-compra")}</h1>

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
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
            />
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="grid grid-cols-[1fr,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
          <span>{t("common.paciente")}</span>
          <div className="flex items-center justify-between text-center text-primary/80">
            <button
              type="button"
              className="text-primary transition hover:text-primary/70"
              aria-label="Página anterior"
            >
              {"<"}
            </button>
            <span className="text-xs text-primary">1 - 1</span>
            <button
              type="button"
              className="text-primary transition hover:text-primary/70"
              aria-label="Próxima página"
            >
              {">"}
            </button>
          </div>
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
                    onClick={onNavigateToAnexar}
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
                {row.actions.includes("trash") && (
                  <button
                    type="button"
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Remover ${row.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}







