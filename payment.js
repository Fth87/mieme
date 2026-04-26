const bankList = document.querySelector('#bankList');
const ewalletList = document.querySelector('#ewalletList');
const vaList = document.querySelector('#vaList');
const qrisList = document.querySelector('#qrisList');
const paymentTotal = document.querySelector('#paymentTotal');

const checkout = JSON.parse(localStorage.getItem('miemeCheckout')) || {
  items: [],
  total: 0,
};

const metodeBank = [
  { nama: 'BCA', logo: 'img/payment/Bank_Central_Asia.svg' },
  { nama: 'BRI', logo: 'img/payment/BANK_BRI_logo.svg' },
  { nama: 'BNI', logo: 'img/payment/Bank_Negara_Indonesia_logo_(2004).svg' },
  { nama: 'Mandiri', logo: 'img/payment/Bank_Mandiri_logo_2016.svg' },
];

const metodeEwallet = [
  { nama: 'GoPay', logo: 'img/payment/Gopay_logo.svg' },
  { nama: 'DANA', logo: 'img/payment/Logo_dana_blue.svg' },
  { nama: 'OVO', logo: 'img/payment/Logo_ovo_purple.svg' },
  { nama: 'LinkAja', logo: 'img/payment/LinkAja.svg' },
];

const metodeVa = [
  { nama: 'VA BCA', logo: 'img/payment/Bank_Central_Asia.svg' },
  { nama: 'VA BRI', logo: 'img/payment/BANK_BRI_logo.svg' },
  { nama: 'VA BNI', logo: 'img/payment/Bank_Negara_Indonesia_logo_(2004).svg' },
  { nama: 'VA Mandiri', logo: 'img/payment/Bank_Mandiri_logo_2016.svg' },
];

const metodeQris = [{ nama: 'QRIS', logo: 'img/payment/Logo_QRIS.svg', link: 'qris.html' }];

function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);
}

function renderPayment(target, data) {
  target.innerHTML = data
    .map(
      (item) => `
        <button class="payment-card" ${item.link ? `onclick="window.location.href='${item.link}'"` : ''}>
          <img class="img-fluid w-50" src="${item.logo}" alt="${item.nama}" />
          <span class="fs-4">${item.nama}</span>
        </button>
      `
    )
    .join('');
}

paymentTotal.innerHTML = rupiah(checkout.total || 0);
renderPayment(bankList, metodeBank);
renderPayment(ewalletList, metodeEwallet);
renderPayment(vaList, metodeVa);
renderPayment(qrisList, metodeQris);
