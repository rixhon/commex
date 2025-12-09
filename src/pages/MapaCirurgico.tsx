import { useMemo, useState, useRef } from "react";
import { CalendarDays, ChevronLeft, ChevronRight, Search } from "lucide-react";
import clsx from "clsx";
import { useLanguage } from "../contexts/LanguageContext";

type CalendarView = "month" | "week" | "day";

type CalendarEvent = {
  date: string;
  time?: string;
  title: string;
};

const calendarEvents: CalendarEvent[] = [
  { date: "2025-07-12", time: "10:30", title: "Reunião" },
  { date: "2025-07-12", time: "11:30", title: "Reunião" },
  { date: "2025-07-12", title: "+ 3 assuntos" },
  { date: "2025-07-09", title: "4 eventos" },
  { date: "2025-07-16", title: "4 eventos" }
];

const monthsPT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];

const monthsEN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function generateMonthDays(year: number, month: number) {
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const grid: Array<{ label: number | null; dateString: string | null }> = [];
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  for (let i = 0; i < offset; i++) {
    grid.push({ label: null, dateString: null });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    grid.push({
      label: day,
      dateString: date.toISOString().split("T")[0]
    });
  }

  while (grid.length < 42) {
    grid.push({ label: null, dateString: null });
  }

  return grid;
}

type DatePickerProps = {
  id: string;
  placeholder: string;
  defaultValue?: string;
};

function DatePickerField({ id, placeholder, defaultValue }: DatePickerProps) {
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
        className="ml-auto flex size-[18px] items-center justify-center text-primary hover:opacity-80 transition-opacity cursor-pointer"
        aria-label="Abrir calendário"
        tabIndex={0}
      >
        <CalendarDays size={18} />
      </button>
    </>
  );
}

export function MapaCirurgico() {
  const { t, language } = useLanguage();
  const [view, setView] = useState<CalendarView>("month");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6));
  const [search, setSearch] = useState("");
  const months = language === "pt-BR" ? monthsPT : monthsEN;

  const monthDays = useMemo(
    () =>
      generateMonthDays(
        currentDate.getFullYear(),
        currentDate.getMonth()
      ),
    [currentDate]
  );

  const todayCount = calendarEvents.length;

  const changeMonth = (direction: 1 | -1) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + direction);
      return next;
    });
  };

  const currentMonthLabel = `${months[currentDate.getMonth()].toUpperCase()} DE ${currentDate.getFullYear()}`;

  const filteredEvents = useMemo(() => {
    if (!search.trim()) {
      return calendarEvents;
    }
    const searchLower = search.toLowerCase();
    return calendarEvents.filter((event) =>
      event.title.toLowerCase().includes(searchLower)
    );
  }, [search]);

  const getEventsForDate = (dateString: string | null) =>
    filteredEvents.filter((event) => event.date === dateString);

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-medium text-primary">
          {t("page.mapa-cirurgico")}
        </h1>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex h-11 items-center rounded-lg border border-borderNeutral bg-white px-4">
            <Search
              size={18}
              className="mr-3 text-borderNeutral"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar"
              className="w-56 bg-transparent text-sm text-[#5f5f5f] placeholder:text-borderNeutral focus:outline-none"
            />
          </div>
          <div className="flex h-11 items-center rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f]">
            Selecione um Hospital
          </div>
          <div className="flex h-11 items-center rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f]">
            Selecione uma Indústria
          </div>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="flex flex-col gap-5 rounded-3xl border border-borderNeutral bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => changeMonth(-1)}
                className="flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-primaryHover"
                aria-label="Mês anterior"
              >
                <ChevronLeft size={16} />
                hoje
              </button>
              <button
                type="button"
                onClick={() => changeMonth(1)}
                className="flex items-center gap-1 rounded-full bg-primary px-3 py-2 text-xs font-semibold uppercase text-white transition hover:bg-primaryHover"
                aria-label="Próximo mês"
              >
                hoje
                <ChevronRight size={16} />
              </button>
            </div>

            <h2 className="text-xl font-semibold text-primary">
              {currentMonthLabel}
            </h2>

            <div className="flex items-center gap-2">
              {(["month", "week", "day"] as CalendarView[]).map(
                (viewOption) => (
                  <button
                    key={viewOption}
                    type="button"
                    onClick={() => setView(viewOption)}
                    className={clsx(
                      "rounded-lg px-4 py-1 text-sm font-medium capitalize transition",
                      view === viewOption
                        ? "bg-primary text-white"
                        : "bg-[#e3f1fa] text-primary"
                    )}
                  >
                    {viewOption === "month"
                      ? "mês"
                      : viewOption === "week"
                      ? "semana"
                      : "dia"}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-borderNeutral">
            <div className="grid grid-cols-7 bg-[#f1f3f6] text-center text-xs font-semibold uppercase tracking-[0.08em] text-[#6f6f6f]">
              {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"].map((day) => (
                <div key={day} className="border-r border-borderNeutral px-2 py-3 last:border-r-0">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {monthDays.map(({ label, dateString }, index) => {
                const events = label ? getEventsForDate(dateString) : [];
                return (
                  <div
                    key={index}
                    className="min-h-[100px] border border-borderNeutral px-2 py-2 text-sm text-[#4f4f4f]"
                  >
                    {label && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#6f6f6f]">{label}</span>
                        {!!events.length && (
                          <span className="flex items-center gap-1 text-[11px] text-primary">
                            <span className="size-2 rounded-full bg-primary" />
                            {events.length} eventos
                          </span>
                        )}
                      </div>
                    )}

                    <div className="mt-2 space-y-1">
                      {events.slice(0, 2).map((event, eventIndex) => (
                        <div
                          key={eventIndex}
                          className="rounded-md bg-[#e8f3fb] px-2 py-1 text-xs text-primary"
                        >
                          {event.time ? `${event.time} ` : ""}
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="rounded-3xl border border-borderNeutral bg-[#f5f7f9] p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#2f2f2f]">
            {t("page.cirurgias-hoje")}
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                Data de Início*
              </span>
              <div className="relative flex h-12 items-center gap-2 rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f]">
                <DatePickerField
                  id="data-inicio"
                  placeholder="dd/mm/aaaa"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
                Data Final*
              </span>
              <div className="relative flex h-12 items-center gap-2 rounded-lg border border-borderNeutral bg-white px-4 text-sm text-[#5f5f5f]">
                <DatePickerField
                  id="data-final"
                  placeholder="dd/mm/aaaa"
                />
              </div>
            </div>
          </div>

          <span className="mt-10 block text-[80px] font-semibold leading-none text-primary">
            {todayCount}
          </span>

          <button
            type="button"
            className="mt-6 w-full rounded-full bg-[#77b4eb] py-3 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#5da2e2]"
          >
            limpar
          </button>
        </aside>
      </div>
    </section>
  );
}


