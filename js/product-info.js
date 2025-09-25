const productID = localStorage.getItem('productID');
const url = `https://japceibal.github.io/emercado-api/products/${productID}.json`;

window.addEventListener('DOMContentLoaded', () => {
  mostrarUsuarioLogueado('#userNav', false);
  // 1. PRIMER FETCH: para los detalles del producto
  fetch(url)
    .then((res) => res.json())
    .then((producto) => {
      document.getElementById('product-name').textContent = producto.name;
      document.getElementById(
        'product-category'
      ).textContent = ` ${producto.category}`;
      document.getElementById(
        'product-sold'
      ).textContent = `Vendidos: ${producto.soldCount}`;
      document.getElementById(
        'product-description'
      ).innerHTML = `  <h5 class="fw-bold mb-2">Descripción del producto:</h5>  <p>${producto.description}</p>
`;
      const carouselInner = document.getElementById('carousel-inner');
      const thumbsContainer = document.getElementById('carousel-thumbs');

      producto.images.forEach((imgUrl, index) => {
        // Imagen grande
        const item = document.createElement('div');
        item.className = 'carousel-item' + (index === 0 ? ' active' : '');
        item.innerHTML = `<img src="${imgUrl}" class="d-block w-100" alt="${producto.name}">`;
        carouselInner.appendChild(item);
        // Miniaturas
        const thumbCol = document.createElement('div');
        thumbCol.className = 'col-auto mb-2';
        thumbCol.innerHTML = `
        <img src="${imgUrl}" class="img-fluid img-thumbnail" style="cursor:pointer; max-width:80px;" data-bs-target="#product-images" data-bs-slide-to="${index}">
        `;
        thumbsContainer.appendChild(thumbCol);
      });

      // Resaltar miniatura activa
      const carouselElement = document.getElementById('product-images');
      const thumbs = thumbsContainer.querySelectorAll('img');
      thumbs[0].classList.add('active-thumb');

      carouselElement.addEventListener('slide.bs.carousel', function (e) {
        thumbs.forEach((img) => img.classList.remove('active-thumb'));
        thumbs[e.to].classList.add('active-thumb');
      });
    })
    .catch((err) => {
      document.querySelector('.container').innerHTML = `
        <div class="alert alert-danger text-center" role="alert">
        Error al cargar el producto: ${err}
        </div>
    `;
    });
  // 2. SEGUNDO FETCH: para los comentarios
  fetch(
    `https://japceibal.github.io/emercado-api/products_comments/${productID}.json`
  )
    .then((res) => res.json())
    .then((comments) => {
      mostrarComentarios(comments);
    })
    .catch((err) => {
      console.error('Error al cargar los comentarios:', err);
    });
});

// comentarios
function mostrarComentarios(comments) {
  const contenedor = document.getElementById('comentarios-container');
  contenedor.innerHTML = '';
  comments.forEach((comment) => {
    const comentarioSitio = document.createElement('div');
    comentarioSitio.className = 'list-group-item'; //bootstrap

    // calificaciones
    const estrellas = generarEstrellas(comment.score);
    comentarioSitio.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-1">${comment.user}</h5>
                <small class="text-muted">${comment.dateTime}</small>
            </div>
            <p class="mb-1">${comment.description}</p>
            <div>${estrellas}</div>
        `;
    contenedor.appendChild(comentarioSitio);

    function generarEstrellas(score) {
      let estrellasHTML = '';
      for (let i = 1; i <= 5; i++) {
        if (i <= score) {
          estrellasHTML += `<span class="fa fa-star checked text-warning"></span>`;
        } else {
          estrellasHTML += `<span class="fa fa-star"></span>`;
        }
      }
      return estrellasHTML;
    }
  });
}

// Botón de regreso a la categoría
document.getElementById('back-to-category').addEventListener('click', () => {
  const catID = localStorage.getItem('catID');
  if (catID) {
    window.location.href = 'products.html';
  } else {
    window.location.href = 'categories.html';
  }
});
