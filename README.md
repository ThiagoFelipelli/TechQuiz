# TechQuiz: Banco de Dados

Quiz de múltipla escolha sobre **banco de dados** (SQL, chaves, JOIN e índices). Cada pergunta tem 4 alternativas, explicação após a resposta e um link para a fonte.

## Tema
Banco de Dados

## Integrantes
- Thiago Felipelli 
- Jair Siquera 
- Vitor Cordeiro

## Como executar
1. Clone o repositório: `git clone URL-DO-REPOSITORIO`
2. Abra a pasta no VS Code e use a extensão **Live Server** (botão direito em `index.html` > Open with Live Server). Se abrir o arquivo direto no navegador, o jogo usa a cópia `perguntas-backup.js`.
3. Clique em **Começar a jogar** para responder o quiz.

## Estrutura
| Arquivo | Função |
| --- | --- |
| `index.html` | Página inicial: nome, tema, descrição e botão para jogar |
| `jogo.html` | Estrutura da tela de jogo: progresso, pergunta, alternativas, feedback |
| `style.css` | CSS base: paleta, tipografia e componentes |
| `jogo.js` | Lógica: lê o JSON, mostra perguntas, confere respostas e mostra o resultado |
| `perguntas-backup.js` | Cópia do JSON para o jogo funcionar sem servidor (atualize junto com o JSON) |
| `perguntas.json` | Questões modelo que o CP2 vai consumir |

## Formato do `perguntas.json`
Cada questão tem: `pergunta`, `alternativas` (lista de 4), `resposta` (posição da certa, começando em 0), `explicacao` e `fonte` (link).

## Site publicado
URL: https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/

## Entrega
Tag: `cp1-entrega`
