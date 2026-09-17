const apiUrl = "http://localhost:3000";

export async function getInitialMessage() {
  const response = await fetch(`${apiUrl}/chat`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Falha ao carregar a saudacao.");
  }

  return data.message;
}

export async function sendMessage(textoUsuario) {
  const resposta = await fetch(`${apiUrl}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: textoUsuario
    })
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.error || "Falha na requisicao.");
  }

  return dados.message;
}
