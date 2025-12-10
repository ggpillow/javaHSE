const loader = document.getElementById('loader');
const items = document.getElementById('items');

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://students.netoservices.ru/nestjs-backend/slow-get-courses');
xhr.responseType = 'json';

xhr.addEventListener('load', () => {
  loader.classList.remove('loader_active');

  if (xhr.status !== 200) {
    console.error('Ошибка загрузки, статус:', xhr.status);
    return;
  }

  const data = xhr.response;
  const valute = data.response.Valute;

  items.innerHTML = '';

  for (const code in valute) {
    const currency = valute[code];

    const item = document.createElement('div');
    item.classList.add('item');

    const codeDiv = document.createElement('div');
    codeDiv.classList.add('item__code');
    codeDiv.textContent = currency.CharCode;

    const valueDiv = document.createElement('div');
    valueDiv.classList.add('item__value');
    valueDiv.textContent = currency.Value;

    const rubDiv = document.createElement('div');
    rubDiv.classList.add('item__currency');
    rubDiv.textContent = 'руб.';         

    item.append(codeDiv, valueDiv, rubDiv);
    items.appendChild(item);
  }
});

xhr.addEventListener('error', () => {
  loader.classList.remove('loader_active');
  console.error('Ошибка сети');
});

xhr.send();
