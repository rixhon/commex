import { CalendarDays, ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useMemo, useState, useRef } from "react";
import { CanalIndiretoModal } from "../components/CanalIndiretoModal";
import { CustomerServiceModal } from "../components/CustomerServiceModal";
import { CRECOModal } from "../components/CRECOModal";
import { NegativaCRECOModal } from "../components/NegativaCRECOModal";
import { useLanguage } from "../contexts/LanguageContext";

type FieldProps = {
  id: string;
  label: string;
  placeholder: string;
  type?: "text" | "date" | "select" | "textarea";
  defaultValue?: string;
  rows?: number;
  icon?: JSX.Element;
  tone?: "default" | "alert";
};

const baseLabelClass =
  "text-[11px] font-medium tracking-[0.08em] text-textMuted uppercase";

type DatePickerFieldProps = {
  id: string;
  placeholder: string;
  defaultValue?: string;
  icon?: JSX.Element;
};

function DatePickerField({ id, placeholder, defaultValue, icon }: DatePickerFieldProps) {
  // Converter formato dd/mm/aaaa para aaaa-mm-dd para o input type="date"
  const convertToDateInput = (dateStr: string | undefined): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return "";
  };

  // Converter formato aaaa-mm-dd para dd/mm/aaaa para exibição
  const convertToDisplayFormat = (dateStr: string): string => {
    if (!dateStr) return "";
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return dateStr;
  };

  const [dateValue, setDateValue] = useState(convertToDateInput(defaultValue));
  const [displayValue, setDisplayValue] = useState(defaultValue || "");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setDateValue(newValue);
    if (newValue) {
      setDisplayValue(convertToDisplayFormat(newValue));
    } else {
      setDisplayValue("");
    }
    // Quando uma data é selecionada, o picker fecha automaticamente
    setIsPickerOpen(false);
  };

  const handleIconClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dateInputRef.current) {
      // Se o picker está aberto, fecha (blur)
      if (isPickerOpen) {
        dateInputRef.current.blur();
        setIsPickerOpen(false);
      } else {
        // Se o picker está fechado, abre
        setIsPickerOpen(true);
        // Tenta usar showPicker() se disponível (navegadores modernos)
        try {
          if (typeof (dateInputRef.current as any).showPicker === "function") {
            const pickerPromise = (dateInputRef.current as any).showPicker();
            if (pickerPromise && typeof pickerPromise.catch === "function") {
              pickerPromise.catch(() => {
                // Se showPicker() falhar, usa fallback
                dateInputRef.current?.focus();
                dateInputRef.current?.click();
              });
            }
          } else {
            // Fallback: foca e clica no input para abrir o date picker
            dateInputRef.current.focus();
            dateInputRef.current.click();
          }
        } catch (error) {
          // Se showPicker() falhar, usa o fallback
          dateInputRef.current.focus();
          dateInputRef.current.click();
        }
      }
    }
  };

  // Detecta quando o picker fecha (quando o input perde o foco)
  const handleBlur = () => {
    setIsPickerOpen(false);
  };

  const handleDisplayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    handleIconClick(e);
  };

  return (
    <>
      <input
        ref={dateInputRef}
        id={id}
        name={id}
        type="date"
        value={dateValue}
        onChange={handleDateChange}
        onBlur={handleBlur}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
        tabIndex={-1}
      />
      <input
        type="text"
        placeholder={placeholder}
        value={displayValue}
        readOnly
        className="flex-1 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none cursor-pointer"
        onClick={handleDisplayClick}
      />
      <button
        type="button"
        onClick={handleIconClick}
        className="flex size-8 items-center justify-center rounded-md text-[#1985c3] hover:bg-blue-50 transition-colors cursor-pointer"
        aria-label="Abrir calendário"
        tabIndex={0}
      >
        {icon}
      </button>
    </>
  );
}

