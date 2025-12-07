import {
  CalendarDays,
  Filter,
  Info,
  Plus,
  Search,
  Trash2,
  AlertCircle
} from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { CotacaoPreModal } from "../components/CotacaoPreModal";
import { CotacaoPosModal } from "../components/CotacaoPosModal";
import { useLanguage } from "../contexts/LanguageContext";

type PatientRow = {
  id: string;
  name: string;
  hasAlert?: boolean;
  actions: "plus" | "search";
};

const initialPatients: PatientRow[] = [
  {
    id: "regiane-takahashi",
    name: "Regiane Takahashi",
    actions: "plus"
  },
  {
    id: "lucas-ferreira",
    name: "Lucas Ferreira da Silva",
    hasAlert: true,
    actions: "search"
  },
  {
    id: "pedro-henrique",
    name: "Pedro Henrique Almeida Costa",
    actions: "plus"
  },
  {
    id: "ana-paula",
    name: "Ana Paula Monteiro",
    actions: "plus"
  },
  {
    id: "bruno-rodrigues",
    name: "Bruno Rodrigues Souza",
    hasAlert: true,
    actions: "search"
  },
  {
    id: "gabriela-mendes",
    name: "Gabriela Mendes Barbosa",
    actions: "plus"
  },
  {
    id: "thiago-martins",
    name: "Thiago Martins Cardoso",
    actions: "plus"
  }
];

type TabKey = "cotacao-autorizacao" | "pendente-agendamento";

export function CriacaoProcedimentoLista() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("cotacao-autorizacao");
  const [search, setSearch] = useState("");
  const [cotacaoPre, setCotacaoPre] = useState(false);
  const [cotacaoPos, setCotacaoPos] = useState(true);
  const [isCotacaoPreOpen, setIsCotacaoPreOpen] = useState(false);
  const [isCotacaoPosOpen, setIsCotacaoPosOpen] = useState(false);

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return initialPatients;
    return initialPatients.filter((patient) =>
      patient.name.toLowerCase().includes(query)
    );
  }, [search]);

  const handleAddClick = () => {
    if (cotacaoPre) {
      setIsCotacaoPreOpen(true);
    } else if (cotacaoPos) {
      setIsCotacaoPosOpen(true);
    }
  };

  const handleCotacaoPreSubmit = (data: {
    priceList: string;
    itemKits: string;
    products: unknown[];
    total: number;
  }) => {
    console.log("Dados Cotação Pré:", data);
    setIsCotacaoPreOpen(false);
  };

  const handleCotacaoPosSubmit = (data: {
    priceList: string;
    itemKits: string;
    products: unknown[];
    total: number;
  }) => {
    console.log("Dados Cotação Pós:", data);
    setIsCotacaoPosOpen(false);
  };

  return (
    <section
      aria-labelledby="criacao-procedimento-lista-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      <header className="flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("cotacao-autorizacao")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "cotacao-autorizacao"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            {t("page.cotacao-autorizacao")}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pendente-agendamento")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "pendente-agendamento"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            {t("page.pendente-agendamento")}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={cotacaoPre}
                onChange={(e) => setCotacaoPre(e.target.checked)}
                className="size-4 rounded border-borderNeutral text-primary focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-sm text-[#4f4f4f]">{t("field.cotacao-pre")}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={cotacaoPos}
                onChange={(e) => setCotacaoPos(e.target.checked)}
                className="size-4 rounded border-borderNeutral text-primary focus:ring-2 focus:ring-primary/40"
              />
              <span className="text-sm text-[#4f4f4f]">{t("field.cotacao-pos")}</span>
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
              aria-label="Filtrar"
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
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="grid grid-cols-[1fr,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
          <span>{t("common.paciente")}</span>
          <span className="text-center">{t("common.acoes")}</span>
        </div>

        <div className="divide-y divide-borderNeutral">
          {filteredPatients.map((patient, index) => (
            <div
              key={patient.id}
              className={clsx(
                "grid grid-cols-[1fr,120px] items-center gap-4 px-6 py-4 text-sm",
                index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
              )}
            >
              <div className="flex items-center gap-3">
                {patient.hasAlert && (
                  <AlertCircle
                    size={18}
                    className="text-red-500 flex-shrink-0"
                    aria-label="Alerta"
                  />
                )}
                <span className="font-medium text-[#4f4f4f]">
                  {patient.name}
                </span>
              </div>
              <div className="flex items-center justify-end gap-3 text-primary">
                {patient.actions === "plus" ? (
                  <>
                    <button
                      type="button"
                      onClick={handleAddClick}
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
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                      aria-label={`Buscar ${patient.name}`}
                    >
                      <Search size={18} />
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 border-t border-borderNeutral px-6 py-4 text-primary">
          <button
            type="button"
            className="text-primary transition hover:text-primary/70"
            aria-label="Página anterior"
          >
            {"<"}
          </button>
          <span className="text-sm text-primary">1 - 1</span>
          <button
            type="button"
            className="text-primary transition hover:text-primary/70"
            aria-label="Próxima página"
          >
            {">"}
          </button>
        </div>
      </div>

      <CotacaoPreModal
        open={isCotacaoPreOpen}
        onClose={() => setIsCotacaoPreOpen(false)}
        onSubmit={handleCotacaoPreSubmit}
      />

      <CotacaoPosModal
        open={isCotacaoPosOpen}
        onClose={() => setIsCotacaoPosOpen(false)}
        onSubmit={handleCotacaoPosSubmit}
      />
    </section>
  );
}

