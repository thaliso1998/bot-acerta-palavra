const TOKEN = "8690262996:AAEUjP1OZ9ZXCcx0BQcpo28loEyqY0bn7Pk";
const API = `https://api.telegram.org/bot${TOKEN}`;

async function sendMessage(chatId, text, replyMarkup = null) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: replyMarkup,
      parse_mode: "HTML"
    })
  });
}

function mainKeyboard() {
  return {
    keyboard: [
      ["🎯 Jogar Agora"],
      ["🔥 Desafio Relâmpago", "❓ Como funciona"],
      ["📞 Suporte"]
    ],
    resize_keyboard: true
  };
}

function miniAppButton() {
  return {
    inline_keyboard: [[
      {
        text: "🎮 JOGAR AGORA",
        web_app: { url: "https://acertapalavra.com/" }
      }
    ]]
  };
}

async function handleUpdate(update) {
  if (!update.message) return;
  const chatId = update.message.chat.id;
  const text = update.message.text;

  if (text === "/start") {
    await sendMessage(chatId, "🎮 <b>Bem-vindo ao Acerta a Palavra!</b>\n\nEscolha uma opção abaixo e comece a jogar agora 👇", mainKeyboard());
  } else if (text === "🎯 Jogar Agora") {
    await sendMessage(chatId, "🔥 Bora testar sua sorte e habilidade?\n\nClique abaixo e comece agora 👇", miniAppButton());
  } else if (text === "🔥 Desafio Relâmpago") {
    await sendMessage(chatId, "🔥 <b>DESAFIO RELÂMPAGO ATIVO!</b>\n\n💸 Jogue agora e ganhe <b>RECOMPENSA EM DOBRO</b> nas suas vitórias!\n\nAproveite enquanto está disponível 👇", miniAppButton());
  } else if (text === "❓ Como funciona") {
    await sendMessage(chatId, "🧠 <b>Como funciona o jogo?</b>\n\nÉ simples e viciante:\n\n🔤 Você recebe uma palavra com uma letra faltando\n🎯 Escolhe entre 3 opções possíveis\n\n✅ Acertou?\n💸 Ganha o prêmio na hora!\n\n⚡ Rápido, fácil e pode te dar ganhos imediatos\n\nTeste agora 👇", miniAppButton());
  } else if (text === "📞 Suporte") {
    await sendMessage(chatId, "📞 Precisa de ajuda?\n\nFale diretamente com nosso suporte:\n👉 @suportrodri");
  }
}

async function startBot() {
  let offset = 0;
  while (true) {
    try {
      const res = await fetch(`${API}/getUpdates?timeout=30&offset=${offset}`);
      const data = await res.json();
      if (!data.ok || !Array.isArray(data.result)) continue;
      for (const update of data.result) {
        offset = update.update_id + 1;
        await handleUpdate(update);
      }
    } catch (e) {
      console.error("Erro:", e.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
}
