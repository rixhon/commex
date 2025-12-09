import { X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type AgendamentosModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    paciente: string;
    dataInicio: string;
    dataTermino: string;
    cor: string;
  }) => void;
};

export function AgendamentosModal({
  open,
  onClose,
  onSubmit
}: AgendamentosModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    paciente: "Marineze Mendes Sampaio",
    dataInicio: "10/12/2025, 00:00",
    dataTermino: "09/12/2025, 12:30",
    cor: "#000000"
  });

  const [hue, setHue] = useState(0); // 0-360 for hue
  const [saturation, setSaturation] = useState(100); // 0-100 for saturation
  const [lightness, setLightness] = useState(0); // 0-100 for lightness

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateColor = (newHue: number, newSaturation: number, newLightness: number) => {
    setHue(newHue);
    setSaturation(newSaturation);
    setLightness(newLightness);
    const hslColor = `hsl(${newHue}, ${newSaturation}%, ${newLightness}%)`;
    setFormData((prev) => ({ ...prev, cor: hslColor }));
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    updateColor(newHue, saturation, lightness);
  };

  const handleColorPickerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;

    const newSaturation = Math.round((x / width) * 100);
    const newLightness = Math.round(100 - (y / height) * 100);
    updateColor(hue, newSaturation, newLightness);
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
            {t("page.agendamentos")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-textMuted transition hover:bg-gray-100 hover:text-primary"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="paciente"
                className="mb-2 block text-sm font-medium text-[#4f4f4f]"
              >
                {t("field.nome-paciente")}
              </label>
              <input
                type="text"
                id="paciente"
                value={formData.paciente}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, paciente: e.target.value }))
                }
                className="w-full rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label
                htmlFor="dataInicio"
                className="mb-2 block text-sm font-medium text-[#4f4f4f]"
              >
                {t("field.data-hora-inicio-agendamento")}
              </label>
              <input
                type="text"
                id="dataInicio"
                value={formData.dataInicio}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dataInicio: e.target.value }))
                }
                className="w-full rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label
                htmlFor="dataTermino"
                className="mb-2 block text-sm font-medium text-[#4f4f4f]"
              >
                {t("field.data-hora-termino")}
              </label>
              <input
                type="text"
                id="dataTermino"
                value={formData.dataTermino}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dataTermino: e.target.value }))
                }
                className="w-full rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-[#4f4f4f]">
                {t("field.escolha-cor-personalizada")}
              </label>
              
              {/* Main color gradient picker */}
              <div
                className="relative mb-3 h-32 w-full cursor-crosshair rounded-lg border border-borderNeutral"
                style={{
                  background: `linear-gradient(to right, 
                    hsl(${hue}, 100%, 0%) 0%,
                    hsl(${hue}, 100%, 50%) 50%,
                    hsl(${hue}, 0%, 50%) 100%
                  ),
                  linear-gradient(to top, 
                    transparent 0%,
                    hsl(${hue}, ${saturation}%, ${lightness}%) 100%
                  )`
                }}
                onClick={handleColorPickerClick}
              >
                <div
                  className="absolute size-4 rounded-full border-2 border-white shadow-lg"
                  style={{
                    left: `${saturation}%`,
                    top: `${100 - lightness}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`
                  }}
                />
              </div>

              {/* Hue slider */}
              <div className="relative h-8 w-full rounded-lg border border-borderNeutral">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={handleHueChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  style={{
                    background: `linear-gradient(to right,
                      hsl(0, 100%, 50%) 0%,
                      hsl(60, 100%, 50%) 16.66%,
                      hsl(120, 100%, 50%) 33.33%,
                      hsl(180, 100%, 50%) 50%,
                      hsl(240, 100%, 50%) 66.66%,
                      hsl(300, 100%, 50%) 83.33%,
                      hsl(360, 100%, 50%) 100%
                    )`
                  }}
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-lg"
                  style={{
                    background: `linear-gradient(to right,
                      hsl(0, 100%, 50%) 0%,
                      hsl(60, 100%, 50%) 16.66%,
                      hsl(120, 100%, 50%) 33.33%,
                      hsl(180, 100%, 50%) 50%,
                      hsl(240, 100%, 50%) 66.66%,
                      hsl(300, 100%, 50%) 83.33%,
                      hsl(360, 100%, 50%) 100%
                    )`
                  }}
                />
                <div
                  className="pointer-events-none absolute top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white shadow-lg"
                  style={{
                    left: `${(hue / 360) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    backgroundColor: `hsl(${hue}, 100%, 50%)`
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-accent px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-accent/90"
            >
              {t("common.cancelar")}
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
            >
              {t("common.salvar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

