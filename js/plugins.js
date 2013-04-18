// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

$.fn.appendButton = function(opts) {
  var self = $(this);
  var link = $('<a>')
    .appendIconFont(opts.letter)
    .addClass(opts.className + ' button')
    .click(opts.click)
    .appendTo(self);
  return link;
};

$.fn.appendIconFont = function(letter) {
  var self = $(this);
  var span = $('<span>').attr('data-icon', letter);
  return self.append(span);
};

$.fn.setupPoints = function(page) {
  var self = $(this);
  self.each(function() {
    var point = $(this);
    point.addArticleButtons(page);
  });
  return self;
};

$.fn.addArticleButtons = function(page) {
  var article = $(this);
  var figure = $('> figure', article);
  var teaser = $('> section.teaser', article);
  var details = $('> section.details', article).prepend(figure.clone());
  article.appendButton({
    className: 'open', 
    letter: '+',
    click: function() {
      article.addClass('active');
      page.addClass('point-active');
    }
  });
  teaser.appendButton({
    className: 'more',
    letter: 'r',
    click: function() {
      article.addClass('teaser-active');
    }
  });
  teaser.appendButton({
    className: 'close',
    letter: 'x',
    click: function() {
      article.removeClass('active');
      page.removeClass('point-active');
    }
  });
  details.appendButton({
    className: 'close',
    letter: 'x',
    click: function() {
      article.removeClass('active teaser-active');
      page.removeClass('point-active');
    }
  });
  return article;
};

$.fn.correctPageDims = function() {
  var page = $(this);
  var img = $('> figure.bg > img', page);
  var fontSize = page.width() / 60.0;
  if (img.width() > 0) {
    page.css({
      height: img.height(),
      fontSize: fontSize
    });
  } else {
    img.load(function() {
      page.css({
        height: img.height(),
        fontSize: fontSize
      });
    });
  }
  if (!page.hasClass('inited')) {
    $(window).resize(function() {
      page.correctPageDims();
    });
    page.addClass('inited');
  }
  return page;
};
