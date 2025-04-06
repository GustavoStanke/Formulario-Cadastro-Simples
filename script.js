document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formulario");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const nome = document.getElementById("Name").value.trim();
      const email = document.getElementById("Email").value.trim();
      const idade = document.getElementById("Age").value.trim();
  
      if (!nome || !email || !idade) {
        alert("Preencha todos os campos!");
        return;
      }
  
      const novoRegistro = { nome, email, idade };
  
      // Busca os registros existentes ou cria uma lista nova
      const registros = JSON.parse(localStorage.getItem("registros")) || [];
      registros.push(novoRegistro);
  
      // Salva no localStorage
      localStorage.setItem("registros", JSON.stringify(registros));
  
      alert("Cadastro realizado com sucesso!");
  
      // Redireciona para a página de registros
      window.location.href = "registros.html";
    });
  });
  