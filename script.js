document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/registros";

  const form = document.getElementById("formulario");
  const inputId = document.getElementById("id"); // campo hidden
  const inputNome = document.getElementById("nome");
  const inputEmail = document.getElementById("email");
  const inputIdade = document.getElementById("idade");

  // 1. Verifica se tem id na URL
  const urlParams = new URLSearchParams(window.location.search);
  const registroId = urlParams.get("id");

  if (registroId) {
    fetch(`${apiUrl}/${registroId}`)
      .then((res) => res.json())
      .then((registro) => {
        inputId.value = registro.id;
        inputNome.value = registro.nome;
        inputEmail.value = registro.email;
        inputIdade.value = registro.idade;
      })
      .catch((err) => console.error("Erro ao carregar para edição:", err));
  }

  // 2. Enviar novo ou editar
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: inputNome.value,
      email: inputEmail.value,
      idade: parseInt(inputIdade.value),
    };

    const id = inputId.value;

    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const metodo = id ? "PUT" : "POST";

    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });

    window.location.href = "registros.html";
  });
});