function FormField({
  id,
  label,
  placeholder,
  type = "text",
  icon,
  defaultValue,
  rows = 4,
  tone = "default"
}: FieldProps) {
  const containerClass = clsx(
    "flex w-full items-center justify-between rounded-lg border px-4 text-sm text-[#5f5f5f] transition focus-within:ring-2 focus-within:ring-primary/40",
    type === "textarea" ? "min-h-[140px] px-0" : "h-12",
    tone === "alert"
      ? "border-[#f2bcbc] bg-[#fdecec]"
      : "border-borderNeutral bg-white"
  );

  const content = useMemo(() => {
    if (type === "select") {
      return (
        <>
          <input
            id={id}
            name={id}
            placeholder={placeholder}
            defaultValue={defaultValue}
            readOnly
            className="flex-1 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
          />
          <ChevronDown
            size={18}
            className="shrink-0 text-borderNeutral"
            aria-hidden
          />
        </>
      );
    }

    if (type === "date") {
      return <DatePickerField id={id} placeholder={placeholder} defaultValue={defaultValue} icon={icon} />;
    }

    if (type === "textarea") {
      return (
        <div className="flex h-full w-full items-start gap-2">
          <textarea
            id={id}
            name={id}
            rows={rows}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className={clsx(
              "h-full w-full resize-none rounded-lg bg-transparent px-4 py-3 text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none",
              tone === "alert" ? "text-[#4f3d3d]" : "text-[#5f5f5f]"
            )}
          />
          {icon && (
            <span className="flex shrink-0 items-center pt-3 text-borderNeutral">
              {icon}
            </span>
          )}
        </div>
      );
    }

    return (
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-full w-full bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
      />
    );
  }, [id, placeholder, type, icon, defaultValue, rows, tone]);

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className={baseLabelClass}>
        {label}
      </label>
      <div className={containerClass}>{content}</div>
    </div>
  );
}

type CriacaoProcedimentoProps = {
  onNavigateToLista?: () => void;
};

