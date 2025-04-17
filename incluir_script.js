const priceInput = document.getElementById('price');
const maskOptions = {
  mask: Number,
  scale: 2, // casas decimais
  signed: false,
  thousandsSeparator: '.',
  padFractionalZeros: true,
  normalizeZeros: true,
  radix: ',', // vírgula como separador decimal
  mapToRadix: ['.'] // se digitar ponto, ele converte para vírgula
};
const priceMask = IMask(priceInput, maskOptions);

let cropper;
let imagemBase64 = '';
const form = document.getElementById('formProduto');
const imagemInput = document.getElementById('imagemInput');
const previewImagem = document.getElementById('previewImagem');
const imagemCrop = document.getElementById('imagemCrop');
const resultado = document.getElementById('resultado');
const btnCrop = document.getElementById('btnCrop');
const modalCrop = new bootstrap.Modal(document.getElementById('modalCrop'));

if (imagemInput) {
  imagemInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      imagemCrop.src = reader.result;
      modalCrop.show(); // abre o modal
    };
    reader.readAsDataURL(file);
  });
}

if (btnCrop) {
  btnCrop.addEventListener('click', () => {
    if (cropper) {
      const canvas = cropper.getCroppedCanvas({
        width: 300,
        height: 300
      });
      imagemBase64 = canvas.toDataURL('image/jpeg');
      previewImagem.src = imagemBase64;
      previewImagem.classList.remove('d-none');
      modalCrop.hide();
      cropper.destroy();
      cropper = null;
    }
  });
}

document.getElementById('modalCrop').addEventListener('shown.bs.modal', () => {
  cropper = new Cropper(imagemCrop, {
    aspectRatio: 1,
    viewMode: 1
  });
});

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      title: document.getElementById('title').value,
      price: parseFloat(
        document.getElementById('price').value
          .replace(/\./g, '') 
          .replace(',', '.')
      ),
      description: document.getElementById('description').value,
      category: document.getElementById('category').value,
      image: imagemBase64 || "https://i.pravatar.cc" 
    };

    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.json();
    resultado.innerText = "Produto incluído com ID: " + result.id;
    resultado.classList.remove('d-none');
    window.scrollBy({ top: 80, behavior: 'smooth' });
    form.reset();
    priceMask.value = '';
    previewImagem.classList.add('d-none');
    previewImagem.src = '';
    imagemBase64 = '';
  });
}
