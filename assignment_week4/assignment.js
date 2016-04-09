var animals = (function($) {

  function showTemplate(template, data, id){
  	var html = template(data);
  	$('#'+id).html(html);
  }

  function processHandlebars(data) {
    var navigation = $('#animals-navigation-template').html();
    var navigation_template = Handlebars.compile(navigation);
    showTemplate(navigation_template, data, 'animals-navigation');

    var gallery = $('#animals-gallery-template').html();
    var gallery_template = Handlebars.compile(gallery);
    showTemplate(gallery_template, data, 'animals-gallery');

    startIsotope();
    startPopup();
    addResponsiveText();
  }

  function startIsotope() {
    $win = $( window );

    var isotopeContainer = $('.isotopeContainer');
    if( !isotopeContainer.length || !$().isotope ) return;
    $win.load(function(){
    isotopeContainer.isotope({
      itemSelector: '.isotopeSelector',
      isResizeBound: true,
      percentPosition: true
    });
    $('.isotopeFilters').on( 'click', 'a', function(e) {
        $('.isotopeFilters').find('.active').removeClass('active');
        $(this).parent().addClass('active');
        var filterValue = $(this).attr('data-filter');
        isotopeContainer.isotope({ filter: filterValue });
        e.preventDefault();
      });
    });
  }

  function startPopup() {
    $(".popup-gallery").fancybox({
			maxWidth	: 900,
			maxHeight	: 700,
			fitToView	: true,
			width		: '80%',
			height		: '80%',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'elastic',
			closeEffect	: 'none'
		});
    $('.popup-gallery-description').fancybox();
  }

  function addResponsiveText() {
    $(".brand").fitText();
  }

  function main() {
    processHandlebars(animals_data);
  }

  return {
    main: main
  };
})(jQuery);

jQuery(document).ready(function() {
  animals.main();
});
