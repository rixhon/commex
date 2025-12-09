import { createContext, useContext, useState, ReactNode } from "react";

type Language = "pt-BR" | "en-US";

type Translations = {
  [key: string]: {
    "pt-BR": string;
    "en-US": string;
  };
};

const translations: Translations = {
  // Menu items
  "menu.criacao-procedimento": {
    "pt-BR": "Criação Procedimento",
    "en-US": "Procedure Creation"
  },
  "menu.commex": {
    "pt-BR": "Commex",
    "en-US": "Commex"
  },
  "menu.cotacao": {
    "pt-BR": "Cotação",
    "en-US": "Quotation"
  },
  "menu.cotacao-validacao": {
    "pt-BR": "Validação Comercial",
    "en-US": "Commercial Validation"
  },
  "menu.cotacao-customer": {
    "pt-BR": "Customer Service",
    "en-US": "Customer Service"
  },
  "menu.cotacao-creco": {
    "pt-BR": "CRECO",
    "en-US": "CRECO"
  },
  "menu.pdf-cotacao": {
    "pt-BR": "PDF Cotação",
    "en-US": "PDF Quotation"
  },
  "menu.pricing": {
    "pt-BR": "Pricing",
    "en-US": "Pricing"
  },
  "menu.auditoria": {
    "pt-BR": "Auditoria",
    "en-US": "Audit"
  },
  "menu.auditoria-folha": {
    "pt-BR": "Folha de Sala",
    "en-US": "Operating Room Sheet"
  },
  "menu.licitacoes": {
    "pt-BR": "Licitações",
    "en-US": "Bids"
  },
  "menu.faturamento-servico": {
    "pt-BR": "Faturamento de Serviço",
    "en-US": "Service Billing"
  },
  "menu.agendamentos": {
    "pt-BR": "Agendamentos",
    "en-US": "Appointments"
  },
  "menu.mapa-cirurgico": {
    "pt-BR": "Mapa Cirúrgico",
    "en-US": "Surgical Map"
  },
  "menu.folha-sala": {
    "pt-BR": "Folha de Sala",
    "en-US": "Operating Room Sheet"
  },
  "menu.ordem-compra": {
    "pt-BR": "Ordem de Compra",
    "en-US": "Purchase Order"
  },
  "menu.faturamento": {
    "pt-BR": "Faturamento",
    "en-US": "Billing"
  },
  "menu.inb": {
    "pt-BR": "INB",
    "en-US": "INB"
  },
  // Common
  "common.voltar": {
    "pt-BR": "Voltar",
    "en-US": "Back"
  },
  "common.enviar": {
    "pt-BR": "Enviar",
    "en-US": "Send"
  },
  "common.finalizar": {
    "pt-BR": "Finalizar",
    "en-US": "Finalize"
  },
  "common.buscar": {
    "pt-BR": "Buscar",
    "en-US": "Search"
  },
  "common.validacao-comercial": {
    "pt-BR": "Validação Comercial",
    "en-US": "Commercial Validation"
  },
  "common.cotacao-ganha": {
    "pt-BR": "Cotação Ganha",
    "en-US": "Quotation Won"
  },
  "common.cotacao-reprovada": {
    "pt-BR": "Cotação Reprovada",
    "en-US": "Quotation Rejected"
  },
  "common.negociacao": {
    "pt-BR": "Negociação",
    "en-US": "Negotiation"
  },
  "common.pedido-negociacao": {
    "pt-BR": "Pedido de Negociação",
    "en-US": "Negotiation Request"
  },
  "common.negociacao-em-analise": {
    "pt-BR": "Negociação em Análise",
    "en-US": "Negotiation Under Analysis"
  },
  "common.salvar": {
    "pt-BR": "Salvar",
    "en-US": "Save"
  },
  "common.aprovar": {
    "pt-BR": "Aprovar",
    "en-US": "Approve"
  },
  "common.reprovar": {
    "pt-BR": "Reprovar",
    "en-US": "Reject"
  },
  "common.sim": {
    "pt-BR": "Sim",
    "en-US": "Yes"
  },
  "common.nao": {
    "pt-BR": "Não",
    "en-US": "No"
  },
  "common.pesquise-paciente": {
    "pt-BR": "Pesquise um Paciente",
    "en-US": "Search a Patient"
  },
  "common.filtrar": {
    "pt-BR": "Filtrar",
    "en-US": "Filter"
  },
  "common.paciente": {
    "pt-BR": "Paciente",
    "en-US": "Patient"
  },
  "common.acoes": {
    "pt-BR": "Ações",
    "en-US": "Actions"
  },
  "common.cotacao-em-analise": {
    "pt-BR": "Cotação em análise",
    "en-US": "Quotation under analysis"
  },
  "common.negociacao-reprovada": {
    "pt-BR": "Negociação Reprovada",
    "en-US": "Negotiation Rejected"
  },
  "common.reprovada": {
    "pt-BR": "Reprovada",
    "en-US": "Rejected"
  },
  "common.status": {
    "pt-BR": "Status",
    "en-US": "Status"
  },
  // Pages
  "page.pendente-liberacao": {
    "pt-BR": "Pendente de Liberação",
    "en-US": "Pending Release"
  },
  "page.pendente-faturamento": {
    "pt-BR": "Pendente de Faturamento",
    "en-US": "Pending Billing"
  },
  "page.faturados": {
    "pt-BR": "Faturados",
    "en-US": "Billed"
  },
  "page.liberacao": {
    "pt-BR": "Liberação",
    "en-US": "Release"
  },
  "page.liberacao-divergente": {
    "pt-BR": "Liberação Divergente",
    "en-US": "Divergent Release"
  },
  "page.negociacao": {
    "pt-BR": "Negociação",
    "en-US": "Negotiation"
  },
  "page.reprovada": {
    "pt-BR": "Reprovada",
    "en-US": "Rejected"
  },
  "page.commex": {
    "pt-BR": "COMMEX",
    "en-US": "COMMEX"
  },
  "page.negociacao-em-analise": {
    "pt-BR": "Negociação em Análise",
    "en-US": "Negotiation Under Analysis"
  },
  "page.saldo-pendente": {
    "pt-BR": "Saldo Pendente",
    "en-US": "Pending Balance"
  },
  "page.cotacao": {
    "pt-BR": "Cotação",
    "en-US": "Quotation"
  },
  "page.cotacao-pre": {
    "pt-BR": "Cotação Pré",
    "en-US": "Pre-Quotation"
  },
  "page.cotacao-pos": {
    "pt-BR": "Cotação Pós",
    "en-US": "Post-Quotation"
  },
  "page.ordem-compra": {
    "pt-BR": "Ordem de Compra",
    "en-US": "Purchase Order"
  },
  "page.faturamento": {
    "pt-BR": "Faturamento",
    "en-US": "Billing"
  },
  "page.faturamento-cs": {
    "pt-BR": "Faturamento | CS",
    "en-US": "Billing | CS"
  },
  "page.agendamentos": {
    "pt-BR": "Agendamentos",
    "en-US": "Appointments"
  },
  "page.pendente-agendamento": {
    "pt-BR": "Pendente de Agendamento",
    "en-US": "Pending Appointment"
  },
  "page.agendados": {
    "pt-BR": "Agendados",
    "en-US": "Scheduled"
  },
  "page.mapa-cirurgico": {
    "pt-BR": "Mapa Cirúrgico",
    "en-US": "Surgical Map"
  },
  "page.folha-sala": {
    "pt-BR": "Folha de Sala",
    "en-US": "Operating Room Sheet"
  },
  "page.folhas-de-sala": {
    "pt-BR": "Folhas de Sala",
    "en-US": "Room Sheets"
  },
  "page.industrias": {
    "pt-BR": "Indústrias",
    "en-US": "Industries"
  },
  "page.consignado": {
    "pt-BR": "Consignado",
    "en-US": "Consigned"
  },
  "page.industria": {
    "pt-BR": "Indústria",
    "en-US": "Industry"
  },
  "page.operador-logistico": {
    "pt-BR": "Operador Logístico",
    "en-US": "Logistics Operator"
  },
  "page.servicos": {
    "pt-BR": "Serviço(s)",
    "en-US": "Service(s)"
  },
  "page.adicione-idgen": {
    "pt-BR": "Adicione um ID Gen",
    "en-US": "Add an ID Gen"
  },
  "page.comentarios": {
    "pt-BR": "COMENTÁRIOS",
    "en-US": "COMMENTS"
  },
  "page.escreva-observacao": {
    "pt-BR": "Escreva qualquer observação necessária...",
    "en-US": "Write any necessary observation..."
  },
  "page.nenhum-documento-selecionado": {
    "pt-BR": "Nenhum documento selecionado",
    "en-US": "No document selected"
  },
  "page.fornecedor-treinamento": {
    "pt-BR": "Fornecedor Treinamento",
    "en-US": "Training Provider"
  },
  "page.mesmo-lote": {
    "pt-BR": "MESMO LOTE",
    "en-US": "SAME LOT"
  },
  "page.lote": {
    "pt-BR": "LOTE",
    "en-US": "LOT"
  },
  "page.digite-lote": {
    "pt-BR": "Digite o lote",
    "en-US": "Enter the lot"
  },
  "page.utilizado": {
    "pt-BR": "UTILIZADO",
    "en-US": "UTILIZED"
  },
  "page.reversa": {
    "pt-BR": "REVERSA",
    "en-US": "REVERSED"
  },
  "page.justificativa": {
    "pt-BR": "JUSTIFICATIVA",
    "en-US": "JUSTIFICATION"
  },
  "page.selecione-justificativas": {
    "pt-BR": "Selecione ou descreva as justificativas...",
    "en-US": "Select or describe the justifications..."
  },
  "page.auditoria-servicos": {
    "pt-BR": "Auditoria de Serviços",
    "en-US": "Service Audit"
  },
  "page.pendente-auditoria": {
    "pt-BR": "Pendente de Auditoria",
    "en-US": "Pending Audit"
  },
  "page.pendente-correcao": {
    "pt-BR": "Pendente de Correção",
    "en-US": "Pending Correction"
  },
  "page.licitacoes": {
    "pt-BR": "Licitações",
    "en-US": "Bids"
  },
  "page.tarefas": {
    "pt-BR": "Tarefas",
    "en-US": "Tasks"
  },
  // Buttons
  "button.ok": {
    "pt-BR": "OK",
    "en-US": "OK"
  },
  "button.finalizar": {
    "pt-BR": "Finalizar",
    "en-US": "Finalize"
  },
  "button.devolver-correcao": {
    "pt-BR": "Devolver para Correção",
    "en-US": "Return for Correction"
  },
  "button.pedido-correcao": {
    "pt-BR": "Pedido de Correção",
    "en-US": "Correction Request"
  },
  "button.salvar-relacao": {
    "pt-BR": "Salvar Relação",
    "en-US": "Save Relation"
  },
  "button.inserir-folha-sala": {
    "pt-BR": "INSERIR FOLHA DE SALA",
    "en-US": "INSERT ROOM SHEET"
  },
  "button.enviar-relacao": {
    "pt-BR": "ENVIAR RELAÇÃO",
    "en-US": "SEND REPORT"
  },
  "button.validacao-comercial": {
    "pt-BR": "Validação Comercial",
    "en-US": "Commercial Validation"
  },
  // Form fields
  "field.nome-paciente": {
    "pt-BR": "Nome do Paciente",
    "en-US": "Patient Name"
  },
  "field.email": {
    "pt-BR": "Email",
    "en-US": "Email"
  },
  "field.observacoes": {
    "pt-BR": "Observações",
    "en-US": "Observations"
  },
  "field.comentario": {
    "pt-BR": "Comentário",
    "en-US": "Comment"
  },
  "field.justificativa": {
    "pt-BR": "Justificativa",
    "en-US": "Justification"
  },
  "field.justificativa-placeholder": {
    "pt-BR": "Justificativa...",
    "en-US": "Justification..."
  },
  "field.total": {
    "pt-BR": "Total",
    "en-US": "Total"
  },
  // Table headers
  "table.produtos": {
    "pt-BR": "Produtos",
    "en-US": "Products"
  },
  "table.qtd": {
    "pt-BR": "QTD",
    "en-US": "QTY"
  },
  "table.preco-lista": {
    "pt-BR": "Preço Lista",
    "en-US": "List Price"
  },
  "table.preco-cotacao": {
    "pt-BR": "Preço Cotação",
    "en-US": "Quotation Price"
  },
  "table.total-cotacao": {
    "pt-BR": "Total Cotação",
    "en-US": "Total Quotation"
  },
  "table.serie-lote": {
    "pt-BR": "Serie/Lote",
    "en-US": "Serial/Batch"
  },
  // Form fields - extended
  "field.data-nascimento": {
    "pt-BR": "Data Nascimento",
    "en-US": "Date of Birth"
  },
  "field.cpf": {
    "pt-BR": "CPF",
    "en-US": "CPF"
  },
  "field.canal-cotacao": {
    "pt-BR": "Canal de Cotação",
    "en-US": "Quotation Channel"
  },
  "field.id-cotacao": {
    "pt-BR": "ID de Cotação",
    "en-US": "Quotation ID"
  },
  "field.tipo-cotacao": {
    "pt-BR": "Tipo de Cotação",
    "en-US": "Quotation Type"
  },
  "field.modelo-faturamento": {
    "pt-BR": "Modelo de Faturamento",
    "en-US": "Billing Model"
  },
  "field.divisao": {
    "pt-BR": "Divisão",
    "en-US": "Division"
  },
  "field.filial": {
    "pt-BR": "Filial",
    "en-US": "Branch"
  },
  "field.convenio": {
    "pt-BR": "Convênio",
    "en-US": "Agreement"
  },
  "field.vendedor": {
    "pt-BR": "Vendedor",
    "en-US": "Salesperson"
  },
  "field.data-prevista-cirurgia": {
    "pt-BR": "Data Prevista da Cirurgia",
    "en-US": "Expected Surgery Date"
  },
  "field.nome-contato": {
    "pt-BR": "Nome Contato",
    "en-US": "Contact Name"
  },
  "field.nome-medico": {
    "pt-BR": "Nome do Médico",
    "en-US": "Doctor Name"
  },
  "field.local": {
    "pt-BR": "Local",
    "en-US": "Location"
  },
  "field.procedimento": {
    "pt-BR": "Procedimento",
    "en-US": "Procedure"
  },
  "field.prazo-pagamento": {
    "pt-BR": "Prazo de Pagamento",
    "en-US": "Payment Term"
  },
  "field.validade": {
    "pt-BR": "Validade",
    "en-US": "Validity"
  },
  "field.prazo-entrega": {
    "pt-BR": "Prazo de Entrega",
    "en-US": "Delivery Term"
  },
  "field.mais-informacoes-cliente": {
    "pt-BR": "Mais Informações / Cliente",
    "en-US": "More Information / Client"
  },
  "field.mais-informacoes-interna": {
    "pt-BR": "Mais Informações / Interna",
    "en-US": "More Information / Internal"
  },
  "field.status": {
    "pt-BR": "Status",
    "en-US": "Status"
  },
  "field.cliente-bloqueado": {
    "pt-BR": "Cliente Bloqueado",
    "en-US": "Blocked Client"
  },
  "field.documentacao-necessaria": {
    "pt-BR": "Documentação Necessária",
    "en-US": "Required Documentation"
  },
  "field.cliente": {
    "pt-BR": "Cliente",
    "en-US": "Client"
  },
  "field.aviso-cliente": {
    "pt-BR": "Aviso ao Cliente",
    "en-US": "Notice to Client"
  },
  "field.vitale-hospitalar": {
    "pt-BR": "Vitale Hospitalar",
    "en-US": "Vitale Hospital"
  },
  "field.cadastro-inativo": {
    "pt-BR": "Cadastro Inativo",
    "en-US": "Inactive Registration"
  },
  "field.lista-preco": {
    "pt-BR": "lista de preço",
    "en-US": "price list"
  },
  "field.selecione-item-kits": {
    "pt-BR": "selecione o ítem/kits",
    "en-US": "select item/kits"
  },
  "field.relacao-produtos-kits": {
    "pt-BR": "RELAÇÃO DE PRODUTOS / KITS",
    "en-US": "PRODUCT / KITS RELATION"
  },
  "field.cotacao-pre": {
    "pt-BR": "COTAÇÃO PRÉ",
    "en-US": "PRE-QUOTATION"
  },
  "field.cotacao-pos": {
    "pt-BR": "COTAÇÃO PÓS",
    "en-US": "POST-QUOTATION"
  },
  "field.anexar-ordem-compra": {
    "pt-BR": "Anexar Ordem de compra",
    "en-US": "Attach Purchase Order"
  },
  "field.anexar-nota-fiscal": {
    "pt-BR": "Anexar Nota Fiscal",
    "en-US": "Attach Invoice"
  },
  // Modal titles
  "modal.canal-indireto": {
    "pt-BR": "Canal Indireto",
    "en-US": "Indirect Channel"
  },
  "modal.customer-service": {
    "pt-BR": "Customer Service",
    "en-US": "Customer Service"
  },
  "modal.creco": {
    "pt-BR": "CRECO",
    "en-US": "CRECO"
  },
  "modal.negativa-creco": {
    "pt-BR": "Negativa CRECO",
    "en-US": "CRECO Refusal"
  },
  // Additional buttons
  "button.reprovar": {
    "pt-BR": "Reprovar",
    "en-US": "Reject"
  },
  "button.aprovar": {
    "pt-BR": "Aprovar",
    "en-US": "Approve"
  },
  "button.justificativa": {
    "pt-BR": "Justificativa",
    "en-US": "Justification"
  },
  // Additional form fields
  "field.plano-saude": {
    "pt-BR": "Plano de Saúde",
    "en-US": "Health Plan"
  },
  "field.numero-solicitacao": {
    "pt-BR": "Número de Solicitação",
    "en-US": "Request Number"
  },
  "field.tipo-internacao": {
    "pt-BR": "Tipo de Internação",
    "en-US": "Hospitalization Type"
  },
  "field.crm": {
    "pt-BR": "CRM",
    "en-US": "CRM"
  },
  "field.hospital": {
    "pt-BR": "Hospital",
    "en-US": "Hospital"
  },
  "field.cidade": {
    "pt-BR": "Cidade",
    "en-US": "City"
  },
  "field.medico-solicitante": {
    "pt-BR": "Médico Solicitante",
    "en-US": "Requesting Physician"
  },
  "field.medico-assistente": {
    "pt-BR": "Médico Assistente",
    "en-US": "Attending Physician"
  },
  "field.medico-anestesista": {
    "pt-BR": "Médico Anestesista",
    "en-US": "Anesthesiologist"
  },
  "field.procedimento-solicitado": {
    "pt-BR": "Procedimento Solicitado",
    "en-US": "Requested Procedure"
  },
  "field.regiao-atendimento": {
    "pt-BR": "Região de Atendimento",
    "en-US": "Service Region"
  },
  "field.entre-com-plano-saude": {
    "pt-BR": "Entre com o plano de saúde...",
    "en-US": "Enter health plan..."
  },
  "field.entre-com-numero-solicitacao": {
    "pt-BR": "Entre com o número de solicitação...",
    "en-US": "Enter request number..."
  },
  "field.entre-com-tipo-internacao": {
    "pt-BR": "Entre com o tipo de internação...",
    "en-US": "Enter hospitalization type..."
  },
  "field.informe-crm": {
    "pt-BR": "Informe o CRM",
    "en-US": "Enter CRM"
  },
  "field.informe-hospital": {
    "pt-BR": "Informe o hospital",
    "en-US": "Enter hospital"
  },
  "field.informe-cidade": {
    "pt-BR": "Informe a cidade",
    "en-US": "Enter city"
  },
  "field.informe-convenio": {
    "pt-BR": "Informe o convênio",
    "en-US": "Enter agreement"
  },
  "field.informe-medico-solicitante": {
    "pt-BR": "Informe o médico solicitante",
    "en-US": "Enter requesting physician"
  },
  "field.informe-medico-assistente": {
    "pt-BR": "Informe o médico assistente",
    "en-US": "Enter attending physician"
  },
  "field.informe-medico-anestesista": {
    "pt-BR": "Informe o médico anestesista",
    "en-US": "Enter anesthesiologist"
  },
  "field.informe-local": {
    "pt-BR": "Informe o local",
    "en-US": "Enter location"
  },
  "field.selecione-procedimento": {
    "pt-BR": "Selecione o procedimento",
    "en-US": "Select procedure"
  },
  "field.selecione-tipo-pagamento": {
    "pt-BR": "Selecione o tipo de pagamento",
    "en-US": "Select payment type"
  },
  "field.informe-validade": {
    "pt-BR": "Informe a validade",
    "en-US": "Enter validity"
  },
  "field.selecione-regiao-atendimento": {
    "pt-BR": "Selecione a região de atendimento",
    "en-US": "Select service region"
  },
  "field.informe-observacoes": {
    "pt-BR": "Informe as observações",
    "en-US": "Enter observations"
  },
  // Additional page-specific translations
  "page.validacao-comercial": {
    "pt-BR": "Validação Comercial",
    "en-US": "Commercial Validation"
  },
  "page.ordem-compra-anexar": {
    "pt-BR": "Ordem de Compra",
    "en-US": "Purchase Order"
  },
  "page.criacao-procedimento-lista": {
    "pt-BR": "Criação Procedimento Lista",
    "en-US": "Procedure Creation List"
  },
  "page.cotacao-autorizacao": {
    "pt-BR": "Cotação / Autorização",
    "en-US": "Quotation / Authorization"
  },
  "page.cirurgias-hoje": {
    "pt-BR": "Cirurgias Hoje",
    "en-US": "Surgeries Today"
  },
  "page.liberacao-divergente-tooltip": {
    "pt-BR": "Liberação divergente",
    "en-US": "Divergent release"
  },
  "page.saldo-pendente-tooltip": {
    "pt-BR": "Saldo Pendente",
    "en-US": "Pending Balance"
  },
  // Table headers and labels
  "table.codigo": {
    "pt-BR": "Código",
    "en-US": "Code"
  },
  "table.descricao": {
    "pt-BR": "Descrição",
    "en-US": "Description"
  },
  "table.quantidade": {
    "pt-BR": "Quantidade",
    "en-US": "Quantity"
  },
  "table.valor-unitario": {
    "pt-BR": "Valor Unitário",
    "en-US": "Unit Value"
  },
  "table.anvisa": {
    "pt-BR": "ANVISA",
    "en-US": "ANVISA"
  },
  "table.total": {
    "pt-BR": "Total",
    "en-US": "Total"
  },
  // Buttons and actions
  "button.baixar": {
    "pt-BR": "Baixar",
    "en-US": "Download"
  },
  "button.compartilhar": {
    "pt-BR": "Compartilhar",
    "en-US": "Share"
  },
  "button.anexar": {
    "pt-BR": "Anexar",
    "en-US": "Attach"
  },
  "button.remover": {
    "pt-BR": "Remover",
    "en-US": "Remove"
  },
  // Months
  "month.janeiro": {
    "pt-BR": "Janeiro",
    "en-US": "January"
  },
  "month.fevereiro": {
    "pt-BR": "Fevereiro",
    "en-US": "February"
  },
  "month.marco": {
    "pt-BR": "Março",
    "en-US": "March"
  },
  "month.abril": {
    "pt-BR": "Abril",
    "en-US": "April"
  },
  "month.maio": {
    "pt-BR": "Maio",
    "en-US": "May"
  },
  "month.junho": {
    "pt-BR": "Junho",
    "en-US": "June"
  },
  "month.julho": {
    "pt-BR": "Julho",
    "en-US": "July"
  },
  "month.agosto": {
    "pt-BR": "Agosto",
    "en-US": "August"
  },
  "month.setembro": {
    "pt-BR": "Setembro",
    "en-US": "September"
  },
  "month.outubro": {
    "pt-BR": "Outubro",
    "en-US": "October"
  },
  "month.novembro": {
    "pt-BR": "Novembro",
    "en-US": "November"
  },
  "month.dezembro": {
    "pt-BR": "Dezembro",
    "en-US": "December"
  },
  // Licitacoes menu items
  "licitacoes.vigentes": {
    "pt-BR": "Vigentes",
    "en-US": "Active"
  },
  "licitacoes.adesoes": {
    "pt-BR": "Adesões",
    "en-US": "Adhesions"
  },
  "licitacoes.vencidas-antigas": {
    "pt-BR": "Vencidas Antigas",
    "en-US": "Old Expired"
  },
  "licitacoes.vencidas": {
    "pt-BR": "Vencidas",
    "en-US": "Expired"
  },
  "licitacoes.validacao": {
    "pt-BR": "Validação",
    "en-US": "Validation"
  },
  "licitacoes.formulario": {
    "pt-BR": "Formulário",
    "en-US": "Form"
  },
  "licitacoes.suporte": {
    "pt-BR": "Suporte",
    "en-US": "Support"
  },
  "licitacoes.cadastro-cliente": {
    "pt-BR": "Cadastro Cliente",
    "en-US": "Client Registration"
  },
  "licitacoes.tabelas-preco": {
    "pt-BR": "Tabelas Preço",
    "en-US": "Price Tables"
  },
  "licitacoes.lista-preco": {
    "pt-BR": "Lista Preço",
    "en-US": "Price List"
  },
  "licitacoes.cadastro-produto": {
    "pt-BR": "Cadastro Produto",
    "en-US": "Product Registration"
  },
  "licitacoes.licit": {
    "pt-BR": "Licit",
    "en-US": "Licit"
  },
  "licitacoes.endereco-entrega": {
    "pt-BR": "Endereço de Entrega",
    "en-US": "Delivery Address"
  },
  "licitacoes.regulares": {
    "pt-BR": "Regulares",
    "en-US": "Regular"
  },
  // Cotacao page fields
  "field.data": {
    "pt-BR": "Data",
    "en-US": "Date"
  },
  "field.numero-cotacao": {
    "pt-BR": "Número da Cotação",
    "en-US": "Quotation Number"
  },
  "field.numero-versao-cotacao": {
    "pt-BR": "Número da Versão da Cotação",
    "en-US": "Quotation Version Number"
  },
  "field.cnpj": {
    "pt-BR": "CNPJ",
    "en-US": "CNPJ"
  },
  "field.ac": {
    "pt-BR": "A/C",
    "en-US": "Attn"
  },
  "field.medico": {
    "pt-BR": "Médico",
    "en-US": "Doctor"
  },
  "field.data-prevista-cirurgia-cotacao": {
    "pt-BR": "Data Prevista Cirurgia",
    "en-US": "Expected Surgery Date"
  },
  "field.item": {
    "pt-BR": "Item",
    "en-US": "Item"
  },
  "field.valor-unitario": {
    "pt-BR": "Valor Unitário",
    "en-US": "Unit Value"
  },
  "field.valor-total": {
    "pt-BR": "Valor Total",
    "en-US": "Total Value"
  },
  "field.total-geral": {
    "pt-BR": "Total Geral",
    "en-US": "Grand Total"
  },
  "field.adicionar-item": {
    "pt-BR": "Adicionar item",
    "en-US": "Add item"
  },
  "field.remover-item": {
    "pt-BR": "Remover item",
    "en-US": "Remove item"
  },
  "field.condicoes-fornecimento": {
    "pt-BR": "Condições de Fornecimento",
    "en-US": "Supply Conditions"
  },
  "field.validade-proposta": {
    "pt-BR": "Validade da Proposta",
    "en-US": "Proposal Validity"
  },
  // Modal Cotacao Pre/Pos
  "modal.cotacao-pre": {
    "pt-BR": "Cotação Pré",
    "en-US": "Pre-Quotation"
  },
  "modal.cotacao-pos": {
    "pt-BR": "Cotação Pós",
    "en-US": "Post-Quotation"
  },
  "field.excluir-produto": {
    "pt-BR": "Excluir produto",
    "en-US": "Delete product"
  },
  "field.fechar-modal": {
    "pt-BR": "Fechar modal",
    "en-US": "Close modal"
  }
};

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt-BR");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

