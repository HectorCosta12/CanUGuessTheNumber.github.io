//colocar o id="form" no index.html para ser possível buscar o elemento por ID: <form id = "form">
const form = document.getElementById("form"); 
form.addEventListener("submit", handleSubmit); 

//Varriáveis
let statusInput = document.getElementById('status'); //h2 do index.html - linha 32
let attempt = document.getElementById('attempt'); //span do index.html - linha 33
let result = document.getElementById('result'); //seção do index.html - linha 31

//objetco que vai limitar o mínimo e máximo de números
const Guess = {
    max: 100, //número máximo
    attemptsNumber: 0, //número de tentativas
    numberDrawn: function randmValue(){ //função que vai gerar número aleatório
        return Math.round(Math.random()* this.max);
    } //Math.random gera um número aleatório vezes o número máximo, mas vem com casas decimais, 
      // por isso usa-se Math.round para se arrendoar a a um número inteiro
};

let numberDrawn = Guess.numberDrawn(); //recebe o número aleatório

//Função que recebe dois parâmetros de entrada: o de tentativa e o valor
function updateAttempt(attempt, value){
    attempt.innerHTML = 'Attempts: ' + value //valor da tentativa
};

//Função handleSubmit - a mais importante para o nosso jogo
//Vamos programar toda a funcionalidade.
function handleSubmit(e){
    e.preventDefault(); //preveni que não carregue a página antes de preencher o formulário
    let kick = document.getElementById('kick').value; //vai buscar o valor

    //Validação
    /*if(!kick){ //se não tiver qualquer valor introduzido, pedimos ao utilizador para inserir
        alert('Digite algum valor entre 0 a 10');
        return;
    };*/
    if(kick>100){
        alert('The number needs to be maximum 100');
        return;
    };

    if(kick<0){
        alert('The number needs to be minimum 0');
        return;
    };

    //Quando passa a validação verificamos a tentativa do utilizador
    updateAttempt(attempt, ++Guess.attemptsNumber); //++Guess.attemptsNumber adiciona +1

    //Verificar se ganhou
    if(numberDrawn==kick){
        playAgain(); //faz com que apareça o botão para jogar de novo
        statusInput.innerHTML = 'Congratulations. You manage to guess the right number';
        result.style.transition ='0.4s'; //Altera o tempo de transição
        result.style.backgroundColor = '#37c978';
        result.style.color = '#fff';
        statusInput.style.color = '#fff';
    }else if(numberDrawn > kick){
        statusInput.innerHTML = 'The number is greater';
        statusInput.style.color = '#de4251';
        clear();
    }else if(numberDrawn < kick){
        statusInput.innerHTML = 'The number is smaller';
        statusInput.style.color = '#de4251';
        clear();
    };
};

//Função que permite jogar de novo
function playAgain(){
    document.getElementById("btnRestart").style.display = 'flex';
};

/*Função que reinicia o Jogo
Quando acabamos o jogo podemos repetir*/
//colocar no index.html na linha 36:  <button id="btnRestart" onclick="restart()">
function restart(){ 
    document.location.reload(true); //quando carrego no botão recarrega a página
};

/*Limpar o input onde coloca o número*/
function clear(){
    document.getElementById('kick').value = "";
};
