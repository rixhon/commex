import { Pencil, Check, X, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Product = {
  id: string;
  code: string;
  name: string;
  lot: string;
  quantity: number;
  approved: boolean;
  disapproved: boolean;
};

type TabType = "operador-logistico" | "consignado" | "autorizacoes" | "folhas-sala";

const initialProducts: Product[] = [
  {
    id: "1",
    code: "D-ENS-...",
    name: "Advisor Hd Se 32 Pin ensite x cable",
    lot: "NA",
    quantity: 0,
    approved: true,
    disapproved: false
  },
  {
    id: "2",
    code: "D-AVH...",
    name: "Advisor Hd Gridx 16 Electrode Df Bi-d",
    lot: "NA",
    quantity: 0,
    approved: true,
    disapproved: false
  },
  {
    id: "3",
    code: "85785",
    name: "COOL POINT TUBING SET",
    lot: "NA",
    quantity: 0,
    approved: true,
    disapproved: false
  },
  {
    id: "4",
    code: "A-TFSE...",
    name: "Tactiflex Se Bi-d Curve Fj",
    lot: "NA",
    quantity: 0,
    approved: true,
    disapproved: false
  }
];

export function Auditoria2() {
  const { t } = useLanguage();
  const [patientName] = useState("Regiane Takahashi");
  const [startDateTime] = useState("09/12/2025 - 07:00");
  const [endDateTime] = useState("09/12/2025 - 11:00");
  const [assessors] = useState("Leonardo Pereira, Lucas Gonçalves Santos");
  const [selectedIndustry, setSelectedIndustry] = useState("Abbott");
  const [activeTab, setActiveTab] = useState<TabType>("operador-logistico");
  const [approveAll, setApproveAll] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const tabCounts = {
    "operador-logistico": 8,
    consignado: 8,
    autorizacoes: 1,
    "folhas-sala": 1
  };

  const handleProductApproval = (id: string, approved: boolean) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, approved, disapproved: !approved }
          : product
      )
    );
  };

  const handleApproveAll = () => {
    setApproveAll(!approveAll);
    if (!approveAll) {
      setProducts((prev) =>
        prev.map((product) => ({ ...product, approved: true, disapproved: false }))
      );
    }
  };

  const handleApprove = () => {
    console.log("Aprovar auditoria");
  };

  const handleDisapprove = () => {
    console.log("Reprovar auditoria");
  };

  return (
    <section
      aria-labelledby="auditoria2-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
    >
      <header className="mb-10 flex items-center justify-between">
        <h1
          id="auditoria2-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.auditoria")}
        </h1>
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
          aria-label="Editar auditoria"
        >
          <Pencil size={20} />
        </button>
      </header>

      {/* Audit Details Card */}
      <div className="rounded-2xl border border-borderNeutral bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-medium text-[#1f1f1f]">
            {patientName}
          </h2>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
              {t("field.data-hora-inicio")}
            </label>
            <input
              type="text"
              value={startDateTime}
              readOnly
              className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
              {t("field.data-hora-fim")}
            </label>
            <input
              type="text"
              value={endDateTime}
              readOnly
              className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
              {t("field.assessores")}
            </label>
            <input
              type="text"
              value={assessors}
              readOnly
              className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={handleDisapprove}
            className="w-full max-w-[200px] rounded-full bg-red-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-red-600"
          >
            {t("button.reprovar")}
          </button>
          <button
            type="button"
            onClick={handleApprove}
            className="w-full max-w-[200px] rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
          >
            {t("button.aprovar")}
          </button>
        </div>
      </div>

      {/* Industries Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-primary">
          {t("page.industrias")}
        </h2>

        {/* Industry Dropdown */}
        <div className="relative">
          <div className="flex h-12 w-full items-center justify-between rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus-within:ring-2 focus-within:ring-primary/40">
            <input
              type="text"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              readOnly
              className="flex-1 bg-transparent text-sm text-[#5f5f5f] focus:outline-none"
            />
            <ChevronDown
              size={18}
              className="shrink-0 text-borderNeutral"
              aria-hidden
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("operador-logistico")}
            className={clsx(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
              activeTab === "operador-logistico"
                ? "border-primary bg-primary text-white"
                : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
            )}
          >
            <span>{t("field.operador-logistico")}</span>
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-xs",
                activeTab === "operador-logistico"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-[#5f5f5f]"
              )}
            >
              {tabCounts["operador-logistico"]}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("consignado")}
            className={clsx(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
              activeTab === "consignado"
                ? "border-primary bg-primary text-white"
                : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
            )}
          >
            <span>{t("page.consignado")}</span>
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-xs",
                activeTab === "consignado"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-[#5f5f5f]"
              )}
            >
              {tabCounts.consignado}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("autorizacoes")}
            className={clsx(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
              activeTab === "autorizacoes"
                ? "border-primary bg-primary text-white"
                : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
            )}
          >
            <span>{t("field.autorizacoes")}</span>
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-xs",
                activeTab === "autorizacoes"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-[#5f5f5f]"
              )}
            >
              {tabCounts.autorizacoes}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("folhas-sala")}
            className={clsx(
              "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
              activeTab === "folhas-sala"
                ? "border-primary bg-primary text-white"
                : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
            )}
          >
            <span>{t("page.folhas-de-sala")}</span>
            <span
              className={clsx(
                "rounded-full px-2 py-0.5 text-xs",
                activeTab === "folhas-sala"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-[#5f5f5f]"
              )}
            >
              {tabCounts["folhas-sala"]}
            </span>
          </button>
        </div>

        {/* Approve All Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="approve-all"
            checked={approveAll}
            onChange={handleApproveAll}
            className="size-5 rounded border-borderNeutral text-primary focus:ring-2 focus:ring-primary/40"
          />
          <label
            htmlFor="approve-all"
            className="text-sm font-medium text-[#4f4f4f] cursor-pointer"
          >
            {t("field.aprovar-todos-produtos")}
          </label>
        </div>
      </div>

      {/* Products Used Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-primary">
          {t("field.produtos-utilizados")}
        </h2>

        <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm overflow-hidden">
          <div className="grid grid-cols-[120px,1fr,100px,80px,80px,80px] items-center gap-4 border-b border-borderNeutral px-6 py-4 text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
            <span>{t("field.codigo")}</span>
            <span>{t("field.produto")}</span>
            <span>{t("field.lote")}</span>
            <span className="text-center">{t("field.qtd")}</span>
            <span className="text-center">{t("field.aprov")}</span>
            <span className="text-center">{t("field.reprov")}</span>
          </div>

          <div className="divide-y divide-borderNeutral">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={clsx(
                  "grid grid-cols-[120px,1fr,100px,80px,80px,80px] items-center gap-4 px-6 py-4 text-sm text-[#4f4f4f]",
                  index % 2 === 1 ? "bg-[#f5f8fb]" : "bg-white"
                )}
              >
                <span className="font-medium text-[#4f4f4f]">
                  {product.code}
                </span>
                <span className="text-[#4f4f4f]">{product.name}</span>
                <span className="text-[#4f4f4f]">{product.lot}</span>
                <span className="text-center text-[#4f4f4f]">
                  {product.quantity}
                </span>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleProductApproval(product.id, true)}
                    className={clsx(
                      "flex size-8 items-center justify-center rounded-full border transition",
                      product.approved
                        ? "border-primary bg-primary text-white"
                        : "border-borderNeutral bg-white text-borderNeutral hover:bg-gray-50"
                    )}
                    aria-label={`Aprovar ${product.name}`}
                  >
                    <Check size={18} />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => handleProductApproval(product.id, false)}
                    className={clsx(
                      "flex size-8 items-center justify-center rounded-full border transition",
                      product.disapproved
                        ? "border-red-500 bg-red-500 text-white"
                        : "border-borderNeutral bg-white text-borderNeutral hover:bg-gray-50"
                    )}
                    aria-label={`Reprovar ${product.name}`}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reversa Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-medium text-primary">
          {t("field.reversa")}
        </h2>
      </div>
    </section>
  );
}

