export function createChatbot() {
  const widget = document.createElement("section");
  widget.className = "chatbot-widget";
  widget.setAttribute("aria-label", "Assistente virtual do Squad F");
  widget.innerHTML = `
    <button class="chatbot-toggle" type="button" aria-expanded="false" aria-controls="chatbot-panel">
      <span class="chatbot-logo" aria-hidden="true">
        <span></span><span></span><span></span>
      </span>
      <span>Assistente</span>
    </button>
    <div class="chatbot-panel" id="chatbot-panel" hidden>
      <div class="chatbot-header">
        <div>
          <strong>Assistente Squad F</strong>
          <span>Tire suas duvidas sobre os participantes</span>
        </div>
        <button class="chatbot-close" type="button" aria-label="Fechar assistente">&times;</button>
      </div>
      <div class="chatbot-messages" aria-live="polite" aria-label="Mensagens do assistente"></div>
      <form class="chatbot-form">
        <label class="sr-only" for="chatbot-input">Digite sua duvida</label>
        <input id="chatbot-input" name="message" type="text" autocomplete="off" placeholder="Digite sua duvida..." required />
        <button type="submit" aria-label="Enviar mensagem">Enviar</button>
      </form>
    </div>
  `;

  document.body.append(widget);

  return {
    close: widget.querySelector(".chatbot-close"),
    form: widget.querySelector(".chatbot-form"),
    input: widget.querySelector("#chatbot-input"),
    messages: widget.querySelector(".chatbot-messages"),
    panel: widget.querySelector(".chatbot-panel"),
    submit: widget.querySelector("button[type='submit']"),
    toggle: widget.querySelector(".chatbot-toggle")
  };
}

export function addMessage(messages, text, type) {
  const message = document.createElement("p");
  message.className = `chatbot-message chatbot-message-${type}`;
  message.textContent = text;
  messages.append(message);
  messages.scrollTop = messages.scrollHeight;
}

export function removeLoadingMessage(messages) {
  messages.querySelector(".chatbot-message-loading")?.remove();
}

export function setChatOpen(chatbot, isOpen) {
  chatbot.panel.hidden = !isOpen;
  chatbot.toggle.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) chatbot.input.focus();
}

export function setSendingState(chatbot, isSending) {
  chatbot.input.disabled = isSending;
  chatbot.submit.disabled = isSending;
}
