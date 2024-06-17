# Teste Lexter.ai (Full Stack)

## Introdução

O teste consiste em escrever um algoritmo que modifique um lista de objetos do tipo **Input** (definido em `src/input.ts`) para uma lista de objetos do tipo **Output** (definido em `src/output.ts`), usando Typescript e quaisquer outras ferramentas que deseje.

Faça um fork do projeto, desenvolva, `commit` e `push` para compartilhar conosco.

## Objetivos 

### Principal

Entender as estruturas de dados (**Input** e **Output**) e desenvolver o algoritmo descrito na introdução acima.

### Secundários

Desenvolver ou pelo menos elaborar sugestões de abordagens para o restante do stack:

* Frontend que receba inputs do usuário (no formato `src/input.ts`) e mostre o output (no formato `src/output.ts`);
* Backend com uma rota que receba o input, execute o algoritmo e responda o usuário;
* Testes unitários ou quaisquer tipos de testes que achar conveniente;
* Documentações que achar conveniente;
* O que mais achar conveniente (autenticação, banco de dados, dockerização, infra, CI/CD etc);

## Observações Gerais

* Não é esperada a execução de todos os objetivos secundários. O que não for feito (ou for feito de forma incompleta), se achar conveniente e couber no seu nível de senioridade, indique possiveis sugestões de abordagem para execução;
* Não existe uma resposta certa única para cada objetivo apresentado;
* O setup do Node.js com o Typescript já está feito para você, basta instalar as dependência e usar `npm start` para rodar o projeto;
* O arquivo de entrada do projeto é o `src/index.ts`;
* Não é obrigatória a utilização de nenhuma linguagem ou framework específicos, apesar de já haver um setup inicial com Node.js.

## Detalhes Sobre o Modelo de Dados

* Todos os níveis da lista de output devem estar em ordem crescente por entryId;
* Uma entrada deve ser filha da outra se o inicio do path de ambas for igual, ou seja, a entrada 'root/path' é filha da entrada 'root';
* A estrutura tem profundidade indefinida;
* A chave `fullPath` do Output é uma string com todos os elementos do path separados por `/`;
* A chave `currentPath` é o valor do path atual. Ou seja para a entrada de `fullPath` `roo/path` o seu `currentPath` é `path`;
* Os arquivos `src/input.ts` e `src/output.ts` tem um exemplo de um array de input e um de output.
