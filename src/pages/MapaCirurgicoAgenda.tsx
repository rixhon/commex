import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { AgendamentosModal } from "../components/AgendamentosModal";

export function MapaCirurgicoAgenda() {
  const { t } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1)); // Dezembro 2025
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const dayNames = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = monthNames[month];

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Get previous month's trailing days
  const previousMonth = new Date(year, month, 0);
  const daysInPreviousMonth = previousMonth.getDate();
  const trailingDays = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    trailingDays.push(daysInPreviousMonth - i);
  }

  // Get current month's days
  const currentMonthDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    currentMonthDays.push(i);
  }

  // Get next month's leading days
  const totalCells = trailingDays.length + currentMonthDays.length;
  const remainingCells = 42 - totalCells; // 6 rows * 7 days
  const leadingDays = [];
  for (let i = 1; i <= remainingCells && i <= 7; i++) {
    leadingDays.push(i);
  }

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <section
      aria-labelledby="mapa-cirurgico-agenda-heading"
      className="mx-auto flex w-full max-w-7xl flex-col gap-8"
    >
      <header className="mb-10">
        <div className="mb-8 flex items-center justify-between">
          <h1
            id="mapa-cirurgico-agenda-heading"
            className="text-3xl font-medium text-primary"
          >
            {t("page.mapa-cirurgico")}
          </h1>
          <div className="flex items-center gap-3">
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
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="flex size-8 items-center justify-center rounded text-primary transition hover:bg-primary/10"
              aria-label="Mês anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryHover"
            >
              &lt; hoje &gt;
            </button>
            <button
              type="button"
              onClick={goToNextMonth}
              className="flex size-8 items-center justify-center rounded text-primary transition hover:bg-primary/10"
              aria-label="Próximo mês"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-medium text-[#1f1f1f]">
              {monthName} de {year}
            </h2>
            <button
              type="button"
              className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primaryHover"
            >
              mês
            </button>
          </div>
        </div>
      </header>

      <div className="rounded-2xl border border-borderNeutral bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-7 border-b border-borderNeutral">
          {dayNames.map((day) => (
            <div
              key={day}
              className="border-r border-borderNeutral px-4 py-3 text-center text-sm font-medium text-[#4f4f4f] last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {/* Previous month trailing days */}
          {trailingDays.map((day) => (
            <div
              key={`prev-${day}`}
              className="min-h-[100px] border-r border-b border-borderNeutral p-2 text-right text-sm text-[#8a8a8a] last:border-r-0"
            >
              {day}
            </div>
          ))}

          {/* Current month days */}
          {currentMonthDays.map((day) => (
            <div
              key={`current-${day}`}
              onClick={() => {
                setSelectedDay(day);
                setIsModalOpen(true);
              }}
              className="min-h-[100px] cursor-pointer border-r border-b border-borderNeutral p-2 text-right text-sm text-[#4f4f4f] transition hover:bg-gray-50 last:border-r-0"
            >
              {day}
            </div>
          ))}

          {/* Next month leading days */}
          {leadingDays.map((day) => (
            <div
              key={`next-${day}`}
              className="min-h-[100px] border-r border-b border-borderNeutral p-2 text-right text-sm text-[#8a8a8a] last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AgendamentosModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDay(null);
          }}
          onSubmit={(data) => {
            // TODO: Implementar submissão
            console.log("Modal submitted with data:", data, "for day:", selectedDay);
            setIsModalOpen(false);
            setSelectedDay(null);
          }}
        />
      )}
    </section>
  );
}

