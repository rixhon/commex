type PagePlaceholderProps = {
  title: string;
};

export function PagePlaceholder({ title }: PagePlaceholderProps) {
  return (
    <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-dashed border-borderNeutral bg-white/70 text-center text-textMuted">
      <p className="text-lg font-medium text-primary">{title}</p>
      <p className="mt-2 max-w-[320px] text-sm text-textMuted">
        Esta seção ainda não possui conteúdo interativo. Selecione
        &ldquo;Criação Procedimento&rdquo; para visualizar o formulário
        completo.
      </p>
    </div>
  );
}







