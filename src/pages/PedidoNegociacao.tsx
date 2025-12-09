import {
  ChevronDown,
  ChevronUp,
  Filter,
  Pencil,
  Search
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
};

const initialItems: Item[] = [
  {
    id: "plss-1007",
    name: "PLSS-1007_INTRODUTOR_PEEL_AWAY KIT 7F 14...",
    quantity: 1,
    priceList: 133.0,
    priceQuote: 133.0,
    selected: false
  },
  {
    id: "2088tc-58",
    name: "2088TC/58_MRI_ELETRODO ENDOCÁRD...",
    quantity: 1,
    priceList: 1095.0,
    priceQuote: 980.0,
    selected: true
  },
  {
    id: "pm1272",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSU...",
    quantity: 1,
    priceList: 4501.76,
    priceQuote: 4501.76,
    selected: false
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

type PedidoNegociacaoProps = {
  onNavigateBack?: () => void;
  onNavigateToValidacaoComercial?: () => void;
};

export function PedidoNegociacao({ onNavigateBack, onNavigateToValidacaoComercial }: PedidoNegociacaoProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState<Item[]>(() =>
    initialItems.map((item) => ({ ...item }))
  );
  const [selectedPatient, setSelectedPatient] = useState("Pedro Henrique Almeida Costa");
  const [justification, setJustification] = useState("");

  const totalQuote = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.priceQuote * item.quantity,
        0
      ),
    [items]
  );

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const adjustQuantity = (id: string, direction: 1 | -1) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const nextQuantity = Math.max(1, item.quantity + direction);
        return { ...item, quantity: nextQuantity };
      })
    );
  };

  const handlePriceChange = (id: string, field: "priceList" | "priceQuote", value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    if (!isNaN(numValue)) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, [field]: numValue } : item
        )
      );
    }
  };

  const handleTotalChange = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    if (!isNaN(numValue)) {
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== id) return item;
          const newPriceQuote = item.quantity > 0 ? numValue / item.quantity : 0;
          return { ...item, priceQuote: newPriceQuote };
        })
      );
    }
  };

  return (
    <section
      aria-labelledby="pedido-negociacao-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1
          id="pedido-negociacao-heading"
          className="text-3xl font-semibold text-primary"
        >
          {t("page.negociacao")} | {t("page.commex")}
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

      <div className="rounded-2xl border border-borderNeutral bg-[#f5f8fb] p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={selectedPatient}
            onChange={(e) => setSelectedPatient(e.target.value)}
            className="flex-1 rounded-lg border border-borderNeutral bg-white px-4 py-2 text-sm text-[#4f4f4f] focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary text-primary transition hover:bg-primary/10"
            aria-label={t("common.buscar")}
          >
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="border-b border-borderNeutral px-6 py-4">
          <h2 className="text-sm font-medium uppercase tracking-[0.08em] text-primary">
            {t("table.produtos")}
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-borderNeutral bg-[#f5f8fb]">
                <th className="px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary w-12">
                </th>
                <th className="px-6 py-3 text-left text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                  {t("table.produtos")}
                </th>
                <th className="px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                  {t("table.qtd")}
                </th>
                <th className="px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                  {t("table.preco-lista")}
                </th>
                <th className="px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                  {t("table.preco-cotacao")}
                </th>
                <th className="px-6 py-3 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                  {t("table.total-cotacao")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-borderNeutral">
              {items.map((item) => {
                const totalRow = item.priceQuote * item.quantity;
                const isSelected = item.selected;
                const isHighlighted = item.id === "2088tc-58";

                return (
                  <tr
                    key={item.id}
                    className={clsx(
                      "hover:bg-[#f5f8fb]",
                      isSelected && "bg-[#f2f8fe]"
                    )}
                  >
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItem(item.id)}
                        className="h-4 w-4 rounded border-borderNeutral text-primary focus:ring-primary"
                        aria-label={`Selecionar ${item.name}`}
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#4f4f4f]">
                          {item.name}
                        </span>
                        {isHighlighted && (
                          <Pencil size={16} className="text-primary" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, -1)}
                          className="flex size-7 items-center justify-center rounded border border-borderNeutral text-primary transition hover:border-primary hover:text-primary"
                          aria-label={`Diminuir quantidade de ${item.name}`}
                        >
                          <ChevronDown size={16} />
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="h-7 w-10 rounded border border-borderNeutral bg-white text-center text-sm text-[#4f4f4f]"
                          aria-label={`Quantidade de ${item.name}`}
                        />
                        <button
                          type="button"
                          onClick={() => adjustQuantity(item.id, 1)}
                          className="flex size-7 items-center justify-center rounded border border-borderNeutral text-primary transition hover:border-primary hover:text-primary"
                          aria-label={`Aumentar quantidade de ${item.name}`}
                        >
                          <ChevronUp size={16} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={formatCurrency(item.priceList)}
                        onChange={(e) => handlePriceChange(item.id, "priceList", e.target.value)}
                        className={clsx(
                          "mx-auto h-8 w-24 rounded border bg-white px-2 text-center text-sm text-[#4f4f4f] focus:outline-none focus:ring-2 focus:ring-primary/40",
                          isHighlighted ? "border-red-500" : "border-borderNeutral"
                        )}
                        aria-label={`Preço lista de ${item.name}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={formatCurrency(item.priceQuote)}
                        onChange={(e) => handlePriceChange(item.id, "priceQuote", e.target.value)}
                        className={clsx(
                          "mx-auto h-8 w-24 rounded border bg-white px-2 text-center text-sm text-[#4f4f4f] focus:outline-none focus:ring-2 focus:ring-primary/40",
                          isHighlighted ? "border-red-500" : "border-borderNeutral"
                        )}
                        aria-label={`Preço cotação de ${item.name}`}
                      />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <input
                        type="text"
                        value={formatCurrency(totalRow)}
                        onChange={(e) => handleTotalChange(item.id, e.target.value)}
                        className={clsx(
                          "mx-auto h-8 w-24 rounded border bg-white px-2 text-center text-sm text-[#4f4f4f] focus:outline-none focus:ring-2 focus:ring-primary/40",
                          isHighlighted ? "border-red-500" : "border-borderNeutral"
                        )}
                        aria-label={`Total cotação de ${item.name}`}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-borderNeutral px-6 py-4">
          <span className="text-sm font-medium uppercase tracking-[0.08em] text-textMuted">
            {t("field.total")}:
          </span>
          <input
            type="text"
            value={formatCurrency(totalQuote)}
            readOnly
            className="h-10 w-32 rounded border border-borderNeutral bg-white px-3 text-center text-base font-semibold text-[#4f4f4f]"
            aria-label="Total geral"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-borderNeutral bg-white px-6 py-4 shadow-sm">
        <label className="block text-sm font-medium uppercase tracking-[0.08em] text-textMuted mb-2">
          {t("field.justificativa")}
        </label>
        <textarea
          value={justification}
          onChange={(e) => setJustification(e.target.value)}
          placeholder={t("field.justificativa-placeholder")}
          className="w-full min-h-[100px] rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onNavigateBack}
          className="rounded-full border border-red-500 bg-white px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-red-500 transition hover:bg-red-500/10"
        >
          {t("common.voltar")}
        </button>
        <button
          type="button"
          onClick={onNavigateToValidacaoComercial}
          className="rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          {t("common.validacao-comercial")}
        </button>
      </div>
    </section>
  );
}

