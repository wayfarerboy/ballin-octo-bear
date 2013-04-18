$(document).ready(function() {

  // Start by correcting page height to match img height
  var page = $('div.page').correctPageDims();

  
  var nav = $('nav');
  $('h2', nav).click(function() {
    nav
      .toggleClass('active')
      .hover(function(){},function() {
        nav.removeClass('active');
      });
  });

  // Add close button to page overview
  var overview = $('section.overview');
  overview.appendButton({
    className: 'close',
    letter: 'x',
    click: function() { page.removeClass('overview-active'); }
  });

  // Add info button to page
  page.appendButton({
    className: 'info',
    letter: 'i',
    click: function() { page.addClass('overview-active'); }
  });

  $('div.points > article').setupPoints(page);
  var page = $('div.page');
});

