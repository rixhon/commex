import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type NegativaCRECOModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    cliente: string;
    email: string;
    status: string;
    avisoCliente: string;
  }) => void;
};

export function NegativaCRECOModal({
  open,
  onClose,
  onSubmit
}: NegativaCRECOModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    cliente: "",
    email: "cotacao@cliente.com",
    status: "123456789-0",
    avisoCliente: "Negativa de CRECO conforme cadastrado para cada cliente."
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-4">
          <h2 className="text-2xl font-medium text-primary uppercase">
            {t("modal.negativa-creco")}
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
                htmlFor="cliente-negativa"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.cliente")}
              </label>
              <input
                id="cliente-negativa"
                type="text"
                value={formData.cliente}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cliente: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.cliente")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email-negativa"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.email")}
              </label>
              <input
                id="email-negativa"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="cotacao@cliente.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="status-negativa"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.status")}
              </label>
              <input
                id="status-negativa"
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
              <label
                htmlFor="aviso-cliente"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.aviso-cliente")}
              </label>
              <textarea
                id="aviso-cliente"
                value={formData.avisoCliente}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    avisoCliente: e.target.value
                  }))
                }
                rows={6}
                className="w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Negativa de CRECO conforme cadastrado para cada cliente."
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




