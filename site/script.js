async function loadItems() {
  const res = await fetch("../data/concursos.json");
  const data = await res.json();
  renderItems(data.items);
  updateLastUpdated(data.updated_at);
}

function renderItems(items) {
  const searchInput = document.getElementById("search");
  const statusFilter = document.getElementById("status-filter");

  function filterItems() {
    const query = searchInput.value.toLowerCase();
    const status = statusFilter.value;
    const filtered = items.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.university.toLowerCase().includes(query);
      const matchesStatus = !status || item.status === status;
      return matchesQuery && matchesStatus;
    });
    displayItems(filtered);
  }

  searchInput.addEventListener("input", filterItems);
  statusFilter.addEventListener("change", filterItems);

  displayItems(items);
}

function displayItems(items) {
  const list = document.getElementById("items-list");
  list.innerHTML = "";

  if (!items.length) {
    list.innerHTML = "<p>Nenhum concurso encontrado.</p>";
    return;
  }

  for (const item of items) {
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p><strong>${item.university}</strong> — ${item.location}</p>
      <p>Status: <span class="status ${item.status.replace(" ", "-")}">${
      item.status
    }</span></p>
      <p>Deadline: ${item.deadline}</p>
    `;
    list.appendChild(div);
  }
}

function updateLastUpdated(updated_at) {
  const updated = new Date(updated_at).toLocaleString();
  document.getElementById(
    "last-updated"
  ).textContent = `Última atualização: ${updated}`;
}

loadItems();
