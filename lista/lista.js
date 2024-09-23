function listar() {
    var usuario = localStorage.getItem('Logado');
    var dados = JSON.parse(localStorage.getItem('usuario'));

    dados.forEach(function (dado) {
        if (dado.nome == usuario) {
            let listagem = dado.lista;
            let numerosos = dado.numeros;
            listagem.forEach(function (item, index) {
                var estruturacao = document.createElement("div");
                estruturacao.classList.add("estrutura");

                var classe = document.querySelectorAll(".estrutura")

                var quantidadeClasse = parseInt(classe.length);
                estruturacao.setAttribute("id", "estrutura" + quantidadeClasse);

                var texto = document.createElement("p")
                texto.textContent = item;
                texto.classList.add("texos")

                var numero = document.createElement("p");
                numero.textContent = numerosos[index];
                numero.classList.add("numeros")
                
                var agrupamento = document.createElement("div");
                agrupamento.classList.add("agrupar");
                agrupamento.setAttribute("id", "agrupar" + quantidadeClasse);

                var funcao = document.createElement("div");
                funcao.classList.add("funcoes");

                var butao1 = document.createElement("input");
                butao1.setAttribute("type", "button");
                butao1.classList.add("editar");
                butao1.setAttribute("onclick", "editar(" + "'agrupar" + quantidadeClasse + "')");
                butao1.setAttribute("value", "==>");

                var butao2 = document.createElement("input");
                butao2.setAttribute("type", "button");
                butao2.classList.add("excluir");
                butao2.setAttribute("onclick", "excluir(" + "'agrupar" + quantidadeClasse + "')");
                butao2.setAttribute("value", "X");

                agrupamento.appendChild(numero);
                agrupamento.appendChild(texto);

                funcao.appendChild(butao1);
                funcao.appendChild(butao2);

                estruturacao.appendChild(agrupamento);
                estruturacao.appendChild(funcao);


                var referiencia = document.getElementById('reference');
                referiencia.parentNode.insertBefore(estruturacao, referiencia);
            });
        }
    });
}

function editar(id) {
    var tela = document.getElementById('alinhar');
    tela.style.display = "flex";
    tela.style.animation = "aparecer forwards 0.5s";

    var grupos = document.getElementById(id)
    var texto = grupos.querySelector('.texos').textContent;

    var listaIndex;

    document.getElementById('editar-texto').onclick = function() {
        var textoEditado = prompt("Digite o novo texto:");
        if (textoEditado === null || textoEditado.trim() === "") return; // Caso o usuário cancele ou envie vazio

        var usuario = localStorage.getItem('Logado');
        var dados = JSON.parse(localStorage.getItem('usuario'));
        
        dados.forEach(function(dado) {
            if (dado.nome == usuario) {
                var listas = dado.lista;
                listas.forEach(function(item, index) {
                    if (item == texto) {
                        listas.splice(index, 1, textoEditado);
                        listaIndex = index;
                        localStorage.setItem('usuario', JSON.stringify(dados));
                        window.location.reload();
                    }
                });
                
            }
        });
    }

    document.getElementById('editar-quantidade').onclick = function() {
        var numeroEditado = parseInt(prompt("Digite um novo número:"));
        if (numeroEditado === null || numeroEditado === "") return;

        var usuario = localStorage.getItem('Logado');
        var dados = JSON.parse(localStorage.getItem('usuario'));

        dados.forEach(function(dado) {
            if (dado.nome == usuario) {
                var listas = dado.lista;
                listas.forEach(function(item, index) {
                    if (item == texto) {
                        var numeros = dado.numeros;
                        var indice = index;
                        numeros.splice(indice, 1, numeroEditado);
                        localStorage.setItem('usuario', JSON.stringify(dados));
                        window.location.reload();
                    }
                });
            }
        })
    }
}

function excluir(id) {
    var grupos = document.getElementById(id)
    var texto = grupos.querySelector('.texos').textContent;

    var usuario = localStorage.getItem('Logado');
    var dados = JSON.parse(localStorage.getItem('usuario'));

    dados.forEach(function(dado) {
        if (dado.nome == usuario) {
            var listas = dado.lista;
            var numeros = dado.numeros;
            listas.forEach(function(item, index) {
                if (item == texto) {
                    listas.splice(index, 1);
                    numeros.splice(index, 1);
                    localStorage.setItem('usuario', JSON.stringify(dados));
                    window.location.reload();
                }
            })
        }
    })
}

function fechar() {
    var tela = document.getElementById('alinhar');
    tela.style.animation = "desaparecer forwards 0.5s";
    setTimeout(function () {
        tela.style.display = "none";
    }, 500);
}