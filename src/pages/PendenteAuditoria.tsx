import { Filter, Info, Plus, Search, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
  status?: string;
  actions: Array<"plus" | "trash" | "info">;
};

const initialPatients: PatientRow[] = [
  {
    id: "regiane-takahashi",
    name: "Regiane Takahashi",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira da Silva",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "pedro-henrique",
    name: "Pedro Henrique Almeida Costa",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "ana-paula",
    name: "Ana Paula Monteiro",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "bruno-rodrigues",
    name: "Bruno Rodrigues Souza",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "gabriela-mendes",
    name: "Gabriela Mendes Barbosa",
    actions: ["plus", "trash", "info"]
  },
  {
    id: "thiago-martins",
    name: "Thiago Martins Cardoso",
    actions: ["plus", "trash", "info"]
  }
];

type TabKey = "auditoria" | "correcao";

type PendenteAuditoriaProps = {
  onNavigateToAuditoria2?: () => void;
};

export function PendenteAuditoria({ onNavigateToAuditoria2 }: PendenteAuditoriaProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("auditoria");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filteredPatients = useMemo(() => {
    if (!search.trim()) {
      return initialPatients;
    }
    const searchLower = search.toLowerCase();
    return initialPatients.filter((patient) =>
      patient.name.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPatients = filteredPatients.slice(startIndex, endIndex);

  const handleAddClick = (patientId: string) => {
    if (onNavigateToAuditoria2) {
      onNavigateToAuditoria2();
    } else {
      console.log("Add clicked for:", patientId);
    }
  };

  const handleDeleteClick = (patientId: string) => {
    console.log("Delete clicked for:", patientId);
  };

  const handleInfoClick = (patientId: string) => {
    console.log("Info clicked for:", patientId);
  };

  return (
    <section
      aria-labelledby="pendente-auditoria-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
    >
      <header className="mb-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setActiveTab("auditoria")}
              className={clsx(
                "border-b-4 pb-1 text-xl font-medium transition",
                activeTab === "auditoria"
                  ? "border-primary text-primary"
                  : "border-transparent text-[#8a8a8a]"
              )}
            >
              {t("page.pendente-auditoria")}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("correcao")}
              className={clsx(
                "border-b-4 pb-1 text-xl font-medium transition",
                activeTab === "correcao"
                  ? "border-primary text-primary"
                  : "border-transparent text-[#8a8a8a]"
              )}
            >
              {t("page.pendente-correcao")}
            </button>
          </div>

          <div className="flex items-center gap-3">
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
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="grid grid-cols-[1fr,auto,120px,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
          <span>{t("common.paciente")}</span>
          <div className="flex items-center justify-between text-center text-primary/80">
            <button
              type="button"
              className="text-primary transition hover:text-primary/70"
              aria-label="Página anterior"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              {"<"}
            </button>
            <span className="text-xs text-primary">
              {currentPage} - {totalPages}
            </span>
            <button
              type="button"
              className="text-primary transition hover:text-primary/70"
              aria-label="Próxima página"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              {">"}
            </button>
          </div>
          <span className="text-center">{t("common.status")}</span>
          <span className="text-right">{t("common.acoes")}</span>
        </div>

        <div className="divide-y divide-borderNeutral">
          {paginatedPatients.map((patient, index) => (
            <div
              key={patient.id}
              className={clsx(
                "grid grid-cols-[1fr,auto,120px,120px] items-center gap-4 px-6 py-4 text-sm text-[#4f4f4f]",
                index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
              )}
            >
              <span className="font-medium text-[#4f4f4f]">
                {patient.name}
              </span>
              <div></div>
              <div className="text-center text-[#4f4f4f]">
                {patient.status || ""}
              </div>
              <div className="flex items-center justify-end gap-3 text-primary">
                {patient.actions.includes("plus") && (
                  <button
                    type="button"
                    onClick={() => handleAddClick(patient.id)}
                    className="flex size-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
                    aria-label={`Adicionar ${patient.name}`}
                  >
                    <Plus size={18} />
                  </button>
                )}
                {patient.actions.includes("trash") && (
                  <button
                    type="button"
                    onClick={() => handleDeleteClick(patient.id)}
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Excluir ${patient.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                {patient.actions.includes("info") && (
                  <button
                    type="button"
                    onClick={() => handleInfoClick(patient.id)}
                    className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                    aria-label={`Mais informações sobre ${patient.name}`}
                  >
                    <Info size={18} />
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

