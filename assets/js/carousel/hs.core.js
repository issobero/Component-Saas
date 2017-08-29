/**
 * HSCore -
 *
 * @author HtmlStream
 * @version 1.0
 */
;
(function ($) {

  'use strict';

  $.HSCore = {

    /**
     *
     *
     * @param
     *
     * @return
     */
    init: function () {

      $(document).ready(function (e) {
        // Botostrap Tootltips
        $('[data-toggle="tooltip"]').tooltip();

        // Set Background Image Dynamically
        if ($('[data-bg-img-src]').length) $.HSCore.helpers.bgImage($('[data-bg-img-src]'));

        // Extends jQuery
        $.HSCore.helpers.extendjQuery();

        // Detect Internet Explorer (IE)
        $.HSCore.helpers.detectIE();

        // Bootstrap Navigation Options
        $.HSCore.helpers.bootstrapNavOptions.init();

      });

      $(window).on('load', function (e) {

      });

    },

    /**
     *
     *
     * @var
     */
    components: {},

    /**
     *
     *
     * @var
     */
    helpers: {

        Math: {

          getRandomValueFromRange: function(startPoint, endPoint, fixed) {

            var fixedInner = fixed ? fixed : false;

            Math.random();

            return fixedInner ? (Math.random() * (endPoint - startPoint) + startPoint) : (Math.floor(Math.random() * (endPoint - startPoint + 1)) + startPoint);

          }

      },

      /**
       * Sets background-image dynamically.
       *
       * @param jQuery collection
       *
       * @return jQuery|undefined
       */
      bgImage: function (collection) {

        if (!collection || !collection.length) return;

        return collection.each(function (i, el) {

          var $el = $(el),
            bgImageSrc = $el.data('bg-img-src');

          if (bgImageSrc) $el.css('background-image', 'url(' + bgImageSrc + ')');

        });

      },

      /**
       * Extends basic jQuery functionality
       *
       * @return undefined
       */
      extendjQuery: function () {

        $.fn.extend({

          /**
           * Runs specified function after loading of all images.
           *
           * @return Deferred
           */
          imagesLoaded: function () {

            var $imgs = this.find('img[src!=""]');

            if (!$imgs.length) {
              return $.Deferred().resolve().promise();
            }

            var dfds = [];

            $imgs.each(function () {
              var dfd = $.Deferred();
              dfds.push(dfd);
              var img = new Image();
              img.onload = function () {
                dfd.resolve();
              };
              img.onerror = function () {
                dfd.resolve();
              };
              img.src = this.src;
            });

            return $.when.apply($, dfds);

          }

        });

      },


      /**
       * Detect Internet Explorer (IE)
       *
       * @return version of IE or false, if browser is not Internet Explorer
       */

      detectIE: function() {

          var ua = window.navigator.userAgent;

          var trident = ua.indexOf('Trident/');
          if (trident > 0) {
              // IE 11 => return version number
              var rv = ua.indexOf('rv:');
              var ieV = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
              document.querySelector('body').className += ' IE';
          }

          var edge = ua.indexOf('Edge/');
          if (edge > 0) {
             // IE 12 (aka Edge) => return version number
             var ieV = parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
              document.querySelector('body').className += ' IE';
          }

          // other browser
          return false;

      },


      /**
       * Bootstrap navigation options
       *
       */
      bootstrapNavOptions: {
        init: function () {
          this.mobileHideOnScroll();
        },

        mobileHideOnScroll: function () {
          var $collection = $('.navbar');
          if (!$collection.length) return;

          var $w = $(window),
            breakpointsMap = {
              'sm': 576,
              'md': 768,
              'lg': 992,
              'xl': 1200
            };

          $('body').on('click.HSMobileHideOnScroll', '.navbar-toggler', function (e) {
            var $navbar = $(this).closest('.navbar');

            if ($navbar.length) {
              $navbar.data('mobile-menu-scroll-position', $w.scrollTop());
            }
            e.preventDefault();
          });

          $w.on('scroll.HSMobileHideOnScroll', function (e) {
            $collection.each(function (i, el) {
              var $this = $(el), $toggler, $nav, offset, $hamburgers, breakpoint;
              if ($this.hasClass('navbar-toggleable-xl')) breakpoint = breakpointsMap['xl'];
              else if ($this.hasClass('navbar-toggleable-lg')) breakpoint = breakpointsMap['lg'];
              else if ($this.hasClass('navbar-toggleable-md')) breakpoint = breakpointsMap['md'];
              else if ($this.hasClass('navbar-toggleable-xs')) breakpoint = breakpointsMap['xs'];

              if ($w.width() > breakpoint) return;

              $toggler = $this.find('.navbar-toggler');
              $nav = $this.find('.navbar-collapse');

              if (!$nav.data('mobile-scroll-hide')) return;

              if ($nav.length) {
                offset = $this.data('mobile-menu-scroll-position');

                if (Math.abs($w.scrollTop() - offset) > 40 && $nav.hasClass('show')) {
                  $toggler.trigger('click');
                  $hamburgers = $toggler.find('.is-active');
                  if ($hamburgers.length) {
                    $hamburgers.removeClass('is-active');
                  }
                }
              }
            });
          });
        }
      }

    },

    /**
     *
     *
     * @var
     */
    settings: {
      rtl: false
    }

  };

  $.HSCore.init();

})(jQuery);

