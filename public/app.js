const pokemons = [
  {
    id: 1,
    nome: "Squirtle",
    tipo: "Água",
    stats: "HP 44, ATK 48, DEF 65, SPA 50, SPD 64, SPE 43",
    imagem: "squirtle.png",
    gif: "squirtle2.gif",
    descricao: "Squirtle é um Pokémon do tipo Água."
  },
  {
    id: 2,
    nome: "Bulbasaur",
    tipo: "Grama/Venenoso",
    stats: "HP 45, ATK 49, DEF 49, SPA 65, SPD 65, SPE 45",
    imagem: "bulbasaur.png",
    gif: "bulbasaur2.gif",
    descricao: "Bulbasaur é um Pokémon do tipo Grama/Venenoso."
  },
  {
    id: 3,
    nome: "Charmander",
    tipo: "Fogo",
    stats: "HP 39, ATK 52, DEF 43, SPA 60, SPD 50, SPE 65",
    imagem: "charmander.png",
    gif: "charmander2.gif",
    descricao: "Charmander é um Pokémon do tipo Fogo."
  }
];

function montarHome() {
  const container = document.querySelector('.row'); 
  if (!container) return;

  container.innerHTML = '';

  pokemons.forEach(p => {
    const col = document.createElement('div');
    col.classList.add('col-md-4');

    col.innerHTML = `
      <div class="card text-center h-100 ${
        p.tipo.includes('Água') ? 'bg-primary' : p.tipo.includes('Fogo') ? 'bg-danger' : 'bg-success'
      } text-white">
        <a href="detalhes.html?id=${p.id}">
          <div class="card-img position-relative">
            <img src="${p.imagem}" alt="${p.nome}" class="static">
            <img src="${p.gif}" alt="${p.nome} animado" class="gif">
          </div>
        </a>
        <div class="card-body">
          <h5 class="card-title">${p.nome}</h5>
          <p class="card-text">Tipo: ${p.tipo}</p>
          <p class="card-text">Stats: ${p.stats}</p>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function montarDetalhes() {
  const container = document.getElementById('detalhes-item');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id')); 
  const p = pokemons.find(i => i.id === id);

  if (!p) {
    container.innerHTML = '<p>Pokémon não encontrado.</p>';
    return;
  }

  container.innerHTML = `
    <h2>${p.nome}</h2>
    <img src="${p.imagem}" alt="${p.nome}" class="img-fluid mb-3" style="max-width: 300px; border-radius: 15px;">
    <p><strong>Tipo:</strong> ${p.tipo}</p>
    <p><strong>Stats:</strong> ${p.stats}</p>
    <p>${p.descricao}</p>
    <a href="index.html" class="btn btn-primary mt-3">Voltar</a>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('.row')) {
    montarHome();
  }
  if (document.getElementById('detalhes-item')) {
    montarDetalhes();
  }
});
