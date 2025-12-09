import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Item = {
  id: string;
  name: string;
  quantity: number;
  priceList: number;
  priceQuote: number;
};

const initialItems: Item[] = [
  {
    id: "plss-1007",
    name: "PLSS-1007_INTRODUTOR_PEEL_AWAY KIT 7F 14...",
    quantity: 1,
    priceList: 133.0,
    priceQuote: 133.0
  },
  {
    id: "2088tc-58",
    name: "2088TC/58_MRI_ELETRODO ENDOCÁRD...",
    quantity: 1,
    priceList: 1095.0,
    priceQuote: 980.0
  },
  {
    id: "pm1272",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSU...",
    quantity: 1,
    priceList: 4501.76,
    priceQuote: 4501.76
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

type NegociacaoReprovadaProps = {
  onNavigateBack?: () => void;
};

export function NegociacaoReprovada({ onNavigateBack }: NegociacaoReprovadaProps) {
  const { t } = useLanguage();
  const [items] = useState<Item[]>(initialItems);
  const [selectedPatient, setSelectedPatient] = useState("Thiago Martins Cardoso");

  const totalQuote = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.priceQuote * item.quantity,
        0
      ),
    [items]
  );

  return (
    <section
      aria-labelledby="negociacao-reprovada-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1
            id="negociacao-reprovada-heading"
            className="text-3xl font-semibold"
          >
            <span className="text-primary">{t("page.negociacao")}</span>{" "}
            <span className="text-red-500">{t("page.reprovada")}</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
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
                return (
                  <tr key={item.id} className="hover:bg-[#f5f8fb]">
                    <td className="px-6 py-4 text-sm text-[#4f4f4f]">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto inline-flex h-8 w-12 items-center justify-center rounded border border-red-500 bg-white text-sm text-[#4f4f4f]">
                        {item.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto inline-flex h-8 min-w-[100px] items-center justify-center rounded border border-red-500 bg-white px-3 text-sm text-[#4f4f4f]">
                        {formatCurrency(item.priceList)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto inline-flex h-8 min-w-[100px] items-center justify-center rounded border border-red-500 bg-white px-3 text-sm text-[#4f4f4f]">
                        {formatCurrency(item.priceQuote)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="mx-auto inline-flex h-8 min-w-[100px] items-center justify-center rounded border border-red-500 bg-white px-3 text-sm text-[#4f4f4f]">
                        {formatCurrency(totalRow)}
                      </div>
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
          <div className="inline-flex h-10 min-w-[150px] items-center justify-center rounded border border-red-500 bg-white px-4 text-base font-semibold text-[#4f4f4f]">
            {formatCurrency(totalQuote)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={onNavigateBack}
          className="rounded-full border border-borderNeutral bg-white px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-[#4f4f4f] transition hover:bg-[#f5f8fb]"
        >
          {t("common.voltar")}
        </button>
        <button
          type="button"
          className="rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
        >
          {t("common.finalizar")}
        </button>
      </div>
    </section>
  );
}

