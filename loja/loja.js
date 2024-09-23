var textos;
var velocidades;
var caixa = document.getElementById('clarear');
var caixaColisao = caixa.getBoundingClientRect();
var gravidadeAtiva = null;

function criar() {
    var textoDigitado = document.getElementById("caixa-de-texto").value;

    if (!textoDigitado == "") {
        var textoCriado = document.createElement("h1");
        textoCriado.classList.add("texto-criado");
        var classeTexto = document.querySelectorAll(".texto-criado");
        var quantidadeTexto = parseInt(classeTexto.length);
        textoCriado.setAttribute("id", "texto-criado" + quantidadeTexto)
        textoCriado.setAttribute("onmousedown", "segurar(event)");
        textoCriado.textContent = textoDigitado;

        document.body.appendChild(textoCriado);
        document.getElementById("caixa-de-texto").value = '';

        textos = document.querySelectorAll(".texto-criado");

        velocidades = Array.from(textos).map(() => 0.7);

        if (gravidadeAtiva === null) {
            velocidades = Array.from(textos).map(() => 0.7);
            gravidadeAtiva = setInterval(gravidade, 10);
        }

    }
}

var itemExiste = false;

function gravidade() {

    textos.forEach((item, index) => {
        var alturaAtual = parseFloat(window.getComputedStyle(item).top);

        let alturaItem = item.offsetHeight;
        const alturaTela = window.innerHeight;

        let novaAltura = alturaAtual + velocidades[index];

        if (novaAltura + alturaItem <= alturaTela - 80) {

            item.style.top = novaAltura + 'px';
        } else {
            item.style.top = (alturaTela - 80 - alturaItem) + 'px';
        }
        velocidades[index] += 0.5;
    });
    textos.forEach(function (texto) {
        var textoColisao = texto.getBoundingClientRect();

        var colisaoY = (textoColisao.bottom > caixaColisao.top && textoColisao.top < caixaColisao.bottom);
        var colisaoX = (textoColisao.right > caixaColisao.left && textoColisao.left < caixaColisao.right);

        if (colisaoX && colisaoY) {
            var conteudoDoTexto = texto.textContent;
            texto.style.display = "none";
            var user = localStorage.getItem('Logado')
            var dados = JSON.parse(localStorage.getItem('usuario'));
            dados.forEach(function (dado) {
                if (dado.nome == user) {
                    var listagem = dado.lista;
                    listagem.forEach(function (item) {
                        if (conteudoDoTexto == item) {
                            alert("Este item já está na lista, caso queira adicionar uma outra quantidade vá no caixa!");
                            itemExiste = true;
                        }
                    });
                    if (!itemExiste) {
                        dado.lista.push(conteudoDoTexto);
                        dado.numeros.push(1);
                        localStorage.setItem('usuario', JSON.stringify(dados))
                    }
                }
            });
        }
    });
}


document.addEventListener("dragstart", function (event) {
    event.preventDefault();
});


function segurar(event) {
    var palavra = event.target;
    velocidades = Array.from(textos).map(() => 0.7);

    // Pausar a gravidade ao começar a arrastar
    if (gravidadeAtiva !== null) {
        clearInterval(gravidadeAtiva);
        gravidadeAtiva = null;
    }

    function mover(event) {
        // Definir a posição do elemento baseado no mouse
        var mouseX = event.clientX - (palavra.offsetWidth / 2); // Centralizar no mouse
        var mouseY = event.clientY - (palavra.offsetHeight / 2);

        palavra.style.left = mouseX + 'px';
        palavra.style.top = mouseY + 'px';
    }

    // Adicionar o ouvinte de movimento do mouse
    document.addEventListener('mousemove', mover);

    // Quando o mouse for solto, remover o ouvinte de movimento e reativar a gravidade
    document.addEventListener('mouseup', function liberar() {
        document.removeEventListener('mousemove', mover); // Para o movimento
        if (gravidadeAtiva === null) {
            gravidadeAtiva = setInterval(gravidade, 10); // Reativar a gravidade
        }
        document.removeEventListener('mouseup', liberar); // Remove o próprio ouvinte
    });
}

