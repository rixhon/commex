import { useMemo, useState } from "react";
import {
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronLeft,
  PlusCircle,
  FileText,
  DollarSign,
  Search,
  CalendarCheck,
  Calendar,
  Map,
  FileSpreadsheet,
  ShoppingCart,
  Receipt,
  ClipboardCheck
} from "lucide-react";
import clsx from "clsx";
import logoCommex from "./assets/logo-commex.svg";
import flagBR from "./assets/br.svg";
import flagUS from "./assets/um.svg";
import { useLanguage } from "./contexts/LanguageContext";
import { CriacaoProcedimento } from "./pages/CriacaoProcedimento";
import { CriacaoProcedimentoLista } from "./pages/CriacaoProcedimentoLista";
import { Cotacao } from "./pages/Cotacao";
import { CotacaoValidacao } from "./pages/CotacaoValidacao";
import { Pricing } from "./pages/Pricing";
import { PricingLiberacao } from "./pages/PricingLiberacao";
import { Agendamentos } from "./pages/Agendamentos";
import { MapaCirurgico } from "./pages/MapaCirurgico";
import { FolhaSala } from "./pages/FolhaSala";
import { FolhaSalaMais } from "./pages/FolhaSalaMais";
import { FolhaSalaConsignado } from "./pages/FolhaSalaConsignado";
import { OrdemCompra } from "./pages/OrdemCompra";
import { OrdemCompraAnexar } from "./pages/OrdemCompraAnexar";
import { Faturamento } from "./pages/Faturamento";
import { FaturamentoLista } from "./pages/FaturamentoLista";
import { FaturamentoCS } from "./pages/FaturamentoCS";
import { LiberacaoDivergente } from "./pages/LiberacaoDivergente";
import { SaldoPendente } from "./pages/SaldoPendente";
import { Licitacoes } from "./pages/Licitacoes";
import { Teste } from "./pages/Teste";
import { PagePlaceholder } from "./pages/PagePlaceholder";

type MenuItem = {
  id: string;
  label: string;
  icon: JSX.Element;
  component?: JSX.Element;
  children?: Array<{ id: string; label: string; component?: JSX.Element }>;
};

const PAGE_PLACEHOLDER = (title: string) => (
  <PagePlaceholder title={title} />
);

