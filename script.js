// Abas de tecnologias
document.querySelectorAll('.abas').forEach(function (grupo) {
  var abas = grupo.querySelectorAll('.aba');
  abas.forEach(function (aba) {
    aba.addEventListener('click', function () {
      abas.forEach(function (a) {
        a.setAttribute('aria-selected', 'false');
        document.getElementById(a.getAttribute('aria-controls')).hidden = true;
      });
      aba.setAttribute('aria-selected', 'true');
      document.getElementById(aba.getAttribute('aria-controls')).hidden = false;
    });
  });
});

// Miniaturas sem imagem: mostram um aviso no lugar
document.querySelectorAll('.miniatura img').forEach(function (img) {
  function marcar() { img.closest('.miniatura').classList.add('ausente'); }
  if (img.complete && img.naturalWidth === 0) marcar();
  img.addEventListener('error', marcar);
});

// Visualizador ampliado
var ampliar = document.getElementById('ampliar');
var imagemAmpliada = ampliar.querySelector('img');
var legendaAmpliada = ampliar.querySelector('.legenda-ampliada');

document.querySelectorAll('.miniatura').forEach(function (botao) {
  botao.addEventListener('click', function () {
    if (botao.classList.contains('ausente')) return;
    var img = botao.querySelector('img');
    imagemAmpliada.src = img.src;
    imagemAmpliada.alt = img.alt;
    legendaAmpliada.textContent = img.alt;
    ampliar.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  });
});

function fecharAmpliado() {
  ampliar.classList.remove('aberto');
  document.body.style.overflow = '';
}
ampliar.querySelector('.fechar').addEventListener('click', fecharAmpliado);
ampliar.addEventListener('click', function (e) { if (e.target === ampliar) fecharAmpliado(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharAmpliado(); });

// Destaque da seção atual no menu
var links = document.querySelectorAll('.menu-links a');
var secoes = Array.prototype.map.call(links, function (a) {
  return document.querySelector(a.getAttribute('href'));
});
var observador = new IntersectionObserver(function (entradas) {
  entradas.forEach(function (entrada) {
    if (!entrada.isIntersecting) return;
    links.forEach(function (a) {
      var ativo = a.getAttribute('href') === '#' + entrada.target.id;
      a.classList.toggle('ativo', ativo);
      if (ativo) a.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  });
}, { rootMargin: '-45% 0px -50% 0px' });
secoes.forEach(function (s) { if (s) observador.observe(s); });
