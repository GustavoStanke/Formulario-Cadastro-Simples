document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/registros";

  const form = document.getElementById("formulario");
  const inputNome = document.getElementById("Name");
  const inputEmail = document.getElementById("Email");
  const inputIdade = document.getElementById("Age");

  // Verifica se há um ID na URL (modo edição)
  const urlParams = new URLSearchParams(window.location.search);
  const registroId = urlParams.get("id");

  // Se tiver ID, busca os dados para preencher o formulário
  if (registroId) {
    fetch(`${apiUrl}/${registroId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Registro não encontrado.");
        return res.json();
      })
      .then((registro) => {
        inputNome.value = registro.nome;
        inputEmail.value = registro.email;
        inputIdade.value = registro.idade;
      })
      .catch((err) => {
        console.error("Erro ao carregar registro:", err);
        alert("Erro ao carregar os dados para edição.");
      });
  }

  // Ao enviar o formulário
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dados = {
      nome: inputNome.value.trim(),
      email: inputEmail.value.trim(),
      idade: Number(inputIdade.value),
    };

    if (!dados.nome || !dados.email || isNaN(dados.idade)) {
      alert("Preencha todos os campos corretamente.");
      return;
    }

    const url = registroId ? `${apiUrl}/${registroId}` : apiUrl;
    const metodo = registroId ? "PUT" : "POST";

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!resposta.ok) throw new Error("Erro ao salvar.");

      alert(registroId ? "Registro atualizado com sucesso!" : "Registro cadastrado com sucesso!");
      window.location.href = "registros.html"; // redireciona após salvar
    } catch (erro) {
      console.error("Erro:", erro);
      alert("Falha ao salvar o registro.");
    }
  });
});