export default function App() {
  const { language, setLanguage, t } = useLanguage();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [activeItemId, setActiveItemId] = useState("criacao-procedimento");
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());

  const menuItems = useMemo<MenuItem[]>(
    () => [
      {
        id: "criacao-procedimento",
        label: t("menu.criacao-procedimento"),
        icon: <PlusCircle size={24} strokeWidth={1.75} />,
        component: <CriacaoProcedimento />
      },
      {
        id: "cotacao",
        label: t("menu.cotacao"),
        icon: <FileText size={24} strokeWidth={1.75} />,
        children: [
          {
            id: "cotacao-validacao",
            label: t("menu.cotacao-validacao"),
            component: <CotacaoValidacao />
          },
          {
            id: "cotacao-customer",
            label: t("menu.cotacao-customer"),
            component: PAGE_PLACEHOLDER(t("menu.cotacao-customer"))
          },
          {
            id: "cotacao-creco",
            label: t("menu.cotacao-creco"),
            component: PAGE_PLACEHOLDER(t("menu.cotacao-creco"))
          }
        ],
        component: <Cotacao />
      },
      {
        id: "pricing",
        label: t("menu.pricing"),
        icon: <DollarSign size={24} strokeWidth={1.75} />,
        component: <Pricing />
      },
      {
        id: "licitacoes",
        label: t("menu.licitacoes"),
        icon: <ClipboardCheck size={24} strokeWidth={1.75} />,
        component: <Licitacoes />
      },
      {
        id: "faturamento-servico",
        label: t("menu.faturamento-servico"),
        icon: <CalendarCheck size={24} strokeWidth={1.75} />,
        component: PAGE_PLACEHOLDER(t("menu.faturamento-servico"))
      },
      {
        id: "agendamentos",
        label: t("menu.agendamentos"),
        icon: <Calendar size={24} strokeWidth={1.75} />,
        component: <Agendamentos />
      },
      {
        id: "mapa-cirurgico",
        label: t("menu.mapa-cirurgico"),
        icon: <Map size={24} strokeWidth={1.75} />,
        component: <MapaCirurgico />
      },
      {
        id: "folha-sala",
        label: t("menu.folha-sala"),
        icon: <FileSpreadsheet size={24} strokeWidth={1.75} />,
        component: <FolhaSala onNavigateToMais={() => setActiveItemId("folha-sala-mais")} />
      },
      {
        id: "auditoria",
        label: t("menu.auditoria"),
        icon: <Search size={24} strokeWidth={1.75} />,
        children: [
          {
            id: "auditoria-folha",
            label: t("menu.auditoria-folha"),
            component: PAGE_PLACEHOLDER(t("menu.auditoria-folha"))
          }
        ],
        component: PAGE_PLACEHOLDER(t("menu.auditoria"))
      },
      {
        id: "ordem-compra",
        label: t("menu.ordem-compra"),
        icon: <ShoppingCart size={24} strokeWidth={1.75} />,
        component: <OrdemCompra />
      },
      {
        id: "faturamento",
        label: t("menu.faturamento"),
        icon: <Receipt size={24} strokeWidth={1.75} />,
        component: <Faturamento />
      },
      {
        id: "inb",
        label: t("menu.inb"),
        icon: <ClipboardCheck size={24} strokeWidth={1.75} />,
        component: PAGE_PLACEHOLDER(t("menu.inb"))
      },
      {
        id: "teste",
        label: t("menu.teste"),
        icon: <FileText size={24} strokeWidth={1.75} />,
        component: <Teste />
      }
    ],
    [t]
  );

  const findActiveComponent = () => {
    // Debug: Log para identificar qual componente está sendo renderizado
    console.log("🔍 Active Item ID:", activeItemId);
    
    // Handle pricing-liberacao which is not in the menu but accessible via navigation
    if (activeItemId === "pricing-liberacao") {
      console.log("📄 Rendering: PricingLiberacao (from pages/)");
      return <PricingLiberacao onNavigateBack={() => setActiveItemId("pricing")} />;
    }

    // Handle criacao-procedimento-lista which is not in the menu but accessible via navigation
    if (activeItemId === "criacao-procedimento-lista") {
      return <CriacaoProcedimentoLista />;
    }

    // Handle ordem-compra-anexar which is not in the menu but accessible via navigation
    if (activeItemId === "ordem-compra-anexar") {
      return <OrdemCompraAnexar onNavigateToFaturamentoLista={() => setActiveItemId("faturamento-lista")} />;
    }

    // Handle faturamento-lista which is not in the menu but accessible via navigation
    if (activeItemId === "faturamento-lista") {
      return (
        <FaturamentoLista
          onNavigateToLiberacaoDivergente={() => setActiveItemId("liberacao-divergente")}
          onNavigateToSaldoPendente={() => setActiveItemId("saldo-pendente")}
        />
      );
    }

    // Handle liberacao-divergente which is not in the menu but accessible via navigation
    if (activeItemId === "liberacao-divergente") {
      return (
        <LiberacaoDivergente
          onNavigateToFaturamentoCS={() => setActiveItemId("faturamento-cs")}
        />
      );
    }

    // Handle saldo-pendente which is not in the menu but accessible via navigation
    if (activeItemId === "saldo-pendente") {
      return (
        <SaldoPendente
          onNavigateToFaturamentoCS={() => setActiveItemId("faturamento-cs")}
        />
      );
    }

    // Handle folha-sala-mais which is not in the menu but accessible via navigation
    if (activeItemId === "folha-sala-mais") {
      return (
        <FolhaSalaMais
          onNavigateBack={() => setActiveItemId("folha-sala")}
          onNavigateToConsignado={() => setActiveItemId("folha-sala-consignado")}
        />
      );
    }

    // Handle folha-sala-consignado which is not in the menu but accessible via navigation
    if (activeItemId === "folha-sala-consignado") {
      return <FolhaSalaConsignado onNavigateBack={() => setActiveItemId("folha-sala-mais")} />;
    }

    // Handle faturamento-cs which is not in the menu but accessible via navigation
    if (activeItemId === "faturamento-cs") {
      return <FaturamentoCS onNavigateBack={() => setActiveItemId("faturamento")} />;
    }

    for (const item of menuItems) {
      if (item.id === activeItemId) {
        if (item.id === "pricing") {
          return <Pricing onNavigateToLiberacao={() => setActiveItemId("pricing-liberacao")} />;
        }
        if (item.id === "criacao-procedimento") {
          return <CriacaoProcedimento onNavigateToLista={() => setActiveItemId("criacao-procedimento-lista")} />;
        }
        if (item.id === "ordem-compra") {
          return <OrdemCompra onNavigateToAnexar={() => setActiveItemId("ordem-compra-anexar")} />;
        }
        if (item.id === "faturamento") {
          return (
            <FaturamentoLista
              onNavigateToLiberacaoDivergente={() => setActiveItemId("liberacao-divergente")}
              onNavigateToSaldoPendente={() => setActiveItemId("saldo-pendente")}
            />
          );
        }
        return item.component;
      }
      if (item.children) {
        const child = item.children.find(({ id }) => id === activeItemId);
        if (child) {
          const component = child.component ?? item.component;
          // Verificar se é um placeholder
          if (component && component.type && component.type.name === "PagePlaceholder") {
            console.log("📄 Rendering: PagePlaceholder -", child.label || item.label);
          } else {
            console.log("📄 Rendering:", child.label || item.label, "- Component from menuItems");
          }
          return component;
        }
      }
    }
    console.log("📄 Rendering: CriacaoProcedimento (default fallback)");
    return <CriacaoProcedimento onNavigateToLista={() => setActiveItemId("criacao-procedimento-lista")} />;
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const clone = new Set(prev);
      if (clone.has(id)) {
        clone.delete(id);
      } else {
        clone.add(id);
      }
      return clone;
    });
  };

  const headerHeight = 72;
  const sidebarWidthExpanded = 260;
  const sidebarWidthCollapsed = 80;

  return (
    <div className="relative min-h-screen bg-white text-[#1f1f1f]">
      <header
        className="fixed inset-x-0 top-0 z-40 flex h-[72px] items-center justify-between bg-layoutBg px-8 shadow-header"
        role="banner"
      >
        <button
          type="button"
          onClick={() => setActiveItemId("criacao-procedimento")}
          className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded transition-opacity hover:opacity-80"
          aria-label="Voltar para página inicial"
        >
          <img
            src={logoCommex}
            alt="Commex"
            className="h-12 w-[212px] object-contain pointer-events-none"
          />
        </button>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLanguage("pt-BR")}
              className={clsx(
                "flex size-8 items-center justify-center rounded transition",
                language === "pt-BR"
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label="Português do Brasil"
            >
              <img
                src={flagBR}
                alt="Português do Brasil"
                className="h-5 w-8 object-contain"
              />
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en-US")}
              className={clsx(
                "flex size-8 items-center justify-center rounded transition",
                language === "en-US"
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              )}
              aria-label="English (United States)"
            >
              <img
                src={flagUS}
                alt="English (United States)"
                className="h-5 w-8 object-contain"
              />
            </button>
          </div>
          <div className="flex items-center gap-4 text-textMuted">
            <button
              type="button"
              className="relative flex size-9 items-center justify-center rounded-full bg-white/0 text-textMuted transition hover:text-primary"
              aria-label="Notificações"
            >
              <Bell size={24} strokeWidth={1.75} />
              <span className="absolute right-1 top-1 inline-flex size-2 rounded-full bg-accent" />
            </button>
            <button
              type="button"
              className="flex size-9 items-center justify-center rounded-full bg-white/0 text-textMuted transition hover:text-primary"
              aria-label="Ajuda"
            >
              <HelpCircle size={24} strokeWidth={1.75} />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[#707070]">Gustavo Veloso</p>
              <p className="text-xs text-textMuted">Admin</p>
            </div>
            <div className="relative flex size-10 items-center justify-center rounded-full bg-primary text-white">
              <span className="text-base font-medium">G</span>
              <span className="pointer-events-none absolute inset-0 rounded-full border-[3px] border-primary/10" />
            </div>
          </div>
        </div>
      </header>

      <aside
        className={clsx(
          "fixed left-0 top-[72px] z-30 flex h-[calc(100vh_-_72px)] flex-col gap-6 bg-primary px-4 py-6 transition-all duration-300 ease-in-out",
          sidebarExpanded
            ? "w-[260px]"
            : "w-[80px] items-center px-2"
        )}
        role="navigation"
        aria-label="Menu principal"
      >
        <button
          type="button"
          onClick={() => setSidebarExpanded((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/30 text-white transition hover:bg-white/10"
          aria-label={sidebarExpanded ? "Recolher menu" : "Expandir menu"}
        >
          <ChevronLeft
            size={22}
            className={clsx(
              "transition-transform duration-300",
              sidebarExpanded ? "" : "rotate-180"
            )}
          />
        </button>

        <nav className="no-scrollbar flex-1 overflow-y-auto pr-1">
          <ul className="flex flex-col gap-2">
            {menuItems.map((item) => {
              const isActive =
                activeItemId === item.id ||
                item.children?.some(({ id }) => id === activeItemId) ||
                (item.id === "pricing" && activeItemId === "pricing-liberacao") ||
                (item.id === "faturamento" && (activeItemId === "ordem-compra-anexar" || activeItemId === "faturamento-lista" || activeItemId === "liberacao-divergente" || activeItemId === "saldo-pendente" || activeItemId === "faturamento-cs")) ||
                (item.id === "folha-sala" && (activeItemId === "folha-sala-mais" || activeItemId === "folha-sala-consignado")) ||
                (item.id === "cotacao" && (activeItemId === "cotacao" || activeItemId === "criacao-procedimento-lista"));
              const isGroupOpen = openGroups.has(item.id);
              const hasChildren = item.children && item.children.length > 0;

              return (
                <li key={item.id} className="w-full">
                  <button
                    type="button"
                    onClick={() => {
                      if (hasChildren) {
                        setActiveItemId(item.id);
                        toggleGroup(item.id);
                      } else {
                        setActiveItemId(item.id);
                      }
                    }}
                    className={clsx(
                      "group flex w-full items-center gap-3 rounded-l-full px-4 py-1.5 transition-all duration-200",
                      isActive
                        ? "bg-white text-accent"
                        : "bg-primary text-white hover:bg-primaryHover"
                    )}
                  >
                    <span
                      className={clsx(
                        "flex size-8 items-center justify-center rounded-full",
                        isActive ? "text-accent" : "text-white"
                      )}
                    >
                      {item.icon}
                    </span>

                    {sidebarExpanded && (
                      <span
                        className={clsx(
                          "flex-1 text-left text-[13px] font-medium leading-5",
                          isActive ? "text-accent" : "text-white"
                        )}
                      >
                        {item.label}
                      </span>
                    )}

                    {hasChildren && sidebarExpanded && (
                      <ChevronDown
                        size={18}
                        className={clsx(
                          "transition-transform duration-200",
                          isGroupOpen ? "rotate-180 text-accent" : ""
                        )}
                      />
                    )}
                  </button>

                  {hasChildren && isGroupOpen && sidebarExpanded && (
                    <ul className="mt-1 space-y-0.5 pl-6">
                      {item.children?.map((child) => {
                        const isChildActive = activeItemId === child.id;
                        return (
                          <li key={child.id} className="w-full">
                            <button
                              type="button"
                              onClick={() => setActiveItemId(child.id)}
                              className={clsx(
                                "flex w-full items-center rounded-l-full px-4 py-2 text-left text-xs transition-all duration-200",
                                isChildActive
                                  ? "bg-white text-accent"
                                  : "bg-primary text-white hover:bg-primaryHover"
                              )}
                            >
                              {child.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      <main
        className="relative flex min-h-screen flex-col bg-[#f6f8fb]"
        style={{
          marginTop: headerHeight,
          marginLeft: sidebarExpanded
            ? sidebarWidthExpanded
            : sidebarWidthCollapsed,
          transition: "margin-left 0.3s ease"
        }}
      >
        <div className="flex-1 px-6 pb-12 pt-10 lg:px-16">
          {findActiveComponent()}
        </div>
      </main>
    </div>
  );
}

