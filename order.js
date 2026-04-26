if (window.AOS) AOS.init();

const menuOrder = document.querySelector('#menuOrder');
const cartList = document.querySelector('#cartList');
const cartTotal = document.querySelector('#cartTotal');
const checkoutBtn = document.querySelector('#checkoutBtn');

const menus = [
  {
    id: 1,
    nama: 'Mie Spesial Sambal Matah',
    deskripsi: 'Mie signature dengan sambal matah segar dan racikan rempah khas MieME.',
    gambar: 'img/mie1.png',
    harga: 28000,
  },
  {
    id: 2,
    nama: 'Mie Signature',
    deskripsi: 'Menu andalan dengan rasa autentik, gurih, dan tekstur mie yang lembut.',
    gambar: 'img/mi2.png',
    harga: 28000,
  },
  {
    id: 3,
    nama: 'Mie Goreng Topping Istimewah',
    deskripsi: 'Mie goreng lengkap dengan topping spesial untuk rasa yang lebih mantap.',
    gambar: 'img/mi3.png',
    harga: 30000,
  },
  {
    id: 4,
    nama: 'Mie Kuah Udang Spesial',
    deskripsi: 'Mie kuah gurih dengan udang segar dan aroma laut yang menggugah selera.',
    gambar: 'img/mi-udang.png',
    harga: 35000,
  },
  {
    id: 5,
    nama: 'Mie Kuah Spesial',
    deskripsi: 'Mie kuah hangat dengan bumbu spesial yang cocok dinikmati kapan saja.',
    gambar: 'img/mi-kuah-s.png',
    harga: 28000,
  },
  {
    id: 6,
    nama: 'Es Teh',
    deskripsi: 'Minuman teh dingin menyegarkan untuk menemani setiap menu MieME.',
    gambar: 'img/esteh.png',
    harga: 8000,
  },
  {
    id: 7,
    nama: 'Es Buah Segar',
    deskripsi: 'Potongan buah segar dengan kuah manis dingin yang menyegarkan.',
    gambar: 'img/esbuah.png',
    harga: 15000,
  },
  {
    id: 8,
    nama: 'Es Jeruk',
    deskripsi: 'Jeruk segar dingin dengan rasa manis dan asam yang pas.',
    gambar: 'img/esjeruk.png',
    harga: 10000,
  },
];

let cart = JSON.parse(localStorage.getItem('miemeCart')) || [];

function rupiah(angka) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);
}

function simpanCart() {
  localStorage.setItem('miemeCart', JSON.stringify(cart));
}

function cariCart(id) {
  return cart.find((item) => item.id == id);
}

function tambahCart(id) {
  const menu = menus.find((item) => item.id == id);
  const cartItem = cariCart(id);

  if (cartItem) {
    cartItem.qty += 1;
  } else {
    cart.push({ ...menu, qty: 1 });
  }

  simpanCart();
  renderCart();
}

function kurangCart(id) {
  const cartItem = cariCart(id);

  if (!cartItem) return;

  cartItem.qty -= 1;

  if (cartItem.qty <= 0) {
    cart = cart.filter((item) => item.id != id);
  }

  simpanCart();
  renderCart();
}

function renderMenu() {
  menuOrder.innerHTML = menus
    .map(
      (menu, index) => `
        <div class="col-lg-6" data-aos="zoom-in" data-aos-delay="${100 + index * 50}">
          <div class="menu-menu order-card row h-100 m-0">
            <div class="col-5 text-start text p-0 d-flex align-items-center justify-content-center order-card-img">
              <img src="${menu.gambar}" alt="${menu.nama}" />
            </div>
            <div class="col-7">
              <div class="order-card-body d-flex h-100 flex-column justify-content-between">
                <div>
                  <h1>${menu.nama}</h1>
                  <p class="mt-3">${menu.deskripsi}</p>
                </div>
                <div>
                  <div class="d-flex justify-content-start align-items-center">
                    <div class="porsi text-center">
                      <p class="m-0">Porsi</p>
                      <i class="bi bi-person-fill order-person"></i>
                    </div>
                    <svg class="mx-4" xmlns="http://www.w3.org/2000/svg" width="3" height="31" viewBox="0 0 3 31" fill="none">
                      <path d="M1.13452 29.0179L1.13452 1" stroke="#7A4818" stroke-width="2" stroke-linecap="round" />
                    </svg>
                    <div class="waktu-saji">
                      <p class="m-0">Waktu Penyajian</p>
                      <h2>25 Menit</h2>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-4">
                    <div class="price text-start">
                      <p class="m-0">Price</p>
                      <h2>${rupiah(menu.harga)}</h2>
                    </div>
                    <button class="tambah-order" onclick="tambahCart(${menu.id})">Tambah</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
    )
    .join('');
}

function renderCart() {
  const total = cart.reduce((hasil, item) => hasil + item.harga * item.qty, 0);

  if (cart.length == 0) {
    cartList.innerHTML = '<p class="m-0 cart-empty">Belum ada menu yang dipilih</p>';
  } else {
    cartList.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item mx-2">
            <img src="${item.gambar}" alt="${item.nama}" />
            <div>
              <h1>${item.nama}</h1>
              <p class="m-0">${rupiah(item.harga)} x ${item.qty}</p>
            </div>
            <div class="cart-action">
              <button onclick="kurangCart(${item.id})">-</button>
              <span>${item.qty}</span>
              <button onclick="tambahCart(${item.id})">+</button>
            </div>
          </div>
        `
      )
      .join('');
  }

  cartTotal.innerHTML = rupiah(total);
}

checkoutBtn.addEventListener('click', () => {
  if (cart.length == 0) return;

  localStorage.setItem(
    'miemeCheckout',
    JSON.stringify({
      items: cart,
      total: cart.reduce((hasil, item) => hasil + item.harga * item.qty, 0),
      tanggal: new Date().toISOString(),
    })
  );

  window.location.href = 'detail-order.html';
});

renderMenu();
renderCart();
