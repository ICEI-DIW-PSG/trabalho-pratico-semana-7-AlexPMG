const pokemons = [
  {
    id: 1,
    nome: "Bulbasaur",
    tipo: "Grama",
    cor: "success",
    imagem: "bulbasaur.png",  
    gif: "bulbasaur2.gif",    
    stats: "HP: 45 | ATK: 49 | DEF: 49 | SPA: 65 | SPD: 65 | SPE: 45",
    descricao: "Bulbasaur é o inicial do tipo grama da região de Kanto."
  },
  {
    id: 2,
    nome: "Charmander",
    tipo: "Fogo",
    cor: "danger",
    imagem: "charmander.png",
    gif: "charmander2.gif",
    stats: "HP: 39 | ATK: 52 | DEF: 43 | SPA: 60 | SPD: 50 | SPE: 65",
    descricao: "Charmander é o inicial do tipo fogo da região de Kanto."
  },
  {
    id: 3,
    nome: "Squirtle",
    tipo: "Água",
    cor: "primary",
    imagem: "squirtle.png",
    gif: "squirtle2.gif",
    stats: "HP: 44 | ATK: 48 | DEF: 65 | SPA: 50 | SPD: 64 | SPE: 43",
    descricao: "Squirtle é o inicial do tipo água da região de Kanto."
  }
];

function montarHome() {
  const container = document.getElementById('lista-pokemons');
  container.innerHTML = '';

  pokemons.forEach(p => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4';

    col.innerHTML = `
      <div class="card text-center bg-${p.cor} text-white h-100">
        <a href="detalhes.html?id=${p.id}" class="text-decoration-none text-white">
          <div class="card-img">
            <img src="${p.imagem}" alt="${p.nome}" class="static">
            <img src="${p.gif}" alt="${p.nome} animado" class="gif">
          </div>
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">${p.tipo}</p>
            <p class="card-text">${p.stats}</p>
          </div>
        </a>
      </div>
    `;

    container.appendChild(col);
  });
}
function montarDetalhes(id) {
  const container = document.getElementById('detalhes-item');
  const pIndex = pokemons.findIndex(item => item.id == id);

  if (pIndex === -1) {
    container.innerHTML = `<p>Pokémon não encontrado.</p>`;
    return;
  }

  const p = pokemons[pIndex];

  container.innerHTML = `
    <div class="detalhes-topo bg-${p.cor} text-white p-3 rounded-top">
      <h2>${p.nome}</h2>
      <img src="${p.imagem}" alt="${p.nome}" style="width:150px; height:150px; object-fit:contain;">
    </div>
    <div class="detalhes-info mt-3">
      <p><strong>Tipo:</strong> ${p.tipo}</p>
      <p><strong>Stats:</strong> ${p.stats}</p>
      <p><strong>Descrição:</strong> ${p.descricao}</p>

      <div class="d-flex justify-content-between mt-3">
        <button id="btn-anterior" class="btn btn-outline-primary">← Anterior</button>
        <a href="index.html" class="btn btn-secondary">Voltar</a>
        <button id="btn-proximo" class="btn btn-outline-primary">Próximo →</button>
      </div>
    </div>
  `;

  document.title = `Pokewiki - ${p.nome}`;

  const btnAnterior = document.getElementById('btn-anterior');
  const btnProximo = document.getElementById('btn-proximo');

  btnAnterior.addEventListener('click', () => {
    if (pIndex > 0) {
      const anterior = pokemons[pIndex - 1];
      montarDetalhes(anterior.id);
      history.replaceState(null, "", `?id=${anterior.id}`);
    }
  });

  btnProximo.addEventListener('click', () => {
    if (pIndex < pokemons.length - 1) {
      const proximo = pokemons[pIndex + 1];
      montarDetalhes(proximo.id);
      history.replaceState(null, "", `?id=${proximo.id}`);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('lista-pokemons')) {
    montarHome();
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (document.getElementById('detalhes-item') && id) {
    montarDetalhes(id);
  }
});
