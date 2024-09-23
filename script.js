var estaLogado = false;

function logar() {
    var campoNome = document.getElementById('nome');
    var campoSenha = document.getElementById('senha');

    var nome = campoNome.value;
    var senha = campoSenha.value;

    var infos = JSON.parse(localStorage.getItem('usuario'));

    if (infos === null) {
        alert("Sem usuários registrados, Registre-se primeiro")
        window.location.href = "registrar.html";
    } else {
        infos.forEach(function (info) {
            if (info.nome == nome && info.senha == senha) {
                alert('Você foi logado!!')
                localStorage.setItem('Logado', nome);
                window.location.href = "loja/loja.html";
                estaLogado = true;
            }
        });
        if (!estaLogado) {
            alert("Não existe usuário com esse nome ou errou a senha!!");
        }
    }
}

let informacoes = [];
let dados;
var usuarioExiste = false;

function registrar() {
    var campoNome = document.getElementById('nome');
    var campoSenha = document.getElementById('senha');
    var campoConfirmarSenha = document.getElementById('confirmar-senha');

    var nomevalor = campoNome.value;
    var senhavalor = campoSenha.value;
    var ConfSenhavalor = campoConfirmarSenha.value;

    if (senhavalor == ConfSenhavalor) {

        var json = localStorage.getItem('usuario');

        if (!json) {
            localStorage.removeItem('usuario');
        }

        dados = JSON.parse(localStorage.getItem('usuario'));

        if (dados === null || dados == "" || dados == undefined) {
            informacoes = [
                {
                    nome: nomevalor,
                    senha: senhavalor,
                    lista: [],
                    numeros: []
                }
            ];

            localStorage.setItem('usuario', JSON.stringify(informacoes));
        } else {
            dados.forEach(function (dado) {
                if (dado.nome == nomevalor) {
                    alert("Este usuário já existe");
                    usuarioExiste = true;
                    window.location.href = "index.html";
                }
            });
            if (!usuarioExiste) {
                alert("Você foi registrado, vamos logar!")
                dados.push({ nome: nomevalor, senha: senhavalor, lista: [], numeros: [] })
                localStorage.setItem('usuario', JSON.stringify(dados));
                window.location.href = "index.html";
            }
        }

    } else {
        alert("As senhas não coincidem");
    } if (senhavalor == "" || nomevalor == "") {
        alert("Porfavor preencha todos os campos!!");
    }
}