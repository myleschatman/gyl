$('.dropdown-toggle').dropdown();

$('.dropdown-toggle').on('click', function() {
  var dropdown = '#' + $(this).siblings().attr("id") + ' li';
  var country = '#' + $(this).children('span').attr("id");
  $(dropdown).on('click', function() {
    $(country).html($(this).find('a').html());
  });
});
