import {
  CalendarDays,
  Filter,
  Info,
  Plus,
  Search,
  Trash2
} from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
};

const initialPending: PatientRow[] = [
  { id: "mariana-bastos", name: "Mariana Santos Oliveira Bastos" },
  { id: "lucas-ferreira", name: "Lucas Ferreira da Silva" },
  { id: "pedro-henrique", name: "Pedro Henrique Almeida Costa" },
  { id: "ana-paula", name: "Ana Paula Monteiro" },
  { id: "bruno-rodrigues", name: "Bruno Rodrigues Souza" }
];

const initialScheduled: PatientRow[] = [
  { id: "regiane-takahashi", name: "Regiane Takahashi" },
  { id: "gabriela-mendes", name: "Gabriela Mendes Barbosa" },
  { id: "thiago-martins", name: "Thiago Martins Cardoso" }
];

type TabKey = "pending" | "scheduled";

export function Agendamentos() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const [search, setSearch] = useState("");

  const dataForTab = useMemo(() => {
    const entries = activeTab === "pending" ? initialPending : initialScheduled;
    const query = search.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [activeTab, search]);

  return (
    <section
      aria-labelledby="agendamentos-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("pending")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "pending"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            {t("page.pendente-agendamento")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("scheduled")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "scheduled"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            {t("page.agendados")}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Filtrar agendamentos"
          >
            <Filter size={20} />
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Filtrar por datas"
          >
            <CalendarDays size={20} />
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
          {dataForTab.map((patient, index) => (
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
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Adicionar ${patient.name}`}
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
                  aria-label={`Mais informações sobre ${patient.name}`}
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


