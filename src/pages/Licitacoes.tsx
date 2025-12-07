import { useState } from "react";
import clsx from "clsx";
import { useLanguage } from "../contexts/LanguageContext";

type MenuItem = {
  id: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { id: "vigentes", label: "Vigentes" },
  { id: "adesoes", label: "Adesões" },
  { id: "vencidas-antigas", label: "Vencidas Antigas" },
  { id: "vencidas", label: "Vencidas" },
  { id: "validacao", label: "Validação" },
  { id: "formulario", label: "Formulário" },
  { id: "suporte", label: "Suporte" },
  { id: "cadastro-cliente", label: "Cadastro Cliente" },
  { id: "tabelas-preco", label: "Tabelas Preço" },
  { id: "lista-preco", label: "Lista Preço" },
  { id: "cadastro-produto", label: "Cadastro Produto" },
  { id: "licit", label: "Licit" },
  { id: "endereco-entrega", label: "Endereço de Entrega" },
  { id: "regulares", label: "Regulares" }
];

type TabKey = "tarefas" | "other";

export function Licitacoes() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabKey>("tarefas");

  return (
    <section
      aria-labelledby="licitacoes-heading"
      className="mx-auto flex w-full max-w-5xl flex-col gap-6"
    >
      <header>
        <h1
          id="licitacoes-heading"
          className="text-3xl font-medium text-primary"
        >
          {t("page.licitacoes")}
        </h1>
      </header>

      <div className="flex flex-col gap-0">
        <div className="flex items-center gap-0 border-b border-borderNeutral">
          <button
            type="button"
            onClick={() => setActiveTab("tarefas")}
            className={clsx(
              "px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] transition",
              activeTab === "tarefas"
                ? "border-b-2 border-primary bg-[#f5f5f5] text-primary"
                : "text-[#8a8a8a] hover:text-primary"
            )}
          >
            {t("page.tarefas")}
          </button>
        </div>

        {activeTab === "tarefas" && (
          <div className="border-b border-borderNeutral bg-white">
            <ul className="divide-y divide-borderNeutral">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full px-6 py-3 text-left text-sm text-[#4f4f4f] transition hover:bg-[#f5f8fb] hover:text-primary"
                  >
                    {t(`licitacoes.${item.id}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

