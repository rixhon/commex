import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type CanalIndiretoModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    vitaleHospitalar: string;
    email: string;
    nomePaciente: string;
    canalCotacao: string;
    idCotacao: string;
    maisInformacoes: string;
  }) => void;
};

export function CanalIndiretoModal({
  open,
  onClose,
  onSubmit
}: CanalIndiretoModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    vitaleHospitalar: "",
    email: "contato@vitalehospitalar.com.br",
    nomePaciente: "Regiane Takahashi",
    canalCotacao: "INPART Saúde",
    idCotacao: "1234",
    maisInformacoes: ""
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-4">
          <h2 className="text-2xl font-medium text-primary">
            {t("modal.canal-indireto")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-textMuted transition hover:bg-gray-100 hover:text-primary"
            aria-label="Fechar modal"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="vitale-hospitalar"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.vitale-hospitalar")}
              </label>
              <input
                id="vitale-hospitalar"
                type="text"
                value={formData.vitaleHospitalar}
                onChange={(e) =>
                  handleChange("vitaleHospitalar", e.target.value)
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.vitale-hospitalar")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.email")}
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="contato@vitalehospitalar.com.br"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="nome-paciente-modal"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.nome-paciente")}
              </label>
              <input
                id="nome-paciente-modal"
                type="text"
                value={formData.nomePaciente}
                onChange={(e) =>
                  handleChange("nomePaciente", e.target.value)
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.nome-paciente")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="canal-cotacao-modal"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.canal-cotacao")}
              </label>
              <div className="relative flex h-12 w-full items-center justify-between rounded-lg border border-borderNeutral bg-white px-4 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/40">
                <input
                  id="canal-cotacao-modal"
                  type="text"
                  value={formData.canalCotacao}
                  onChange={(e) =>
                    handleChange("canalCotacao", e.target.value)
                  }
                  className="flex-1 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
                  placeholder="Selecione o canal de cotação"
                />
                <ChevronDown
                  size={18}
                  className="shrink-0 text-borderNeutral"
                  aria-hidden
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="id-cotacao-modal"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.id-cotacao")}
              </label>
              <input
                id="id-cotacao-modal"
                type="text"
                value={formData.idCotacao}
                onChange={(e) => handleChange("idCotacao", e.target.value)}
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.id-cotacao")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="mais-informacoes-modal"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.mais-informacoes-interna")}
              </label>
              <textarea
                id="mais-informacoes-modal"
                value={formData.maisInformacoes}
                onChange={(e) =>
                  handleChange("maisInformacoes", e.target.value)
                }
                rows={6}
                className="w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Descreva suas informações..."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-[#007BCE] px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#0066a8]"
            >
              {t("common.enviar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

