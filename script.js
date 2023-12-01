let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let votoBrando = false;
let votos = [];



function comecarEtapa() {
    let etapa = etapas[etapaAtual];
    let numerohtml = '';
    numero = '';
    votoBrando = false;

    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numerohtml += '<div class="numero pisca"></div>';
        } else {
            numerohtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numerohtml;

    }

function atualizaInterFace() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        return item.numero === numero;
    });

    if (candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`;

        let fotoshtml = '';
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotoshtml += `<div class="d-1-image small"><img src="imagem/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotoshtml += `<div class="d-1-image"><img src="imagem/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotoshtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="aviso--gigante pisca">NULO</div>';
    }
}

function clicou(n) {
    let elnumero = document.querySelector('.numero.pisca');
    if (elnumero !== null) {
        elnumero.innerHTML = n;
        numero = `${numero}${n}`;

        elnumero.classList.remove('pisca');
        if (elnumero.nextElementSibling !== null) {
            elnumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterFace();
        }
    }
}

function branco() {
    if (!numero) {
        numero = '';
        votoBrando = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO BRANCO</div>';
        lateral.innerHTML = '';
    }
}

function corrige() {
    comecarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if (votoBrando === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if (numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });

        if (votoConfirmado) {
            etapaAtual++;
            if (etapas[etapaAtual] !== undefined) {
                comecarEtapa();
            } else {
                document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM!</div>';
                console.log(votos);
            }
        }
    }
}

comecarEtapa();

