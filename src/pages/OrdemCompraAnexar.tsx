import { useState, useRef } from "react";
import { Filter, Search, Upload, Trash2, Folder } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

type OrdemCompraAnexarProps = {
  onNavigateToFaturamentoLista?: () => void;
};

export function OrdemCompraAnexar({ onNavigateToFaturamentoLista }: OrdemCompraAnexarProps) {
  const { t } = useLanguage();
  const [selectedPatient, setSelectedPatient] = useState("Regiane Takahashi");
  const [observacoes, setObservacoes] = useState("");
  const [attachedFile, setAttachedFile] = useState<{
    name: string;
    file: File | null;
  } | null>({
    name: "ordem_de_compra.pdf",
    file: null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachedFile({
        name: file.name,
        file: file
      });
    }
  };

  const handleRemoveFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">{t("page.ordem-compra")}</h1>

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
              className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
            />
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b border-borderNeutral pb-4">
          <input
            value={selectedPatient}
            onChange={(event) => setSelectedPatient(event.target.value)}
            className="flex-1 rounded-lg border border-transparent bg-[#f5f8fb] px-4 py-3 text-sm text-[#4f4f4f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full text-primary transition hover:text-primary/80"
            aria-label="Pesquisar paciente"
          >
            <Search size={22} />
          </button>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={handleAttachClick}
            className="flex w-full max-w-xs items-center justify-between rounded-xl bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-primaryHover"
          >
            {t("field.anexar-ordem-compra")}
            <Upload size={18} />
          </button>

          {attachedFile && (
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center gap-2 text-primary">
                <span className="flex size-12 items-center justify-center rounded-xl border border-primary bg-[#e8f3fb]">
                  <Folder size={24} />
                </span>
                <span className="text-xs font-medium">{attachedFile.name}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="flex size-10 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
                aria-label={t("button.remover")}
              >
                <Trash2 size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8">
          <label
            htmlFor="observacoes"
            className="block text-[11px] font-medium uppercase tracking-[0.08em] text-textMuted"
          >
            {t("field.observacoes")}
          </label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(event) => setObservacoes(event.target.value)}
            placeholder={t("field.observacoes") + "..."}
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-between">
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full bg-[#b0b0b0] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#9b9b9b]"
        >
          {t("common.voltar")}
        </button>
        <button
          type="button"
          className="w-full max-w-[220px] rounded-full bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-red-600"
        >
          {t("button.pedido-correcao")}
        </button>
        <button
          type="button"
          className="w-full max-w-[180px] rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          {t("common.enviar")}
        </button>
      </div>
    </section>
  );
}

