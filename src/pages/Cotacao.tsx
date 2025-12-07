import {
  CalendarDays,
  ChevronDown,
  Download,
  Plus,
  Share2,
  Trash2
} from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import abbottLogo from "../assets/logo-abbott.svg";
import { useLanguage } from "../contexts/LanguageContext";

type LineItem = {
  id: string;
  code: string;
  description: string;
  quantity: number;
  unitValue: number;
  anvisa: string;
};

const initialItems: LineItem[] = [
  {
    id: "item-1",
    code: "PM1272",
    description:
      "PM1272 MARCAPASSO CAMARA ÚNICA ASSURITY MRTRF. PM1272",
    quantity: 1,
    unitValue: 99999.99,
    anvisa: "807409500098"
  },
  {
    id: "item-2",
    code: "5088TC",
    description: "INTODUTOR PEEL AWAY KIT 7F 14CM",
    quantity: 1,
    unitValue: 99999.99,
    anvisa: "807409500098"
  }
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

function BaseField({
  label,
  children,
  tone = "default"
}: {
  label: string;
  children: React.ReactNode;
  tone?: "default" | "muted";
}) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span
        className={clsx(
          "text-[11px] font-medium uppercase tracking-[0.08em]",
          tone === "muted" ? "text-textMuted" : "text-[#6f6f6f]"
        )}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

function Input({
  placeholder,
  defaultValue,
  readOnly,
  icon,
  type = "text"
}: {
  placeholder?: string;
  defaultValue?: string;
  readOnly?: boolean;
  icon?: React.ReactNode;
  type?: "text" | "textarea";
}) {
  if (type === "textarea") {
    return (
      <textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        rows={3}
        className="w-full resize-none rounded-lg border border-borderNeutral bg-white px-4 py-3 text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    );
  }

  return (
    <div className="flex h-12 items-center gap-2 rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#4f4f4f] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
      <input
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
        className="flex-1 bg-transparent text-sm text-[#4f4f4f] placeholder:text-borderNeutral focus:outline-none"
      />
      {icon && <span className="text-primary">{icon}</span>}
    </div>
  );
}

export function Cotacao() {
  const { t } = useLanguage();
  const [items, setItems] = useState<LineItem[]>(initialItems);

  const totalValue = useMemo(
    () =>
      items.reduce(
        (acc, item) => acc + item.unitValue * item.quantity,
        0
      ),
    [items]
  );

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `item-${prev.length + 1}`,
        code: "",
        description: "",
        quantity: 1,
        unitValue: 0,
        anvisa: ""
      }
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section
      aria-labelledby="cotacao-heading"
      className="mx-auto flex w-full max-w-4xl flex-col gap-8"
    >
      <header className="mb-10">
        <h1
          id="cotacao-heading"
          className="text-3xl font-medium text-primary mb-4"
        >
          {t("page.cotacao")}
        </h1>
        <img
          src={abbottLogo}
          alt="Abbott"
          className="h-10 w-auto object-contain"
        />
      </header>

      <form className="space-y-8">
        <div className="grid gap-6">
          <BaseField label={t("field.cidade")}>
            <Input defaultValue="São Paulo" />
          </BaseField>

          <BaseField label={t("field.data")}>
            <Input
              defaultValue="8 de Julho de 2025"
              icon={<CalendarDays size={18} />}
            />
          </BaseField>

          <BaseField label={t("field.numero-cotacao")}>
            <Input defaultValue="55008" />
          </BaseField>

          <BaseField label={t("field.numero-versao-cotacao")}>
            <Input defaultValue="1" />
          </BaseField>

          <BaseField label={t("field.cliente")}>
            <Input defaultValue="Amil Assistência Médica Internacional S/A" />
          </BaseField>

          <BaseField label={t("field.cnpj")}>
            <Input defaultValue="29.309.127/0001-79" />
          </BaseField>

          <BaseField label={t("field.ac")}>
            <Input
              type="textarea"
              defaultValue="Prezado(a) Senhor(a) Conforme solicitação de V.Sa, apresentamos nossa proposta para fornecimento dos materiais abaixo relacionados:"
            />
          </BaseField>

          <BaseField label={t("field.nome-paciente")}>
            <Input defaultValue="Teste Amil" />
          </BaseField>

          <BaseField label={t("field.medico")}>
            <Input defaultValue="Teste" />
          </BaseField>

          <BaseField label={t("field.local")}>
            <Input defaultValue="BP - 001549 PAULISTA" />
          </BaseField>

          <BaseField label={t("field.data-prevista-cirurgia-cotacao")}>
            <Input
              defaultValue="09 de Julho de 2025"
              icon={<CalendarDays size={18} />}
            />
          </BaseField>
        </div>

        <div className="flex flex-col gap-6">
          {items.map((item, index) => {
            const totalRow = item.unitValue * item.quantity;
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-borderNeutral bg-white px-6 py-5 shadow-sm"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span className="text-lg font-semibold text-primary">
                    {t("field.item")} {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex size-9 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
                      aria-label={t("field.adicionar-item")}
                    >
                      <Plus size={18} />
                    </button>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="flex size-9 items-center justify-center rounded-full border border-primary text-primary transition hover:bg-primary/10"
                        aria-label={t("field.remover-item")}
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-[minmax(0,100px)_1fr_minmax(0,140px)_minmax(0,140px)]">
                    <BaseField label={t("table.quantidade")}>
                      <Input defaultValue={String(item.quantity)} />
                    </BaseField>

                    <BaseField label={t("table.descricao")}>
                      <Input defaultValue={item.description} />
                    </BaseField>

                    <BaseField label={t("field.valor-unitario")}>
                      <Input
                        defaultValue={formatCurrency(item.unitValue)}
                      />
                    </BaseField>

                    <BaseField label={t("field.valor-total")}>
                      <Input defaultValue={formatCurrency(totalRow)} />
                    </BaseField>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[minmax(0,120px)_1fr_minmax(0,160px)]">
                    <BaseField label={t("table.codigo")}>
                      <Input defaultValue={item.code} />
                    </BaseField>

                    <BaseField label={t("table.descricao")}>
                      <Input defaultValue={item.description} />
                    </BaseField>

                    <BaseField label={t("table.anvisa")}>
                      <Input defaultValue={item.anvisa} />
                    </BaseField>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.08em] text-textMuted">
            {t("field.total-geral")}:
          </span>
          <span className="min-w-[160px] rounded-lg border border-borderNeutral bg-[#f8f9fb] px-4 py-2 text-right text-lg font-semibold text-primary">
            {formatCurrency(totalValue)}
          </span>
        </div>

        <div className="rounded-2xl border border-borderNeutral bg-white px-6 py-5 shadow-sm">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.08em] text-primary">
            {t("field.condicoes-fornecimento")}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <BaseField label={t("field.prazo-pagamento")} tone="muted">
              <Input defaultValue="À Vista" icon={<ChevronDown size={18} />} />
            </BaseField>
            <BaseField label={t("field.validade-proposta")} tone="muted">
              <Input defaultValue="30 Dias" icon={<ChevronDown size={18} />} />
            </BaseField>
            <BaseField label={t("field.prazo-entrega")} tone="muted">
              <Input defaultValue="2 Dias" icon={<ChevronDown size={18} />} />
            </BaseField>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-4">
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-primary transition hover:bg-primary/10"
          >
            <Download size={18} /> <span>{t("button.baixar")}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-primary px-4 py-2 text-primary transition hover:bg-primary/10"
          >
            <Share2 size={18} /> <span>{t("button.compartilhar")}</span>
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-t border-borderNeutral pt-6 sm:justify-end">
          <button
            type="button"
            className="w-full max-w-[180px] rounded-full bg-[#b0b0b0] px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#9b9b9b]"
          >
            Voltar
          </button>
          <button
            type="button"
            className="w-full max-w-[180px] rounded-full bg-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-accent/90"
          >
            Limpar
          </button>
          <button
            type="button"
            className="w-full max-w-[180px] rounded-full bg-primary px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
          >
            Gerar
          </button>
        </div>
      </form>
    </section>
  );
}







