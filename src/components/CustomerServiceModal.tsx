import { FileText, Paperclip, Trash2, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type CustomerServiceModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    cadastroInativo: string;
    email: string;
    arquivos: string[];
  }) => void;
};

export function CustomerServiceModal({
  open,
  onClose,
  onSubmit
}: CustomerServiceModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    cadastroInativo: "Cadastro Inativo",
    email: "Manuella.leanza@abbott.com",
    arquivos: [
      "balancete.pdf",
      "dre.pdf",
      "contrato social.pdf",
      "cartão cnpj.pdf"
    ]
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileUpload = () => {
    // Simulação de upload de arquivo
    // Em produção, isso abriria um seletor de arquivos
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        const newFiles = Array.from(files).map((file) => file.name);
        setFormData((prev) => ({
          ...prev,
          arquivos: [...prev.arquivos, ...newFiles]
        }));
      }
    };
    input.click();
  };

  const handleRemoveFile = (fileName: string) => {
    setFormData((prev) => ({
      ...prev,
      arquivos: prev.arquivos.filter((file) => file !== fileName)
    }));
  };

  const documentosNecessarios = [
    "Balancete",
    "DRE",
    "Contrato Social",
    "Cartão CNPJ"
  ];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-4">
          <h2 className="text-2xl font-medium text-primary">
            {t("modal.customer-service")}
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
                htmlFor="cadastro-inativo"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.cadastro-inativo")}
              </label>
              <input
                id="cadastro-inativo"
                type="text"
                value={formData.cadastroInativo}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cadastroInativo: e.target.value
                  }))
                }
                className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder={t("field.cadastro-inativo")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="email-customer"
                className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
              >
                {t("field.email")}
              </label>
              <input
                id="email-customer"
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
              <label className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase">
                {t("field.documentacao-necessaria")}
              </label>
              <div className="min-h-[120px] rounded-lg border border-borderNeutral bg-white p-4">
                <ul className="space-y-2">
                  {documentosNecessarios.map((doc, index) => (
                    <li
                      key={index}
                      className="text-sm text-[#4f4f4f]"
                    >
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleFileUpload}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-primary bg-primary px-4 text-sm font-medium text-white transition hover:bg-primaryHover"
              >
                <Paperclip size={18} strokeWidth={1.75} />
                {t("field.anexar-nota-fiscal")}
              </button>

              {formData.arquivos.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {formData.arquivos.map((arquivo, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="relative flex size-16 items-center justify-center rounded-lg border border-borderNeutral bg-[#f8f9fb]">
                        <FileText
                          size={32}
                          className="text-primary"
                          strokeWidth={1.75}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(arquivo)}
                          className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-primary text-white transition hover:bg-primaryHover"
                          aria-label={`Remover ${arquivo}`}
                        >
                          <Trash2 size={14} strokeWidth={1.75} />
                        </button>
                      </div>
                      <span className="max-w-[100px] truncate text-xs text-[#4f4f4f]">
                        {arquivo}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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

