window.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
    const nome = document.getElementById("Name");
    const email = document.getElementById("Email");
    const idade = document.getElementById("Age");
    const tabela = document.getElementById("tabela").querySelector("tbody");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const nomeValor = nome.value.trim();
      const emailValor = email.value.trim();
      const idadeValor = idade.value.trim();
  
      if (!nomeValor || !emailValor || !idadeValor) {
        alert("Preencha todos os campos!");
        return;
      }
  
      const novaLinha = document.createElement("tr");
  
      novaLinha.innerHTML = `
        <td>${nomeValor}</td>
        <td>${emailValor}</td>
        <td>${idadeValor}</td>
      `;
  
      tabela.appendChild(novaLinha);
      form.reset();
    });
  });
  