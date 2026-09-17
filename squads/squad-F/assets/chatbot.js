import { getInitialMessage, sendMessage } from "./chatbot-api.js";
import {
  addMessage,
  createChatbot,
  removeLoadingMessage,
  setChatOpen,
  setSendingState
} from "./chatbot-ui.js";

const chatbot = createChatbot();

async function loadInitialMessage() {
  try {
    const message = await getInitialMessage();
    addMessage(chatbot.messages, message, "assistant");
  } catch (_error) {
    addMessage(chatbot.messages, "Nao foi possivel conectar ao assistente agora.", "assistant");
  }
}

async function handleMessage(textoUsuario) {
  addMessage(chatbot.messages, textoUsuario, "user");
  chatbot.input.value = "";
  setSendingState(chatbot, true);
  addMessage(chatbot.messages, "Pensando...", "loading");

  try {
    const resposta = await sendMessage(textoUsuario);
    removeLoadingMessage(chatbot.messages);
    addMessage(chatbot.messages, resposta, "assistant");
  } catch (error) {
    removeLoadingMessage(chatbot.messages);
    addMessage(chatbot.messages, error.message, "error");
  } finally {
    setSendingState(chatbot, false);
    chatbot.input.focus();
  }
}

chatbot.toggle.addEventListener("click", () => {
  setChatOpen(chatbot, chatbot.panel.hidden);
});

chatbot.close.addEventListener("click", () => {
  setChatOpen(chatbot, false);
});

chatbot.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const textoUsuario = chatbot.input.value.trim();
  if (textoUsuario) handleMessage(textoUsuario);
});

loadInitialMessage();
