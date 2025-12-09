import { Paperclip, X, Trash2 } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type AnexarNFModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { arquivo: File | null }) => void;
};

export function AnexarNFModal({
  open,
  onClose,
  onSubmit
}: AnexarNFModalProps) {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ arquivo: selectedFile });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    };
    input.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
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
          <h2 className="text-2xl font-medium text-primary">
            {t("modal.anexar-nota-fiscal")}
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
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={handleFileUpload}
                className="flex items-center justify-center gap-3 rounded-lg border-2 border-dashed border-primary bg-primary/5 px-6 py-4 text-primary transition hover:bg-primary/10"
              >
                <Paperclip size={20} />
                <span className="font-medium">
                  {t("field.anexar-nota-fiscal")}
                </span>
              </button>

              {selectedFile && (
                <div className="flex items-center justify-between rounded-lg border border-borderNeutral bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Paperclip size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#4f4f4f]">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-textMuted">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="flex size-8 items-center justify-center rounded-full text-red-500 transition hover:bg-red-50"
                    aria-label="Remover arquivo"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full max-w-[200px] rounded-full bg-accent px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-accent/90"
            >
              {t("common.cancelar")}
            </button>
            <button
              type="submit"
              className="w-full max-w-[200px] rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
            >
              {t("common.salvar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

