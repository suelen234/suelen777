// Banco de dados dos produtos do BioMercado
const produtos = [
    { id: 1, nome: "Trichoderma harzianum", categoria: "fungos", preco: 45.00, desc: "Fungo protetor que combate doenças de raiz de forma natural.", emoji: "🍄" },
    { id: 2, nome: "Joaninhas Predadoras (Pack 50)", categoria: "insetos", preco: 22.50, desc: "Excelente combatente natural contra infestação de pulgões.", emoji: "🐞" },
    { id: 3, nome: "Vespa Trichogramma", categoria: "insetos", preco: 35.00, desc: "Microvespas eficazes no controlo de lagartas em hortas.", emoji: "🐝" },
    { id: 4, nome: "Adubo Orgânico de Algas", categoria: "biofertilizantes", preco: 18.90, desc: "Estimula o crescimento forte e saudável de frutos e folhas.", emoji: "🌱" },
    { id: 5, nome: "Bio-Inseticida de Neem", categoria: "biofertilizantes", preco: 15.00, desc: "Extrato natural repelente para mais de 200 espécies de pragas.", emoji: "🧪" },
    { id: 6, nome: "Maçãs Biológicas Gala (1kg)", categoria: "frutas", preco: 3.20, desc: "Cultivadas sem pesticidas químicos, direto do produtor.", emoji: "🍎" },
    { id: 7, nome: "Morangos Doces Eco (500g)", categoria: "frutas", preco: 4.50, desc: "Morangos 100% orgânicos protegidos por manejo biológico.", emoji: "🍓" },
    { id: 8, nome: "Beauveria bassiana", categoria: "fungos", preco: 48.00, desc: "Fungo ecológico para controle de mosca-branca e tripes.", emoji: "🧫" }
];

// Variáveis de estado globais
let totalItens = 0;
let precoTotal = 0.00;
let categoriaAtual = 'todos';

// Elementos do DOM capturados
const vitrine = document.getElementById('vitrineProdutos');
const inputBusca = document.getElementById('inputBusca');
const botoesFiltro = document.querySelectorAll('.btn-filtro');

// 1. Função de Renderização das listas usando forEach()
function renderizarProdutos(listaDeProdutos) {
    vitrine.innerHTML = ""; // Limpa a vitrine

    if (listaDeProdutos.length === 0) {
        vitrine.innerHTML = `<div class="sem-resultados">Nenhum bioinsumo ou produto encontrado...</div>`;
        return;
    }

    listaDeProdutos.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-produto';
        card.innerHTML = `
            <div class="emoji-img">${produto.emoji}</div>
            <h4>${produto.nome}</h4>
            <p class="desc">${produto.desc}</p>
            <div class="preco">${produto.preco.toFixed(2)} €</div>
            <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.preco})">Adicionar à Cesta</button>
        `;
        vitrine.appendChild(card);
    });
}

// 2. Lógica Combinada de Busca e Filtro por Categoria utilizando filter()
function executarFiltroEBusca() {
    const textoBusca = inputBusca.value.toLowerCase();

    const produtosFiltrados = produtos.filter(produto => {
        const correspondeCategoria = (categoriaAtual === 'todos' || produto.categoria === categoriaAtual);
        const correspondeTexto = produto.nome.toLowerCase().includes(textoBusca) || produto.desc.toLowerCase().includes(textoBusca);
        
        return correspondeCategoria && correspondeTexto;
    });

    renderizarProdutos(produtosFiltrados);
}

// 3. Ouvinte de Cliques nos Botões de Categoria
botoesFiltro.forEach(botao => {
    botao.addEventListener('click', (e) => {
        // Altera a classe ativa visualmente
        botoesFiltro.forEach(btn => btn.classList.remove('ativo'));
        e.target.classList.add('ativo');

        // Pega a categoria do botão clicado e atualiza a busca
        categoriaAtual = e.target.getAttribute('data-categoria');
        executarFiltroEBusca();
    });
});

// 4. Ouvinte de digitação na Barra de Pesquisa
inputBusca.addEventListener('input', executarFiltroEBusca);

// 5. Função de Compra: Incrementa e calcula os valores da Cesta
function adicionarAoCarrinho(preco) {
    totalItens += 1;
    precoTotal += preco;

    // Atualiza os valores na interface imediatamente
    document.getElementById('qtdCesta').innerText = `${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`;
    document.getElementById('totalCesta').innerText = `${precoTotal.toFixed(2)} €`;
}

// Inicialização: Exibe todos os produtos ao abrir o site
renderizarProdutos(produtos);