import { X, ChevronDown, Trash2, Minus, Plus } from "lucide-react";
import { useState, useMemo } from "react";
import { useLanguage } from "../contexts/LanguageContext";

type Product = {
  id: string;
  name: string;
  quantity: number;
  priceList: number;
  priceQuote: number;
  serialLot: string;
};

type CotacaoPosModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    priceList: string;
    itemKits: string;
    products: Product[];
    total: number;
  }) => void;
};

const initialProducts: Product[] = [
  {
    id: "plss-1007",
    name: "PLSS-1007_INTRODUTOR_PEEL_AWAY KIT 7F 14CM",
    quantity: 1,
    priceList: 133.0,
    priceQuote: 133.0,
    serialLot: "ABCD"
  },
  {
    id: "2088tc-58",
    name: "2088TC/58_MRI_ELETRODO ENDOCÁRDIO ATRIA...",
    quantity: 1,
    priceList: 1095.0,
    priceQuote: 1095.0,
    serialLot: "EFGH"
  },
  {
    id: "pm1272",
    name: "PM1272_MARCAPASSO CAMARA ÚNICA ASSURIT...",
    quantity: 1,
    priceList: 4501.76,
    priceQuote: 4501.76,
    serialLot: "IHJK"
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

export function CotacaoPosModal({
  open,
  onClose,
  onSubmit
}: CotacaoPosModalProps) {
  const { t } = useLanguage();
  const [priceList, setPriceList] = useState("");
  const [itemKits, setItemKits] = useState("");
  const [products, setProducts] = useState<Product[]>(() =>
    initialProducts.map((p) => ({ ...p }))
  );

  const total = useMemo(
    () =>
      products.reduce(
        (acc, product) => acc + product.priceQuote * product.quantity,
        0
      ),
    [products]
  );

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({
      priceList,
      itemKits,
      products,
      total
    });
  };

  const handleQuantityChange = (id: string, delta: number) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id !== id) return product;
        const newQuantity = Math.max(1, product.quantity + delta);
        return { ...product, quantity: newQuantity };
      })
    );
  };

  const handlePriceQuoteChange = (id: string, value: string) => {
    const numValue = parseFloat(value.replace(/[^\d,]/g, "").replace(",", "."));
    if (!isNaN(numValue)) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, priceQuote: numValue } : product
        )
      );
    }
  };

  const handleSerialLotChange = (id: string, value: string) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, serialLot: value } : product
      )
    );
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-borderNeutral px-6 py-4">
          <h2 className="text-2xl font-medium text-primary">{t("modal.cotacao-pos")}</h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-textMuted transition hover:bg-gray-100 hover:text-primary"
            aria-label={t("field.fechar-modal")}
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  value={priceList}
                  onChange={(e) => setPriceList(e.target.value)}
                  placeholder={t("field.lista-preco")}
                  className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 pr-10 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <ChevronDown
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-borderNeutral pointer-events-none"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={itemKits}
                  onChange={(e) => setItemKits(e.target.value)}
                  placeholder={t("field.selecione-item-kits")}
                  className="h-12 w-full rounded-lg border border-borderNeutral bg-white px-4 pr-10 text-sm text-[#5f5f5f] transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
                <ChevronDown
                  size={20}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-borderNeutral pointer-events-none"
                />
              </div>
            </div>

            <div className="border-t border-borderNeutral pt-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-[#4f4f4f] mb-4">
                {t("field.relacao-produtos-kits")}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-borderNeutral text-[11px] font-medium uppercase tracking-[0.08em] text-primary/80">
                      <th className="text-left pb-3 pr-4">{t("table.produtos")}</th>
                      <th className="text-center pb-3 px-2 w-20">{t("table.qtd")}</th>
                      <th className="text-right pb-3 px-2 w-32">{t("table.preco-lista")}</th>
                      <th className="text-right pb-3 px-2 w-32">{t("table.preco-cotacao")}</th>
                      <th className="text-right pb-3 px-2 w-32">{t("table.total-cotacao")}</th>
                      <th className="text-center pb-3 px-2 w-32">{t("table.serie-lote")}</th>
                      <th className="text-center pb-3 pl-2 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      const totalQuote = product.priceQuote * product.quantity;
                      return (
                        <tr
                          key={product.id}
                          className="border-b border-borderNeutral text-sm text-[#4f4f4f]"
                        >
                          <td className="py-3 pr-4">{product.name}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(product.id, -1)}
                                className="flex size-6 items-center justify-center rounded border border-borderNeutral transition hover:bg-gray-50"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-8 text-center">{product.quantity}</span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(product.id, 1)}
                                className="flex size-6 items-center justify-center rounded border border-borderNeutral transition hover:bg-gray-50"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-right">
                            {formatCurrency(product.priceList)}
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="text"
                              value={formatCurrency(product.priceQuote)}
                              onChange={(e) =>
                                handlePriceQuoteChange(product.id, e.target.value)
                              }
                              className="w-full text-right rounded border border-borderNeutral bg-white px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                            />
                          </td>
                          <td className="py-3 px-2 text-right">
                            {formatCurrency(totalQuote)}
                          </td>
                          <td className="py-3 px-2">
                            <input
                              type="text"
                              value={product.serialLot}
                              onChange={(e) =>
                                handleSerialLotChange(product.id, e.target.value)
                              }
                              className="w-full text-center rounded border border-borderNeutral bg-white px-2 py-1 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/40"
                            />
                          </td>
                          <td className="py-3 pl-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteProduct(product.id)}
                              className="flex size-8 items-center justify-center rounded-full text-primary transition hover:bg-primary/10"
                              aria-label={t("field.excluir-produto")}
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#4f4f4f]">{t("field.total")}:</span>
                <input
                  type="text"
                  value={formatCurrency(total)}
                  readOnly
                  className="w-40 rounded-lg border border-borderNeutral bg-white px-4 py-2 text-right text-sm font-medium text-[#4f4f4f]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-borderNeutral px-6 py-4 gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-red-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-red-600"
            >
              {t("common.voltar")}
            </button>
            <button
              type="button"
              className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
            >
              {t("button.salvar-relacao")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}




