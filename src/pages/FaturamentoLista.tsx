import {
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
  status?: {
    label: string;
    iconColor: "yellow" | "red";
  };
  selected?: boolean;
};

const initialPending: PatientRow[] = [
  { id: "regiane-takahashi", name: "Regiane Takahashi" },
  { id: "lucas-ferreira", name: "Lucas Ferreira da Silva" },
  {
    id: "pedro-henrique",
    name: "Pedro Henrique Almeida Costa",
    status: {
      label: "Liberação divergente",
      iconColor: "yellow"
    }
  },
  { id: "ana-paula", name: "Ana Paula Monteiro" },
  { id: "bruno-rodrigues", name: "Bruno Rodrigues Souza" },
  {
    id: "gabriela-mendes",
    name: "Gabriela Mendes Barbosa",
    status: {
      label: "Saldo Pendente",
      iconColor: "red"
    }
  },
  { id: "thiago-martins", name: "Thiago Martins Cardoso" }
];

const initialBilled: PatientRow[] = [
  { id: "regiane-takahashi", name: "Regiane Takahashi", selected: false },
  { id: "lucas-ferreira", name: "Lucas Ferreira da Silva", selected: false },
  { id: "pedro-henrique", name: "Pedro Henrique Almeida Costa", selected: true },
  { id: "ana-paula", name: "Ana Paula Monteiro", selected: false },
  { id: "bruno-rodrigues", name: "Bruno Rodrigues Souza", selected: true },
  { id: "gabriela-mendes", name: "Gabriela Mendes Barbosa", selected: true },
  { id: "thiago-martins", name: "Thiago Martins Cardoso", selected: false }
];

type TabKey = "pending" | "billed";

type FaturamentoListaProps = {
  onNavigateToLiberacaoDivergente?: () => void;
  onNavigateToSaldoPendente?: () => void;
};

export function FaturamentoLista({ onNavigateToLiberacaoDivergente, onNavigateToSaldoPendente }: FaturamentoListaProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("pending");
  const [search, setSearch] = useState("");
  const [billedPatients, setBilledPatients] = useState<PatientRow[]>(() =>
    initialBilled.map((p) => ({ ...p }))
  );

  const dataForTab = useMemo(() => {
    const entries = activeTab === "pending" ? initialPending : billedPatients;
    const query = search.trim().toLowerCase();
    if (!query) return entries;
    return entries.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [activeTab, search, billedPatients]);

  const toggleBilledPatientSelection = (id: string) => {
    setBilledPatients((prev) =>
      prev.map((patient) =>
        patient.id === id ? { ...patient, selected: !patient.selected } : patient
      )
    );
  };

  return (
    <section
      aria-labelledby="faturamento-lista-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      <header className="flex flex-col gap-4">
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
            {t("page.pendente-faturamento")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("billed")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "billed"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            {t("page.faturados")}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Filtrar"
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
        {activeTab === "pending" ? (
          <>
            <div className="grid grid-cols-[1fr,120px,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
              <span>Paciente</span>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center justify-center gap-2">
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
                <span className="text-center">{t("common.status")}</span>
              </div>
              <span className="text-center">{t("common.acoes")}</span>
            </div>

            <div className="divide-y divide-borderNeutral">
              {dataForTab.map((patient, index) => (
                <div
                  key={patient.id}
                  className={clsx(
                    "grid grid-cols-[1fr,120px,120px] items-center gap-4 px-6 py-4 text-sm",
                    index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
                  )}
                >
                  <span className="font-medium text-[#4f4f4f]">
                    {patient.name}
                  </span>
                  <div className="flex items-center justify-center">
                    {patient.status ? (
                      <div className="relative group">
                        <Info
                          size={18}
                          className={clsx(
                            "cursor-help transition",
                            patient.status.iconColor === "yellow"
                              ? "text-yellow-500"
                              : "text-red-500"
                          )}
                          aria-label={patient.status.label}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#4f4f4f] text-white text-xs font-medium rounded whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 pointer-events-none">
                          {patient.status.label}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#4f4f4f]"></div>
                        </div>
                      </div>
                    ) : (
                      <span className="text-[#4f4f4f]">-</span>
                    )}
                  </div>
                  <div className="flex items-center justify-end gap-3 text-primary">
                    <button
                      type="button"
                      onClick={() => {
                        if (patient.id === "pedro-henrique") {
                          onNavigateToLiberacaoDivergente?.();
                        } else if (patient.id === "gabriela-mendes") {
                          onNavigateToSaldoPendente?.();
                        }
                      }}
                      className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                      aria-label={`Adicionar ${patient.name}`}
                    >
                      <Plus size={18} />
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-full border border-[#b0b0b0] text-[#b0b0b0] transition hover:bg-gray-100"
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
          </>
        ) : (
          <>
            <div className="grid grid-cols-[1fr,auto,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
              <span>Paciente</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center gap-2">
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
                <button
                  type="button"
                  className="rounded-full bg-red-500 px-6 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-red-600"
                >
                  {t("button.finalizar")}
                </button>
              </div>
              <span className="text-center">Ações</span>
            </div>

            <div className="divide-y divide-borderNeutral">
              {dataForTab.map((patient, index) => (
                <div
                  key={patient.id}
                  className={clsx(
                    "grid grid-cols-[1fr,auto,120px] items-center gap-4 px-6 py-4 text-sm",
                    index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
                  )}
                >
                  <span className="font-medium text-[#4f4f4f]">
                    {patient.name}
                  </span>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={patient.selected || false}
                      onChange={() => toggleBilledPatientSelection(patient.id)}
                      className="size-4 rounded border-borderNeutral text-primary focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div className="flex items-center justify-end gap-3 text-primary">
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                      aria-label={`Visualizar ${patient.name}`}
                    >
                      <Search size={18} />
                    </button>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-full border border-[#b0b0b0] text-[#b0b0b0] transition hover:bg-gray-100"
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
          </>
        )}
      </div>
    </section>
  );
}

