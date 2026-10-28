// TechQuiz: lógica do jogo. Lê perguntas.json e controla as respostas.

let perguntas = [];
let atual = 0;
let acertos = 0;
let terminou = false;

const progressoEl = document.getElementById('progresso');
const perguntaEl = document.getElementById('pergunta');
const alternativasEl = document.getElementById('alternativas');
const feedbackEl = document.getElementById('feedback');
const proximaEl = document.getElementById('proxima');

// 1) Carrega o JSON (ou a cópia local, se abrir o arquivo direto) e começa o quiz
async function carregar() {
  try {
    const resposta = await fetch('perguntas.json');
    if (!resposta.ok) throw new Error('Erro HTTP ' + resposta.status);
    perguntas = await resposta.json();
  } catch (erro) {
    // Sem servidor o navegador bloqueia o fetch: usa a cópia em perguntas-backup.js
    perguntas = window.PERGUNTAS_BACKUP || [];
  }

  if (perguntas.length === 0) {
    progressoEl.textContent = 'Erro ao carregar';
    perguntaEl.textContent = 'Não foi possível carregar as perguntas.';
    alternativasEl.textContent = '';
    feedbackEl.textContent = 'Confira se o arquivo perguntas.json está na mesma pasta.';
    proximaEl.hidden = true;
    return;
  }
  mostrar();
}

// 2) Mostra a pergunta atual e cria um botão por alternativa
function mostrar() {
  const p = perguntas[atual];
  progressoEl.textContent = `Pergunta ${atual + 1} de ${perguntas.length}`;
  perguntaEl.textContent = p.pergunta;
  feedbackEl.textContent = 'Escolha uma alternativa.';

  alternativasEl.textContent = '';
  p.alternativas.forEach((texto, i) => {
    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'alternativa';
    botao.textContent = texto;
    botao.addEventListener('click', () => responder(i));
    alternativasEl.appendChild(botao);
  });

  proximaEl.disabled = true;
  proximaEl.textContent = 'Próxima pergunta';
}

// 3) Confere a resposta, pinta as alternativas e mostra o feedback
function responder(escolhida) {
  const p = perguntas[atual];
  const botoes = alternativasEl.querySelectorAll('.alternativa');

  botoes.forEach((b, i) => {
    b.disabled = true;
    if (i === p.resposta) b.classList.add('certa');
  });

  const acertou = escolhida === p.resposta;
  if (acertou) acertos++;
  else botoes[escolhida].classList.add('errada');

  const titulo = document.createElement('strong');
  titulo.textContent = acertou ? 'Correto! ' : 'Não foi dessa vez. ';

  const explicacao = document.createElement('span');
  explicacao.textContent = p.explicacao + ' ';

  const link = document.createElement('a');
  link.href = p.fonte;
  link.target = '_blank';
  link.rel = 'noopener';
  link.textContent = 'Ver fonte';

  feedbackEl.textContent = '';
  feedbackEl.append(titulo, explicacao, link);

  proximaEl.disabled = false;
  if (atual === perguntas.length - 1) proximaEl.textContent = 'Ver resultado';
}

// 4) Tela final
function fim() {
  terminou = true;
  progressoEl.textContent = 'Quiz concluído';
  perguntaEl.textContent = `Você acertou ${acertos} de ${perguntas.length}`;
  alternativasEl.textContent = '';
  feedbackEl.textContent = 'Obrigado por jogar o TechQuiz!';
  proximaEl.disabled = false;
  proximaEl.textContent = 'Jogar de novo';
}

// 5) Botão principal: avança, mostra o resultado ou reinicia
proximaEl.addEventListener('click', () => {
  if (terminou) {
    atual = 0;
    acertos = 0;
    terminou = false;
    mostrar();
  } else if (atual < perguntas.length - 1) {
    atual++;
    mostrar();
  } else {
    fim();
  }
});

carregar();
