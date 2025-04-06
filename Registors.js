document.addEventListener("DOMContentLoaded", () => {
  const tabela = document.querySelector("#tabela tbody");
  const apiUrl = "http://localhost:3000/registros";

  async function carregarRegistros() {
    try {
      const resposta = await fetch(apiUrl);
      if (!resposta.ok) throw new Error("Erro ao carregar os dados");
      const dados = await resposta.json();

      tabela.innerHTML = "";

      dados.forEach((item) => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
          <td>${item.nome}</td>
          <td>${item.email}</td>
          <td>${item.idade}</td>
          <td>
          <a href="index.html?id=${item.id}" class="btn btn-sm btn-warning">e</a>
          <button class="btn btn-sm btn-danger btn-excluir" data-id="${item.id}">&times;</button>
        </td>
        `;

        tabela.appendChild(linha);
      });

      adicionarEventosDeExcluir();
    } catch (erro) {
      console.error("Erro ao carregar registros:", erro);
    }
  }

  function adicionarEventosDeExcluir() {
    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");

        try {
          const resposta = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
          });

          if (!resposta.ok) throw new Error("Erro ao excluir");

          carregarRegistros(); // Atualiza a tabela
        } catch (err) {
          console.error("Erro ao excluir registro:", err);
        }
      });
    });
  }

  carregarRegistros();
});