export function CriacaoProcedimento({ onNavigateToLista }: CriacaoProcedimentoProps) {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const [isCRECOOpen, setIsCRECOOpen] = useState(false);
  const [isNegativaCRECOOpen, setIsNegativaCRECOOpen] = useState(false);

  const handleCanalIndiretoSubmit = (data: {
    vitaleHospitalar: string;
    email: string;
    nomePaciente: string;
    canalCotacao: string;
    idCotacao: string;
    maisInformacoes: string;
  }) => {
    console.log("Dados do formulário Canal Indireto:", data);
    // Fecha o modal Canal Indireto
    setIsModalOpen(false);
    // Abre o modal Customer Service após um pequeno delay para transição suave
    setTimeout(() => {
      setIsCustomerServiceOpen(true);
    }, 150);
  };

  const handleCustomerServiceSubmit = (data: {
    cadastroInativo: string;
    email: string;
    arquivos: string[];
  }) => {
    console.log("Dados do Customer Service:", data);
    // Fecha o modal Customer Service
    setIsCustomerServiceOpen(false);
    // Abre o modal CRECO após um pequeno delay para transição suave
    setTimeout(() => {
      setIsCRECOOpen(true);
    }, 150);
  };

  const handleCRECOSubmit = (data: {
    clienteBloqueado: string;
    email: string;
    status: string;
    documentacao: string;
  }) => {
    console.log("Dados do CRECO:", data);
    // Fecha o modal CRECO
    setIsCRECOOpen(false);
    // Abre o modal Negativa CRECO após um pequeno delay para transição suave
    setTimeout(() => {
      setIsNegativaCRECOOpen(true);
    }, 150);
  };

  const handleNegativaCRECOSubmit = (data: {
    cliente: string;
    email: string;
    status: string;
    avisoCliente: string;
  }) => {
    console.log("Dados do Negativa CRECO:", data);
    // Fecha o modal Negativa CRECO
    setIsNegativaCRECOOpen(false);
    // Navega para a página de lista após um pequeno delay
    setTimeout(() => {
      onNavigateToLista?.();
    }, 150);
  };

  return (
    <>
      <section
        aria-labelledby="criacao-procedimento-heading"
        className="mx-auto w-full max-w-4xl"
      >
      <header className="mb-10">
        <h1
          id="criacao-procedimento-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("menu.criacao-procedimento")}
        </h1>
      </header>

      <form className="space-y-5">
        <FormField
          id="nome-paciente"
          label={t("field.nome-paciente")}
          placeholder={t("field.nome-paciente")}
          defaultValue="Regiane Takahashi"
        />

        <FormField
          id="data-nascimento"
          label={t("field.data-nascimento")}
          placeholder="dd/mm/aaaa"
          type="date"
          defaultValue="09/10/1994"
          icon={<CalendarDays size={20} />}
        />

        <FormField
          id="cpf"
          label={t("field.cpf")}
          placeholder="000.000.000-00"
          defaultValue="905.251.500-92"
        />

        <FormField
          id="canal-cotacao"
          label={t("field.plano-saude")}
          placeholder={t("field.entre-com-plano-saude")}
          defaultValue="INPART Saúde"
          type="select"
        />

        <FormField
          id="id-cotacao"
          label={t("field.numero-solicitacao")}
          placeholder={t("field.entre-com-numero-solicitacao")}
          defaultValue="1234"
          type="select"
        />

        <FormField
          id="tipo-cotacao"
          label={t("field.tipo-internacao")}
          placeholder={t("field.entre-com-tipo-internacao")}
          defaultValue="PRE"
          type="select"
        />

        <FormField
          id="modelo-faturamento"
          label={t("field.modelo-faturamento")}
          placeholder={t("field.modelo-faturamento")}
          type="select"
        />

        <FormField
          id="divisao"
          label={t("field.crm")}
          placeholder={t("field.informe-crm")}
          defaultValue="CRM"
          type="select"
        />

        <FormField
          id="filial"
          label={t("field.hospital")}
          placeholder={t("field.informe-hospital")}
          defaultValue="BENEFICÊNCIA PORTUGUESA"
          type="select"
        />

        <FormField
          id="cidade"
          label={t("field.cidade")}
          placeholder={t("field.informe-cidade")}
          defaultValue="OSASCO"
          type="select"
        />

        <FormField
          id="convenio"
          label={t("field.convenio")}
          placeholder={t("field.informe-convenio")}
          defaultValue="Amil"
        />

        <FormField
          id="vendedor"
          label={t("field.medico-solicitante")}
          placeholder={t("field.informe-medico-solicitante")}
          defaultValue="Manuaella Leanza"
          type="select"
        />

        <FormField
          id="data-prevista-cirurgia"
          label={t("field.data-prevista-cirurgia")}
          placeholder="dd/mm/aaaa"
          defaultValue="28/07/2025"
          type="date"
          icon={<CalendarDays size={20} />}
        />

        <FormField
          id="nome-contato"
          label={t("field.medico-assistente")}
          placeholder={t("field.informe-medico-assistente")}
          defaultValue="Gustavo Veloso"
          type="select"
        />

        <FormField
          id="nome-medico"
          label={t("field.medico-anestesista")}
          placeholder={t("field.informe-medico-anestesista")}
          defaultValue="Dr. Rogerio Peron"
          type="select"
        />

        <FormField
          id="local"
          label={t("field.local")}
          placeholder={t("field.informe-local")}
          defaultValue="BP-001549 PAULISTA 6159908000158"
          type="select"
        />

        <FormField
          id="procedimento"
          label={t("field.procedimento-solicitado")}
          placeholder={t("field.selecione-procedimento")}
          defaultValue="Implante de marcapasso câmara dupla"
          type="select"
          tone="alert"
        />

        <FormField
          id="prazo-pagamento"
          label={t("field.prazo-pagamento")}
          placeholder={t("field.selecione-tipo-pagamento")}
          defaultValue="À vista"
          type="select"
        />

        <FormField
          id="validade"
          label={t("field.validade")}
          placeholder={t("field.informe-validade")}
          defaultValue="30 Dias"
          type="select"
        />

        <FormField
          id="prazo-entrega"
          label={t("field.regiao-atendimento")}
          placeholder={t("field.selecione-regiao-atendimento")}
          defaultValue="48H Úteis, e fora de São Paulo Capita..."
          type="select"
        />

        <FormField
          id="mais-informacoes-cliente"
          label={t("field.mais-informacoes-cliente")}
          placeholder={t("field.informe-observacoes")}
          defaultValue="Esta cotação foi elaborada única e exclusivamente para o seu destinatário, não podendo ser transferida, cedida ou compartilhada com terceiros."
          type="textarea"
          rows={4}
          tone="alert"
          icon={<ChevronDown size={18} />}
        />

        <FormField
          id="mais-informacoes-interna"
          label={t("field.mais-informacoes-interna")}
          placeholder={t("field.informe-observacoes")}
          type="textarea"
          rows={4}
          tone="alert"
        />

        <div className="flex flex-wrap justify-center gap-4 pt-6 sm:justify-end">
          <button
            type="button"
            className="w-full max-w-[200px] rounded-full bg-accent px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-accent/90"
          >
            {t("common.voltar")}
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="w-full max-w-[200px] rounded-full bg-primary px-10 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-primaryHover"
          >
            {t("button.ok")}
          </button>
        </div>
      </form>
    </section>

    <CanalIndiretoModal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleCanalIndiretoSubmit}
    />

    <CustomerServiceModal
      open={isCustomerServiceOpen}
      onClose={() => setIsCustomerServiceOpen(false)}
      onSubmit={handleCustomerServiceSubmit}
    />

    <CRECOModal
      open={isCRECOOpen}
      onClose={() => setIsCRECOOpen(false)}
      onSubmit={handleCRECOSubmit}
    />

    <NegativaCRECOModal
      open={isNegativaCRECOOpen}
      onClose={() => setIsNegativaCRECOOpen(false)}
      onSubmit={handleNegativaCRECOSubmit}
    />
    </>
  );
}