/**
 * HSPopup - wrapper of the Fancybox plugin.
 *
 * @author Htmlstream
 * @version 1.0
 * @requires fancybox.js (v2.1.5)
 *
 */
;(function($){
  'use strict';

  $.HSCore.components.HSPopup = {

    /**
     * Base configuration of the wrapper.
     *
     * @protected
     */
    _baseConfig: {
      baseClass: 'u-fancybox-theme',
      slideClass: 'u-fancybox-slide',
      speed: 1000,
      slideSpeedCoefficient: 1,
      infobar: false,
      slideShow: false,
      fullScreen: true,
      thumbs: false,
      closeBtn: true,
      baseTpl	: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
      '<div class="fancybox-bg"></div>' +
      '<div class="fancybox-controls">' +
      '<div class="fancybox-infobar">' +
      '<div class="fancybox-infobar__body">' +
      '<span class="js-fancybox-index"></span>&nbsp;/&nbsp;<span class="js-fancybox-count"></span>' +
      '</div>' +
      '</div>' +
      '<div class="fancybox-buttons">' +
      '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="Close (Esc)"></button>' +
      '</div>' +
      '</div>' +
      '<div class="fancybox-slider-wrap">' +
      '<button data-fancybox-previous class="fancybox-button fancybox-button--left" title="Previous"></button>' +
      '<button data-fancybox-next class="fancybox-button fancybox-button--right" title="Next"></button>' +
      '<div class="fancybox-slider"></div>' +
      '</div>' +
      '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
      '</div>',
      onInit: $.noop,
      beforeMove: $.noop,
      beforeClose: $.noop
    },

    /**
     * Initialization of the wrapper.
     *
     * @param {String} selector
     * @param {Object} config (optional)
     * @public
     */
    init: function(selector, config) {

      if(!selector) return;

      var hiddenGallery,
        $collection = $(selector);

      if(!$collection.length) return;

      config = config && $.isPlainObject(config) ? $.extend(true, {}, this._baseConfig, config) : this._baseConfig;
      config = this._predefineCallbacks( config );

      this.$body = $('body');

      this.initGallery(selector, config);

    },

    /**
     * Initialization of a gallery.
     *
     * @param {String} selector
     * @param {Object} config (optional)
     * @public
     */
    initGallery: function(selector, config) {

      $('body').on('click.HSPopup', selector, function(e) {

        var $this = $(this),
          index = 0,
          $gallery,
          predefinedCollection = [],
          collectionItem;

        if( $this.data('fancybox-gallery') ) {
          $gallery = $('[data-fancybox-gallery="' + $this.data('fancybox-gallery') + '"]');
        }
        else if ( $this.data('fancybox-hidden-gallery') ) {
          $gallery = $('[data-fancybox-hidden-gallery="' + $this.data('fancybox-hidden-gallery') + '"]');
        }


        if( $gallery && $gallery.length ) {

          index = $gallery.index( $this );

          $gallery.each(function(i, el){
            var $el = $(el);

            collectionItem = {
              src: $el.attr(el.nodeName === "IMG" || el.nodeName === "IFRAME" ? 'src' : 'href'),
              customOpts: {
                fancyboxAnimateIn: $el.data('fancybox-animate-in'),
                fancyboxAnimateOut: $el.data('fancybox-animate-out'),
                fancyboxSpeed: $el.data('fancybox-speed'),
                fancyboxSlideSpeed: $el.data('fancybox-slide-speed'),
                fancyboxBlurBg: $el.data('fancybox-blur-bg'),
                fancyboxBg: $el.data('fancybox-bg')
              }
            };

            if( $el.data('fancybox-type') ) {
              collectionItem.type = $el.data('fancybox-type');
              console.log($el);
            }

            predefinedCollection.push(collectionItem);
          });
          console.log(predefinedCollection);
        }
        else {

          collectionItem = {
            src: $this.attr('href'),
            customOpts: {
              fancyboxAnimateIn: $this.data('fancybox-animate-in'),
              fancyboxAnimateOut: $this.data('fancybox-animate-out'),
              fancyboxSpeed: $this.data('fancybox-speed'),
              fancyboxSlideSpeed: $this.data('fancybox-slide-speed'),
              fancyboxBlurBg: $this.data('fancybox-blur-bg'),
              fancyboxBg: $this.data('fancybox-bg')
            }
          };

          if( $this.data('fancybox-type') ) {
            collectionItem.type = $this.data('fancybox-type');
          }

          predefinedCollection = [collectionItem];
        }

        $.fancybox.open(
          predefinedCollection,
          predefinedCollection[index].customOpts.fancyboxSpeed ? $.extend(true, {}, config, {
            speed: predefinedCollection[index].customOpts.fancyboxSpeed
          }) : config,
          index
        );

        e.preventDefault();
      });

    },

    /**
     * Integration of custom options.
     *
     * @param {Object} config
     * @private
     * @returns {Object}
     */
    _predefineCallbacks: function( config ) {

      var self = this,
        onInitCallback = config.onInit,
        beforeMoveCallback = config.beforeMove,
        beforeCloseCallback = config.beforeClose;

      config.onInit = function( instance ) {
        self._defaultBgColor = instance.$refs.bg.css('background-color');

        if(instance.group.length > 1) {
          instance.$refs.container.find('.fancybox-button--left, .fancybox-button--right').show();
        }
        if( $.isFunction( onInitCallback ) ) onInitCallback.call(this, instance);
      };

      config.beforeMove = function( instance, slide ) {

        if( self._currentSlide ) {
          self._closeSlide( self._currentSlide, instance );
        }

        setTimeout( function() {

          self._openSlide( slide, instance );

        }, 0 );

        self._currentSlide = slide;
        beforeMoveCallback.call(this, instance, slide);

      };

      config.beforeClose = function( instance, slide ) {

        setTimeout( function() {

          self._closeSlide( slide, instance );

        }, 0 );

        beforeCloseCallback.call(this, instance, slide);

      };

      return config;
    },

    /**
     * Closes the specified slide.
     *
     * @param {Object} slide
     * @param {Object} instance
     * @private
     */
    _closeSlide: function( slide, instance ) {

      var $image = $(slide.$image),
        itemData = slide.customOpts ? slide.customOpts : slide.opts.$orig.data(),
        groupLength = instance.group.length;

      this._blurBg(false);

      if( itemData.fancyboxAnimateOut ) {
        if( $image.hasClass(itemData.fancyboxAnimateIn) ) $image.removeClass( itemData.fancyboxAnimateIn );
        $image.addClass(itemData.fancyboxAnimateOut );
      }

    },

    /**
     * Opens the specified slide.
     *
     * @param {Object} slide
     * @param {Object} instance
     * @private
     */
    _openSlide: function( slide, instance ) {

      var $image = $(slide.$image),
        itemData = slide.customOpts ? slide.customOpts : slide.opts.$orig.data();

      instance.$refs.bg.css(
        'background-color',
        (itemData.fancyboxBg ? itemData.fancyboxBg : this._defaultBgColor)
      );

      this._blurBg(itemData.fancyboxBlurBg ? true : false);

      $image.css('animation-duration', (itemData.fancyboxSlideSpeed && itemData.fancyboxSlideSpeed >= slide.opts.speed ? itemData.fancyboxSlideSpeed : slide.opts.speed * Math.abs( slide.opts.slideSpeedCoefficient )) + 'ms');

      if( itemData.fancyboxAnimateIn ) {
        if( $image.hasClass( itemData.fancyboxAnimateOut ) ) $image.removeClass( itemData.fancyboxAnimateOut );
        $image.addClass( 'animated ' + itemData.fancyboxAnimateIn );
      }
    },

    /**
     * Makes blur background while slide is opening.
     *
     * @param {Boolean} isBlur
     * @private
     */
    _blurBg: function(isBlur) {

      var self = this;

      if( isBlur ) {

        if( this._blurBgTimeOut ) clearTimeout( this._blurBgTimeOut );

        if( !this.blurBgContainer ) {
          this.blurBgContainer = $('<div></div>', {
            class: 'u-fancybox-blur-bg-container'
          });
          this.$body.append(this.blurBgContainer);
        }

        if( this.blurBgContainer.children().length ) return;

        this.blurBgContainer.append( this.$body.children().not('.fancybox-container') );

      }
      else {

        if(!this.blurBgContainer || !this.blurBgContainer.children().length) return;

        this._blurBgTimeOut = setTimeout(function(){

          self.$body.append( self.blurBgContainer.children() );
        }, 10)

      }

    }

  };

})(jQuery);
