import { Filter, Info, Plus, Search, Trash2 } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { CRECOModal } from "../components/CRECOModal";

type PatientRow = {
  id: string;
  name: string;
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

export function CotacaoCreco() {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setSelectedPatient(patientId);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (patientId: string) => {
    // TODO: Implementar exclusão
    console.log("Delete clicked for:", patientId);
  };

  const handleInfoClick = (patientId: string) => {
    // TODO: Implementar informações
    console.log("Info clicked for:", patientId);
  };

  return (
    <section
      aria-labelledby="cotacao-creco-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
    >
      <header className="mb-10">
        <div className="mb-8 flex items-center justify-between">
          <h1
            id="cotacao-creco-heading"
            className="text-3xl font-medium text-primary"
          >
            {t("page.creco")}
          </h1>
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
        <div className="grid grid-cols-[1fr,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
              {t("common.paciente")}
            </span>
            {totalPages > 0 && (
              <div className="text-sm font-medium text-primary">
                &lt; {currentPage}-{totalPages} &gt;
              </div>
            )}
          </div>
          <span className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
            {t("common.acoes")}
          </span>
        </div>

        <div className="divide-y divide-borderNeutral">
          {paginatedPatients.map((patient, index) => (
            <div
              key={patient.id}
              className={clsx(
                "grid grid-cols-[1fr,120px] items-center gap-4 px-6 py-4 text-sm",
                index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="font-medium text-[#4f4f4f]">
                  {patient.name}
                </span>
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
                    className="flex size-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
                    aria-label={`Excluir ${patient.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                )}
                {patient.actions.includes("info") && (
                  <button
                    type="button"
                    onClick={() => handleInfoClick(patient.id)}
                    className="flex size-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
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

      {isModalOpen && (
        <CRECOModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
          onSubmit={(data) => {
            // TODO: Implementar submissão
            console.log("Modal submitted with data:", data);
            setIsModalOpen(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </section>
  );
}

