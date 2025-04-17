const lista = document.getElementById('listaProdutos');
if (lista) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(produtos => {
      produtos.forEach(p => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-4 col-lg-3';

        col.innerHTML = `
          <div class="card h-100 shadow-sm border-0">
            <img src="${p.image}" class="card-img-top p-3" alt="${p.title}" style="height: 250px; object-fit: contain;">
            <div class="card-body d-flex flex-column">
              <h6 class="card-title fw-semibold">${p.title}</h6>
              <p class="card-text small text-muted">${p.description.substring(0, 80)}...</p>
              <div class="mt-auto">
                <span class="badge bg-success fs-6">R$ ${p.price.toFixed(2)}</span>
              </div>
            </div>
          </div>
        `;

        lista.appendChild(col);
      });
    });
}


const scrollTopBtn = document.getElementById('scrollTopBtn');

window.onscroll = function() {
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
