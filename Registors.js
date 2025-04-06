document.addEventListener("DOMContentLoaded", () => {
    const tabela = document.querySelector("#tabela tbody");
    let registros = JSON.parse(localStorage.getItem("registros")) || [];
  
    function renderTabela() {
      tabela.innerHTML = "";
  
      registros.forEach((item, index) => {
        const linha = document.createElement("tr");
  
        linha.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.email}</td>
          <td>${item.idade}</td>
          <td>
            <button class="btn btn-outline-danger btn-sm" data-index="${index}">
             <i class="bi bi-trash3-fill"></i>
            </button>
          </td>
        `;
  
        tabela.appendChild(linha);
      });
  
      document.querySelectorAll("button[data-index]").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const i = e.target.closest("button").getAttribute("data-index");
          registros.splice(i, 1);
          localStorage.setItem("registros", JSON.stringify(registros));
          renderTabela();
        });
      });
    }
  
    renderTabela();
  });
  