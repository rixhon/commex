import {
  Filter,
  Pencil,
  Search,
  Minus,
  Plus
} from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useLanguage } from "../contexts/LanguageContext";

type Item = {
  id: string;
  name: string;
  quantity: number;
  priceList: number;
  priceQuote: number;
  selected: boolean;
  inactive?: boolean;
};

const initialItems: Item[] = [
  {
    id: "plss-1007",
    name: "PLSS-1007_INTRODUTOR_PEEL_AWAY KIT 7F 14...",
    quantity: 1,
    priceList: 133.0,
    priceQuote: 133.0,
    selected: false,
    inactive: false
  },
  {
    id: "2088tc-58",
    name: "2088TC/58_MRI_ELETRODO ENDOCÁRD...",
    quantity: 1,
    priceList: 1095.0,
    priceQuote: 980.0,
    selected: false,
    inactive: false
  },
  {
    id: "pm1272-active",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSU...",
    quantity: 1,
    priceList: 4501.76,
    priceQuote: 4501.76,
    selected: true,
    inactive: false
  },
  {
    id: "pm1272-inactive",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSU...",
    quantity: 1,
    priceList: 5200.5,
    priceQuote: 5200.5,
    selected: false,
    inactive: true
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

type SaldoPendenteProps = {
  onNavigateToFaturamentoCS?: () => void;
};

export function SaldoPendente({ onNavigateToFaturamentoCS }: SaldoPendenteProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState<Item[]>(() =>
    initialItems.map((item) => ({ ...item }))
  );
  const [selectedPatient, setSelectedPatient] = useState("Gabriela Mendes Barbosa");
  const [comment, setComment] = useState("");

  const totalQuote = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.priceQuote * item.quantity,
        0
      ),
    [items]
  );

  const adjustQuantity = (id: string, direction: 1 | -1) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const newQuantity = Math.max(1, item.quantity + direction);
        return { ...item, quantity: newQuantity };
      })
    );
  };

  const handlePriceQuoteChange = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    if (!isNaN(numValue)) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, priceQuote: numValue } : item
        )
      );
    }
  };

  return (
    <section
      aria-labelledby="saldo-pendente-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1
          id="saldo-pendente-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.saldo-pendente")}
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
            aria-label={t("button.pesquisar-paciente")}
          >
            <Search size={22} />
          </button>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-[#4f4f4f]">
            {t("table.produtos")}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-borderNeutral text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
                  <th className="text-left pb-3 pr-4">{t("table.produtos")}</th>
                  <th className="text-center pb-3 px-2 w-20">{t("table.qtd")}</th>
                  <th className="text-right pb-3 px-2 w-32">{t("table.preco-lista")}</th>
                  <th className="text-right pb-3 px-2 w-32">{t("table.preco-cotacao")}</th>
                  <th className="text-right pb-3 px-2 w-32">{t("table.total-cotacao")}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  const totalQuote = item.priceQuote * item.quantity;
                  return (
                    <tr
                      key={item.id}
                      className={clsx(
                        "border-b border-borderNeutral text-sm",
                        item.selected && "border-l-4 border-l-red-500",
                        item.inactive && "opacity-50"
                      )}
                    >
                      <td className="py-3 pr-4">
                        <span
                          className={clsx(
                            item.inactive ? "text-[#9a9a9a]" : "text-[#4f4f4f]"
                          )}
                        >
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => adjustQuantity(item.id, -1)}
                            disabled={item.inactive}
                            className={clsx(
                              "flex size-6 items-center justify-center rounded border transition",
                              item.inactive
                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                : "border-borderNeutral hover:bg-gray-50"
                            )}
                            aria-label={t("button.diminuir-quantidade")}
                          >
                            <Minus size={14} />
                          </button>
                          <span className={clsx(
                            "w-8 text-center",
                            item.inactive ? "text-[#9a9a9a]" : "text-[#4f4f4f]"
                          )}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => adjustQuantity(item.id, 1)}
                            disabled={item.inactive}
                            className={clsx(
                              "flex size-6 items-center justify-center rounded border transition",
                              item.inactive
                                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                                : "border-borderNeutral hover:bg-gray-50"
                            )}
                            aria-label={t("button.aumentar-quantidade")}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span
                          className={clsx(
                            item.inactive ? "text-[#9a9a9a]" : "text-[#4f4f4f]"
                          )}
                        >
                          {formatCurrency(item.priceList)}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center justify-end gap-2">
                          <input
                            type="text"
                            value={formatCurrency(item.priceQuote)}
                            onChange={(e) =>
                              handlePriceQuoteChange(item.id, e.target.value)
                            }
                            disabled={item.inactive}
                            className={clsx(
                              "w-full text-right rounded border border-borderNeutral bg-white px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40",
                              item.inactive && "opacity-50 cursor-not-allowed"
                            )}
                          />
                          <Pencil
                            size={16}
                            className={clsx(
                              "text-primary",
                              item.inactive && "opacity-50"
                            )}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-2 text-right">
                        <span
                          className={clsx(
                            item.inactive ? "text-[#9a9a9a]" : "text-[#4f4f4f]"
                          )}
                        >
                          {formatCurrency(totalQuote)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#4f4f4f]">{t("field.total")}:</span>
              <input
                type="text"
                value={formatCurrency(totalQuote)}
                readOnly
                className="w-40 rounded-lg border border-borderNeutral bg-white px-4 py-2 text-right text-sm font-medium text-[#4f4f4f]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <label
            htmlFor="comentario-saldo"
            className="block text-[11px] font-medium uppercase tracking-[0.08em] text-textMuted"
          >
            {t("field.comentario")}
          </label>
          <textarea
            id="comentario-saldo"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder={t("field.comentario-placeholder")}
            rows={4}
            className="mt-2 w-full resize-none rounded-xl border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-between">
        <button
          type="button"
          className="w-full max-w-[200px] rounded-full bg-[#8a8a8a] px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#7a7a7a]"
        >
          {t("button.voltar")}
        </button>
        <button
          type="button"
          className="w-full max-w-[280px] rounded-full bg-red-500 px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-red-600"
        >
          {t("button.devolver-correcao")}
        </button>
        <button
          type="button"
          onClick={() => onNavigateToFaturamentoCS?.()}
          className="w-full max-w-[200px] rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          {t("button.aprovar")}
        </button>
      </div>
    </section>
  );
}





