import http from "http";

const TOKEN = "8418247879:AAHL7bHRMNty0sjW4bpOY0qFbhjZ0jLur7A";
const API = `https://api.telegram.org/bot${TOKEN}`;

http.createServer((req, res) => res.end("ok")).listen(process.env.PORT || 3000);

async function sendMessage(chatId, text, replyMarkup = null) {
  await fetch(`${API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, reply_markup: replyMarkup, parse_mode: "HTML" })
  });
}

function mainKeyboard() {
  return {
    keyboard: [
      ["📰 Notícias de Hoje"],
      ["📚 Dica do Dia", "🎓 Educação no Brasil"],
      ["📊 Dados e Estatísticas", "📣 Nosso Canal"],
      ["ℹ️ Sobre"]
    ],
    resize_keyboard: true
  };
}

function canalButton() {
  return {
    inline_keyboard: [[
      { text: "📣 Seguir o Canal", url: "https://t.me/educacaoetransformacao" }
    ]]
  };
}

async function handleUpdate(update) {
  if (!update.message) return;
  const chatId = update.message.chat.id;
  const text = update.message.text;

  if (text === "/start") {
    await sendMessage(chatId,
      `👋 Olá! Bem-vindo ao <b>Educa Notícias</b>!\n\n` +
      `📰 Seu canal diário de informação sobre educação no Brasil.\n\n` +
      `Aqui você encontra:\n` +
      `• Notícias fresquinhas sobre educação\n` +
      `• Dados e estatísticas do setor\n` +
      `• Dicas de português e vocabulário\n` +
      `• Tendências e políticas educacionais\n\n` +
      `Escolha uma opção abaixo 👇`,
      mainKeyboard()
    );

  } else if (text === "📰 Notícias de Hoje") {
    await sendMessage(chatId,
      `📰 <b>NOTÍCIAS DE EDUCAÇÃO — 24/03/2026</b>\n\n` +
      `1️⃣ <b>Brasil supera meta de alfabetização</b>\n` +
      `O MEC anunciou que 66% das crianças estão alfabetizadas ao final do 2º ano do ensino fundamental, superando a meta de 64% prevista para 2025.\n\n` +
      `2️⃣ <b>Pé-de-Meia paga primeira parcela de 2026</b>\n` +
      `O programa beneficia mais de 6 milhões de estudantes do ensino médio em todo o Brasil. Os pagamentos desta semana já começaram a cair nas contas.\n\n` +
      `3️⃣ <b>Novo PNE em votação no Senado</b>\n` +
      `O Plano Nacional de Educação (PL 2614/2024) define 71 metas para os próximos 10 anos, incluindo valorização de professores e ampliação da educação integral.\n\n` +
      `4️⃣ <b>Computação vira disciplina obrigatória</b>\n` +
      `A partir de 2026, o ensino de computação e pensamento computacional passa a ser obrigatório em todas as escolas da educação básica.\n\n` +
      `5️⃣ <b>Evasão escolar cai 50% em 3 anos</b>\n` +
      `Dados do INEP mostram queda expressiva no abandono escolar, resultado de programas de transferência de renda e educação em tempo integral.\n\n` +
      `🔔 Quer receber notícias assim todo dia?`,
      canalButton()
    );

  } else if (text === "📚 Dica do Dia") {
    await sendMessage(chatId,
      `📚 <b>DICA DE PORTUGUÊS DO DIA</b>\n\n` +
      `🔤 <b>Palavra: PROTAGONISMO</b>\n\n` +
      `Significa: papel principal, liderança, destaque em uma ação.\n\n` +
      `📌 <b>No contexto educacional:</b>\n` +
      `"Protagonismo estudantil" é quando o aluno tem papel ativo no próprio aprendizado, participando de decisões e projetos na escola.\n\n` +
      `✅ <b>Exemplo de uso:</b>\n` +
      `"O novo ensino médio aposta no protagonismo juvenil como eixo central da formação."\n\n` +
      `🔤 <b>Palavra bônus: EVASÃO</b>\n\n` +
      `Significa: abandono, saída antecipada.\n\n` +
      `✅ <b>Exemplo:</b>\n` +
      `"A evasão escolar caiu pela metade nos últimos 3 anos no Brasil."\n\n` +
      `🔔 Siga nosso canal para dicas diárias!`,
      canalButton()
    );

  } else if (text === "🎓 Educação no Brasil") {
    await sendMessage(chatId,
      `🎓 <b>EDUCAÇÃO NO BRASIL EM 2026</b>\n\n` +
      `📌 <b>Principais programas ativos:</b>\n\n` +
      `🔹 <b>Pé-de-Meia</b> — poupança para estudantes do ensino médio\n` +
      `🔹 <b>Programa Mais Professores</b> — valorização e formação docente\n` +
      `🔹 <b>Educação em Tempo Integral</b> — 25,7% dos alunos já na escola integral\n` +
      `🔹 <b>Novo Ensino Médio</b> — 2.400h de formação geral + itinerários\n` +
      `🔹 <b>Computação nas Escolas</b> — obrigatório a partir de 2026\n\n` +
      `📌 <b>Desafios ainda em aberto:</b>\n\n` +
      `• Alfabetização plena até o 2º ano ainda não universal\n` +
      `• Desigualdade entre escolas públicas e privadas\n` +
      `• Formação de professores para novas tecnologias\n` +
      `• Infraestrutura digital em regiões remotas\n\n` +
      `🔔 Acompanhe tudo no nosso canal:`,
      canalButton()
    );

  } else if (text === "📊 Dados e Estatísticas") {
    await sendMessage(chatId,
      `📊 <b>DADOS E ESTATÍSTICAS — EDUCAÇÃO 2026</b>\n\n` +
      `👶 <b>Educação Infantil</b>\n` +
      `• 3,7 milhões de novas vagas criadas desde 2023\n` +
      `• Meta: universalizar pré-escola até 2026\n\n` +
      `📖 <b>Ensino Fundamental</b>\n` +
      `• 66% das crianças alfabetizadas ao final do 2º ano\n` +
      `• Evasão escolar caiu 50% em 3 anos\n` +
      `• 25,7% dos alunos em tempo integral\n\n` +
      `🎓 <b>Ensino Médio</b>\n` +
      `• 6 milhões de estudantes no Pé-de-Meia\n` +
      `• Novo modelo com itinerários formativos\n` +
      `• Taxa de conclusão subindo gradualmente\n\n` +
      `🏫 <b>Ensino Superior</b>\n` +
      `• ProUni e FIES mantidos com expansão de vagas\n` +
      `• ENEM 2025 teve recorde de inscritos: 6,1 milhões\n` +
      `• Crescimento de cursos EAD: +18% em 2025\n\n` +
      `💰 <b>Investimento</b>\n` +
      `• Fundeb: R$ 370 bilhões em 2026\n` +
      `• Brasil investe 6,1% do PIB em educação\n\n` +
      `🔔 Fique por dentro de tudo:`,
      canalButton()
    );

  } else if (text === "📣 Nosso Canal") {
    await sendMessage(chatId,
      `📣 <b>SIGA NOSSO CANAL!</b>\n\n` +
      `No canal <b>Educação e Transformação</b> você recebe:\n\n` +
      `📰 Notícias diárias sobre educação no Brasil\n` +
      `📊 Dados e estatísticas atualizados\n` +
      `📚 Dicas de português e vocabulário\n` +
      `🎓 Análises de políticas educacionais\n` +
      `💡 Conteúdo para estudantes e educadores\n\n` +
      `👇 Toque para seguir agora:`,
      canalButton()
    );

  } else if (text === "ℹ️ Sobre") {
    await sendMessage(chatId,
      `ℹ️ <b>Sobre o Educa Notícias</b>\n\n` +
      `Somos um serviço de curadoria e informação sobre educação no Brasil.\n\n` +
      `Nossa missão é levar conteúdo de qualidade sobre educação para estudantes, professores, pais e todos os que acreditam que a educação transforma vidas.\n\n` +
      `📩 Contato e suporte: @suportrodri\n\n` +
      `🔔 Siga nosso canal para não perder nada:`,
      canalButton()
    );

  } else {
    await sendMessage(chatId,
      `👇 Use o menu abaixo para navegar:`,
      mainKeyboard()
    );
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

startBot();
