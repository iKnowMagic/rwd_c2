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
