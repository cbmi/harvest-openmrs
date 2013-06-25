define(['jquery'], function($) {
  /*
  jQuery plugin for an side-panel which can open and close on the
  left or right edge of the document.
  
  Methods are invoked by passing the method name as a string in the
  constructor method, e.g. `$(...).panel('open')`.
  
  Methods:
    `open` - Opens the panel
    `close` - Closes the panel
    'toggle` - Toggles the panel open/close state
  
  CSS classes:
    `.panel` - base class for panel container
    `.panel-toggle` - edge toggle on the panel itself which is kept
        exposed while in a closed state
    `.panel-right` - positions the panel on the right edge of the document
    `.panel-left` - positions the panel on the left edge of the document
    `.closed` - start the panel in a closed state
  
  HTML markup:
    <div class="panel panel-left closed">
        <div class="panel-toggle"></div>
        <div class="panel-content">
            ...
        </div>
    </div>
  */

  var Panel;
  Panel = function(element) {
    var css, toggle,
      _this = this;
    this.element = $(element);
    this.slideWidth = this.element.width();
    if ((toggle = this.element.children('.panel-toggle'))[0]) {
      toggle.on('click', function() {
        return _this.element.panel('toggle');
      });
      this.slideWidth -= toggle.width();
    }
    this.state = 1;
    if (this.element.hasClass('panel-right')) {
      this.side = 'right';
    } else {
      this.side = 'left';
    }
    if (this.element.hasClass('closed')) {
      this.state = 0;
      (css = {})[this.side] = -this.slideWidth;
      this.element.css(css).show();
    }
    return this;
  };
  Panel.prototype = {
    constructor: Panel,
    open: function() {
      var attrs;
      if (!this.state) {
        this.state = 1;
        (attrs = {})[this.side] = 0;
        return this.element.animate(attrs, 300).removeClass('closed');
      }
    },
    close: function() {
      var attrs;
      if (this.state) {
        this.state = 0;
        (attrs = {})[this.side] = -this.slideWidth;
        return this.element.animate(attrs, 300).addClass('closed');
      }
    },
    toggle: function() {
      if (this.state) {
        return this.close();
      } else {
        return this.open();
      }
    }
  };
  $.fn.panel = function(option) {
    return this.each(function() {
      var $this, data;
      $this = $(this);
      data = $this.data('panel');
      if (!data) {
        $this.data('panel', (data = new Panel(this)));
      }
      if (typeof option === 'string') {
        return data[option]();
      }
    });
  };
  $.fn.panel.Constructor = Panel;
  return $(function() {
    $('.panel').panel();
    return $('[data-toggle*=panel]').each(function() {
      var toggle;
      return (toggle = $(this)).on('click', function() {
        var panel;
        if (toggle.data('target')) {
          panel = $(toggle.data('target'));
        } else {
          panel = toggle.parent();
        }
        return panel.panel('toggle');
      });
    });
  });
});

/*
//@ sourceMappingURL=jquery-panels.js.map
*/