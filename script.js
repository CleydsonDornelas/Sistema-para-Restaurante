// ==================== CONFIGURAÇÃO INICIAL ====================
const MAPA_CORES = { 
    'laranja': { c1: '#ea580c', c2: '#fb923c' }, 
    'vermelho': { c1: '#dc2626', c2: '#f87171' }, 
    'verde': { c1: '#16a34a', c2: '#4ade80' }, 
    'preto': { c1: '#0f172a', c2: '#334155' }, 
    'azul': { c1: '#2563eb', c2: '#60a5fa' } 
};

// TODOS OS PRODUTOS PADRÃO
const PRODUTOS_PADRAO = {
    'Hamburgueria': [
        { id: 1, nome: "Combo Smash Duplo", preco: 38.90, custo: 15.00, descricao: "2 Hambúrgueres de 90g, queijo cheddar, batata e refri.", pausado: false, categoria: "Combos", img: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500", tipo: "combo" },
        { id: 2, nome: "Smash Burger", preco: 22.00, custo: 8.50, descricao: "Pão brioche, carne 90g, queijo prato e maionese da casa.", pausado: false, categoria: "Lanches", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", tipo: "padrao" },
        { id: 3, nome: "X-Bacon Crocante", preco: 26.50, custo: 10.00, descricao: "Pão, hambúrguer 150g, bacon em tiras crocantes e cheddar.", pausado: false, categoria: "Lanches", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500", tipo: "padrao" },
        { id: 4, nome: "Batata Rústica", preco: 18.00, custo: 5.00, descricao: "Porção de 300g com páprica e alecrim.", pausado: false, categoria: "Porções", img: "https://images.unsplash.com/photo-1630384060421-a431e4cad84f?w=500", tipo: "padrao" },
        { id: 5, nome: "Milkshake Morango", preco: 15.90, custo: 6.00, descricao: "Feito com sorvete artesanal e pedaços de morango.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500", tipo: "padrao" },
        { id: 6, nome: "Refrigerante Lata", preco: 6.00, custo: 2.50, descricao: "Lata 350ml bem gelada.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500", tipo: "padrao" }
    ],
    'Pizzaria': [ 
        { id: 10, nome: "Combo Família", preco: 89.90, custo: 35.00, descricao: "1 Pizza G + 1 Pizza Doce M + Refri 2L.", pausado: false, categoria: "Combos", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", tipo: "combo" },
        { id: 11, nome: "Pizza Calabresa", preco: 45.00, custo: 18.00, descricao: "Molho de tomate, mussarela, calabresa fatiada e cebola.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500", tipo: "padrao" },
        { id: 12, nome: "Pizza 4 Queijos", preco: 48.00, custo: 20.00, descricao: "Mussarela, provolone, parmesão e catupiry original.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1574071318500-d0d972de8e3e?w=500", tipo: "padrao" },
        { id: 13, nome: "Pizza Portuguesa", preco: 46.00, custo: 19.00, descricao: "Presunto, ovos, ervilha, cebola, azeitona e mussarela.", pausado: false, categoria: "Pizzas", img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500", tipo: "padrao" },
        { id: 14, nome: "Borda de Catupiry", preco: 8.00, custo: 3.00, descricao: "Borda recheada com catupiry.", pausado: false, categoria: "Adicionais", img: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=500", tipo: "padrao" },
        { id: 15, nome: "Coca-Cola 2L", preco: 14.00, custo: 7.50, descricao: "Garrafa de 2 litros.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500", tipo: "padrao" }
    ],
    'Restaurante': [
        { id: 20, nome: "Prato Feito - Carne", preco: 25.00, custo: 10.00, descricao: "Arroz, feijão, bife de alcatra, batata frita e salada.", pausado: false, categoria: "Almoço", img: "https://images.unsplash.com/photo-1590412200988-a436970781fa?w=500", tipo: "padrao" },
        { id: 21, nome: "Filé de Frango", preco: 22.00, custo: 8.00, descricao: "Arroz, feijão, filé de frango grelhado e purê de batata.", pausado: false, categoria: "Almoço", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500", tipo: "padrao" },
        { id: 22, nome: "Feijoada Completa", preco: 35.00, custo: 15.00, descricao: "Acompanha arroz, couve, farofa, torresmo e laranja.", pausado: false, categoria: "Especiais", img: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=500", tipo: "padrao" },
        { id: 23, natural: "Suco Natural Laranja", preco: 8.00, custo: 3.00, descricao: "Copo 400ml feito na hora, sem açúcar.", pausado: false, categoria: "Bebidas", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500", tipo: "padrao" },
        { id: 24, nome: "Pudim de Leite", preco: 12.00, custo: 4.00, descricao: "Pudim caseiro com calda de caramelo.", pausado: false, categoria: "Sobremesas", img: "https://images.unsplash.com/photo-1593034509785-5b17ba29f5bf?w=500", tipo: "padrao" },
        { id: 25, nome: "Salada Mista", preco: 15.00, custo: 5.00, descricao: "Alface, tomate, cenoura ralada, palmito e azeite.", pausado: false, categoria: "Entradas", img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500", tipo: "padrao" }
    ]
};

const IMG_DEFAULT = "https://placehold.co/400x400?text=Sem+Foto";
function getImg(url) { return (url && url.length > 10) ? url : IMG_DEFAULT; }

// Variáveis Globais
let restaurantes = []; 
let userLogado = null; 
let carrinhoPDV = []; 
let tipoVendaAtual = ''; 
let idMesaAtual = 0; 
let metodoPagamento = '';

// ==================== INICIALIZAÇÃO & BANCO DE DADOS ====================
function iniciarSistema() {
    carregarDB();
    const params = new URLSearchParams(window.location.search);
    const loginLoja = params.get('loja');
    
    if (loginLoja) {
        // Modo Cliente (Cardápio via QR Code)
        const loja = restaurantes.find(r => r.login === loginLoja);
        if (loja) {
            userLogado = loja;
            if(document.getElementById('login-parceiro-wrap')) document.getElementById('login-parceiro-wrap').classList.add('hidden');
            if(document.getElementById('app-parceiro')) document.getElementById('app-parceiro').classList.add('hidden');
            abrirCardapioMobile(true);
        } else {
            alert("Restaurante não encontrado.");
            if(document.getElementById('login-parceiro-wrap')) document.getElementById('login-parceiro-wrap').classList.remove('hidden');
        }
    } else {
        // Modo Sistema Parceiro
        if(document.getElementById('login-parceiro-wrap')) document.getElementById('login-parceiro-wrap').classList.remove('hidden');
    }
}

function carregarDB() { 
    // Busca banco atual ou anterior para não perder os dados
    const dados = localStorage.getItem('GastroDB_V42') || localStorage.getItem('GastroDB_V41'); 
    if (dados) { 
        restaurantes = JSON.parse(dados); 
    } else { 
        // Banco de dados inicial para testes
        restaurantes = [{ 
            id: 1, nome: "Hamburgueria Demo", ramo: "Hamburgueria", login: "demo", senha: "123", 
            logo: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", cor1: "#ea580c", cor2: "#fb923c", 
            produtos: JSON.parse(JSON.stringify(PRODUTOS_PADRAO['Hamburgueria'])), 
            mesas: Array.from({length: 8}, (_,i)=>({id:i+1, status:'livre', pedidos:[]})), 
            pedidosAbertos: [], vendas: [] 
        }]; 
    } 
    salvarDB(); 
}
function salvarDB() { localStorage.setItem('GastroDB_V42', JSON.stringify(restaurantes)); }


// ==================== ADMIN MASTER (GESTOR) ====================
function loginMaster(e) { 
    e.preventDefault(); 
    if(document.getElementById('master-user').value === 'admin') { 
        document.getElementById('login-admin-wrap').classList.add('hidden'); 
        document.getElementById('painel-master').classList.remove('hidden'); 
        renderGridClientes(); 
    } else { 
        alert("Senha incorreta."); 
    } 
}

function renderGridClientes() { 
    const grid = document.getElementById('grid-clientes'); 
    if(!grid) return; 
    grid.innerHTML = restaurantes.map(r => `
        <tr>
            <td><img src="${getImg(r.logo)}" class="cell-logo"></td>
            <td><strong>${r.nome}</strong><br><small style="color:#666">ID: ${r.id}</small></td>
            <td><span class="badge badge-orange">${r.ramo}</span></td>
            <td>User: ${r.login}</td>
            <td style="text-align:center;">
                <div class="admin-actions-cell">
                    <button class="btn-action btn-edit" onclick="editarCliente(${r.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-action btn-del" onclick="editarCliente(${r.id}); setTimeout(excluirClienteAtual, 200)"><i class="fa-solid fa-trash"></i></button>
                </div>
            </td>
        </tr>
    `).join(''); 
}

function abrirModalCliente() { 
    document.getElementById('modal-cliente').classList.remove('hidden'); 
    document.getElementById('cli-id').value=""; 
    document.getElementById('cli-nome').value=""; 
    document.getElementById('cli-login').value=""; 
    document.getElementById('cli-pass').value=""; 
    document.getElementById('cli-logo').value=""; 
    document.getElementById('modal-titulo').innerText="Novo Estabelecimento"; 
    document.getElementById('btn-excluir-conta').classList.add('hidden'); 
}
function fecharModalCliente() { document.getElementById('modal-cliente').classList.add('hidden'); }

function editarCliente(id) { 
    const r = restaurantes.find(x => x.id == id); 
    if(!r) return; 
    document.getElementById('cli-id').value=r.id; 
    document.getElementById('cli-nome').value=r.nome; 
    document.getElementById('cli-ramo').value=r.ramo; 
    document.getElementById('cli-logo').value=r.logo; 
    document.getElementById('cli-login').value=r.login; 
    document.getElementById('cli-pass').value=r.senha; 
    document.getElementById('modal-titulo').innerText="Editar Estabelecimento"; 
    document.getElementById('modal-cliente').classList.remove('hidden'); 
    document.getElementById('btn-excluir-conta').classList.remove('hidden'); 
}

function salvarCliente(e) { 
    e.preventDefault(); 
    const id = document.getElementById('cli-id').value; 
    const ramo = document.getElementById('cli-ramo').value; 
    const nomeCor = document.getElementById('cli-cor-tema').value; 
    const cores = MAPA_CORES[nomeCor] || MAPA_CORES['laranja']; 
    
    const dados = { 
        nome: document.getElementById('cli-nome').value, 
        ramo: ramo, 
        logo: document.getElementById('cli-logo').value, 
        cor1: cores.c1, cor2: cores.c2, 
        login: document.getElementById('cli-login').value, 
        senha: document.getElementById('cli-pass').value 
    }; 
    
    if(id) { 
        const idx = restaurantes.findIndex(r => r.id == id); 
        if(idx !== -1) restaurantes[idx] = { ...restaurantes[idx], ...dados }; 
    } else { 
        restaurantes.push({ 
            id: Date.now(), ...dados, 
            produtos: JSON.parse(JSON.stringify(PRODUTOS_PADRAO[ramo]||[])), 
            mesas: Array.from({length:8},(_,i)=>({id:i+1, status:'livre', pedidos:[]})), 
            pedidosAbertos: [], vendas:[] 
        }); 
    } 
    salvarDB(); fecharModalCliente(); renderGridClientes(); 
}

function excluirClienteAtual() { 
    if(confirm("Apagar estabelecimento?")) { 
        const id = document.getElementById('cli-id').value; 
        restaurantes = restaurantes.filter(r => r.id != id); 
        salvarDB(); fecharModalCliente(); renderGridClientes(); 
    } 
}


// ==================== APP PARCEIRO (NAVEGAÇÃO E LOGIN) ====================
function loginParceiro(e) { 
    e.preventDefault(); carregarDB(); 
    const user = document.getElementById('parceiro-user').value; 
    const pass = document.getElementById('parceiro-pass').value; 
    const r = restaurantes.find(x => x.login === user && x.senha === pass); 
    if(r) { 
        userLogado = r; 
        document.getElementById('login-parceiro-wrap').classList.add('hidden'); 
        document.getElementById('app-parceiro').classList.remove('hidden'); 
        document.getElementById('sys-nome-rest').innerText = r.nome; 
        nav('dash'); 
    } else { alert("Dados incorretos."); } 
}

function logout() { window.location.href = window.location.pathname; }
function toggleMenuExtra() { document.getElementById('extra-menu-mob').classList.toggle('active'); }

function nav(page) {
    if(document.getElementById('extra-menu-mob')) document.getElementById('extra-menu-mob').classList.remove('active');
    
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
    if(document.getElementById('page-title-mob')) document.getElementById('page-title-mob').innerText = titulos[page];

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    if(document.getElementById(`nav-${page}`)) document.getElementById(`nav-${page}`).classList.add('active');
    
    // RENDERIZAÇÃO DAS PÁGINAS
    if(page === 'dash') {
        const vendas = userLogado.vendas || [];
        const qtdVendas = vendas.length;
        const totalFaturamento = vendas.reduce((a, v) => a + v.total, 0);
        
        let custoTotal = 0;
        vendas.forEach(venda => {
            if(venda.itens) {
                venda.itens.forEach(item => {
                    custoTotal += (item.custo || 0) * item.qtd;
                });
            }
        });
        const lucroEstimado = totalFaturamento - custoTotal;
        const ticketMedio = qtdVendas > 0 ? (totalFaturamento / qtdVendas) : 0;
        
        const abertos = (userLogado.pedidosAbertos || []).length;
        const mesasOcupadas = (userLogado.mesas || []).filter(m => m.status === 'ocupada').length;

        content.innerHTML = `
            <div class="kpi-grid">
                <div class="card-minimal"><div class="card-icon-box icon-blue"><i class="fa-solid fa-cash-register"></i></div><div class="card-info"><h4>Vendas Realizadas</h4><strong>${qtdVendas}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box icon-green"><i class="fa-solid fa-sack-dollar"></i></div><div class="card-info"><h4>Faturamento Bruto</h4><strong>R$ ${totalFaturamento.toFixed(2)}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#fef08a; color:#ca8a04"><i class="fa-solid fa-chart-line"></i></div><div class="card-info"><h4>Lucro Estimado</h4><strong>R$ ${lucroEstimado.toFixed(2)}</strong></div></div>
                
                <div class="card-minimal"><div class="card-icon-box icon-orange"><i class="fa-solid fa-receipt"></i></div><div class="card-info"><h4>Ticket Médio</h4><strong>R$ ${ticketMedio.toFixed(2)}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#fee2e2; color:#ef4444"><i class="fa-solid fa-clock"></i></div><div class="card-info"><h4>Pedidos Pendentes</h4><strong>${abertos}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#e0e7ff; color:#4f46e5"><i class="fa-solid fa-chair"></i></div><div class="card-info"><h4>Mesas Ocupadas</h4><strong>${mesasOcupadas}</strong></div></div>
            </div>`;
    } 
    else if(page === 'financeiro') {
        const vendas = userLogado.vendas;
        const total = vendas.reduce((a, v) => a + v.total, 0);
        const porMetodo = { pix: 0, dinheiro: 0, credito: 0, debito: 0 };
        vendas.forEach(v => { if (porMetodo[v.metodo] !== undefined) porMetodo[v.metodo] += v.total; });

        content.innerHTML = `
            <div class="kpi-grid" style="margin-bottom: 30px;">
                <div class="card-minimal" style="border-color: var(--success);"><div class="card-icon-box icon-green"><i class="fa-solid fa-sack-dollar"></i></div><div class="card-info"><h4>Faturamento Bruto</h4><strong style="font-size: 2.2rem; color: var(--success)">R$ ${total.toFixed(2)}</strong></div></div>
            </div>
            <h3 style="margin-bottom: 15px; color: var(--text-muted)">Receitas por Forma de Pagamento</h3>
            <div class="kpi-grid">
                <div class="card-minimal"><div class="card-icon-box" style="background:#e0f2fe; color:#0284c7"><i class="fa-brands fa-pix"></i></div><div class="card-info"><h4>Pix</h4><strong>R$ ${porMetodo.pix.toFixed(2)}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#dcfce7; color:#16a34a"><i class="fa-solid fa-money-bill-wave"></i></div><div class="card-info"><h4>Dinheiro</h4><strong>R$ ${porMetodo.dinheiro.toFixed(2)}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#fef08a; color:#ca8a04"><i class="fa-solid fa-credit-card"></i></div><div class="card-info"><h4>Cartão de Crédito</h4><strong>R$ ${porMetodo.credito.toFixed(2)}</strong></div></div>
                <div class="card-minimal"><div class="card-icon-box" style="background:#ffedd5; color:#ea580c"><i class="fa-solid fa-credit-card"></i></div><div class="card-info"><h4>Cartão de Débito</h4><strong>R$ ${porMetodo.debito.toFixed(2)}</strong></div></div>
            </div>`;
    }
    else if(page === 'historico') {
        header.innerHTML = `<input type="text" class="search-bar" placeholder="Buscar nas vendas..." onkeyup="renderHistorico(this.value)">`; 
        renderHistorico();
    } 
    else if(page === 'prods') {
        header.innerHTML = `
            <div class="header-actions-container">
                <div class="btn-group">
                    <button class="btn-primary" onclick="abrirModalProduto()"><i class="fa-solid fa-plus"></i> Novo Item</button>
                    <button class="btn-warning" onclick="abrirModalPromo()"><i class="fa-solid fa-tag"></i> Promo</button>
                    <button class="btn-purple" onclick="abrirModalCombo()"><i class="fa-solid fa-burger"></i> Combo</button>
                </div>
                <input type="text" class="search-bar" placeholder="🔍 Buscar produto..." onkeyup="renderProdutosLista(this.value)">
            </div>`; 
        renderProdutosLista();
    } 
    else if(page === 'caixa') {
        content.innerHTML = `
            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:20px;">
                <div class="new-order-btn" onclick="abrirPDV('balcao', null)"><i class="fa-solid fa-store"></i><span>BALCÃO</span></div>
                <div class="new-order-btn" onclick="abrirPDV('delivery', null)"><i class="fa-solid fa-motorcycle"></i><span>DELIVERY</span></div>
            </div>
            
            <div class="caixa-section-title"><i class="fa-solid fa-chair"></i> Mesas</div>
            <div class="mesas-grid">
                ${userLogado.mesas.map(m => `<div class="mesa-card ${m.status}" onclick="abrirPDV('mesa', ${m.id})"><i class="fa-solid fa-chair"></i>Mesa ${m.id}</div>`).join('')}
            </div>
            
            <div class="caixa-section-title" style="margin-top:30px;"><i class="fa-solid fa-clipboard-list"></i> Pedidos em Aberto</div>
            <div class="kpi-grid" id="lista-pedidos-abertos">
                ${(!userLogado.pedidosAbertos || userLogado.pedidosAbertos.length === 0) 
                    ? '<div style="color:#aaa;">Nenhum pedido aberto.</div>' 
                    : userLogado.pedidosAbertos.map((p, idx) => `
                        <div class="pedido-card" onclick="abrirPDV('${p.tipo}', ${idx})">
                            <div class="pedido-info"><h4>${p.cliente || 'Sem Nome'}</h4><span>${p.tipo.toUpperCase()}</span></div>
                            <div class="pedido-total">R$ ${p.total.toFixed(2)}</div>
                        </div>`).join('')}
            </div>`;
    }
}


// ==================== GESTÃO DE PRODUTOS (CRUD) ====================
function renderProdutosLista(filtro = "") { 
    const lista = userLogado.produtos.filter(p => p.nome.toLowerCase().includes(filtro.toLowerCase())); 
    document.getElementById('content-area').innerHTML = `
        <div class="kpi-grid" style="grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));">
            ${lista.map(p => `
                <div class="prod-card ${p.pausado ? 'item-pausado' : ''}">
                    ${p.pausado ? '<div class="badge-pausado">PAUSADO</div>' : ''}
                    <div style="position:relative; height:120px;">
                        <img src="${getImg(p.img)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='${IMG_DEFAULT}'">
                        <div class="card-actions">
                            <button class="btn-action btn-edit" onclick="editarProduto(${p.id})"><i class="fa-solid fa-pen"></i></button>
                            <button class="btn-action btn-del" onclick="excluirProduto(${p.id})"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                    <div style="padding:10px;">
                        <span style="font-size:0.6rem; font-weight:700; color:var(--primary); background:#f0f9ff; padding:2px 6px; border-radius:4px;">${p.tipo.toUpperCase()}</span>
                        <h4 style="margin:5px 0; font-size:0.9rem;">${p.nome}</h4>
                        <strong style="font-size:1rem;">R$ ${p.preco.toFixed(2)}</strong>
                        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:3px;">Custo: R$ ${(p.custo || 0).toFixed(2)}</div>
                    </div>
                </div>`).join('')}
        </div>`; 
}

function abrirModalProduto() { 
    document.getElementById('modal-produto').classList.remove('hidden'); 
    document.getElementById('prod-id').value=""; 
    document.getElementById('prod-nome').value=""; 
    document.getElementById('prod-preco').value=""; 
    document.getElementById('prod-custo').value=""; 
    document.getElementById('prod-desc').value=""; 
    document.getElementById('prod-pausado').checked = false;
    document.getElementById('prod-cat').value="Lanches"; 
    document.getElementById('prod-img').value=""; 
    document.getElementById('modal-prod-titulo').innerText="Novo Produto"; 
}

function editarProduto(id) { 
    const p = userLogado.produtos.find(x=>x.id===id); 
    if(!p) return; 
    document.getElementById('prod-id').value=p.id; 
    document.getElementById('prod-nome').value=p.nome; 
    document.getElementById('prod-preco').value=p.preco; 
    document.getElementById('prod-custo').value=p.custo || ""; 
    document.getElementById('prod-desc').value=p.descricao || ""; 
    document.getElementById('prod-pausado').checked = p.pausado || false;
    document.getElementById('prod-cat').value=p.categoria; 
    document.getElementById('prod-img').value=p.img; 
    document.getElementById('modal-prod-titulo').innerText="Editar Produto"; 
    document.getElementById('modal-produto').classList.remove('hidden'); 
}

function fecharModalProduto() { document.getElementById('modal-produto').classList.add('hidden'); }

function salvarProduto(e) { 
    e.preventDefault(); 
    const id = document.getElementById('prod-id').value; 
    
    const dados = { 
        nome: document.getElementById('prod-nome').value, 
        preco: parseFloat(document.getElementById('prod-preco').value), 
        custo: parseFloat(document.getElementById('prod-custo').value || 0), 
        descricao: document.getElementById('prod-desc').value, 
        pausado: document.getElementById('prod-pausado').checked, 
        categoria: document.getElementById('prod-cat').value, 
        img: document.getElementById('prod-img').value, 
        tipo: 'padrao' 
    }; 
    
    if(id) { 
        const idx = userLogado.produtos.findIndex(p=>p.id==id); 
        if(idx!==-1) userLogado.produtos[idx]={...userLogado.produtos[idx], ...dados}; 
    } else { 
        userLogado.produtos.push({id:Date.now(), ...dados}); 
    } 
    salvarDB(); fecharModalProduto(); nav('prods'); 
}

function excluirProduto(id) { if(confirm("Apagar produto?")) { userLogado.produtos=userLogado.produtos.filter(p=>p.id!==id); salvarDB(); nav('prods'); } }

// Promos & Combos
function abrirModalPromo() { document.getElementById('modal-promo').classList.remove('hidden'); document.getElementById('grid-promo-items').innerHTML = userLogado.produtos.filter(p=>p.tipo==='padrao').map(p => `<div class="selection-card" onclick="selecionarItemPromo(this, ${p.id})"><div class="sel-check"><i class="fa-solid fa-check"></i></div><img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'"><div class="sel-info"><strong>${p.nome}</strong>R$ ${p.preco.toFixed(2)}</div></div>`).join(''); document.getElementById('selected-promo-id').value = ""; }
function selecionarItemPromo(el, id) { document.querySelectorAll('#grid-promo-items .selection-card').forEach(c => c.classList.remove('selected')); el.classList.add('selected'); document.getElementById('selected-promo-id').value = id; const prod = userLogado.produtos.find(x => x.id === id); if(prod) document.getElementById('promo-preco').value = prod.preco; }
function salvarPromocao(e) { e.preventDefault(); const idProd = parseInt(document.getElementById('selected-promo-id').value); if(!idProd) return alert("Selecione um produto!"); const p = userLogado.produtos.find(x => x.id === idProd); userLogado.produtos.push({id:Date.now(), tipo:'promo', nome:p.nome+" [OFERTA]", preco:parseFloat(document.getElementById('promo-preco').value), categoria:p.categoria, img:p.img, custo: p.custo, descricao: p.descricao, pausado: false}); salvarDB(); document.getElementById('modal-promo').classList.add('hidden'); nav('prods'); }

function abrirModalCombo() { document.getElementById('modal-combo').classList.remove('hidden'); document.getElementById('grid-combo-items').innerHTML = userLogado.produtos.filter(p=>p.tipo==='padrao').map(p => `<div class="selection-card" onclick="this.classList.toggle('selected')" data-id="${p.id}" data-nome="${p.nome}"><div class="sel-check"><i class="fa-solid fa-check"></i></div><img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'"><div class="sel-info"><strong>${p.nome}</strong>R$ ${p.preco.toFixed(2)}</div></div>`).join(''); }
function salvarCombo(e) { e.preventDefault(); const selecionados = Array.from(document.querySelectorAll('#grid-combo-items .selection-card.selected')); if(!selecionados.length) return alert("Selecione itens"); const desc = selecionados.map(el => el.getAttribute('data-nome')).join(" + "); userLogado.produtos.push({id:Date.now(), tipo:'combo', nome:document.getElementById('combo-nome').value, preco:parseFloat(document.getElementById('combo-preco').value), categoria:'Combos', img:document.getElementById('combo-img').value, descricao:desc, custo: 0, pausado: false}); salvarDB(); document.getElementById('modal-combo').classList.add('hidden'); nav('prods'); }


// ==================== SISTEMA PDV (CAIXA / COMANDA) ====================
function abrirPDV(t, id) { 
    tipoVendaAtual = t; 
    idMesaAtual = id; 
    carrinhoPDV = []; 
    
    document.getElementById('pdv-titulo').innerText = t === 'mesa' ? `Mesa ${id}` : t.toUpperCase();
    document.getElementById('modal-pdv').classList.remove('hidden');
    
    document.getElementById('pdv-10pct').checked = false;
    document.getElementById('pdv-entrega').value = 0;
    document.getElementById('search-pdv').value = "";
    document.getElementById('box-10pct').classList.add('hidden');
    document.getElementById('box-entrega').classList.add('hidden');
    
    const cartList = document.getElementById('pdv-carrinho');
    const oldInput = document.getElementById('pdv-cliente-nome');
    if(oldInput) oldInput.remove();

    if(t === 'mesa') {
        document.getElementById('box-10pct').classList.remove('hidden');
        document.getElementById('pdv-10pct').checked = true;
        
        const mesa = userLogado.mesas.find(m => m.id === id);
        if(mesa && mesa.pedidos) carrinhoPDV = JSON.parse(JSON.stringify(mesa.pedidos));
    } else {
        if(t === 'delivery') document.getElementById('box-entrega').classList.remove('hidden');
        
        const inputNome = document.createElement('input'); 
        inputNome.type = 'text'; 
        inputNome.id = 'pdv-cliente-nome'; 
        inputNome.className = 'search-bar'; 
        inputNome.placeholder = 'Nome do Cliente / Identificação'; 
        inputNome.style.marginBottom = '10px';
        cartList.prepend(inputNome);

        if(id !== null && userLogado.pedidosAbertos[id]) {
            const pedido = userLogado.pedidosAbertos[id];
            carrinhoPDV = JSON.parse(JSON.stringify(pedido.itens));
            inputNome.value = pedido.cliente || "";
            if(pedido.taxaEntrega) document.getElementById('pdv-entrega').value = pedido.taxaEntrega;
        }
    }
    renderPDVProdutos(); 
    atualizarCarrinhoDOM();
}

function renderPDVProdutos(f="") { 
    document.getElementById('pdv-lista-prods').innerHTML = userLogado.produtos.filter(p=>p.nome.toLowerCase().includes(f.toLowerCase())).map(p=>`
        <div class="pdv-prod-card" onclick="addAoCarrinho(${p.id})">
            <img src="${getImg(p.img)}" onerror="this.src='${IMG_DEFAULT}'">
            <div class="pdv-prod-info">
                <h4>${p.nome}</h4>
                <div class="pdv-prod-price">R$ ${p.preco.toFixed(2)}</div>
            </div>
            <div class="btn-add-overlay"><i class="fa-solid fa-plus"></i></div>
        </div>
    `).join(''); 
}

function addAoCarrinho(id) { 
    const e = carrinhoPDV.find(i=>i.id===id); 
    if(e) e.qtd++; 
    else carrinhoPDV.push({...userLogado.produtos.find(x=>x.id===id), qtd:1}); 
    atualizarCarrinhoDOM(); 
}

function alterarQtd(id,d) { 
    const i = carrinhoPDV.find(x=>x.id===id); 
    if(i) { i.qtd+=d; if(i.qtd<=0) carrinhoPDV=carrinhoPDV.filter(x=>x.id!==id); } 
    atualizarCarrinhoDOM(); 
}

function atualizarCarrinhoDOM() { 
    const inputNome = document.getElementById('pdv-cliente-nome');
    const container = document.getElementById('pdv-carrinho');
    
    const itemsHtml = carrinhoPDV.length === 0 
        ? '<div style="text-align:center; padding:20px; color:#aaa;">Carrinho Vazio</div>' 
        : carrinhoPDV.map(p=>`
            <div class="cart-item">
                <div><div style="font-weight:600">${p.nome}</div><small style="color:#666">R$ ${p.preco.toFixed(2)} x ${p.qtd}</small></div>
                <div style="text-align:right">
                    <div style="font-weight:700">R$ ${(p.preco*p.qtd).toFixed(2)}</div>
                    <div class="qty-ctrl" style="justify-content:flex-end; margin-top:5px;">
                        <button class="qty-btn" onclick="alterarQtd(${p.id},-1)">-</button>
                        <button class="qty-btn" onclick="alterarQtd(${p.id},1)">+</button>
                    </div>
                </div>
            </div>
          `).join('');
          
    container.innerHTML = itemsHtml;
    if(inputNome) container.prepend(inputNome); 
    atualizarTotalPDV(); 
}

function atualizarTotalPDV() { 
    let t = carrinhoPDV.reduce((a,b)=>a+(b.preco*b.qtd),0); 
    if(!document.getElementById('box-10pct').classList.contains('hidden') && document.getElementById('pdv-10pct').checked) t*=1.1; 
    if(!document.getElementById('box-entrega').classList.contains('hidden')) t+=parseFloat(document.getElementById('pdv-entrega').value||0); 
    
    document.getElementById('pdv-total-valor').innerText = `R$ ${t.toFixed(2)}`; 
    document.getElementById('pag-total').innerText = `R$ ${t.toFixed(2)}`; 
}

function cancelarPedido() { 
    if(!confirm("Cancelar o pedido atual?")) return; 
    
    if(tipoVendaAtual !== 'mesa' && idMesaAtual !== null) { 
        userLogado.pedidosAbertos.splice(idMesaAtual, 1); 
    } else if(tipoVendaAtual === 'mesa') { 
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        if(mesa) { mesa.status = 'livre'; mesa.pedidos = []; } 
    }
    
    carrinhoPDV = []; salvarDB(); fecharPDV(); nav('caixa'); 
}

function salvarComanda() {
    if(!carrinhoPDV.length) return alert("Carrinho vazio!");
    
    imprimirCupom(null, "PEDIDO COZINHA"); 
    
    if(tipoVendaAtual === 'mesa') {
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        mesa.pedidos = JSON.parse(JSON.stringify(carrinhoPDV)); 
        mesa.status = 'ocupada';
    } else {
        const nomeCliente = document.getElementById('pdv-cliente-nome').value || "Balcão";
        const taxaEntrega = parseFloat(document.getElementById('pdv-entrega').value || 0);
        let total = carrinhoPDV.reduce((a,b)=>a+(b.preco*b.qtd),0) + taxaEntrega;
        
        const novoPedido = { 
            id: Date.now(), cliente: nomeCliente, tipo: tipoVendaAtual, 
            itens: JSON.parse(JSON.stringify(carrinhoPDV)), total: total, taxaEntrega: taxaEntrega 
        };
        
        if(!userLogado.pedidosAbertos) userLogado.pedidosAbertos = [];
        if(idMesaAtual !== null) { 
            userLogado.pedidosAbertos[idMesaAtual] = novoPedido; 
        } else { 
            userLogado.pedidosAbertos.push(novoPedido); 
        }
    }
    salvarDB(); fecharPDV(); nav('caixa'); 
}

function imprimirConta() { 
    if(!carrinhoPDV.length) return alert("Carrinho vazio!"); 
    imprimirCupom(null, "CONFERÊNCIA DE CONTA"); 
}


// ==================== RECEBIMENTO & IMPRESSÃO ====================
function abrirPagamento() { 
    if(!carrinhoPDV.length) return alert("Carrinho vazio!"); 
    metodoPagamento = ''; 
    fecharPDV(); 
    document.getElementById('modal-pagamento').classList.remove('hidden'); 
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('selected')); 
    document.getElementById('area-troco').classList.add('hidden'); 
    atualizarTotalPDV(); 
}

function fecharPagamento() { document.getElementById('modal-pagamento').classList.add('hidden'); }

function selecionarPagamento(metodo, el) { 
    metodoPagamento = metodo; 
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('selected')); 
    el.classList.add('selected'); 
    if(metodo === 'dinheiro') document.getElementById('area-troco').classList.remove('hidden'); 
    else document.getElementById('area-troco').classList.add('hidden'); 
}

function calcularTroco() { 
    const total = parseFloat(document.getElementById('pag-total').innerText.replace('R$ ', '')); 
    const recebido = parseFloat(document.getElementById('valor-recebido').value || 0); 
    const troco = recebido - total; 
    document.getElementById('valor-troco').innerText = troco > 0 ? `R$ ${troco.toFixed(2)}` : "R$ 0.00"; 
}

function concluirPagamento() { 
    if(!metodoPagamento) return alert("Selecione a forma de pagamento!"); 
    
    let total = parseFloat(document.getElementById('pdv-total-valor').innerText.replace('R$ ', '')); 
    
    const novaVenda = { 
        id: Date.now(), tipo: tipoVendaAtual, total: total, 
        metodo: metodoPagamento, data: new Date().toLocaleString(), itens: [...carrinhoPDV] 
    }; 
    
    userLogado.vendas.push(novaVenda); 
    
    if(tipoVendaAtual === 'mesa') { 
        const mesa = userLogado.mesas.find(m => m.id === idMesaAtual); 
        mesa.status = 'livre'; mesa.pedidos = []; 
    } else if(idMesaAtual !== null) { 
        userLogado.pedidosAbertos.splice(idMesaAtual, 1); 
    }
    
    salvarDB(); 
    imprimirCupom(novaVenda, "CUPOM FISCAL"); 
    fecharPagamento(); 
    nav('caixa'); 
}

function imprimirCupom(venda, titulo = "CUPOM") { 
    const area = document.getElementById('print-area'); 
    const itens = venda ? venda.itens : carrinhoPDV; 
    const total = venda ? venda.total : parseFloat(document.getElementById('pdv-total-valor').innerText.replace('R$ ', '')); 
    const data = venda ? venda.data : new Date().toLocaleString(); 
    const metodo = venda ? venda.metodo : "A Pagar"; 
    
    let nomeCliente = "Cliente"; 
    const inputNome = document.getElementById('pdv-cliente-nome'); 
    if(inputNome && inputNome.value) nomeCliente = inputNome.value; 
    else if(venda && venda.cliente) nomeCliente = venda.cliente;
    
    area.innerHTML = `
        <div class="ticket">
            <h3>${userLogado.nome}</h3>
            <p>================================</p>
            <p>${titulo}</p>
            <p>${data}</p>
            <p>Cliente: ${nomeCliente}</p>
            <p>================================</p>
            <table class="ticket-table">
                ${itens.map(i => `<tr><td>${i.qtd}x ${i.nome.substring(0,18)}</td><td align="right">${(i.preco*i.qtd).toFixed(2)}</td></tr>`).join('')}
            </table>
            <div class="ticket-divider"></div>
            <div class="ticket-total">TOTAL: R$ ${total.toFixed(2)}</div>
            <p style="font-size:0.8rem; text-align:right">Pagamento: ${metodo.toUpperCase()}</p>
            <div class="ticket-divider"></div>
            <p>Obrigado pela preferência!</p>
        </div>
    `; 
    
    setTimeout(() => { window.print(); }, 100);
}

function fecharPDV() { document.getElementById('modal-pdv').classList.add('hidden'); }


// ==================== VISÃO DO CLIENTE / CARDÁPIO / HISTÓRICO ====================
function abrirQRCode() { 
    document.getElementById('modal-qrcode').classList.remove('hidden'); 
    const linkBase = window.location.href.split('?')[0]; 
    const linkFinal = `${linkBase}?loja=${userLogado.login}`; 
    document.getElementById('qr-image').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(linkFinal)}`; 
    document.getElementById('qr-link').href = linkFinal; 
    document.getElementById('qr-link').innerText = "Link do Cliente (Clique)"; 
}
function fecharQRCode() { document.getElementById('modal-qrcode').classList.add('hidden'); }

function abrirCardapioMobile(isCliente = false) { 
    document.getElementById('mobile-overlay').classList.remove('hidden'); 
    document.getElementById('mobile-overlay').style.setProperty('--brand-primary', userLogado.cor1); 
    document.getElementById('mob-title').innerText=userLogado.nome; 
    document.getElementById('mob-logo').src=getImg(userLogado.logo); 
    
    if(isCliente) document.querySelector('.btn-back-sys').classList.add('hidden'); 
    else document.querySelector('.btn-back-sys').classList.remove('hidden'); 
    
    const produtosAtivos = userLogado.produtos.filter(p => !p.pausado);
    
    const c = produtosAtivos.filter(p => p.tipo !== 'padrao'); 
    const i = produtosAtivos.filter(p => p.tipo === 'padrao'); 
    
    document.getElementById('area-combos').classList.toggle('hidden',!c.length); 
    
    document.getElementById('list-combos').innerHTML=c.map(p=>`
        <div class="combo-card-mob" style="border-left:4px solid ${userLogado.cor1}">
            <span class="tag-mob">${p.tipo}</span>
            <img src="${getImg(p.img)}">
            <div style="flex:1;">
                <h4>${p.nome}</h4>
                ${p.descricao ? `<p style="font-size:0.75rem; color:#666; margin-bottom:5px; line-height:1.2;">${p.descricao}</p>` : ''}
                <b>R$ ${p.preco.toFixed(2)}</b>
            </div>
        </div>
    `).join(''); 
    
    document.getElementById('list-padrao').innerHTML=i.map(p=>`
        <div class="item-card-mob">
            <img src="${getImg(p.img)}">
            <div style="flex:1;">
                <h4>${p.nome}</h4>
                ${p.descricao ? `<p style="font-size:0.75rem; color:#666; margin-bottom:5px; line-height:1.2;">${p.descricao}</p>` : ''}
                <small>${p.categoria}</small>
            </div>
            <b>R$ ${p.preco.toFixed(2)}</b>
        </div>
    `).join(''); 
}

function fecharCardapioMobile() { document.getElementById('mobile-overlay').classList.add('hidden'); }

function renderHistorico(f="") { 
    const l=userLogado.vendas.slice().reverse().filter(v=>v.data.includes(f)||v.total.toString().includes(f)); 
    document.getElementById('content-area').innerHTML = !l.length 
        ? `<div style="padding:40px;text-align:center;">Vazio</div>` 
        : `
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
                ${l.map(v=>`
                    <tr style="border-bottom:1px solid #e2e8f0;">
                        <td style="padding:15px;">${v.data}</td>
                        <td style="padding:15px;">${v.metodo ? v.metodo.toUpperCase() : '-'}</td>
                        <td style="padding:15px; font-weight:bold;">R$ ${v.total.toFixed(2)}</td>
                        <td style="padding:15px;">
                            <button class="btn-action" style="background:#555" onclick='imprimirCupom(${JSON.stringify(v)})'><i class="fa-solid fa-print"></i></button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`; 
}