(() => {
  const workflows = [
    {
      id: "parceiros",
      area: "Cadastros",
      title: "Parceiros: clientes, transportadoras e fornecedores",
      icon: "♙",
      summary:
        "Cadastre uma pessoa ou empresa uma vez e habilite os papéis necessários.",
      refs: ["PARCEIROS", "PARCEIROS_ENDERECOS", "PARCEIROS_FORNECEDORES"],
      steps: [
        [
          "Abra o cadastro de parceiros",
          "No ERP, procure Cadastros → Parceiros (o nome do menu pode variar). Escolha Novo e pesquise CPF/CNPJ antes de incluir para evitar duplicidade.",
        ],
        [
          "Informe os dados básicos",
          "Preencha tipo pessoa, CPF/CNPJ, nome/razão social, nome fantasia, situação e contatos. Use dados reais e autorizados; valide a inscrição com o responsável fiscal.",
        ],
        [
          "Cadastre endereço e contatos",
          "Inclua endereço principal, município/UF, CEP, telefone e e-mail. Marque corretamente cobrança, entrega ou ambos quando o sistema oferecer essas opções.",
        ],
        [
          "Habilite o tipo de parceiro",
          "Marque Cliente, Fornecedor e/ou Transportadora conforme a atividade. Um mesmo parceiro pode ter mais de um papel; informe dados bancários e condição de pagamento só quando necessários.",
        ],
        [
          "Salve e faça uma conferência",
          "Reabra o cadastro e confirme documento, endereço e papéis. Não use um parceiro genérico para movimentações reais sem autorização.",
        ],
      ],
    },
    {
      id: "produtos",
      area: "Cadastros",
      title: "Produto cadastrado manualmente (sem XML)",
      icon: "▦",
      summary:
        "Inclua um item no catálogo preenchendo dados fiscais e comerciais manualmente.",
      refs: ["PRODUTOS", "PRODUTOS_CLAS", "AGRUPAMENTOS", "MARCAS"],
      warning:
        "NCM, origem, CST/CSOSN, CFOP e tributação dependem do produto, estado e regime fiscal. Confirme com a contabilidade antes de emitir documentos.",
      steps: [
        [
          "Abra Produtos e escolha Novo",
          "Use o código interno conforme o padrão da empresa. O XML não é necessário para criar o cadastro, mas a origem dos dados deve ser confiável.",
        ],
        [
          "Preencha identificação e unidade",
          "Informe descrição clara, unidade de compra e venda, fator de conversão se houver, código de barras e situação. Evite reutilizar códigos.",
        ],
        [
          "Associe grupo e marca",
          "Selecione o agrupamento/subgrupo e a marca previamente cadastrados. Confira se o item será controlado por estoque, lote, série ou validade.",
        ],
        [
          "Complete custos, preços e tributação",
          "Informe custo inicial quando conhecido e revise os campos fiscais com a contabilidade. Não copie tributação de outro produto sem validar a classificação.",
        ],
        [
          "Salve e teste a pesquisa",
          "Localize o item pelo código, descrição e código de barras. Confira unidade, agrupamento, marca e preço antes de usar em venda ou compra.",
        ],
      ],
    },
    {
      id: "agrupamentos",
      area: "Cadastros",
      title: "Agrupamentos e subgrupos",
      icon: "▤",
      summary:
        "Organize produtos em níveis para pesquisa, relatórios e regras comerciais.",
      refs: ["AGRUPAMENTOS", "PRODUTOS"],
      steps: [
        [
          "Abra Agrupamentos",
          "Procure Cadastros → Produtos → Agrupamentos. Veja os níveis já existentes antes de criar outro grupo.",
        ],
        [
          "Crie o grupo principal",
          "Informe uma descrição padronizada e o nível inicial. Se houver hierarquia, selecione o grupo mestre/pai correto.",
        ],
        [
          "Inclua subgrupos",
          "Crie os níveis inferiores ligados ao pai. Evite duplicidades e não altere a hierarquia de um grupo já usado sem avaliar relatórios e preços.",
        ],
        [
          "Revise regras associadas",
          "Confira markup, comissão, estoque mínimo e demais parâmetros herdados. Aplique apenas regras aprovadas pela empresa.",
        ],
        [
          "Associe e teste",
          "Vincule um produto de teste e pesquise por grupo. Confirme que filtros e relatórios encontram o item no nível esperado.",
        ],
      ],
    },
    {
      id: "marcas",
      area: "Cadastros",
      title: "Cadastro de marcas",
      icon: "✳",
      summary: "Crie a marca antes de vincular produtos ou regras de preço.",
      refs: ["MARCAS", "PRODUTOS"],
      steps: [
        [
          "Abra Marcas",
          "Procure Cadastros → Produtos → Marcas e pesquise a descrição para não criar uma marca repetida.",
        ],
        [
          "Inclua a marca",
          "Informe nome padronizado, código externo se houver e situação ativa. Siga o padrão de maiúsculas e abreviações usado pela empresa.",
        ],
        [
          "Salve e valide",
          "Pesquise a marca cadastrada e confirme que ela aparece como opção no cadastro de produto e nas variações de preço.",
        ],
      ],
    },
    {
      id: "precos",
      area: "Cadastros",
      title: "Tabela de preços e variações",
      icon: "％",
      summary:
        "Monte três níveis de preço e ajuste por agrupamento, produto ou marca.",
      refs: [
        "TABELA_PRECOS",
        "PRECOS_TABELA",
        "PRECOS_VARIACAO",
        "AGRUPAMENTOS",
        "MARCAS",
      ],
      warning:
        "Percentuais abaixo são apenas um exemplo de markup sobre o custo: 10%, 25% e 40%. Markup não é margem líquida. Valide impostos, descontos e política comercial antes de publicar preços.",
      demo: "precos",
      steps: [
        [
          "Defina os três níveis",
          "Exemplo para treinamento: Econômico +10%, Padrão +25% e Especial +40% sobre o custo. Substitua pelos percentuais aprovados pela empresa.",
        ],
        [
          "Crie as tabelas",
          "Em Cadastros → Tabelas de preço, informe nome, vigência, filial/cliente permitido e política de arredondamento. Não deixe duas vigências conflitantes.",
        ],
        [
          "Cadastre variações",
          "Aplique a regra por agrupamento, marca ou produto conforme o recurso disponível. Defina uma prioridade explícita quando houver mais de uma regra.",
        ],
        [
          "Teste precedência e exceções",
          "Confira qual regra vence quando o produto pertence a grupo e marca com percentuais diferentes. Crie exceção por produto somente quando necessário.",
        ],
        [
          "Simule antes de liberar",
          "Use a calculadora abaixo como referência matemática. Compare vários itens, confirme margem final e teste a tabela em um orçamento não faturado.",
        ],
      ],
    },
    {
      id: "orcamentos",
      area: "Vendas",
      title: "Orçamentos",
      icon: "▧",
      summary:
        "Registre uma proposta comercial e acompanhe sua validade antes de converter.",
      refs: [
        "VENDAS_ORCAMENTOS",
        "VENDAS_ORCAMENTOS_ITENS",
        "PARCEIROS",
        "PRODUTOS",
      ],
      steps: [
        [
          "Abra Orçamentos e escolha Novo",
          "Selecione cliente, filial e vendedor. Confirme o endereço de entrega antes de incluir itens.",
        ],
        [
          "Inclua produtos e quantidades",
          "Confira unidade, preço aplicado, descontos permitidos, disponibilidade e impostos exibidos. Não ajuste preço fora da alçada autorizada.",
        ],
        [
          "Informe condição e validade",
          "Registre prazo de pagamento, validade da proposta, frete e observações. Deixe clara a data limite para o cliente.",
        ],
        [
          "Revise e salve como orçamento",
          "Confira totais e dados do cliente. Salvar orçamento não deve ser tratado como venda faturada.",
        ],
        [
          "Converta somente após aprovação",
          "Quando o cliente aprovar, use a ação de converter para pedido/venda se disponível. Revise novamente quantidades, preços e estoque.",
        ],
      ],
    },
    {
      id: "condicionais",
      area: "Vendas",
      title: "Venda condicional e devolução",
      icon: "⇄",
      summary:
        "Controle itens enviados para avaliação e a baixa dos itens não vendidos.",
      refs: [
        "CONDICIONAIS",
        "CONDICIONAIS_ENTREGAS",
        "CONDICIONAIS_DEVOLUCAO",
        "PRODUTOS",
        "PARCEIROS",
      ],
      warning:
        "A condicional não deve ser encerrada como venda até a confirmação do cliente. Confira prazo, estoque e documento de transporte conforme o procedimento da empresa.",
      steps: [
        [
          "Abra Condicionais e inicie uma operação",
          "Selecione cliente, responsável, data de saída e prazo de retorno. Confirme se o cliente e endereço estão corretos.",
        ],
        [
          "Inclua os itens entregues",
          "Registre cada produto e quantidade física. Confira disponibilidade e gere/imprima o comprovante apropriado, sem emitir venda definitiva antes da decisão.",
        ],
        [
          "Registre o retorno",
          "Conte os itens devolvidos e informe as quantidades por produto. Investigue diferenças antes de concluir.",
        ],
        [
          "Converta apenas o que foi vendido",
          "Use a opção de faturar/converter os itens aceitos pelo cliente. Confira preço e condição antes de confirmar.",
        ],
        [
          "Encerre e confira o estoque",
          "Confirme que o saldo retornado voltou ao estoque e que os itens vendidos aparecem uma única vez na venda.",
        ],
      ],
    },
    {
      id: "pedidos",
      area: "Vendas",
      title: "Pedidos de venda",
      icon: "▣",
      summary:
        "Transforme a solicitação aprovada em pedido e acompanhe separação e faturamento.",
      refs: [
        "PEDIDOS",
        "PEDIDOS_ITENS",
        "PEDIDOS_PARCELAS",
        "PARCEIROS",
        "PRODUTOS",
      ],
      steps: [
        [
          "Abra Pedidos e crie um pedido",
          "Selecione o cliente e, se aplicável, importe o orçamento aprovado. Verifique filial, vendedor e endereço.",
        ],
        [
          "Revise itens e condições",
          "Confira quantidade, tabela de preço, descontos, prazo e entrega. Confirme estoque e necessidade de reserva.",
        ],
        [
          "Salve e acompanhe o status",
          "Use o fluxo de aprovação/separação definido pela empresa. Não marque como faturado se a nota ou venda ainda não foi concluída.",
        ],
        [
          "Fature ou encerre",
          "Converta pelo comando do sistema depois da aprovação. Em cancelamento, use a rotina de cancelamento para liberar reservas e manter histórico.",
        ],
      ],
    },
    {
      id: "vendas",
      area: "Vendas",
      title: "Venda",
      icon: "＄",
      summary:
        "Registre a venda, recebimento e documento fiscal no fluxo correto.",
      refs: [
        "VENDAS",
        "VENDAS_ITENS",
        "FATURAS_RECEBER",
        "PARCEIROS",
        "PRODUTOS",
      ],
      warning:
        "Antes de emitir ou autorizar documento fiscal, confira série, ambiente, itens, tributação, destinatário e forma de pagamento. Emissão real tem efeitos fiscais.",
      steps: [
        [
          "Abra Vendas e inicie uma nova venda",
          "Escolha cliente, filial, vendedor e operação. Confirme se a venda é imediata ou se veio de orçamento/pedido.",
        ],
        [
          "Lance os itens",
          "Pesquise produto, informe quantidade e confira unidade, preço, desconto autorizado, estoque e tributação calculada.",
        ],
        [
          "Defina pagamento e entrega",
          "Informe condição, parcelas, recebimento, frete e endereço. Compare o total da venda com o total a receber.",
        ],
        [
          "Revise antes de confirmar",
          "Confira cliente, itens, valores e dados fiscais. Use pré-visualização ou rascunho, se disponível.",
        ],
        [
          "Conclua e confira os lançamentos",
          "Depois da autorização, valide documento, baixa de estoque e parcelas em contas a receber. Não repita a confirmação se a tela demorar.",
        ],
      ],
    },
    {
      id: "devolucao",
      area: "Vendas",
      title: "Devolução de venda",
      icon: "↩",
      summary:
        "Vincule a devolução à venda original e confira estoque e crédito ao cliente.",
      refs: ["VENDAS", "VENDAS_ITENS", "FATURAS_RECEBER", "PRODUTOS"],
      warning:
        "Devoluções fiscais dependem do documento original, prazo e legislação. Use a rotina própria e peça validação fiscal quando houver dúvida.",
      steps: [
        [
          "Localize a venda original",
          "Pesquise por número, cliente e data. Confirme os itens efetivamente vendidos e ainda elegíveis para devolução.",
        ],
        [
          "Informe itens, quantidades e motivo",
          "Registre apenas o que foi recebido de volta. Descreva o motivo e condição do produto.",
        ],
        [
          "Revise documento e financeiro",
          "Use o fluxo fiscal de devolução indicado pelo ERP/contador. Confira se o crédito ou estorno não duplica um pagamento já devolvido.",
        ],
        [
          "Confirme estoque e saldo",
          "Verifique destino do produto (estoque, avaria ou quarentena), parcelas/contas a receber e saldo do cliente.",
        ],
      ],
    },
    {
      id: "entrega-futura",
      area: "Vendas",
      title: "Entrega futura, retiradas e devoluções",
      icon: "⇧",
      summary:
        "Acompanhe o que já foi vendido, o que foi retirado e o saldo pendente de entrega.",
      refs: [
        "VENDAS",
        "VENDAS_ITENS",
        "ENTREGA_FUTURA_RETIRADA",
        "ENTREGA_FUTURA_DEV_RET",
        "PRODUTOS",
      ],
      warning:
        "A emissão fiscal de venda para entrega futura e das remessas/retornos deve seguir a orientação contábil. Este roteiro não emite documentos.",
      steps: [
        [
          "Registre a venda para entrega futura",
          "Use a operação específica, identifique cliente, produtos, quantidades, preço e local de entrega. Confira a regra fiscal antes de confirmar.",
        ],
        [
          "Registre cada retirada",
          "Na rotina de retirada, selecione a venda vinculada e informe produto, quantidade e data. O saldo pendente deve diminuir uma única vez.",
        ],
        [
          "Confira o saldo em aberto",
          "Compare quantidade vendida, total retirado e saldo a entregar. Resolva divergências antes de nova retirada.",
        ],
        [
          "Registre devolução de retirada",
          "Selecione a retirada original, informe quantidade devolvida e motivo. Confirme retorno ao estoque ou destino indicado.",
        ],
        [
          "Concilie o saldo final",
          "Confira documentos, estoque e quantidades restantes no pedido. Não encerre como entregue se ainda houver saldo.",
        ],
      ],
    },
    {
      id: "compras",
      area: "Compras",
      title: "Lançamento de nota de compra",
      icon: "▤",
      summary:
        "Registre a entrada com fornecedor, itens, custos e parcelas a pagar.",
      refs: [
        "COMPRAS",
        "COMPRAS_ITEM",
        "FATURAS_PAGAR",
        "PARCEIROS",
        "PRODUTOS",
      ],
      warning:
        "Não invente chave, valores ou impostos para completar uma entrada. Divergências com o documento devem ser resolvidas com o fornecedor e a área fiscal.",
      steps: [
        [
          "Abra Compras e selecione Entrada/Nota",
          "Escolha o fornecedor já cadastrado e informe número, série, datas e chave do documento conforme o original.",
        ],
        [
          "Inclua ou confira os itens",
          "Associe cada item do documento ao produto correto. Confira quantidade, unidade, custo, descontos, frete e impostos.",
        ],
        [
          "Revise totais e financeiro",
          "Compare os totais com a nota original, condição de pagamento e vencimentos. Confira se a duplicata não foi lançada anteriormente.",
        ],
        [
          "Confirme a entrada",
          "Só conclua após validação do documento e autorização interna. Confira atualização de estoque, custo e contas a pagar.",
        ],
      ],
    },
    {
      id: "frete",
      area: "Compras",
      title: "Rateio de frete na nota de compra",
      icon: "⇢",
      summary:
        "Distribua a fatura de frete entre uma ou mais notas de compra sem duplicar custos.",
      refs: [
        "FATURAS_PAGAR",
        "FATURAS_PAGAR_RATEIO_NF",
        "COMPRAS",
        "COMPRAS_ITEM",
      ],
      steps: [
        [
          "Lance a fatura do transportador",
          "Cadastre/seleciona a transportadora, documento, valor, vencimento e natureza da despesa. Confira se a fatura ainda não existe.",
        ],
        [
          "Abra o rateio por nota",
          "Selecione a fatura de frete e a(s) nota(s) de compra relacionadas. Use o critério adotado pela empresa, como valor, peso ou quantidade.",
        ],
        [
          "Confira a distribuição",
          "Verifique que a soma rateada é igual ao total distribuído e que não há nota ou item repetido.",
        ],
        [
          "Confirme e valide custo",
          "Conclua conforme a regra contábil e confira o vínculo com a compra e a conta a pagar. Evite lançar o mesmo frete novamente no custo do item.",
        ],
      ],
    },
    {
      id: "despesas",
      area: "Financeiro",
      title: "Despesa programada e faturas futuras",
      icon: "◷",
      summary:
        "Programe uma despesa recorrente e confira os vencimentos até 31/12/2028.",
      refs: [
        "DESPESAS_PREVISAO",
        "DESPESAS_PREVISTAS",
        "FATURAS_PAGAR",
        "PARCEIROS",
      ],
      warning:
        "A prévia abaixo só calcula datas neste navegador. Ela não cria faturas no ERP nem autoriza pagamento. Confira contrato, valor, recorrência e aprovação antes de gerar títulos reais.",
      demo: "recorrencia",
      steps: [
        [
          "Cadastre a natureza da despesa",
          "Escolha a categoria/conta contábil e o fornecedor/beneficiário. Use um centro de custo se a empresa exigir.",
        ],
        [
          "Programe a recorrência",
          "Informe descrição, valor, primeiro vencimento, frequência, forma de rateio e término em 31/12/2028. Confira se o último vencimento deve ser incluído.",
        ],
        [
          "Pré-visualize as ocorrências",
          "Compare as datas previstas e o total estimado. Ajuste feriados, reajustes e despesas variáveis conforme o contrato.",
        ],
        [
          "Gere títulos no sistema",
          "Use a rotina oficial de geração de despesas/faturas previstas, revisando o lote antes de confirmar. Este guia não envia comandos ao ERP.",
        ],
        [
          "Confira contas a pagar",
          "Pesquise os títulos gerados, fornecedor, valor e vencimento. Garanta que não foram gerados em duplicidade.",
        ],
      ],
    },
    {
      id: "adiantamentos",
      area: "Financeiro",
      title: "Lançamento de adiantamentos",
      icon: "＋",
      summary:
        "Registre um valor antecipado e acompanhe sua compensação posterior.",
      refs: [
        "PARCEIROS",
        "FATURAS_PAGAR",
        "FATURAS_RECEBER",
        "BANCOS_MOVIMENTO",
      ],
      steps: [
        [
          "Identifique o tipo de adiantamento",
          "Defina se é recebido de cliente ou pago a fornecedor/colaborador e selecione o parceiro correto.",
        ],
        [
          "Informe valor, data e conta",
          "Use o comprovante real, conta bancária/caixa, forma e histórico. Confira a autorização e não reutilize um lançamento existente.",
        ],
        [
          "Salve e confira o saldo",
          "Verifique se o valor aparece como adiantamento disponível, e não como receita/despesa definitiva sem a classificação correta.",
        ],
        [
          "Compense quando houver o documento",
          "Vincule o adiantamento à venda, compra ou fatura correspondente. Confirme o saldo restante e guarde o vínculo para auditoria.",
        ],
      ],
    },
    {
      id: "boletos",
      area: "Financeiro",
      title: "Boletos e arquivo de remessa",
      icon: "▱",
      summary:
        "Prepare cobranças a receber e gere arquivo no padrão bancário configurado.",
      refs: [
        "BOLETOS",
        "BOLETOS_FATURAS",
        "CONTAS_BANCARIAS",
        "FATURAS_RECEBER",
      ],
      warning:
        "Arquivo de remessa pode registrar cobranças no banco. Gere somente em ambiente e conta autorizados e valide o retorno bancário antes de dar baixa.",
      steps: [
        [
          "Configure a cobrança bancária",
          "Confirme banco, agência, conta, convênio, carteira, nosso número, beneficiário e padrão CNAB com o banco.",
        ],
        [
          "Selecione faturas a receber",
          "Confira cliente, documento, valor, vencimento, juros/multa permitidos e se a fatura não está paga ou em outra remessa.",
        ],
        [
          "Gere e revise a remessa",
          "Use o layout homologado pelo banco. Valide totais, quantidade de títulos, beneficiário e arquivo de saída antes do envio.",
        ],
        [
          "Envie pelo canal oficial e processe retorno",
          "Faça upload no canal bancário autorizado. Depois importe o retorno e confira rejeições, liquidações e tarifas antes de baixar faturas.",
        ],
      ],
    },
    {
      id: "financiamento",
      area: "Financeiro",
      title: "Financiamento bancário com juros",
      icon: "％",
      summary:
        "Registre a operação e valide a evolução do saldo e das parcelas.",
      refs: ["FATURAS_PAGAR", "BANCOS_MOVIMENTO", "CONTAS_BANCARIAS"],
      warning:
        "A taxa efetiva, sistema de amortização, IOF, tarifas e datas devem corresponder ao contrato bancário. Não use valores de exemplo em lançamentos reais.",
      steps: [
        [
          "Confira o contrato",
          "Separe principal, taxa, periodicidade, sistema de amortização, tarifas, IOF, carência e datas de vencimento.",
        ],
        [
          "Cadastre a instituição e operação",
          "Selecione o banco/financeira e identifique contrato, conta de crédito, data e valor líquido recebido.",
        ],
        [
          "Lance o cronograma",
          "Informe taxa e parcelas de acordo com o contrato. Confira juros e principal separadamente e valide o total com o demonstrativo do banco.",
        ],
        [
          "Concilie entrada e pagamentos",
          "Confirme o crédito recebido na conta e acompanhe cada parcela em contas a pagar. Investigue qualquer diferença antes de baixar.",
        ],
      ],
    },
    {
      id: "cheques",
      area: "Financeiro",
      title: "Emitir cheque e quitar fatura a pagar",
      icon: "▱",
      summary:
        "Vincule o cheque emitido à obrigação correta e acompanhe compensação.",
      refs: [
        "CHEQUES_EMITIDOS",
        "FATURAS_PAGAR",
        "BANCOS_MOVIMENTO",
        "CONTAS_BANCARIAS",
      ],
      warning:
        "A emissão e liquidação de cheque movimentam caixa/banco. Confira talão, titular, favorecido e saldo; nunca use números fictícios em operação real.",
      steps: [
        [
          "Localize a fatura aprovada",
          "Confira fornecedor, documento, saldo, vencimento e aprovação de pagamento. Verifique se não há pagamento parcial anterior.",
        ],
        [
          "Emita o cheque",
          "Selecione conta/talão e registre número, favorecido, valor, data e histórico exatamente como no cheque autorizado.",
        ],
        [
          "Associe o pagamento à fatura",
          "Na baixa da fatura, escolha pagamento por cheque e vincule o cheque emitido. Confira se o valor quitado corresponde ao saldo.",
        ],
        [
          "Acompanhe compensação ou cancelamento",
          "Concilie com o extrato. Se houver devolução ou cancelamento, use a rotina própria e reverta a baixa conforme autorização.",
        ],
      ],
    },
    {
      id: "conciliacao",
      area: "Financeiro",
      title: "Conciliação bancária e saldo-alvo próximo de R$ 10 mil",
      icon: "≈",
      summary:
        "Concilie o extrato com os lançamentos e identifique a diferença real do saldo.",
      refs: [
        "CONTAS_BANCARIAS",
        "BANCOS_MOVIMENTO",
        "BANCOS_SALDOS",
        "BANCOS_SALDOS_CONCILIADO",
      ],
      warning:
        "O saldo de R$ 10.000 é uma meta de conferência, não justificativa para criar lançamentos fictícios. Ajustes exigem comprovante e aprovação contábil.",
      steps: [
        [
          "Escolha a conta e o período",
          "Compare o saldo inicial e final do extrato oficial com o período no ERP.",
        ],
        [
          "Importe ou confira movimentos",
          "Use arquivo bancário ou lançamento autorizado. Verifique data, valor, histórico e identificador para evitar duplicidade.",
        ],
        [
          "Concilie cada movimento",
          "Associe créditos e débitos do extrato aos lançamentos correspondentes. Investigue taxas, transferências e itens pendentes.",
        ],
        [
          "Analise a diferença para a meta",
          "Compare saldo conciliado com R$ 10.000. Se estiver distante, identifique recebimentos/pagamentos legítimos previstos; não invente ajuste para alcançar o alvo.",
        ],
        [
          "Finalize e documente",
          "Confirme saldo final, pendências e responsável. Exporte ou salve o relatório de conciliação segundo a política da empresa.",
        ],
      ],
    },
    {
      id: "transferencia-bancaria",
      area: "Financeiro",
      title: "Transferência entre contas bancárias",
      icon: "⇄",
      summary:
        "Registre a saída e a entrada vinculadas na mesma transferência.",
      refs: ["BANCOS_TRANSFERENCIAS", "CONTAS_BANCARIAS", "BANCOS_MOVIMENTO"],
      steps: [
        [
          "Confirme origem e destino",
          "Selecione as duas contas próprias da empresa e confira saldo e titularidade.",
        ],
        [
          "Informe valor, data e histórico",
          "Use os dados do comprovante da transferência. Confira tarifas e data de compensação.",
        ],
        [
          "Registre a transferência vinculada",
          "Use a rotina de transferência entre contas para gerar débito e crédito relacionados; não lance os dois lados novamente à mão.",
        ],
        [
          "Concilie as duas contas",
          "Confira a saída na origem e a entrada no destino. A diferença deve corresponder somente a tarifa ou prazo de compensação documentado.",
        ],
      ],
    },
    {
      id: "transferencia-caixa",
      area: "Financeiro",
      title: "Transferência entre operadores de caixa",
      icon: "⇄",
      summary:
        "Transfira numerário entre caixas mantendo origem, destino e conferência.",
      refs: ["CAIXA_MOVTO", "OPERADORES", "BANCOS_MOVIMENTO"],
      steps: [
        [
          "Confira os caixas e operadores",
          "Verifique quem entrega e quem recebe, turno aberto, valor contado e autorização.",
        ],
        [
          "Registre a transferência",
          "Use a rotina própria de transferência entre operadores, com data, valor, origem, destino e comprovante/observação.",
        ],
        [
          "Confirme o recebimento",
          "O operador destinatário deve conferir o numerário e aceitar/confirmar o movimento conforme o sistema.",
        ],
        [
          "Revise os saldos",
          "Confira redução no caixa de origem e aumento no caixa de destino pelo mesmo valor. Resolva divergências antes do fechamento.",
        ],
      ],
    },
  ];

  const $ = (id) => document.getElementById(id);
  const stateKey = "gestao-guia-progresso-v1";
  const categories = ["Todas", ...new Set(workflows.map((w) => w.area))];
  let category = "Todas";
  let selected = workflows[0].id;
  let done = {};
  try {
    const stored = JSON.parse(localStorage.getItem(stateKey) || "{}");
    done =
      stored && typeof stored === "object" && !Array.isArray(stored)
        ? stored
        : {};
  } catch {
    done = {};
  }

  function updateProgress() {
    const total = workflows.reduce((sum, w) => sum + w.steps.length, 0);
    const checked = Object.values(done).filter(Boolean).length;
    const percent = total ? Math.round((checked / total) * 100) : 0;
    $("progressText").textContent = `${percent}%`;
    $("progressBar").style.width = `${percent}%`;
    $("progressDetail").textContent =
      `${checked} de ${total} etapas concluídas`;
    try {
      localStorage.setItem(stateKey, JSON.stringify(done));
    } catch {
      // O guia continua utilizável mesmo se o navegador bloquear armazenamento local.
    }
  }

  function renderFilters() {
    $("categoryFilters").innerHTML = categories
      .map(
        (name) =>
          `<button type="button" class="filter-chip ${category === name ? "selected" : ""}" data-category="${name}" aria-pressed="${category === name}">${name}</button>`,
      )
      .join("");
  }

  function visibleWorkflows() {
    const query = $("guideSearch").value.trim().toLocaleLowerCase("pt-BR");
    return workflows.filter((w) => {
      const inCategory = category === "Todas" || w.area === category;
      const haystack = [w.title, w.area, w.summary, ...w.steps.flat()]
        .join(" ")
        .toLocaleLowerCase("pt-BR");
      return inCategory && (!query || haystack.includes(query));
    });
  }

  function renderList(updateDetail = true) {
    const visible = visibleWorkflows();
    $("emptyList").hidden = visible.length > 0;
    $("workflowList").innerHTML = visible
      .map((w) => {
        const checked = w.steps.filter(
          (_, index) => done[`${w.id}:${index}`],
        ).length;
        return `<button type="button" class="workflow-item ${w.id === selected ? "active" : ""}" data-workflow="${w.id}" aria-current="${w.id === selected ? "page" : "false"}"><span class="workflow-icon">${w.icon}</span><span class="workflow-label"><strong>${w.title}</strong><small>${w.area} · ${checked}/${w.steps.length} etapas</small></span><span class="workflow-arrow" aria-hidden="true">›</span></button>`;
      })
      .join("");
    if (!visible.some((w) => w.id === selected) && visible.length)
      selected = visible[0].id;
    if (visible.length && updateDetail) renderDetail();
  }

  function referenceLinks(w) {
    const tables = window.DER?.tabelas || {};
    return w.refs
      .filter((name) => tables[name])
      .map(
        (name) =>
          `<a class="table-link" href="index.html?table=${encodeURIComponent(name)}" target="_blank" rel="noopener">${name}<span aria-hidden="true">↗</span></a>`,
      )
      .join("");
  }

  function renderDetail() {
    const w = workflows.find((item) => item.id === selected) || workflows[0];
    const checked = w.steps.filter(
      (_, index) => done[`${w.id}:${index}`],
    ).length;
    const references = referenceLinks(w);
    const warning = w.warning
      ? `<aside class="callout callout-warning"><strong>Atenção</strong><span>${w.warning}</span></aside>`
      : "";
    const steps = w.steps
      .map(([title, body], index) => {
        const key = `${w.id}:${index}`;
        return `<label class="step-card ${done[key] ? "completed" : ""}"><input type="checkbox" data-step="${key}" ${done[key] ? "checked" : ""}><span class="step-number">${String(index + 1).padStart(2, "0")}</span><span class="step-copy"><strong>${title}</strong><span>${body}</span></span><span class="step-check" aria-hidden="true">✓</span></label>`;
      })
      .join("");
    const demo =
      w.demo === "precos"
        ? priceDemo()
        : w.demo === "recorrencia"
          ? recurrenceDemo()
          : "";
    $("workflowDetail").innerHTML =
      `<div class="detail-heading"><div><p class="eyebrow">${w.area.toUpperCase()} · ROTEIRO ${String(workflows.indexOf(w) + 1).padStart(2, "0")}</p><h2>${w.icon} ${w.title}</h2><p class="detail-summary">${w.summary}</p></div><span class="completion-pill">${checked}/${w.steps.length} concluídas</span></div>${warning}${demo}<div class="steps-heading"><div><h3>Como executar</h3><p>Siga a ordem e marque cada etapa depois de conferir no sistema.</p></div></div><div class="steps">${steps}</div><section class="references"><div><h3>Onde isso aparece no banco</h3><p>Referências do modelo de dados — não são nomes garantidos de menus.</p></div><div class="table-links">${references || '<span class="muted">Nenhuma tabela correspondente identificada no arquivo de metadados.</span>'}</div></section>`;
    updatePriceDemo();
    const startInput = $("expenseStart");
    if (startInput) startInput.value = localDateValue(new Date());
  }

  function priceDemo() {
    return `<section class="demo-panel"><div class="demo-heading"><span class="demo-icon">％</span><div><h3>Simulador de preços</h3><p>Exemplo didático de markup sobre o custo. Não grava no ERP.</p></div></div><label class="demo-input">Custo do produto (R$)<input id="priceCost" type="number" min="0" step="0.01" value="100"></label><div id="priceResults" class="price-results"></div><p class="demo-footnote">Exemplo: preço = custo × (1 + markup). A margem real será menor após impostos, taxas e despesas.</p></section>`;
  }

  function recurrenceDemo() {
    return `<section class="demo-panel"><div class="demo-heading"><span class="demo-icon">◷</span><div><h3>Prévia de recorrência</h3><p>Calcula vencimentos mensais até 31/12/2028; nada é lançado no banco.</p></div></div><div class="demo-grid"><label class="demo-input">Valor por ocorrência (R$)<input id="expenseAmount" type="number" min="0" step="0.01" value="250"></label><label class="demo-input">Primeiro vencimento<input id="expenseStart" type="date"></label></div><button type="button" id="previewExpenses" class="button button-primary">Pré-visualizar vencimentos</button><div id="expenseResults" class="expense-results" aria-live="polite"></div></section>`;
  }

  function updatePriceDemo() {
    const input = $("priceCost");
    const result = $("priceResults");
    if (!input || !result) return;
    const cost = Math.max(0, Number(input.value) || 0);
    const tiers = [
      ["Econômico", 10],
      ["Padrão", 25],
      ["Especial", 40],
    ];
    result.innerHTML = tiers
      .map(
        ([name, rate]) =>
          `<div class="price-tier"><span>${name}<small>+${rate}%</small></span><strong>${(cost * (1 + rate / 100)).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong></div>`,
      )
      .join("");
  }

  function localDateValue(date) {
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }

  function previewExpenses() {
    const amount = Number($("expenseAmount").value);
    const startValue = $("expenseStart").value;
    const output = $("expenseResults");
    if (!Number.isFinite(amount) || amount <= 0 || !startValue) {
      output.innerHTML = `<p class="validation-message">Informe um valor maior que zero e uma data inicial válida.</p>`;
      return;
    }
    const start = new Date(`${startValue}T12:00:00`);
    const end = new Date("2028-12-31T12:00:00");
    const occurrences = [];
    for (let offset = 0; occurrences.length < 100; offset += 1) {
      const year = start.getFullYear();
      const month = start.getMonth() + offset;
      const lastDay = new Date(year, month + 1, 0).getDate();
      const date = new Date(
        year,
        month,
        Math.min(start.getDate(), lastDay),
        12,
      );
      if (date > end) break;
      occurrences.push(date);
    }
    if (!occurrences.length) {
      output.innerHTML = `<p class="validation-message">A data inicial precisa ser até 31/12/2028.</p>`;
      return;
    }
    const total = amount * occurrences.length;
    output.innerHTML = `<p class="preview-total"><strong>${occurrences.length} vencimentos</strong><span>Total estimado: ${total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span></p><div class="date-chips">${occurrences.map((d) => `<span>${d.toLocaleDateString("pt-BR")}</span>`).join("")}</div><p class="demo-footnote">Prévia local, sem geração de faturas. Ajuste vencimentos em fins de semana/feriados conforme a regra do contrato.</p>`;
  }

  $("categoryFilters").onclick = (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    category = button.dataset.category;
    renderFilters();
    renderList();
  };
  $("workflowList").onclick = (event) => {
    const button = event.target.closest("[data-workflow]");
    if (!button) return;
    selected = button.dataset.workflow;
    renderList();
  };
  $("guideSearch").addEventListener("input", renderList);
  $("workflowDetail").onchange = (event) => {
    const checkbox = event.target.closest("[data-step]");
    if (!checkbox) return;
    done[checkbox.dataset.step] = checkbox.checked;
    updateProgress();
    checkbox
      .closest(".step-card")
      .classList.toggle("completed", checkbox.checked);
    const w = workflows.find((item) => item.id === selected);
    const count = w.steps.filter((_, index) => done[`${w.id}:${index}`]).length;
    $("workflowDetail").querySelector(".completion-pill").textContent =
      `${count}/${w.steps.length} concluídas`;
    renderList(false);
  };
  $("workflowDetail").oninput = (event) => {
    if (event.target.id === "priceCost") updatePriceDemo();
  };
  $("workflowDetail").onclick = (event) => {
    if (event.target.closest("#previewExpenses")) previewExpenses();
  };
  $("resetProgress").onclick = () => {
    if (!window.confirm("Apagar todas as marcações deste navegador?")) return;
    done = {};
    updateProgress();
    renderList();
    renderDetail();
  };
  $("printGuide").onclick = () => window.print();

  renderFilters();
  updateProgress();
  renderList();
  renderDetail();
  updatePriceDemo();
  const today = new Date();
  const startInput = $("expenseStart");
  if (startInput) startInput.value = localDateValue(today);
})();
