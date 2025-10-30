const form = document.getElementById('customerForm');
const tableBody = document.querySelector('#directoryTable tbody');
const searchInput = document.getElementById('search');

let customers = JSON.parse(localStorage.getItem('customers')) || [];

const RATE_PER_MIN = 2.5; // ₹2.5 per minute

function displayCustomers(data = customers) {
  tableBody.innerHTML = '';
  data.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.address}</td>
      <td>${c.duration} min</td>
      <td class="bill">₹${(c.duration * RATE_PER_MIN).toFixed(2)}</td>
    `;
    tableBody.appendChild(tr);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const duration = parseFloat(document.getElementById('duration').value);

  customers.push({ name, phone, address, duration });
  localStorage.setItem('customers', JSON.stringify(customers));
  form.reset();
  displayCustomers();
});

searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase();
  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(query) ||
    c.phone.includes(query)
  );
  displayCustomers(filtered);
});

displayCustomers();
