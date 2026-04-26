const detailList = document.querySelector('#detailList');
const detailTotal = document.querySelector('#detailTotal');
const bayarBtn = document.querySelector('#bayarBtn');

const checkout = JSON.parse(localStorage.getItem('miemeCheckout')) || {
  items: JSON.parse(localStorage.getItem('miemeCart')) || [],
  total: 0,
};

function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);
}

const total = checkout.items.reduce((hasil, item) => hasil + item.harga * item.qty, 0);

if (checkout.items.length == 0) {
  detailList.innerHTML = '<p class="m-0 detail-empty">Belum ada pesanan. Silakan pilih menu dahulu.</p>';
  bayarBtn.disabled = true;
} else {
  detailList.innerHTML = checkout.items
    .map(
      (item) => `
        <div class="detail-item">
          <img src="${item.gambar}" alt="${item.nama}" />
          <div>
            <h1>${item.nama}</h1>
            <p class="m-0">${rupiah(item.harga)} x ${item.qty}</p>
          </div>
          <h2>${rupiah(item.harga * item.qty)}</h2>
        </div>
      `
    )
    .join('');
}

detailTotal.innerHTML = rupiah(total);

bayarBtn.addEventListener('click', () => {
  localStorage.setItem('miemeCheckout', JSON.stringify({ ...checkout, total }));
  window.location.href = 'payment.html';
});
