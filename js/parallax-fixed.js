var parallaxFixedFull = $('.parallax-fixed-full');
var parallaxFixedCol = $('.parallax-fixed-col');

var parallaxFixedFullTop = [];
var parallaxFixedColTop = [];

var currentPosition = $(window).scrollTop();

$(window).resize(function(){
    parallaxFixedFull.each(function(){
      var parallaxFixedFull = $(this);
      var parallaxFixedFullTop = parallaxFixedFull.position().top;
      parallaxFull(parallaxFixedFull, parallaxFixedFullTop);
    });

    parallaxFixedCol.each(function(){
      var parallaxFixedCol = $(this);
      var parallaxFixedColTop = parallaxFixedCol.position().top;
      parallaxCol(parallaxFixedCol, parallaxFixedColTop);
    });
});

$(window).scroll(function(){
    currentPosition = $(window).scrollTop();

    parallaxFixedFull.each(function(){
      var parallaxFixedFull = $(this);
      var parallaxFixedFullTop = parallaxFixedFull.position().top;
      parallaxFull(parallaxFixedFull, parallaxFixedFullTop);
    });

     parallaxFixedCol.each(function(){
      var parallaxFixedCol = $(this);
      var parallaxFixedColTop = parallaxFixedCol.position().top;
      parallaxCol(parallaxFixedCol, parallaxFixedColTop);
    });
    
});

parallaxFixedFull.each(function(){
  var parallaxFixedFull = $(this);
  var parallaxFixedFullTop = parallaxFixedFull.position().top;
  parallaxFull(parallaxFixedFull, parallaxFixedFullTop);
});

parallaxFixedCol.each(function(){
  var parallaxFixedCol = $(this);
  var parallaxFixedColTop = parallaxFixedCol.position().top;
  parallaxCol(parallaxFixedCol, parallaxFixedColTop);
});

function parallaxFull(parallaxFixedFull, parallaxFixedFullTop)
{

  if( currentPosition >= parallaxFixedFullTop && currentPosition < (parallaxFixedFullTop + parallaxFixedFull.height()) )
  {
    parallaxFixedFull.find('.parallax-fixed-full-bg').css('background-attachment', 'fixed');
  }else{
    parallaxFixedFull.find('.parallax-fixed-full-bg').css('background-attachment', 'scroll');
  }
}

function parallaxCol(parallaxFixedCol, parallaxFixedColTop)
{
  var changedElement = parallaxFixedCol.find('.parallax-fixed-col-bg');

  //esse é pra reajustar os parallaxCol quando for menor que 767px de width porque as imagens tavam sobrepondo
  //os <p> que vinha na outra coluna col-md-7, col-md-5
  if($(window).width() <= '767')
  {
    changedElement.parent().css('display', 'table');
  }else
  {
    changedElement.parent().css('display', 'flex');
  }

  //aqui faz a magica de tirar e por o parallax nas imagens
  if( currentPosition >= parallaxFixedColTop && currentPosition < (parallaxFixedColTop + parallaxFixedCol.height()) )
  {
    if(changedElement.attr('data-position') == 'left')
    {
      changedElement.addClass('parallax-fixed-col-bg-latched-left');

      //ajusta o parallax que fica na esquerda para empurrar o texto para o lado esquerdo pq quando o parallax fica
      //position fixed ele perder o lugar que tinha na tela e isso faz com que a coluna irmã fique no lugar onde ele 
      //estava
      if(changedElement.css('max-width') != '100%')
      {
        changedElement.siblings().css('margin-left', changedElement.css('max-width'));              
      }else
      {
        changedElement.siblings().css('margin-left', 0); 
      }
    }else
    {
      changedElement.addClass('parallax-fixed-col-bg-latched-right');
    }             
  }
  else
  {
    //tudo o que coloucou no if la de cime tem que ser retirado
    if(changedElement.attr('data-position') == 'left')
    {
      changedElement.removeClass('parallax-fixed-col-bg-latched-left');

      if(changedElement.css('max-width') < '100%' || changedElement.css('max-width') != 'none')
      {
        changedElement.siblings().css('margin-left', '0');
      }
    }else
    {
      changedElement.removeClass('parallax-fixed-col-bg-latched-right');
    }
  }
}