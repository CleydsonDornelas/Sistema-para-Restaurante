// ==================== CONFIGURAÇÃO INICIAL E DADOS PADRÃO ====================
const MAPA_CORES = { 
    'laranja': { c1: '#ea1d2c', c2: '#ff3e4d' }, 
    'vermelho': { c1: '#dc2626', c2: '#f87171' }, 
    'verde': { c1: '#16a34a', c2: '#4ade80' }, 
    'preto': { c1: '#0f172a', c2: '#334155' }, 
    'azul': { c1: '#2563eb', c2: '#60a5fa' } 
};

const PRODUTOS_PADRAO = {
    'Hamburgueria': [
        { id: 1, nome: "Combo Smash Duplo", preco: 38.90, custo: 15.00, descricao: "2 Hambúrgueres de 90g, queijo cheddar, batata rústica média e refri lata.", pausado: false, categoria: "Combos", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500", tipo: "combo" },
        { id: 2, nome: "Smash Burger Clássico", preco: 22.00, custo: 8.50, descricao: "Pão brioche selado na manteiga, carne 90g, queijo prato derretido e maionese.", pausado: false, categoria: "Lanches", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", tipo: "padrao" },
        { id: 3, nome: "X-Bacon Crocante Premium", preco: 26.50, custo: 10.00, descricao: "Pão artesanal, hambúrguer blend 150g, bacon crocantes e cheddar cremoso.", pausado: false, categoria: "Lanches", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500", tipo: "padrao" },
        { id: 4, nome: "Batata Rústica", preco: 18.00, custo: 5.00, descricao: "Porção de 300g de batata rústica, temperada com páprica doce e alecrim.", pausado: false, categoria: "Porções", img: "https://images.unsplash.com/photo-1630384060421-a431e4cad84f?w=500", tipo: "padrao" },
        { id: 5, nome: "Milkshake de Morango", preco: 15.90, custo: 6.00, descricao: "Feito com sorvete artesanal de creme e pedaços de morango. 400ml.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500", tipo: "padrao" },
        { id: 6, nome: "Refrigerante Lata", preco: 6.00, custo: 2.50, descricao: "Lata 350ml bem gelada.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500", tipo: "padrao" }
    ],
    'Pizzaria': [ 
        { id: 10, nome: "Combo Família", preco: 89.90, custo: 35.00, descricao: "1 Pizza G + 1 Pizza Doce M + Refri 2L.", pausado: false, categoria: "Combos", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", tipo: "combo" },
        { id: 11, nome: "Pizza Calabresa", preco: 45.00, custo: 18.00, descricao: "Molho de tomate, mussarela, calabresa fatiada e cebola.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500", tipo: "padrao" },
        { id: 12, nome: "Pizza 4 Queijos", preco: 48.00, custo: 20.00, descricao: "Mussarela, provolone, parmesão e catupiry original.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1574071318500-d0d972de8e3e?w=500", tipo: "padrao" },
        { id: 13, nome: "Pizza Portuguesa", preco: 46.00, custo: 19.00, descricao: "Presunto, ovos, ervilha, cebola, azeitona e mussarela.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500", tipo: "padrao" }
    ],
    'Restaurante': [
        { id: 20, nome: "Prato Feito - Carne", preco: 25.00, custo: 10.00, descricao: "Arroz, feijão, bife, batata frita e salada.", pausado: false, categoria: "Almoço", img: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=500", tipo: "padrao" },
        { id: 21, nome: "Filé de Frango", preco: 22.00, custo: 8.00, descricao: "Arroz, feijão, filé de frango e purê de batata.", pausado: false, categoria: "Almoço", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500", tipo: "padrao" },
        { id: 22, nome: "Feijoada Completa", preco: 35.00, custo: 15.00, descricao: "Acompanha arroz, couve, farofa, torresmo e laranja.", pausado: false, categoria: "Especiais", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500", tipo: "padrao" }
    ]
};

const IMG_DEFAULT = "https://placehold.co/400x400?text=Sem+Foto";

// Variáveis Globais
let restaurantes = []; 
let userLogado = null; 
let carrinhoPDV = []; 
let tipoVendaAtual = ''; 
let idMesaAtual = 0; 
let metodoPagamento = ''; 
let carrinhoCliente = [];

// Configurações Globais do SaaS
let configSaaS = {
    nomePlataforma: "GastroSys PRO",
    emailSuporte: "suporte@gastrosys.com",
    devNome: "",
    devNomeLink: "",
    githubUrl: "",
    modoManutencao: false,
    bloqueioCadastros: false,
    despesasSaaS: [] 
};

function getImg(url) { 
    return (url && url.length > 10) ? url : IMG_DEFAULT; 
}

// Verifica se a validade (timestamp) de um item já passou
function isExpirado(produto) {
    if (!produto.validade) return false;
    return Date.now() > produto.validade;
}

// ==================== INICIALIZAÇÃO E OBSERVER ====================
function iniciarSistema() {
    carregarDB();
    
    // Inicia o Observer em Tempo Real para a Tela de Manutenção (A cada 2 segundos)
    setInterval(verificarManutencaoEmTempoReal, 2000);
    verificarManutencaoEmTempoReal(); 

    const params = new URLSearchParams(window.location.search);
    const loginLoja = params.get('loja');
    
    if (loginLoja) {
        const loja = restaurantes.find(r => r.login === loginLoja);
        if (loja) {
            userLogado = loja;
            if(document.getElementById('login-parceiro-wrap')) {
                document.getElementById('login-parceiro-wrap').classList.add('hidden');
            }
            if(document.getElementById('app-parceiro')) {
                document.getElementById('app-parceiro').classList.add('hidden');
            }
            abrirCardapioMobile(true);
        } else {
            alert("Restaurante não encontrado.");
            if(document.getElementById('login-parceiro-wrap')) {
                document.getElementById('login-parceiro-wrap').classList.remove('hidden');
            }
        }
    } else {
        if(document.getElementById('login-parceiro-wrap')) {
            document.getElementById('login-parceiro-wrap').classList.remove('hidden');
        }
    }
    
    atualizarFooterGlobal();
}

function verificarManutencaoEmTempoReal() {
    const dadosConfig = localStorage.getItem('GastroDB_Config_V54') || localStorage.getItem('GastroDB_Config_V53');
    let manuStatus = false;
    if(dadosConfig) {
        const confObj = JSON.parse(dadosConfig);
        manuStatus = confObj.modoManutencao || false;
    }

    const telaManutencao = document.getElementById('tela-manutencao');
    const appParceiro = document.getElementById('app-parceiro');
    const loginWrap = document.getElementById('login-parceiro-wrap');
    const ifoodWrap = document.getElementById('mobile-overlay');

    if(!telaManutencao) return; 

    if (manuStatus) {
        telaManutencao.classList.remove('hidden');
        if(appParceiro) appParceiro.classList.add('hidden');
        if(loginWrap) loginWrap.classList.add('hidden');
        if(ifoodWrap) ifoodWrap.classList.add('hidden');
    } else {
        telaManutencao.classList.add('hidden');
    }
}

function carregarDB() { 
    const dados = localStorage.getItem('GastroDB_V54') || localStorage.getItem('GastroDB_V53') || localStorage.getItem('GastroDB_V52'); 
    
    if (dados) { 
        restaurantes = JSON.parse(dados); 
        restaurantes.forEach(r => {
            if(r.isAberto === undefined) r.isAberto = true;
            if(r.taxaCredito === undefined) r.taxaCredito = 0;
            if(r.taxaDebito === undefined) r.taxaDebito = 0;
            if(r.mensalidade === undefined) r.mensalidade = 0;
            if(r.despesas === undefined) r.despesas = []; 
            if(r.donoNome === undefined) r.donoNome = ""; 
            if(r.donoNumero === undefined) r.donoNumero = ""; 
        });
    } else { 
        restaurantes = [{ 
            id: 1, 
            nome: "Hamburgueria Premium", 
            donoNome: "João Silva",
            donoNumero: "(11) 99999-9999",
            ramo: "Hamburgueria", 
            login: "demo", 
            senha: "123", 
            logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", 
            cor1: "#ea1d2c", 
            cor2: "#ff3e4d", 
            isAberto: true, 
            taxaCredito: 0, 
            taxaDebito: 0,
            mensalidade: 149.90, 
            produtos: JSON.parse(JSON.stringify(PRODUTOS_PADRAO['Hamburgueria'])), 
            mesas: Array.from({length: 8}, (_,i) => ({id: i+1, status: 'livre', pedidos: []})), 
            pedidosAbertos: [], 
            vendas: [],
            despesas: [] 
        }]; 
    } 
    
    const dadosConfig = localStorage.getItem('GastroDB_Config_V54') || localStorage.getItem('GastroDB_Config_V53');
    if(dadosConfig) {
        configSaaS = JSON.parse(dadosConfig);
        if(configSaaS.modoManutencao === undefined) configSaaS.modoManutencao = false;
        if(configSaaS.bloqueioCadastros === undefined) configSaaS.bloqueioCadastros = false;
        if(configSaaS.despesasSaaS === undefined) configSaaS.despesasSaaS = [];
        if(configSaaS.devNome === undefined) configSaaS.devNome = "";
        if(configSaaS.devNomeLink === undefined) configSaaS.devNomeLink = "";
    }
    
    salvarDB(); 
}

function salvarDB() { 
    localStorage.setItem('GastroDB_V54', JSON.stringify(restaurantes)); 
    localStorage.setItem('GastroDB_Config_V54', JSON.stringify(configSaaS));
}

function atualizarFooterGlobal() {
    const ano = new Date().getFullYear();
    const url = configSaaS.githubUrl;
    
    const desenvolvedor = configSaaS.devNome ? configSaaS.devNome : "mim";
    const textoLink = configSaaS.devNomeLink ? configSaaS.devNomeLink : `Desenvolvido por ${desenvolvedor}`;
    
    const htmlRodape = `
        <span>&copy; ${ano} ${configSaaS.nomePlataforma}. Todos os direitos reservados.</span>
        ${url ? `<br><a href="${url}" target="_blank" style="display:inline-flex; align-items:center; gap:5px; margin-top:8px;"><i class="fa-brands fa-github"></i> ${textoLink}</a>` : ''}
    `;
    
    const footerSys = document.getElementById('sys-footer');
    if(footerSys) {
        footerSys.innerHTML = htmlRodape;
        footerSys.classList.remove('hidden');
    }
    
    const footerAdm = document.getElementById('adm-footer');
    if(footerAdm) {
        footerAdm.innerHTML = htmlRodape;
        footerAdm.classList.remove('hidden');
    }
    
    const menuNome = document.getElementById('nome-plataforma-menu');
    if(menuNome) {
        menuNome.innerHTML = `${configSaaS.nomePlataforma}`;
    }
}

// ==================== PAINEL MASTER (ADMIN) ====================
function loginMaster(e) { 
    e.preventDefault(); 
    if(document.getElementById('master-user').value === 'admin') { 
        document.getElementById('login-admin-wrap').classList.add('hidden'); 
        document.getElementById('painel-master').classList.remove('hidden'); 
        adminNav('lojas'); 
        atualizarFooterGlobal();
    } else { 
        alert("Chave incorreta."); 
    } 
}

function adminNav(viewName) {
    document.querySelectorAll('.admin-menu li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`menu-adm-${viewName}`)) {
        document.getElementById(`menu-adm-${viewName}`).classList.add('active');
    }

    document.getElementById('view-adm-lojas').classList.add('hidden');
    document.getElementById('view-adm-financeiro').classList.add('hidden');
    document.getElementById('view-adm-relatorios').classList.add('hidden');
    document.getElementById('view-adm-config').classList.add('hidden');

    document.getElementById(`view-adm-${viewName}`).classList.remove('hidden');

    if(viewName === 'lojas') {
        renderGridClientes();
    } else if(viewName === 'financeiro') {
        renderAdminFinanceiro();
    } else if(viewName === 'relatorios') {
        renderAdminRelatorios();
    } else if(viewName === 'config') {
        document.getElementById('config-nome').value = configSaaS.nomePlataforma || "";
        document.getElementById('config-email').value = configSaaS.emailSuporte || "";
        document.getElementById('config-dev-nome').value = configSaaS.devNome || "";
        document.getElementById('config-dev-link-nome').value = configSaaS.devNomeLink || "";
        document.getElementById('config-github').value = configSaaS.githubUrl || "";
        
        document.getElementById('config-manutencao').checked = configSaaS.modoManutencao || false;
        document.getElementById('config-bloqueio').checked = configSaaS.bloqueioCadastros || false;
    }
}

function salvarConfigAdmin() {
    configSaaS.nomePlataforma = document.getElementById('config-nome').value || "GastroSys PRO";
    configSaaS.emailSuporte = document.getElementById('config-email').value;
    configSaaS.devNome = document.getElementById('config-dev-nome').value;
    configSaaS.devNomeLink = document.getElementById('config-dev-link-nome').value;
    configSaaS.githubUrl = document.getElementById('config-github').value;
    configSaaS.modoManutencao = document.getElementById('config-manutencao').checked;
    configSaaS.bloqueioCadastros = document.getElementById('config-bloqueio').checked;
    
    salvarDB();
    atualizarFooterGlobal();
    alert("Configurações da Plataforma atualizadas com sucesso!");
}

function renderGridClientes() { 
    const grid = document.getElementById('grid-clientes'); 
    if(!grid) return; 
    
    if(document.getElementById('total-lojas-adm')) {
        document.getElementById('total-lojas-adm').innerText = restaurantes.length;
    }

    grid.innerHTML = restaurantes.map(r => `
        <tr>
            <td><img src="${getImg(r.logo)}" class="cell-logo"></td>
            <td>
                <strong style="font-size:1.1rem;">${r.nome}</strong><br>
                <small style="color:#78716c">ID: ${r.id} | Dono: ${r.donoNome || 'Não Informado'}</small>
            </td>
            <td><span class="badge badge-orange">${r.ramo}</span></td>
            <td><strong style="color:#10b981;">R$ ${(r.mensalidade || 0).toFixed(2)}</strong></td>
            <td><b>${r.login}</b></td>
            <td class="admin-actions-cell">
                <button class="btn-action" style="background:#3b82f6;" onclick="editarCliente(${r.id})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-action" style="background:#ef4444;" onclick="editarCliente(${r.id}); setTimeout(excluirClienteAtual, 200)">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join(''); 
}

function renderAdminFinanceiro() {
    let mrrTotal = 0;
    
    const htmlTabela = restaurantes.map(r => {
        const val = parseFloat(r.mensalidade || 0);
        mrrTotal += val;
        return `
            <tr>
                <td><strong>${r.nome}</strong></td>
                <td>R$ ${val.toFixed(2)} / mês</td>
            </tr>
        `;
    }).join('');

    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();
    let despesasTotal = 0;

    const despesasMes = (configSaaS.despesasSaaS || []).filter(d => {
        const dataD = new Date(d.data);
        return dataD.getMonth() === mesAtual && dataD.getFullYear() === anoAtual;
    });

    const htmlDespesas = despesasMes.map(d => {
        despesasTotal += d.valor;
        return `
            <tr>
                <td><strong>${d.descricao}</strong></td>
                <td>${d.categoria}</td>
                <td style="color:#ef4444; font-weight:bold;">- R$ ${d.valor.toFixed(2)}</td>
                <td>
                    <button class="btn-action" style="background:#ef4444; width:28px; height:28px;" onclick="excluirDespesaAdmin(${d.id})">
                        <i class="fa-solid fa-trash" style="font-size:0.8rem;"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join('');

    const lucroLiquidoSaaS = mrrTotal - despesasTotal;

    document.getElementById('adm-mrr-total').innerText = `R$ ${mrrTotal.toFixed(2)}`;
    document.getElementById('adm-custos-total').innerText = `- R$ ${despesasTotal.toFixed(2)}`;
    document.getElementById('adm-lucro-total').innerText = `R$ ${lucroLiquidoSaaS.toFixed(2)}`;
    
    document.getElementById('adm-total-pagantes').innerText = restaurantes.length;
    
    document.getElementById('grid-financeiro-saas').innerHTML = htmlTabela || '<tr><td colspan="2" style="text-align:center; color:#78716c;">Nenhum cliente ativo.</td></tr>';
    document.getElementById('grid-despesas-saas').innerHTML = htmlDespesas || '<tr><td colspan="4" style="text-align:center; color:#78716c;">Nenhum custo lançado este mês.</td></tr>';
}

function abrirModalDespesaAdmin() {
    document.getElementById('modal-despesa-admin').classList.remove('hidden');
    document.getElementById('admin-desp-valor').value = "";
    document.getElementById('admin-desp-desc').value = "";
}

function fecharModalDespesaAdmin() {
    document.getElementById('modal-despesa-admin').classList.add('hidden');
}

function salvarDespesaAdmin(e) {
    e.preventDefault();
    const categoria = document.getElementById('admin-desp-cat').value;
    const valor = parseFloat(document.getElementById('admin-desp-valor').value);
    let descricao = document.getElementById('admin-desp-desc').value.trim();
    
    if(!descricao) descricao = `Despesa: ${categoria}`;

    if(!configSaaS.despesasSaaS) configSaaS.despesasSaaS = [];
    
    configSaaS.despesasSaaS.push({
        id: Date.now(),
        categoria: categoria,
        descricao: descricao,
        valor: valor,
        data: new Date().toISOString()
    });
    
    salvarDB();
    fecharModalDespesaAdmin();
    renderAdminFinanceiro();
}

function excluirDespesaAdmin(idDespesa) {
    if(confirm("Remover este custo de infraestrutura do relatório?")) {
        configSaaS.despesasSaaS = configSaaS.despesasSaaS.filter(d => d.id !== idDespesa);
        salvarDB();
        renderAdminFinanceiro();
    }
}

function renderAdminRelatorios() {
    let gmvGlobal = 0;
    let totalPedidosGlobal = 0;

    restaurantes.forEach(r => {
        if(r.vendas) {
            totalPedidosGlobal += r.vendas.length;
            r.vendas.forEach(v => {
                gmvGlobal += v.total;
            });
        }
    });

    document.getElementById('adm-gmv-total').innerText = `R$ ${gmvGlobal.toFixed(2)}`;
    document.getElementById('adm-pedidos-total').innerText = totalPedidosGlobal;
}

function abrirModalCliente() { 
    document.getElementById('modal-cliente').classList.remove('hidden'); 
    document.getElementById('cli-id').value = ""; 
    document.getElementById('cli-dono-nome').value = ""; 
    document.getElementById('cli-dono-numero').value = ""; 
    document.getElementById('cli-nome').value = ""; 
    document.getElementById('cli-login').value = ""; 
    document.getElementById('cli-pass').value = ""; 
    document.getElementById('cli-logo').value = ""; 
    document.getElementById('cli-mensalidade').value = ""; 
    document.getElementById('modal-titulo').innerText = "Novo Estabelecimento"; 
    document.getElementById('btn-excluir-conta').classList.add('hidden'); 
}

function fecharModalCliente() { 
    document.getElementById('modal-cliente').classList.add('hidden'); 
}

function editarCliente(id) { 
    const r = restaurantes.find(x => x.id == id); 
    if(!r) return; 
    
    document.getElementById('cli-id').value = r.id; 
    document.getElementById('cli-dono-nome').value = r.donoNome || ""; 
    document.getElementById('cli-dono-numero').value = r.donoNumero || ""; 
    document.getElementById('cli-nome').value = r.nome; 
    document.getElementById('cli-ramo').value = r.ramo; 
    document.getElementById('cli-logo').value = r.logo; 
    document.getElementById('cli-login').value = r.login; 
    document.getElementById('cli-pass').value = r.senha; 
    document.getElementById('cli-mensalidade').value = r.mensalidade || 0; 
    
    document.getElementById('modal-titulo').innerText = "Editar Estabelecimento"; 
    document.getElementById('modal-cliente').classList.remove('hidden'); 
    document.getElementById('btn-excluir-conta').classList.remove('hidden'); 
}

function salvarCliente(e) { 
    e.preventDefault(); 
    
    const id = document.getElementById('cli-id').value; 
    const ramo = document.getElementById('cli-ramo').value; 
    const corSelecionada = document.getElementById('cli-cor-tema').value;
    const cores = MAPA_CORES[corSelecionada] || MAPA_CORES['laranja']; 
    const valorMensalidade = parseFloat(document.getElementById('cli-mensalidade').value) || 0;
    
    const dados = { 
        donoNome: document.getElementById('cli-dono-nome').value,
        donoNumero: document.getElementById('cli-dono-numero').value,
        nome: document.getElementById('cli-nome').value, 
        ramo: ramo, 
        logo: document.getElementById('cli-logo').value, 
        cor1: cores.c1, 
        cor2: cores.c2, 
        login: document.getElementById('cli-login').value, 
        senha: document.getElementById('cli-pass').value,
        mensalidade: valorMensalidade
    }; 
    
    if(id) { 
        const idx = restaurantes.findIndex(r => r.id == id); 
        if(idx !== -1) {
            restaurantes[idx] = { ...restaurantes[idx], ...dados }; 
        }
    } else { 
        restaurantes.push({ 
            id: Date.now(), 
            ...dados, 
            isAberto: true, 
            taxaCredito: 0, 
            taxaDebito: 0,  
            produtos: JSON.parse(JSON.stringify(PRODUTOS_PADRAO[ramo] || [])), 
            mesas: Array.from({length: 8}, (_, i) => ({id: i+1, status: 'livre', pedidos: []})), 
            pedidosAbertos: [], 
            vendas: [],
            despesas: [] 
        }); 
    } 
    
    salvarDB(); 
    fecharModalCliente(); 
    renderGridClientes(); 
}

function excluirClienteAtual() { 
    if(confirm("Deseja realmente apagar este estabelecimento?")) { 
        const idCliente = document.getElementById('cli-id').value;
        restaurantes = restaurantes.filter(r => r.id != idCliente); 
        salvarDB(); 
        fecharModalCliente(); 
        renderGridClientes(); 
    } 
}

// ==================== APP PARCEIRO (LOGIN E NAVEGAÇÃO) ====================
function loginParceiro(e) { 
    e.preventDefault(); 
    carregarDB(); 
    
    if(configSaaS.modoManutencao) {
        return; 
    }

    const user = document.getElementById('parceiro-user').value;
    const pass = document.getElementById('parceiro-pass').value;
    
    const r = restaurantes.find(x => x.login === user && x.senha === pass); 
    
    if(r) { 
        userLogado = r; 
        document.getElementById('login-parceiro-wrap').classList.add('hidden'); 
        document.getElementById('app-parceiro').classList.remove('hidden'); 
        document.getElementById('sys-nome-rest').innerText = r.nome; 
        
        atualizarUIStatusLoja(); 
        nav('dash'); 
    } else { 
        alert("Usuário ou senha incorretos."); 
    } 
}

function logout() { 
    window.location.href = window.location.pathname; 
}

function toggleMenuExtra() { 
    document.getElementById('extra-menu-mob').classList.toggle('active'); 
}

function toggleStatusLoja() {
    userLogado.isAberto = !userLogado.isAberto;
    salvarDB();
    atualizarUIStatusLoja();
}

function atualizarUIStatusLoja() {
    const dotDesk = document.getElementById('status-indicator-desk');
    const textDesk = document.getElementById('status-text-desk');
    const dotMob = document.getElementById('status-indicator-mob');
    const textMob = document.getElementById('status-text-mob');
    
    if(!dotDesk || !dotMob) return;

    if(userLogado.isAberto) {
        dotDesk.className = 'status-dot aberto';
        textDesk.innerText = "Aberto para Pedidos";
        dotMob.className = 'status-dot aberto';
        textMob.innerText = "Aberto";
    } else {
        dotDesk.className = 'status-dot fechado';
        textDesk.innerText = "Loja Fechada";
        dotMob.className = 'status-dot fechado';
        textMob.innerText = "Fechado";
    }
}

function nav(page) {
    if(document.getElementById('extra-menu-mob')) {
        document.getElementById('extra-menu-mob').classList.remove('active');
    }
    
    const content = document.getElementById('content-area'); 
    const header = document.getElementById('header-actions'); 
    header.innerHTML = "";
    
    const titulos = { 
        'dash': 'Visão Geral', 
        'caixa': 'Frente de Caixa', 
        'prods': 'Gerenciar Produtos', 
        'historico': 'Histórico', 
        'financeiro': 'Financeiro' 
    };
    
    document.getElementById('page-title').innerText = titulos[page]; 
    if(document.getElementById('page-title-mob')) {
        document.getElementById('page-title-mob').innerText = titulos[page];
    }
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active')); 
    if(document.getElementById(`nav-${page}`)) {
        document.getElementById(`nav-${page}`).classList.add('active');
    }
    
    if(page === 'dash') {
        const vendas = userLogado.vendas || []; 
        let totalFaturamento = 0;
        let custoTotal = 0; 
        
        const pM = { pix: 0, dinheiro: 0, credito: 0, debito: 0 }; 
        
        vendas.forEach(v => { 
            totalFaturamento += v.total;
            if (pM[v.metodo] !== undefined) pM[v.metodo] += v.total;
            
            if(v.itens) {
                v.itens.forEach(i => custoTotal += (i.custo || 0) * i.qtd); 
            }
        });
        
        const pctPix = totalFaturamento > 0 ? ((pM.pix / totalFaturamento) * 100).toFixed(1) : 0;
        const pctDinheiro = totalFaturamento > 0 ? ((pM.dinheiro / totalFaturamento) * 100).toFixed(1) : 0;
        const pctCredito = totalFaturamento > 0 ? ((pM.credito / totalFaturamento) * 100).toFixed(1) : 0;
        const pctDebito = totalFaturamento > 0 ? ((pM.debito / totalFaturamento) * 100).toFixed(1) : 0;
        
        const lucroEstimado = totalFaturamento - custoTotal;
        const ticketMedio = vendas.length > 0 ? (totalFaturamento / vendas.length).toFixed(2) : '0.00';
        const pedidosAbertosCount = (userLogado.pedidosAbertos || []).length;
        const mesasOcupadasCount = (userLogado.mesas || []).filter(m => m.status === 'ocupada').length;
        
        content.innerHTML = `
            <div class="kpi-grid" style="margin-bottom: 30px;">
                <div class="card-minimal">
                    <div class="card-icon-box icon-green"><i class="fa-solid fa-sack-dollar"></i></div>
                    <div class="card-info"><h4>Faturamento Bruto</h4><strong>R$ ${totalFaturamento.toFixed(2)}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#fef08a; color:#ca8a04"><i class="fa-solid fa-chart-line"></i></div>
                    <div class="card-info"><h4>Lucro Estimado</h4><strong>R$ ${lucroEstimado.toFixed(2)}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box icon-blue"><i class="fa-solid fa-cash-register"></i></div>
                    <div class="card-info"><h4>Vendas Realizadas</h4><strong>${vendas.length}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box icon-orange"><i class="fa-solid fa-receipt"></i></div>
                    <div class="card-info"><h4>Ticket Médio</h4><strong>R$ ${ticketMedio}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#fee2e2; color:#ef4444"><i class="fa-solid fa-clock"></i></div>
                    <div class="card-info"><h4>Pedidos Pendentes</h4><strong>${pedidosAbertosCount}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#e0e7ff; color:#4f46e5"><i class="fa-solid fa-chair"></i></div>
                    <div class="card-info"><h4>Mesas Ocupadas</h4><strong>${mesasOcupadasCount}</strong></div>
                </div>
            </div>
            
            <h3 style="margin-bottom: 15px; color: var(--text-muted)">Distribuição de Vendas (Porcentagem)</h3>
            <div class="kpi-grid">
                <div class="card-minimal">
                    <div style="width:100%">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span style="font-weight:600; color:#0284c7"><i class="fa-brands fa-pix"></i> Pix</span>
                            <strong>${pctPix}%</strong>
                        </div>
                        <div class="progress-bg"><div class="progress-fill" style="width:${pctPix}%; background:#0ea5e9;"></div></div>
                    </div>
                </div>
                <div class="card-minimal">
                    <div style="width:100%">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span style="font-weight:600; color:#16a34a"><i class="fa-solid fa-money-bill-wave"></i> Dinheiro</span>
                            <strong>${pctDinheiro}%</strong>
                        </div>
                        <div class="progress-bg"><div class="progress-fill" style="width:${pctDinheiro}%; background:#22c55e;"></div></div>
                    </div>
                </div>
                <div class="card-minimal">
                    <div style="width:100%">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span style="font-weight:600; color:#ca8a04"><i class="fa-solid fa-credit-card"></i> Crédito</span>
                            <strong>${pctCredito}%</strong>
                        </div>
                        <div class="progress-bg"><div class="progress-fill" style="width:${pctCredito}%; background:#eab308;"></div></div>
                    </div>
                </div>
                <div class="card-minimal">
                    <div style="width:100%">
                        <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                            <span style="font-weight:600; color:#ea580c"><i class="fa-solid fa-credit-card"></i> Débito</span>
                            <strong>${pctDebito}%</strong>
                        </div>
                        <div class="progress-bg"><div class="progress-fill" style="width:${pctDebito}%; background:#f97316;"></div></div>
                    </div>
                </div>
            </div>`;
            
    } else if(page === 'financeiro') {
        const vendas = userLogado.vendas; 
        const total = vendas.reduce((a, v) => a + v.total, 0); 
        const pM = { pix: 0, dinheiro: 0, credito: 0, debito: 0 }; 
        
        vendas.forEach(v => { 
            if (pM[v.metodo] !== undefined) {
                pM[v.metodo] += v.total; 
            }
        });
        
        const taxaCredito = userLogado.taxaCredito || 0;
        const taxaDebito = userLogado.taxaDebito || 0;
        
        const descontoCredito = pM.credito * (taxaCredito / 100);
        const descontoDebito = pM.debito * (taxaDebito / 100);
        const totalTaxas = descontoCredito + descontoDebito;
        
        const mesAtual = new Date().getMonth();
        const anoAtual = new Date().getFullYear();
        let totalDespesasMes = 0;
        
        (userLogado.despesas || []).forEach(d => {
            const dataD = new Date(d.data);
            if(dataD.getMonth() === mesAtual && dataD.getFullYear() === anoAtual) {
                totalDespesasMes += d.valor;
            }
        });
        
        const faturamentoLiquido = total - totalTaxas - totalDespesasMes;

        header.innerHTML = `
            <div class="btn-group">
                <button class="btn-success" onclick="abrirModalDespesas()">
                    <i class="fa-solid fa-file-invoice-dollar"></i> Lançar Despesa
                </button>
                <button class="btn-warning" onclick="abrirModalTaxas()">
                    <i class="fa-solid fa-percent"></i> Configurar Taxas
                </button>
            </div>
        `;

        content.innerHTML = `
            <div class="kpi-grid" style="margin-bottom: 30px;">
                <div class="card-minimal" style="border-color: var(--success);">
                    <div class="card-icon-box icon-green"><i class="fa-solid fa-sack-dollar"></i></div>
                    <div class="card-info">
                        <h4>Faturamento Bruto</h4>
                        <strong style="font-size: 1.8rem; color: var(--success)">R$ ${total.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="card-minimal" style="border-color: var(--danger);">
                    <div class="card-icon-box" style="background:#fee2e2; color:#ef4444"><i class="fa-solid fa-hand-holding-dollar"></i></div>
                    <div class="card-info">
                        <h4>Taxas Maquininha</h4>
                        <strong style="font-size: 1.8rem; color: var(--danger)">- R$ ${totalTaxas.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="card-minimal" style="border-color: var(--danger);">
                    <div class="card-icon-box" style="background:#fee2e2; color:#b91c1c"><i class="fa-solid fa-money-bill-transfer"></i></div>
                    <div class="card-info">
                        <h4>Despesas do Mês</h4>
                        <strong style="font-size: 1.8rem; color: #b91c1c">- R$ ${totalDespesasMes.toFixed(2)}</strong>
                    </div>
                </div>
                <div class="card-minimal" style="border-color: var(--primary);">
                    <div class="card-icon-box icon-blue"><i class="fa-solid fa-piggy-bank"></i></div>
                    <div class="card-info">
                        <h4>Líquido em Caixa</h4>
                        <strong style="font-size: 1.8rem; color: var(--primary)">R$ ${faturamentoLiquido.toFixed(2)}</strong>
                    </div>
                </div>
            </div>
            
            <h3 style="margin-bottom: 15px; color: var(--text-muted)">Receitas por Forma de Pagamento (Bruto)</h3>
            <div class="kpi-grid">
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#e0f2fe; color:#0284c7"><i class="fa-brands fa-pix"></i></div>
                    <div class="card-info"><h4>Pix</h4><strong>R$ ${pM.pix.toFixed(2)}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#dcfce7; color:#16a34a"><i class="fa-solid fa-money-bill-wave"></i></div>
                    <div class="card-info"><h4>Dinheiro</h4><strong>R$ ${pM.dinheiro.toFixed(2)}</strong></div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#fef08a; color:#ca8a04"><i class="fa-solid fa-credit-card"></i></div>
                    <div class="card-info">
                        <h4>Crédito</h4>
                        <strong>R$ ${pM.credito.toFixed(2)}</strong>
                        <div style="font-size:0.75rem; color:var(--danger); margin-top:3px;">Desconto da Taxa: -R$ ${descontoCredito.toFixed(2)}</div>
                    </div>
                </div>
                <div class="card-minimal">
                    <div class="card-icon-box" style="background:#ffedd5; color:#ea580c"><i class="fa-solid fa-credit-card"></i></div>
                    <div class="card-info">
                        <h4>Débito</h4>
                        <strong>R$ ${pM.debito.toFixed(2)}</strong>
                        <div style="font-size:0.75rem; color:var(--danger); margin-top:3px;">Desconto da Taxa: -R$ ${descontoDebito.toFixed(2)}</div>
                    </div>
                </div>
            </div>`;
            
    } else if(page === 'historico') {
        header.innerHTML = `
            <input type="text" class="search-bar" placeholder="Buscar nas vendas..." onkeyup="renderHistorico(this.value)">
        `; 
        renderHistorico();
        
    } else if(page === 'prods') {
        header.innerHTML = `
            <div class="header-actions-container">
                <div class="btn-group">
                    <button class="btn-primary" onclick="abrirModalProduto()">
                        <i class="fa-solid fa-plus"></i> Novo Item
                    </button>
                    <button class="btn-warning" onclick="abrirModalPromo()">
                        <i class="fa-solid fa-tag"></i> Promo
                    </button>
                    <button class="btn-purple" onclick="abrirModalCombo()">
                        <i class="fa-solid fa-burger"></i> Combo
                    </button>
                </div>
                <input type="text" class="search-bar" placeholder="🔍 Buscar produto..." onkeyup="renderProdutosLista(this.value)">
            </div>
        `; 
        renderProdutosLista();
        
    } else if(page === 'caixa') {
        
        let htmlPedidosAbertos = '';
        if(!userLogado.pedidosAbertos || userLogado.pedidosAbertos.length === 0) {
            htmlPedidosAbertos = '<div style="color:#aaa;">Nenhum pedido pendente no momento.</div>';
        } else {
            htmlPedidosAbertos = userLogado.pedidosAbertos.map((p, idx) => `
                <div class="pedido-card" onclick="abrirPDV('${p.tipo}', ${idx})">
                    <div class="pedido-info">
                        <h4>${p.cliente || 'Sem Nome'}</h4>
                        <span>${p.tipo.toUpperCase()}</span>
                    </div>
                    <div class="pedido-total">R$ ${p.total.toFixed(2)}</div>
                </div>
            `).join('');
        }

        let htmlMesas = userLogado.mesas.map(m => `
            <div class="mesa-card ${m.status}" onclick="abrirPDV('mesa', ${m.id})">
                <i class="fa-solid fa-chair"></i> Mesa ${m.id}
            </div>
        `).join('');
        
        content.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                <div class="new-order-btn" onclick="abrirPDV('balcao', null)">
                    <i class="fa-solid fa-store"></i><span>BALCÃO</span>
                </div>
                <div class="new-order-btn" onclick="abrirPDV('delivery', null)">
                    <i class="fa-solid fa-motorcycle"></i><span>DELIVERY</span>
                </div>
            </div>
            
            <div class="caixa-section-title"><i class="fa-solid fa-chair"></i> Mesas</div>
            <div class="mesas-grid">
                ${htmlMesas}
            </div>
            
            <div class="caixa-section-title" style="margin-top:30px;"><i class="fa-solid fa-clipboard-list"></i> Pedidos Pendentes</div>
            <div class="kpi-grid" id="lista-pedidos-abertos">
                ${htmlPedidosAbertos}
            </div>
        `;
    }
}

// ==================== GESTÃO DE DESPESAS DO PARCEIRO ====================
function abrirModalDespesas() {
    document.getElementById('modal-despesas').classList.remove('hidden');
    renderListaDespesas();
}

function fecharModalDespesas() {
    document.getElementById('modal-despesas').classList.add('hidden');
}

function salvarDespesa(e) {
    e.preventDefault();
    const categoria = document.getElementById('desp-cat').value;
    const valor = parseFloat(document.getElementById('desp-valor').value);
    let descricao = document.getElementById('desp-desc').value.trim();
    
    if(!descricao) {
        descricao = `Gasto: ${categoria}`;
    }

    if(!userLogado.despesas) userLogado.despesas = [];
    
    userLogado.despesas.push({
        id: Date.now(),
        categoria: categoria,
        descricao: descricao,
        valor: valor,
        data: new Date().toISOString()
    });
    
    salvarDB();
    renderListaDespesas();
    
    document.getElementById('desp-valor').value = "";
    document.getElementById('desp-desc').value = "";
    
    nav('financeiro'); 
}

function excluirDespesa(idDespesa) {
    if(confirm("Remover esta despesa?")) {
        userLogado.despesas = userLogado.despesas.filter(d => d.id !== idDespesa);
        salvarDB();
        renderListaDespesas();
        nav('financeiro');
    }
}

function renderListaDespesas() {
    const listaHtml = document.getElementById('lista-despesas-mes');
    const mesAtual = new Date().getMonth();
    const anoAtual = new Date().getFullYear();

    const despesasMes = (userLogado.despesas || []).filter(d => {
        const dataD = new Date(d.data);
        return dataD.getMonth() === mesAtual && dataD.getFullYear() === anoAtual;
    });

    if(despesasMes.length === 0) {
        listaHtml.innerHTML = '<div style="text-align:center; padding:15px; color:#aaa;">Nenhuma despesa lançada neste mês.</div>';
        return;
    }

    despesasMes.sort((a,b) => b.id - a.id);

    listaHtml.innerHTML = despesasMes.map(d => `
        <div class="despesa-item">
            <div>
                <strong style="display:block; font-size:0.95rem; color:var(--text-main);">${d.descricao}</strong>
                <span style="font-size:0.8rem; color:var(--text-muted);">${d.categoria}</span>
            </div>
            <div style="text-align:right;">
                <strong style="color:var(--danger); display:block;">R$ ${d.valor.toFixed(2)}</strong>
                <button onclick="excluirDespesa(${d.id})" style="background:none; border:none; color:var(--danger); cursor:pointer; font-size:0.8rem; margin-top:3px;">
                    <i class="fa-solid fa-trash"></i> Excluir
                </button>
            </div>
        </div>
    `).join('');
}

// ==================== MODAL DE TAXAS ====================
function abrirModalTaxas() {
    document.getElementById('input-taxa-credito').value = userLogado.taxaCredito || 0;
    document.getElementById('input-taxa-debito').value = userLogado.taxaDebito || 0;
    document.getElementById('modal-taxas').classList.remove('hidden');
}

function fecharModalTaxas() {
    document.getElementById('modal-taxas').classList.add('hidden');
}

function salvarTaxasCartao() {
    const tCredito = parseFloat(document.getElementById('input-taxa-credito').value) || 0;
    const tDebito = parseFloat(document.getElementById('input-taxa-debito').value) || 0;
    
    userLogado.taxaCredito = tCredito;
    userLogado.taxaDebito = tDebito;
    
    salvarDB();
    alert("Taxas salvas com sucesso!");
    fecharModalTaxas();
    nav('financeiro'); 
}

// ==================== GESTÃO DE PRODUTOS ====================
function renderProdutosLista(filtro = "") { 
    const listaFiltrada = userLogado.produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase())); 
    
    document.getElementById('content-area').innerHTML = `
        <div class="kpi-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
            ${listaFiltrada.map(p => {
                const isExp = isExpirado(p);
                const badgeHTML = p.pausado 
                    ? '<div class="badge-pausado">PAUSADO</div>' 
                    : (isExp ? '<div class="badge-pausado" style="background:#b91c1c;">EXPIRADO</div>' : '');
                
                const styleCard = (p.pausado || isExp) ? 'opacity: 0.7; filter: grayscale(50%);' : '';
                
                return `
                <div class="prod-card" style="${styleCard}">
                    ${badgeHTML}
                    <div style="position:relative; height:120px;">
                        <img src="${getImg(p.img)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${IMG_DEFAULT}'">
                        <div class="card-actions">
                            <button class="btn-action btn-edit" onclick="editarProduto(${p.id})">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button class="btn-action btn-del" onclick="excluirProduto(${p.id})">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div style="padding:10px;">
                        <span style="font-size:0.6rem; font-weight:700; color:var(--primary); background:#f0f9ff; padding:2px 6px; border-radius:4px;">
                            ${p.tipo.toUpperCase()}
                        </span>
                        <h4 style="margin:5px 0; font-size:0.9rem;">${p.nome}</h4>
                        <strong style="font-size:1rem;">R$ ${p.preco.toFixed(2)}</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">Custo: R$ ${(p.custo || 0).toFixed(2)}</div>
                    </div>
                </div>
            `}).join('')}
        </div>
    `; 
}

function abrirModalProduto() { 
    document.getElementById('modal-produto').classList.remove('hidden'); 
    document.getElementById('prod-id').value = ""; 
    document.getElementById('prod-nome').value = ""; 
    document.getElementById('prod-preco').value = ""; 
    document.getElementById('prod-custo').value = ""; 
    document.getElementById('prod-desc').value = ""; 
    document.getElementById('prod-pausado').checked = false; 
    document.getElementById('prod-cat').value = "Lanches"; 
    document.getElementById('prod-img').value = ""; 
    document.getElementById('prod-validade').value = "";
    document.getElementById('modal-prod-titulo').innerText = "Novo Produto"; 
}

function editarProduto(id) { 
    const p = userLogado.produtos.find(x => x.id === id); 
    if(!p) return; 
    
    document.getElementById('prod-id').value = p.id; 
    document.getElementById('prod-nome').value = p.nome; 
    document.getElementById('prod-preco').value = p.preco; 
    document.getElementById('prod-custo').value = p.custo || ""; 
    document.getElementById('prod-desc').value = p.descricao || ""; 
    document.getElementById('prod-pausado').checked = p.pausado || false; 
    document.getElementById('prod-cat').value = p.categoria; 
    document.getElementById('prod-img').value = p.img; 
    
    if(p.validade) {
        const d = new Date(p.validade);
        const tzOffset = d.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().slice(0,16);
        document.getElementById('prod-validade').value = localISOTime;
    } else {
        document.getElementById('prod-validade').value = "";
    }
    
    document.getElementById('modal-prod-titulo').innerText = "Editar Produto"; 
    document.getElementById('modal-produto').classList.remove('hidden'); 
}

function fecharModalProduto() { 
    document.getElementById('modal-produto').classList.add('hidden'); 
}

function salvarProduto(e) { 
    e.preventDefault(); 
    
    const id = document.getElementById('prod-id').value; 
    const valString = document.getElementById('prod-validade').value;
    const validadeTS = valString ? new Date(valString).getTime() : null;
    
    const dados = { 
        nome: document.getElementById('prod-nome').value, 
        preco: parseFloat(document.getElementById('prod-preco').value), 
        custo: parseFloat(document.getElementById('prod-custo').value || 0), 
        descricao: document.getElementById('prod-desc').value, 
        pausado: document.getElementById('prod-pausado').checked, 
        categoria: document.getElementById('prod-cat').value, 
        img: document.getElementById('prod-img').value, 
        validade: validadeTS,
        tipo: 'padrao' 
    }; 
    
    if(id) { 
        const idx = userLogado.produtos.findIndex(p => p.id == id); 
        if(idx !== -1) {
            userLogado.produtos[idx] = {...userLogado.produtos[idx], ...dados}; 
        }
    } else { 
        userLogado.produtos.push({id: Date.now(), ...dados}); 
    } 
    
    salvarDB(); 
    fecharModalProduto(); 
    nav('prods'); 
}

function excluirProduto(id) { 
    if(confirm("Deseja apagar este produto?")) { 
        userLogado.produtos = userLogado.produtos.filter(p => p.id !== id); 
        salvarDB(); 
        nav('prods'); 
    } 
}

// ==================== PROMOÇÕES E COMBOS ====================
function abrirModalPromo() { 
    document.getElementById('modal-promo').classList.remove('hidden'); 
    document.getElementById('promo-validade').value = "";
    
    const gridItems = document.getElementById('grid-promo-items');
    gridItems.innerHTML = userLogado.produtos.filter(p => p.tipo === 'padrao').map(p => `
        <div class="selection-card" onclick="selecionarItemPromo(this, ${p.id})">
            <div class="sel-check"><i class="fa-solid fa-check"></i></div>
            <img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'">
            <div class="sel-info">
                <strong>${p.nome}</strong>
                R$ ${p.preco.toFixed(2)}
            </div>
        </div>
    `).join(''); 
    
    document.getElementById('selected-promo-id').value = ""; 
}

function selecionarItemPromo(el, id) { 
    document.querySelectorAll('#grid-promo-items .selection-card').forEach(c => c.classList.remove('selected')); 
    el.classList.add('selected'); 
    document.getElementById('selected-promo-id').value = id; 
    
    const prod = userLogado.produtos.find(x => x.id === id); 
    if(prod) {
        document.getElementById('promo-preco').value = prod.preco; 
    }
}

function salvarPromocao(e) { 
    e.preventDefault(); 
    const idProd = parseInt(document.getElementById('selected-promo-id').value); 
    if(!idProd) return alert("Selecione um produto base para a promoção!"); 
    
    const valString = document.getElementById('promo-validade').value;
    const validadeTS = valString ? new Date(valString).getTime() : null;
    
    const p = userLogado.produtos.find(x => x.id === idProd); 
    
    userLogado.produtos.push({
        id: Date.now(), 
        tipo: 'promo', 
        nome: p.nome + " [OFERTA]", 
        preco: parseFloat(document.getElementById('promo-preco').value), 
        categoria: p.categoria, 
        img: p.img, 
        custo: p.custo, 
        descricao: p.descricao, 
        validade: validadeTS,
        pausado: false
    }); 
    
    salvarDB(); 
    document.getElementById('modal-promo').classList.add('hidden'); 
    nav('prods'); 
}

function abrirModalCombo() { 
    document.getElementById('modal-combo').classList.remove('hidden'); 
    document.getElementById('combo-validade').value = "";
    
    const gridItems = document.getElementById('grid-combo-items');
    gridItems.innerHTML = userLogado.produtos.filter(p => p.tipo === 'padrao').map(p => `
        <div class="selection-card" onclick="this.classList.toggle('selected')" data-id="${p.id}" data-nome="${p.nome}">
            <div class="sel-check"><i class="fa-solid fa-check"></i></div>
            <img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'">
            <div class="sel-info">
                <strong>${p.nome}</strong>
                R$ ${p.preco.toFixed(2)}
            </div>
        </div>
    `).join(''); 
}

function salvarCombo(e) { 
    e.preventDefault(); 
    
    const selecionados = Array.from(document.querySelectorAll('#grid-combo-items .selection-card.selected')); 
    if(!selecionados.length) return alert("Selecione os itens que compõem o combo!"); 
    
    const valString = document.getElementById('combo-validade').value;
    const validadeTS = valString ? new Date(valString).getTime() : null;
    
    const descricaoItens = selecionados.map(el => el.getAttribute('data-nome')).join(" + "); 
    
    userLogado.produtos.push({
        id: Date.now(), 
        tipo: 'combo', 
        nome: document.getElementById('combo-nome').value, 
        preco: parseFloat(document.getElementById('combo-preco').value), 
        categoria: 'Combos', 
        img: document.getElementById('combo-img').value, 
        descricao: descricaoItens, 
        validade: validadeTS,
        custo: 0, 
        pausado: false
    }); 
    
    salvarDB(); 
    document.getElementById('modal-combo').classList.add('hidden'); 
    nav('prods'); 
}

// ==================== SISTEMA PDV (FRENTE DE CAIXA) ====================
function abrirPDV(tipoVenda, idDaVenda) { 
    tipoVendaAtual = tipoVenda; 
    idMesaAtual = idDaVenda; 
    carrinhoPDV = []; 
    
    const pdvTitulo = document.getElementById('pdv-titulo');
    pdvTitulo.innerText = tipoVenda === 'mesa' ? `Mesa ${idDaVenda}` : tipoVenda.toUpperCase();
    
    document.getElementById('modal-pdv').classList.remove('hidden');
    
    document.getElementById('pdv-10pct').checked = false; 
    document.getElementById('pdv-entrega').value = 0; 
    document.getElementById('search-pdv').value = "";
    document.getElementById('box-10pct').classList.add('hidden'); 
    document.getElementById('box-entrega').classList.add('hidden');
    
    const cartList = document.getElementById('pdv-carrinho'); 
    const oldInput = document.getElementById('pdv-cliente-nome'); 
    if(oldInput) oldInput.remove();

    if(tipoVenda === 'mesa') {
        document.getElementById('box-10pct').classList.remove('hidden'); 
        document.getElementById('pdv-10pct').checked = true;
        
        const mesa = userLogado.mesas.find(m => m.id === idDaVenda); 
        if(mesa && mesa.pedidos) {
            carrinhoPDV = JSON.parse(JSON.stringify(mesa.pedidos));
        }
    } else {
        if(tipoVenda === 'delivery') {
            document.getElementById('box-entrega').classList.remove('hidden');
        }
        
        const inputNome = document.createElement('input'); 
        inputNome.type = 'text'; 
        inputNome.id = 'pdv-cliente-nome'; 
        inputNome.className = 'search-bar'; 
        inputNome.placeholder = 'Nome do Cliente / Identificação'; 
        inputNome.style.marginBottom = '10px'; 
        cartList.prepend(inputNome);

        if(idDaVenda !== null && userLogado.pedidosAbertos[idDaVenda]) { 
            const pedidoAberto = userLogado.pedidosAbertos[idDaVenda]; 
            carrinhoPDV = JSON.parse(JSON.stringify(pedidoAberto.itens)); 
            inputNome.value = pedidoAberto.cliente || ""; 
            if(pedidoAberto.taxaEntrega) {
                document.getElementById('pdv-entrega').value = pedidoAberto.taxaEntrega; 
            }
        }
    }
    
    renderPDVProdutos(); 
    atualizarCarrinhoDOM();
}

function fecharPDV() { 
    document.getElementById('modal-pdv').classList.add('hidden'); 
}

function renderPDVProdutos(filtroTexto = "") { 
    const listaHtml = userLogado.produtos
        .filter(p => p.nome.toLowerCase().includes(filtroTexto.toLowerCase()))
        .map(p => `
            <div class="pdv-prod-card" onclick="addAoCarrinho(${p.id})">
                <img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'">
                <div class="pdv-prod-info">
                    <h4>${p.nome}</h4>
                    <div class="pdv-prod-price">R$ ${p.preco.toFixed(2)}</div>
                </div>
                <div class="btn-add-overlay">
                    <i class="fa-solid fa-plus"></i>
                </div>
            </div>
        `).join('');
        
    document.getElementById('pdv-lista-prods').innerHTML = listaHtml; 
}

function addAoCarrinho(idProduto) { 
    const itemExistente = carrinhoPDV.find(i => i.id === idProduto); 
    
    if(itemExistente) {
        itemExistente.qtd++; 
    } else { 
        const produtoOriginal = userLogado.produtos.find(x => x.id === idProduto);
        carrinhoPDV.push({...produtoOriginal, qtd: 1}); 
    } 
    
    atualizarCarrinhoDOM(); 
}

function alterarQtd(idProduto, quantidadeModificar) { 
    const item = carrinhoPDV.find(x => x.id === idProduto); 
    if(item) { 
        item.qtd += quantidadeModificar; 
        if(item.qtd <= 0) {
            carrinhoPDV = carrinhoPDV.filter(x => x.id !== idProduto); 
        }
    } 
    atualizarCarrinhoDOM(); 
}

function atualizarCarrinhoDOM() { 
    const inputNome = document.getElementById('pdv-cliente-nome'); 
    const containerCarrinho = document.getElementById('pdv-carrinho'); 
    
    let itemsHtml = "";
    
    if (carrinhoPDV.length === 0) {
        itemsHtml = '<div style="text-align:center; padding:20px; color:#aaa;">Carrinho Vazio</div>';
    } else {
        itemsHtml = carrinhoPDV.map(p => `
            <div class="cart-item">
                <div>
                    <div style="font-weight:600">${p.nome}</div>
                    <small style="color:#666">R$ ${p.preco.toFixed(2)} x ${p.qtd}</small>
                </div>
                <div style="text-align:right">
                    <div style="font-weight:700">R$ ${(p.preco * p.qtd).toFixed(2)}</div>
                    <div class="qty-ctrl" style="justify-content:flex-end; margin-top:5px;">
                        <button class="qty-btn" onclick="alterarQtd(${p.id}, -1)">-</button>
                        <button class="qty-btn" onclick="alterarQtd(${p.id}, 1)">+</button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    containerCarrinho.innerHTML = itemsHtml; 
    
    if(inputNome) {
        containerCarrinho.prepend(inputNome); 
    }
    
    atualizarTotalPDV(); 
}

function atualizarTotalPDV() { 
    let valorTotal = carrinhoPDV.reduce((acumulador, item) => acumulador + (item.preco * item.qtd), 0); 
    
    const box10pct = document.getElementById('box-10pct');
    if(!box10pct.classList.contains('hidden') && document.getElementById('pdv-10pct').checked) {
        valorTotal *= 1.1; 
    }
    
    const boxEntrega = document.getElementById('box-entrega');
    if(!boxEntrega.classList.contains('hidden')) {
        valorTotal += parseFloat(document.getElementById('pdv-entrega').value || 0); 
    }
    
    document.getElementById('pdv-total-valor').innerText = `R$ ${valorTotal.toFixed(2)}`; 
    document.getElementById('pag-total').innerText = `R$ ${valorTotal.toFixed(2)}`; 
}

function cancelarPedido() { 
    if(!confirm("Tem certeza que deseja cancelar o pedido atual?")) return; 
    
    if(tipoVendaAtual !== 'mesa' && idMesaAtual !== null) { 
        userLogado.pedidosAbertos.splice(idMesaAtual, 1); 
    } 
    else if(tipoVendaAtual === 'mesa') { 
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        if(mesa) { 
            mesa.status = 'livre'; 
            mesa.pedidos = []; 
        } 
    }
    
    carrinhoPDV = []; 
    salvarDB(); 
    fecharPDV(); 
    nav('caixa'); 
}

function salvarComanda() {
    if(!carrinhoPDV.length) return alert("O carrinho está vazio!"); 
    
    imprimirCupom(null, "PEDIDO DE COZINHA"); 
    
    if(tipoVendaAtual === 'mesa') { 
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        mesa.pedidos = JSON.parse(JSON.stringify(carrinhoPDV)); 
        mesa.status = 'ocupada'; 
    } 
    else {
        const inputNome = document.getElementById('pdv-cliente-nome');
        const nomeCliente = (inputNome && inputNome.value) ? inputNome.value : "Balcão"; 
        const taxaEntrega = parseFloat(document.getElementById('pdv-entrega').value || 0); 
        
        let valorTotalProdutos = carrinhoPDV.reduce((a,b) => a + (b.preco * b.qtd), 0);
        let totalFinal = valorTotalProdutos + taxaEntrega;
        
        const novoPedido = { 
            id: Date.now(), 
            cliente: nomeCliente, 
            tipo: tipoVendaAtual, 
            itens: JSON.parse(JSON.stringify(carrinhoPDV)), 
            total: totalFinal, 
            taxaEntrega: taxaEntrega 
        };
        
        if(!userLogado.pedidosAbertos) userLogado.pedidosAbertos = [];
        
        if(idMesaAtual !== null) { 
            userLogado.pedidosAbertos[idMesaAtual] = novoPedido; 
        } else { 
            userLogado.pedidosAbertos.push(novoPedido); 
        }
    }
    
    salvarDB(); 
    fecharPDV(); 
    nav('caixa'); 
}

function imprimirConta() { 
    if(!carrinhoPDV.length) return alert("O carrinho está vazio!"); 
    imprimirCupom(null, "CONFERÊNCIA DE CONTA"); 
}

// ==================== PAGAMENTO ====================
function abrirPagamento() { 
    if(!carrinhoPDV.length) return alert("O carrinho está vazio!"); 
    
    metodoPagamento = ''; 
    fecharPDV(); 
    
    document.getElementById('modal-pagamento').classList.remove('hidden'); 
    
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('selected')); 
    document.getElementById('area-troco').classList.add('hidden'); 
    
    atualizarTotalPDV(); 
}

function fecharPagamento() { 
    document.getElementById('modal-pagamento').classList.add('hidden'); 
}

function selecionarPagamento(metodo, el) { 
    metodoPagamento = metodo; 
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('selected')); 
    el.classList.add('selected'); 
    
    if(metodo === 'dinheiro') {
        document.getElementById('area-troco').classList.remove('hidden'); 
    } else {
        document.getElementById('area-troco').classList.add('hidden'); 
    }
}

function calcularTroco() { 
    const textoTotal = document.getElementById('pag-total').innerText.replace('R$ ', '');
    const totalVenda = parseFloat(textoTotal); 
    
    const recebido = parseFloat(document.getElementById('valor-recebido').value || 0); 
    const troco = recebido - totalVenda;
    
    if (troco > 0) {
        document.getElementById('valor-troco').innerText = `R$ ${troco.toFixed(2)}`;
    } else {
        document.getElementById('valor-troco').innerText = "R$ 0.00"; 
    }
}

function concluirPagamento() { 
    if(!metodoPagamento) return alert("Por favor, selecione a forma de pagamento!"); 
    
    const textoTotal = document.getElementById('pdv-total-valor').innerText.replace('R$ ', '');
    const totalFinal = parseFloat(textoTotal); 
    
    const novaVenda = { 
        id: Date.now(), 
        tipo: tipoVendaAtual, 
        total: totalFinal, 
        metodo: metodoPagamento, 
        data: new Date().toLocaleString(), 
        itens: [...carrinhoPDV] 
    }; 
    
    userLogado.vendas.push(novaVenda); 
    
    if(tipoVendaAtual === 'mesa') { 
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        mesa.status = 'livre'; 
        mesa.pedidos = []; 
    } else if(idMesaAtual !== null) { 
        userLogado.pedidosAbertos.splice(idMesaAtual, 1); 
    } 
    
    salvarDB(); 
    imprimirCupom(novaVenda, "CUPOM FISCAL"); 
    fecharPagamento(); 
    nav('caixa'); 
}

function imprimirCupom(vendaFechada, tituloDocumento = "CUPOM") { 
    const areaImpressao = document.getElementById('print-area'); 
    
    const itens = vendaFechada ? vendaFechada.itens : carrinhoPDV; 
    
    let total;
    if (vendaFechada) {
        total = vendaFechada.total;
    } else {
        total = parseFloat(document.getElementById('pdv-total-valor').innerText.replace('R$ ', ''));
    }
    
    const dataHora = vendaFechada ? vendaFechada.data : new Date().toLocaleString(); 
    const formaPagamento = vendaFechada ? vendaFechada.metodo : "A Pagar"; 
    
    let nomeCliente = "Cliente Balcão"; 
    const inputNome = document.getElementById('pdv-cliente-nome'); 
    
    if(inputNome && inputNome.value) {
        nomeCliente = inputNome.value; 
    } else if(vendaFechada && vendaFechada.cliente) {
        nomeCliente = vendaFechada.cliente;
    }
    
    const htmlItens = itens.map(i => `
        <tr>
            <td>${i.qtd}x ${i.nome.substring(0, 18)}</td>
            <td align="right">${(i.preco * i.qtd).toFixed(2)}</td>
        </tr>
    `).join('');
    
    areaImpressao.innerHTML = `
        <div class="ticket">
            <h3>${userLogado.nome}</h3>
            <p>================================</p>
            <p>${tituloDocumento}</p>
            <p>${dataHora}</p>
            <p>Cliente: ${nomeCliente}</p>
            <p>================================</p>
            <table class="ticket-table">
                ${htmlItens}
            </table>
            <div class="ticket-divider"></div>
            <div class="ticket-total">TOTAL: R$ ${total.toFixed(2)}</div>
            <p style="font-size:0.8rem; text-align:right">Pagamento: ${formaPagamento.toUpperCase()}</p>
            <div class="ticket-divider"></div>
            <p>Obrigado pela preferência!</p>
        </div>
    `; 
    
    setTimeout(() => { 
        window.print(); 
    }, 100); 
}

function renderHistorico(filtroTexto = "") { 
    const listaHistorico = userLogado.vendas
        .slice()
        .reverse()
        .filter(v => v.data.includes(filtroTexto) || v.total.toString().includes(filtroTexto)); 
        
    const contentArea = document.getElementById('content-area');
    
    if (listaHistorico.length === 0) {
        contentArea.innerHTML = `<div style="padding:40px;text-align:center; color:#64748b;">Nenhuma venda encontrada.</div>`;
    } else {
        const trsHtml = listaHistorico.map(v => `
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:15px;">${v.data}</td>
                <td style="padding:15px;">${v.metodo ? v.metodo.toUpperCase() : '-'}</td>
                <td style="padding:15px; font-weight:bold;">R$ ${v.total.toFixed(2)}</td>
                <td style="padding:15px;">
                    <button class="btn-action" style="background:#555" onclick='imprimirCupom(${JSON.stringify(v)})'>
                        <i class="fa-solid fa-print"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        contentArea.innerHTML = `
            <table class="table-history" style="width:100%; border-collapse: collapse; text-align:left; background:white; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                <thead style="background:#f1f5f9; color:#64748b; font-size:0.85rem; text-transform:uppercase;">
                    <tr>
                        <th style="padding:15px; border-bottom:1px solid #e2e8f0;">Data</th>
                        <th style="padding:15px; border-bottom:1px solid #e2e8f0;">Pagamento</th>
                        <th style="padding:15px; border-bottom:1px solid #e2e8f0;">Total</th>
                        <th style="padding:15px; border-bottom:1px solid #e2e8f0;">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    ${trsHtml}
                </tbody>
            </table>
        `; 
    }
}

// ==================== CARDÁPIO DIGITAL (CLIENTE) ====================
function abrirQRCode() { 
    document.getElementById('modal-qrcode').classList.remove('hidden'); 
    
    const linkBase = window.location.href.split('?')[0];
    const linkFinal = `${linkBase}?loja=${userLogado.login}`; 
    
    document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(linkFinal)}`; 
    document.getElementById('qr-link').href = linkFinal; 
}

function fecharQRCode() { 
    document.getElementById('modal-qrcode').classList.add('hidden'); 
}

function abrirCardapioMobile(isCliente = false) { 
    document.getElementById('mobile-overlay').classList.remove('hidden'); 
    
    document.getElementById('mobile-overlay').style.setProperty('--primary', userLogado.cor1); 
    
    document.getElementById('mob-title').innerText = userLogado.nome; 
    document.getElementById('mob-logo').src = getImg(userLogado.logo); 
    
    const statusSpan = document.getElementById('ifood-status-loja');
    if(userLogado.isAberto) {
        statusSpan.innerText = "Aberto";
        statusSpan.style.color = "var(--success)";
    } else {
        statusSpan.innerText = "Fechado";
        statusSpan.style.color = "var(--danger)";
    }
    
    if(isCliente) {
        document.getElementById('btn-back-sys').classList.add('hidden'); 
    } else { 
        document.getElementById('btn-back-sys').classList.remove('hidden'); 
    }
    
    carrinhoCliente = []; 
    atualizarFloatingCart(); 
    renderCategoriasCliente("Todos"); 
}

function fecharCardapioMobile() { 
    document.getElementById('mobile-overlay').classList.add('hidden'); 
}

function renderCategoriasCliente(catSelecionada) { 
    // Filtra pausados e também itens que já EXTRAPOLARAM a data de validade
    const produtosAtivos = userLogado.produtos.filter(p => !p.pausado && !isExpirado(p)); 
    
    const setCategorias = new Set(produtosAtivos.map(p => p.categoria));
    const categorias = ["Todos", ...Array.from(setCategorias)]; 
    
    document.getElementById('mob-categorias').innerHTML = categorias.map(c => `
        <div class="cat-chip ${c === catSelecionada ? 'active' : ''}" onclick="renderCategoriasCliente('${c}')">
            ${c}
        </div>
    `).join(''); 
    
    const divItens = document.getElementById('mob-body-items'); 
    divItens.innerHTML = ""; 
    
    if (catSelecionada === "Todos") { 
        categorias.filter(c => c !== "Todos").forEach(cat => { 
            const itensDestaCategoria = produtosAtivos.filter(p => p.categoria === cat); 
            
            if(itensDestaCategoria.length > 0) { 
                divItens.innerHTML += `<div class="cat-section-title">${cat}</div>`;
                divItens.innerHTML += itensDestaCategoria.map(p => htmlItemCliente(p)).join(''); 
            } 
        }); 
    } else { 
        const itensDestaCategoria = produtosAtivos.filter(p => p.categoria === catSelecionada); 
        
        divItens.innerHTML += `<div class="cat-section-title">${catSelecionada}</div>`;
        divItens.innerHTML += itensDestaCategoria.map(p => htmlItemCliente(p)).join(''); 
    } 
}

function htmlItemCliente(produto) { 
    return `
        <div class="ifood-item-card" onclick="addCarrinhoCliente(${produto.id})">
            <div class="ifood-item-info">
                <h4>${produto.nome}</h4>
                ${produto.descricao ? `<p>${produto.descricao}</p>` : ''}
                <div class="ifood-item-price">
                    ${produto.tipo === 'promo' ? '<span class="tag-promo">PROMOÇÃO</span>' : ''}
                    R$ ${produto.preco.toFixed(2)}
                </div>
            </div>
            <img src="${getImg(produto.img)}">
        </div>
    `; 
}

function addCarrinhoCliente(idProduto) { 
    if(!userLogado.isAberto) {
        return alert("Desculpe, o estabelecimento está fechado no momento e não está aceitando pedidos.");
    }

    const itemExistente = carrinhoCliente.find(i => i.id === idProduto); 
    
    if(itemExistente) {
        itemExistente.qtd++; 
    } else { 
        const produtoOriginal = userLogado.produtos.find(x => x.id === idProduto);
        carrinhoCliente.push({...produtoOriginal, qtd: 1}); 
    }
    
    atualizarFloatingCart(); 
}

function alterarQtdCliente(idProduto, quantidade) { 
    const item = carrinhoCliente.find(x => x.id === idProduto); 
    
    if(item) { 
        item.qtd += quantidade; 
        if(item.qtd <= 0) {
            carrinhoCliente = carrinhoCliente.filter(x => x.id !== idProduto); 
        }
    }
    
    atualizarFloatingCart(); 
    renderItensSacola(); 
}

function atualizarFloatingCart() { 
    const floatingCart = document.getElementById('floating-cart'); 
    
    if(carrinhoCliente.length === 0) { 
        floatingCart.classList.add('hidden'); 
        return; 
    } 
    
    floatingCart.classList.remove('hidden'); 
    
    const qtdTotal = carrinhoCliente.reduce((acc, item) => acc + item.qtd, 0);
    const valorTotal = carrinhoCliente.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
    
    document.getElementById('cart-qtd').innerText = qtdTotal; 
    document.getElementById('cart-total').innerText = `R$ ${valorTotal.toFixed(2)}`; 
}

function abrirSacolaCliente() { 
    document.getElementById('modal-sacola').classList.remove('hidden'); 
    renderItensSacola(); 
}

function fecharSacolaCliente() { 
    document.getElementById('modal-sacola').classList.add('hidden'); 
}

function renderItensSacola() { 
    if(carrinhoCliente.length === 0) return fecharSacolaCliente(); 
    
    const valorTotal = carrinhoCliente.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
    document.getElementById('sacola-total-valor').innerText = `R$ ${valorTotal.toFixed(2)}`; 
    
    document.getElementById('sacola-lista').innerHTML = carrinhoCliente.map(p => `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px; padding-bottom:15px; border-bottom:1px solid #f1f5f9;">
            <div style="flex:1; padding-right:15px;">
                <h4 style="font-size:0.95rem; margin-bottom:5px; color:#3f3e3e;">${p.nome}</h4>
                <b style="color:#3f3e3e;">R$ ${(p.preco * p.qtd).toFixed(2)}</b>
            </div>
            <div class="qty-ctrl" style="border: 1px solid #e2e8f0; padding:4px; border-radius:8px;">
                <button class="qty-btn" style="background:white; color:var(--primary);" onclick="alterarQtdCliente(${p.id}, -1)">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span style="padding:0 10px; font-weight:700; color:#3f3e3e;">${p.qtd}</span>
                <button class="qty-btn" style="background:white; color:var(--primary);" onclick="alterarQtdCliente(${p.id}, 1)">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>
    `).join(''); 
}

function toggleMesaInput() {
    const valorSelecionado = document.getElementById('cliente-tipo-pedido').value;
    
    const divMesa = document.getElementById('div-numero-mesa');
    const divEnd = document.getElementById('div-endereco-delivery');
    
    if(valorSelecionado === 'mesa') {
        divMesa.classList.remove('hidden');
        divEnd.classList.add('hidden');
    } else {
        divMesa.classList.add('hidden');
        divEnd.classList.remove('hidden');
    }
}

function enviarPedidoCliente() {
    // Verificação de Segurança: Checar se não tem algum item que Expirou enquanto o cliente pensava
    const itensExpirados = carrinhoCliente.filter(p => isExpirado(p));
    if(itensExpirados.length > 0) {
        return alert("Alguns itens na sua sacola expiraram (Oferta Encerrada). Por favor, atualize o cardápio e tente novamente.");
    }

    const nomeCliente = document.getElementById('cliente-nome').value.trim();
    if(!nomeCliente) {
        return alert("Por favor, informe seu nome para enviarmos o pedido!");
    }
    
    const tipoPedido = document.getElementById('cliente-tipo-pedido').value;
    let stringIdentificacao = nomeCliente;
    
    if(tipoPedido === 'mesa') {
        const numMesa = document.getElementById('cliente-numero-mesa').value;
        if(!numMesa) {
            return alert("Por favor, informe o número da mesa!");
        }
        stringIdentificacao = `${nomeCliente} (Mesa ${numMesa})`;
    } else {
        const enderecoCliente = document.getElementById('cliente-endereco').value.trim();
        if(!enderecoCliente) {
            return alert("Por favor, informe seu endereço completo para a entrega!");
        }
        stringIdentificacao = `${nomeCliente} - Endereço: ${enderecoCliente}`;
    }
    
    const valorTotal = carrinhoCliente.reduce((acc, item) => acc + (item.preco * item.qtd), 0);
    
    const novoPedido = { 
        id: Date.now(), 
        cliente: stringIdentificacao, 
        tipo: 'delivery', 
        itens: JSON.parse(JSON.stringify(carrinhoCliente)), 
        total: valorTotal, 
        taxaEntrega: 0 
    };
    
    if(!userLogado.pedidosAbertos) userLogado.pedidosAbertos = [];
    userLogado.pedidosAbertos.push(novoPedido);
    
    salvarDB();
    
    alert("Pedido enviado com sucesso! O restaurante já recebeu seu pedido.");
    
    carrinhoCliente = [];
    atualizarFloatingCart();
    fecharSacolaCliente();
    
    if(!document.getElementById('btn-back-sys').classList.contains('hidden')) {
        nav('caixa');
    }
}