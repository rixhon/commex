import { Filter, Info, Plus, Search } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState } from "react";

type PatientRow = {
  id: string;
  name: string;
  status?: string;
  highlight?: boolean;
};

const pendingAuditRows: PatientRow[] = [
  { id: "lazara", name: "Lazara Pereira Da Silva Cerqueira" },
  { id: "agnaldo", name: "Agnaldo Batista Da Costa" },
  { id: "francisco", name: "Francisco De Assis Fernandes Pereira" },
  { id: "adriano", name: "Adriano Paulo De Oliveira" },
  {
    id: "felipe",
    name: "Felipe Carneiro Dalpiaz",
    status: "Pendente Audit. Serviços",
    highlight: true
  },
  {
    id: "eraldo",
    name: "Eraldo Silva Da Rosa",
    status: "Pendente Audit. Serviços",
    highlight: true
  },
  {
    id: "mercelino",
    name: "Mercelino De Lyrio",
    status: "Pendente Audit. Serviços",
    highlight: true
  },
  {
    id: "ana-silvia",
    name: "Ana Silvia Pereira Bellico Guelman",
    status: "Pendente Audit. Serviços"
  },
  {
    id: "raimundo",
    name: "Raimundo Nonato Alves",
    status: "Pendente Audit. Serviços"
  },
  {
    id: "luiz",
    name: "Luiz Gomes De Carvalho Filho",
    status: "Pendente Audit. Serviços"
  }
];

const pendingCorrectionRows: PatientRow[] = [
  {
    id: "joao",
    name: "João Batista Albuquerque",
    status: "Pendente Correção",
    highlight: true
  },
  {
    id: "maria",
    name: "Maria das Graças Dantas",
    status: "Pendente Correção",
    highlight: true
  },
  {
    id: "carlos",
    name: "Carlos Henrique Martins",
    status: "Pendente Correção"
  }
];

type TabKey = "audit" | "correction";

export function AuditoriaServicos() {
  const [activeTab, setActiveTab] = useState<TabKey>("audit");
  const [search, setSearch] = useState("");

  const filteredRows = useMemo(() => {
    const source =
      activeTab === "audit" ? pendingAuditRows : pendingCorrectionRows;
    const query = search.trim().toLowerCase();
    if (!query) return source;
    return source.filter((row) =>
      row.name.toLowerCase().includes(query)
    );
  }, [activeTab, search]);

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "audit"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            Pendente de Auditoria
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("correction")}
            className={clsx(
              "border-b-4 pb-1 text-xl font-medium transition",
              activeTab === "correction"
                ? "border-primary text-primary"
                : "border-transparent text-[#8a8a8a]"
            )}
          >
            Pendente de Correção
          </button>
          <Filter size={18} className="text-primary" />
        </div>

        <div className="relative flex h-11 items-center rounded-lg border border-borderNeutral bg-white px-4">
          <Search
            size={18}
            className="mr-3 text-borderNeutral"
            aria-hidden
          />
          <input
            type="search"
            placeholder="Pesquise um Paciente"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
          />
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="grid grid-cols-[1fr,120px,120px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
          <div className="flex items-center gap-2">
            <span>Paciente</span>
            <span className="text-xs">{"\u21C5"}</span>
          </div>
          <div className="text-center">1-5</div>
          <div className="text-center">Status</div>
        </div>

        <div className="divide-y divide-borderNeutral">
          {filteredRows.map((row, index) => (
            <div
              key={row.id}
              className={clsx(
                "grid grid-cols-[1fr,120px,120px] items-center gap-4 px-6 py-4 text-sm",
                row.highlight ? "bg-[#fdecec] text-accent" : "bg-white",
                index % 2 === 1 && !row.highlight ? "bg-[#f5f8fb]" : ""
              )}
            >
              <span
                className={clsx(
                  "font-medium",
                  row.highlight ? "text-accent" : "text-[#4f4f4f]"
                )}
              >
                {row.name}
              </span>
              <div className="flex items-center justify-center gap-3 text-primary">
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Adicionar ${row.name}`}
                >
                  <Plus size={18} />
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Visualizar ${row.name}`}
                >
                  <Search size={18} />
                </button>
                <button
                  type="button"
                  className="flex size-8 items-center justify-center rounded-full border border-primary transition hover:bg-primary/10"
                  aria-label={`Mais informações sobre ${row.name}`}
                >
                  <Info size={18} />
                </button>
              </div>
              <span className="text-center text-xs text-[#6f6f6f]">
                {row.status ?? ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


