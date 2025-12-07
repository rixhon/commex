import { Filter, Plus, Info, Check, Search } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Product = {
  id: string;
  code: string;
  name: string;
  total: number;
  utilized: number;
  reversed: number;
  lot?: string;
  sameLot: boolean;
};

type FolhaSalaConsignadoProps = {
  onNavigateBack?: () => void;
};

const initialProducts: Product[] = [
  {
    id: "1",
    code: "99950566",
    name: "CÂNULA ARTERIAL",
    total: 2,
    utilized: 2,
    reversed: 0,
    sameLot: true
  },
  {
    id: "2",
    code: "99943297",
    name: "CÂNULA ATRIO ESQUERDO",
    total: 2,
    utilized: 0,
    reversed: 1,
    sameLot: false
  },
  {
    id: "3",
    code: "99939526",
    name: "CÂNULA VENOSA",
    total: 2,
    utilized: 0,
    reversed: 1,
    sameLot: false
  },
  {
    id: "4",
    code: "99867729",
    name: "CEC",
    total: 2,
    utilized: 0,
    reversed: 1,
    sameLot: false
  },
  {
    id: "5",
    code: "99935495",
    name: "PATCH PERICÁRDIO BOVIN",
    total: 2,
    utilized: 0,
    reversed: 1,
    sameLot: false
  },
  {
    id: "6",
    code: "99955725",
    name: "VÁLVULA AÓRTICA",
    total: 2,
    utilized: 0,
    reversed: 1,
    sameLot: false
  }
];

export function FolhaSalaConsignado({ onNavigateBack }: FolhaSalaConsignadoProps) {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [justification, setJustification] = useState("");

  const updateProductLot = (id: string, lot: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, lot } : p))
    );
  };

  const toggleSameLot = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, sameLot: !p.sameLot } : p))
    );
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      {/* Header */}
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
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Adicionar"
          >
            <Plus size={18} />
          </button>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
            aria-label="Informações"
          >
            <Info size={18} />
          </button>
        </div>
      </header>

      {/* Patient/Provider Information */}
      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium text-[#4f4f4f]">
          Lucas Ferreira da Silva
        </p>
        <p className="text-base text-[#5f5f5f]">Braile</p>
        <p className="text-base text-[#5f5f5f]">
          {t("page.fornecedor-treinamento")}
        </p>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-borderNeutral bg-white p-4"
          >
            {/* First Row */}
            <div className="mb-3 grid grid-cols-[120px,1fr,100px,140px] gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("table.codigo")}
                </label>
                <div className="h-10 rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 flex items-center text-sm text-[#5f5f5f]">
                  {product.code}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("table.produtos")}
                </label>
                <div className="h-10 rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 flex items-center text-sm text-[#5f5f5f]">
                  {product.name}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("field.total")}
                </label>
                <div className="h-10 rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 flex items-center text-sm text-[#5f5f5f]">
                  {product.total}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("page.mesmo-lote")}
                </label>
                <button
                  type="button"
                  onClick={() => toggleSameLot(product.id)}
                  className={clsx(
                    "h-10 rounded-lg border px-3 text-sm font-medium transition",
                    product.sameLot
                      ? "border-primary bg-white text-primary"
                      : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
                  )}
                >
                  {product.sameLot ? t("common.sim") : t("common.nao")}
                </button>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-[200px,1fr,150px,auto] gap-4 items-center">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("page.lote")}
                </label>
                <input
                  type="text"
                  value={product.lot || ""}
                  onChange={(e) => updateProductLot(product.id, e.target.value)}
                  placeholder={t("page.digite-lote")}
                  className="h-10 w-full rounded-lg border border-borderNeutral bg-white px-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral transition focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {t("table.produtos")}
                </label>
                <div className="h-10 rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 flex items-center text-sm text-[#5f5f5f]">
                  {product.name}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                  {product.utilized > 0 ? t("page.utilizado") : t("page.reversa")}
                </label>
                <div className="h-10 rounded-lg border border-borderNeutral bg-white px-3 flex items-center text-sm text-[#5f5f5f]">
                  {product.utilized > 0
                    ? `${t("page.utilizado")}: ${product.utilized}`
                    : `${t("page.reversa")}: ${product.reversed}`}
                </div>
              </div>

              <div className="flex items-end pb-1">
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                  <Check size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Justification Section */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="justification"
          className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
        >
          {t("page.justificativa")}
        </label>
        <textarea
          id="justification"
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder={t("page.selecione-justificativas")}
          rows={4}
          className="min-h-[120px] w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral transition focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primaryHover"
        >
          {t("button.inserir-folha-sala")}
        </button>
        <p className="text-sm text-textMuted">
          {t("page.nenhum-documento-selecionado")}
        </p>
      </div>

      {/* Bottom Button */}
      <div className="flex items-center justify-end gap-4 pt-4">
        {onNavigateBack && (
          <button
            type="button"
            onClick={onNavigateBack}
            className="rounded-full border border-borderNeutral bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#5f5f5f] transition hover:bg-gray-50"
          >
            {t("common.voltar")}
          </button>
        )}
        <button
          type="button"
          className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-red-600"
        >
          {t("button.enviar-relacao")}
        </button>
      </div>
    </section>
  );
}





