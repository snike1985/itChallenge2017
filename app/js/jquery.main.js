"use strict";
( function(){

    $(function(){

        $('.contact-us').each( function() {
            new ContactUs( $(this) );
        } );

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.site').each( function() {
            new Site( $(this) );
        } );

        $('.reviews').each( function() {
            new Reviews( $(this) );
        } );

        $('.show').each( function() {
            new Show( $(this) );
        } );

        $('.hero').each( function() {
            new Hero( $(this) );
        } );

        $('.team').each( function() {
            new Team( $(this) );
        } );

        $('.watch').each( function() {
            new Watch( $(this) );
        } );

    });

    var ContactUs = function(obj) {

        //private properties
        var _obj = obj,
            _background = _obj.find( '.contact-us__bg' ),
            _window = $( window );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'mousemove': function(e) {
                        var pageX = e.pageX,
                            pageY = e.pageY,
                            halfWidth = _obj.width() / 2,
                            halfHeight = _obj.height() / 2,
                            percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                            percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                        _move( percentFromCenterX, 0 );
                    }
                });

            },
            _move = function( xPercent, yPercent ){
                var backgroundStep = 10;

                _background.css( {
                    '-webkit-transform': 'translate( ' + -( xPercent * backgroundStep ) + 'px, ' + ( yPercent * backgroundStep ) + 'px )',
                    'transform': 'translate( ' + -( xPercent * backgroundStep ) + 'px, ' + ( yPercent * backgroundStep ) + 'px )'
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Site = function(obj) {

        //private properties
        var _obj = obj,
            _header = _obj.find( '.site__header' ),
            _window = $( window );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'load': function() {
                        _changeHeaderType();
                        _checkActiveMenu();
                    },
                    'scroll': function() {
                        _changeHeaderType();
                        _checkActiveMenu();
                    }
                });

            },
            _changeHeaderType = function() {
                var winScroll = $( window ).scrollTop(),
                    winHeight = $( '.hero' ).outerHeight();

                if ( winScroll >= winHeight ) {
                    _header.addClass( 'fixed' );
                } else {
                    _header.removeClass( 'fixed' );
                }
            },
            _checkActiveMenu = function() {
                var menuItems = $( '.menu__item' ),
                    winScrollTop = _window.scrollTop() + _window.outerHeight()*0.5,
                    _siteBloks = $( '.site__content' ).children(),
                    activeID;

                _siteBloks.each( function () {
                    var curElem = $(this),
                        curElemTop = curElem.offset().top;
                    
                    if ( winScrollTop > curElemTop ) {
                        activeID = '#' + curElem.attr( 'id' );
                    }
                } );
                
                menuItems.removeClass( 'active' );

                menuItems.each( function() {
                    var elem = $(this),
                        elemHref = elem.attr( 'href' );

                    if ( elemHref == activeID ) {
                        elem.addClass( 'active' );
                    }
                } );
                
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' ),
            _item = _obj.find( '.menu__item' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _obj.addClass( 'active' );
                            _scrollConteiner.css( {
                                overflowY: 'hidden',
                                paddingRight: _getScrollWidth()
                            } );
                        } else {
                            _obj.removeClass( 'active' );
                            _obj.find('.menu__wrap').css( {
                                overflowY: 'hidden'
                            } );
                            _scrollConteiner.css( {
                                overflowY: 'auto',
                                paddingRight: 0
                            } );
                        }
                    }
                });

                _item.on({
                    'click': function() {
                        event.preventDefault();
                        var elem = $( this ),
                            id = elem.attr( 'href' ),
                            way = $( id ).offset().top - $( '.site__header' ).outerHeight() + 2,
                            duration = 1000,
                            scrollWrap = $( 'body, html' );

                        if ( !elem.hasClass( 'active' ) ) {
                            scrollWrap.animate( { scrollTop: way }, duration );

                            setTimeout( function () {
                                scrollWrap.animate( { scrollTop: way - 1 }, 1 );
                            }, duration );

                            _item.removeClass( 'active' );
                            elem.addClass( 'active' );
                            _obj.removeClass( 'active' );
                        }

                    }
                });

            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Reviews = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _slider = _obj.find( '.swiper-container' ),
            _sliderPagination = _slider.find( '.swiper-pagination' ),
            _sw = null,
            _window = $( window );

        //private methods
        var _constructor = function () {
                _onEvents();
                _sliderInit();
                _obj[0].obj = _self;
            },
            _onEvents = function () {

            _window.on( {
                'resize': function () {
                    _sw.update();
                }
            } );

            },
            _sliderInit = function () {
                _sw = new Swiper( _slider, {
                    pagination: _sliderPagination,
                    paginationClickable: true
                });
            };

        //public properties

        //public methods

        _constructor();
    };

    var Show = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window );

        //private methods
        var _onEvents = function () {
                _window.on({
                    scroll: function () {

                        _checkScroll();

                    }
                });
            },
            _checkScroll = function(){

                var windowH = _window.height();

                _obj.each(function () {

                    var curItem = $(this),
                        topPos = _obj.offset().top;

                    if( ( _window.scrollTop() + windowH*0.9 ) > topPos && !curItem.hasClass( 'animation' ) ){

                        curItem.addClass( 'animation' );
                    }
                })
            },
            _init = function () {
                _obj[0].slides = _self;
                _onEvents();
                _checkScroll();
            };

        //public properties

        //public methods

        _init();
    };

    var Hero = function(obj) {

        //private properties
        var _obj = obj,
            _phone = _obj.find( '.hero__phone' ),
            _background = _obj.find( '.hero__bg' ),
            _window = $( window ),
            _winTop = _window.scrollTop(),
            _siteHeader = $( '.site__header' );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'mousemove': function(e) {
                        var pageX = e.pageX,
                            pageY = e.pageY,
                            halfWidth = _obj.width() / 2,
                            halfHeight = _obj.height() / 2,
                            percentFromCenterX = ( pageX - halfWidth ) / halfWidth,
                            percentFromCenterY = ( pageY - halfHeight ) / halfHeight;

                        _move( percentFromCenterX, 0 );
                    }
                });

                _window.on({
                    'scroll': function() {

                        if ( _siteHeader.hasClass( 'fixed' ) ) {
                            var direct = _window.scrollTop() > _winTop ? 'bottom' : 'top',
                                maxScrollTop = $( '.site' ).height() - _window.height();

                            if ( _window.scrollTop() > 0 ) {
                                _winTop = _window.scrollTop();
                            } else if ( _window.scrollTop() >= maxScrollTop ) {
                                _winTop = maxScrollTop;
                            } else {
                                _winTop = 0;
                            }

                            switch ( direct ) {
                                case 'top':
                                    _siteHeader.removeClass( 'hide' );
                                    break;
                                case 'bottom':
                                    _siteHeader.addClass( 'hide' );
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                });
            },
            _move = function( xPercent, yPercent ){
                var phoneStep = 3,
                    backgroundStep = 10;

                _phone.css( {
                    '-webkit-transform': 'translate( ' + ( xPercent * phoneStep ) + 'px, ' + -( yPercent * phoneStep ) + 'px )',
                    'transform': 'translate( ' + ( xPercent * phoneStep ) + 'px, ' + -( yPercent * phoneStep ) + 'px )'
                } );
                _background.css( {
                    '-webkit-transform': 'translate( ' + -( xPercent * backgroundStep ) + 'px, ' + ( yPercent * backgroundStep ) + 'px )',
                    'transform': 'translate( ' + -( xPercent * backgroundStep ) + 'px, ' + ( yPercent * backgroundStep ) + 'px )'
                } );
            },
            _paralax = function( elem, x, y, koef ) {
                var translate = 'translate3d(' + Math.round(x*koef) + 'px, ' + Math.round(y*koef) + 'px, 0px )';

                elem.css( {
                    'transform': translate
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Team = function(obj) {

        //private properties
        var _obj = obj,
            _items = _obj.find( '.team__item' );

        //private methods
        var _addEvents = function() {

                _items.on( {
                    'click': function () {
                        var curElem = $(this);

                        if ( !curElem.hasClass( 'active' ) ) {
                            _items.removeClass( 'active' );
                            curElem.addClass( 'active' );
                        }
                    }
                } );
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var Watch = function (obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _videoWrap = _obj.find( '.watch__video' ),
            _videoSrc = _videoWrap.attr( 'data-videoSrc' ),
            _window = $( window );

        //private methods
        var _constructor = function () {
                _onEvents();
                _obj[0].obj = _self;
            },
            _createVideo = function () {
                var videoIframe = '<iframe src="' + _videoSrc + '" webkitallowfullscreen mozallowfullscreen ' +
                        'allowfullscreen></iframe>';

                _videoWrap.append( videoIframe );
            },
            _onEvents = function () {
                _window.on({
                    'load': function () {
                        _createVideo();
                    }
                });
            };

        //public properties

        //public methods

        _constructor();
    };
} )();