const qrisTotal = document.querySelector('#qrisTotal');
const checkout = JSON.parse(localStorage.getItem('miemeCheckout')) || { total: 0 };

function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);
}

qrisTotal.innerHTML = rupiah(checkout.total || 0);
