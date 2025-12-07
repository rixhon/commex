import { ChevronDown, Plus } from "lucide-react";
import clsx from "clsx";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type TabType = "consignado" | "industria" | "operador-logistico" | "servicos";

type FolhaSalaMaisProps = {
  onNavigateBack?: () => void;
  onNavigateToConsignado?: () => void;
};

export function FolhaSalaMais({ onNavigateBack, onNavigateToConsignado }: FolhaSalaMaisProps) {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<TabType>("consignado");
  const [patientName, setPatientName] = useState("Regiane Takahashi");
  const [selectedIndustry, setSelectedIndustry] = useState("Abbott");
  const [idgen, setIdgen] = useState("");
  const [comments, setComments] = useState("");

  const tabCounts = {
    consignado: 0,
    industria: 0,
    "operador-logistico": 0,
    servicos: 7
  };

  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <header>
        <h1 className="text-3xl font-medium text-primary">
          {t("page.folhas-de-sala")}
        </h1>
      </header>

      <div className="flex flex-col gap-6">
        {/* Patient Name Field */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
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
              onClick={() => {
                onNavigateToConsignado?.();
              }}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
                selectedTab === "consignado"
                  ? "border-primary bg-primary text-white"
                  : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
              )}
            >
              <Plus size={18} />
              <span>{t("page.consignado")}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs",
                  selectedTab === "consignado"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#5f5f5f]"
                )}
              >
                {tabCounts.consignado}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab("industria")}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
                selectedTab === "industria"
                  ? "border-primary bg-primary text-white"
                  : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
              )}
            >
              <Plus size={18} />
              <span>{t("page.industria")}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs",
                  selectedTab === "industria"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#5f5f5f]"
                )}
              >
                {tabCounts.industria}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab("operador-logistico")}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
                selectedTab === "operador-logistico"
                  ? "border-primary bg-primary text-white"
                  : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
              )}
            >
              <Plus size={18} />
              <span>{t("page.operador-logistico")}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs",
                  selectedTab === "operador-logistico"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#5f5f5f]"
                )}
              >
                {tabCounts["operador-logistico"]}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedTab("servicos")}
              className={clsx(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition",
                selectedTab === "servicos"
                  ? "border-primary bg-primary text-white"
                  : "border-borderNeutral bg-white text-[#5f5f5f] hover:bg-gray-50"
              )}
            >
              <Plus size={18} />
              <span>{t("page.servicos")}</span>
              <span
                className={clsx(
                  "rounded-full px-2 py-0.5 text-xs",
                  selectedTab === "servicos"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-[#5f5f5f]"
                )}
              >
                {tabCounts.servicos}
              </span>
            </button>
          </div>
        </div>

        {/* IDGEN Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="idgen"
            className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
          >
            IDGEN
          </label>
          <input
            id="idgen"
            type="text"
            value={idgen}
            onChange={(e) => setIdgen(e.target.value)}
            placeholder={t("page.adicione-idgen")}
            className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] placeholder:text-borderNeutral transition focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Comments Field */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="comments"
            className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
          >
            {t("page.comentarios")}
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder={t("page.escreva-observacao")}
            rows={4}
            className="min-h-[140px] w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral transition focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>

        {/* Insert Room Sheet Button */}
        <div className="flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (selectedTab === "consignado") {
                onNavigateToConsignado?.();
              }
            }}
            className="rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primaryHover"
          >
            {t("button.inserir-folha-sala")}
          </button>
          <p className="text-sm text-textMuted">
            {t("page.nenhum-documento-selecionado")}
          </p>
        </div>

        {/* Bottom Buttons */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onNavigateBack}
            className="rounded-full border border-borderNeutral bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-[#5f5f5f] transition hover:bg-gray-50"
          >
            {t("common.voltar")}
          </button>
          <button
            type="button"
            className="rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-red-600"
          >
            {t("button.enviar-relacao")}
          </button>
        </div>
      </div>
    </section>
  );
}

