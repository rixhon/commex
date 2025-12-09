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
    name: "PLSS-1007_INTRODUTOR_PEEL_AWAY KIT 7F 14CM",
    quantity: 1,
    priceList: 133.0,
    priceQuote: 133.0,
    selected: false
  },
  {
    id: "2088tc-58",
    name: "2088TC/58_MRI_ELETRODO ENDOCÁRDIO VENTRÍCULO",
    quantity: 1,
    priceList: 1095.0,
    priceQuote: 980.0,
    selected: true
  },
  {
    id: "pm1272",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSURANCE",
    quantity: 1,
    priceList: 4576.76,
    priceQuote: 4576.76,
    selected: false
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

type CotacaoValidacaoProps = {
  onNavigateBack?: () => void;
};

export function CotacaoValidacao({ onNavigateBack }: CotacaoValidacaoProps) {
  const { t } = useLanguage();
  const [items, setItems] = useState<Item[]>(() =>
    initialItems.map((item) => ({ ...item }))
  );
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

  return (
    <section
      aria-labelledby="cotacao-validacao-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-8"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1
          id="cotacao-validacao-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.validacao-comercial")}
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

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-5">
          <p className="text-lg font-medium text-primary">
            Regiane Takahashi
          </p>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-full border border-borderNeutral text-primary transition hover:border-primary/60 hover:text-primary/80"
            aria-label="Pesquisar produtos"
          >
            <Search size={20} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div className="grid grid-cols-[32px,1fr,72px,110px,120px,120px] gap-3 text-[11px] font-medium uppercase tracking-[0.08em] text-textMuted">
            <span />
            <span>{t("table.produtos")}</span>
            <span className="text-center">{t("table.qtd")}</span>
            <span className="text-center">{t("table.preco-lista")}</span>
            <span className="text-center">{t("table.preco-cotacao")}</span>
            <span className="text-center">{t("table.total-cotacao")}</span>
          </div>

          <div className="divide-y divide-borderNeutral rounded-xl border border-borderNeutral bg-white">
            <div className="no-scrollbar max-h-72 overflow-y-auto">
              {items.map((item) => {
                const totalRow = item.priceQuote * item.quantity;
                const isHighlighted = item.selected;

                return (
                  <div
                    key={item.id}
                    className={clsx(
                      "grid grid-cols-[32px,1fr,72px,110px,120px,120px] items-center gap-3 px-4 py-3 transition",
                      isHighlighted
                        ? "bg-[#f2f8fe]"
                        : "bg-white"
                    )}
                  >
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleItem(item.id)}
                        className="h-4 w-4 rounded border-borderNeutral text-primary focus:ring-primary"
                        aria-label={`Selecionar ${item.name}`}
                      />
                    </div>

                    <div
                      className={clsx(
                        "flex items-center gap-3 rounded-lg border px-4 py-2 text-sm text-[#4f4f4f]",
                        isHighlighted
                          ? "border-primary bg-white"
                          : "border-borderNeutral bg-[#f8f9fb]"
                      )}
                    >
                      <span className="truncate">{item.name}</span>
                      {isHighlighted && (
                        <button
                          type="button"
                          className="text-primary transition hover:text-primary/80"
                          aria-label="Editar preço"
                        >
                          <Pencil size={16} strokeWidth={1.75} />
                        </button>
                      )}
                    </div>

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
                        type="number"
                        value={item.quantity}
                        onChange={() => {}}
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

                    <div className="flex h-full items-center justify-center">
                      <span className="w-full rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 py-2 text-center text-sm text-[#4f4f4f]">
                        {formatCurrency(item.priceList)}
                      </span>
                    </div>

                    <div className="flex h-full items-center justify-center">
                      <span
                        className={clsx(
                          "w-full rounded-lg border px-3 py-2 text-center text-sm text-[#4f4f4f]",
                          isHighlighted
                            ? "border-primary bg-white"
                            : "border-borderNeutral bg-[#f8f9fb]"
                        )}
                      >
                        {formatCurrency(item.priceQuote)}
                      </span>
                    </div>

                    <div className="flex h-full items-center justify-center">
                      <span className="w-full rounded-lg border border-borderNeutral bg-[#f8f9fb] px-3 py-2 text-center text-sm text-[#4f4f4f]">
                        {formatCurrency(totalRow)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-borderNeutral pt-4">
            <span className="text-sm font-medium uppercase tracking-[0.08em] text-textMuted">
              Total:
            </span>
            <span className="min-w-[140px] rounded-lg border border-borderNeutral bg-[#f8f9fb] px-4 py-2 text-right text-lg font-semibold text-primary">
              {formatCurrency(totalQuote)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="justificativa"
          className="text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase"
        >
          {t("button.justificativa")}
        </label>
        <textarea
          id="justificativa"
          value={justification}
          onChange={(event) => setJustification(event.target.value)}
          placeholder={t("button.justificativa") + "..."}
          rows={4}
          className="w-full resize-none rounded-xl border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
        <button
          type="button"
          onClick={onNavigateBack}
          className="w-full max-w-[200px] rounded-full bg-accent px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-accent/90"
        >
          {t("common.voltar")}
        </button>
        <button
          type="button"
          className="w-full max-w-[200px] rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          OK
        </button>
      </div>
    </section>
  );
}


