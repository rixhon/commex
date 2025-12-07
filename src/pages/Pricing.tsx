import { Filter, Plus, Search, Trash2, Info } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
};

const initialPatients: PatientRow[] = [
  { id: "regiane-takahashi", name: "Regiane Takahashi" },
  { id: "lucas-ferreira", name: "Lucas Ferreira da Silva" },
  { id: "pedro-henrique", name: "Pedro Henrique Almeida Costa" },
  { id: "ana-paula", name: "Ana Paula Monteiro" },
  { id: "bruno-rodrigues", name: "Bruno Rodrigues Souza" },
  { id: "gabriela-mendes", name: "Gabriela Mendes Barbosa" },
  { id: "thiago-martins", name: "Thiago Martins Cardoso" }
];

type PricingProps = {
  onNavigateToLiberacao?: () => void;
};

export function Pricing({ onNavigateToLiberacao }: PricingProps) {
  const { t } = useLanguage();
  const [patients] = useState<PatientRow[]>(initialPatients);
  const [search, setSearch] = useState("");

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return patients;
    return patients.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [patients, search]);

  return (
    <section
      aria-labelledby="pricing-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1
          id="pricing-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.pendente-liberacao")}
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
          {filteredPatients.map((patient, index) => (
            <div
              key={patient.id}
              className={clsx(
                "grid grid-cols-[1fr,120px] items-center gap-4 px-6 py-4 text-sm text-[#4f4f4f]",
                index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
              )}
            >
              <span className="font-medium text-[#4f4f4f]">
                {patient.name}
              </span>
              <div className="flex items-center justify-end gap-3 text-primary">
                <button
                  type="button"
                  onClick={() => onNavigateToLiberacao?.()}
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Adicionar informações para ${patient.name}`}
                >
                  <Plus size={18} />
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Excluir ${patient.name}`}
                >
                  <Trash2 size={18} />
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Detalhes adicionais de ${patient.name}`}
                >
                  <Info size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


