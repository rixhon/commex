import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type CRECOModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    clienteBloqueado: string;
    email: string;
    status: string;
    documentacao: string;
  }) => void;
};

export function CRECOModal({
  open,
  onClose,
  onSubmit
}: CRECOModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    clienteBloqueado: "Cliente Bloqueado",
    email: "Manuella.leanza@abbott.com",
    status: "123456789-0",
    documentacao: "Aguardar liberação."
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-4">
          <h2 className="text-2xl font-medium text-primary">{t("modal.creco")}</h2>
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
                htmlFor="cliente-bloqueado"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.cliente-bloqueado")}
              </label>
              <input
                id="cliente-bloqueado"
                type="text"
                value={formData.clienteBloqueado}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clienteBloqueado: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.cliente-bloqueado")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email-creco"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.email")}
              </label>
              <input
                id="email-creco"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="email@example.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="status-creco"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.status")}
              </label>
              <input
                id="status-creco"
                type="text"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="123456789-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                {t("field.documentacao-necessaria")}
              </label>
              <textarea
                id="documentacao-creco"
                value={formData.documentacao}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    documentacao: e.target.value
                  }))
                }
                rows={6}
                className="w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Aguardar liberação."
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
            >
              {t("common.enviar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




