"use strict";
( function(){

    $(function(){

        $('.contact-us').each( function() {
            new ContactUs( $(this) );
        } );

        $('.hero').each( function() {
            new Hero( $(this) );
        } );

        $('.label-animate').each( function() {
            new LabelAnimate( $(this) );
        } );

        $('.menu').each( function() {
            new Menu( $(this) );
        } );

        $('.reviews').each( function() {
            new Reviews( $(this) );
        } );

        $('.site').each( function() {
            new Site( $(this) );
        } );

        $('.show').each( function() {
            new Show( $(this) );
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
            _window = $( window ),
            _form = _obj.find( '.contact__form' ),
            _formAnimateFields = _form.find( '.animate' );

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

                _formAnimateFields.on({
                    'focus': function () {
                        var curElem = $( this );

                        if ( curElem.val().length > 0 && !curElem.hasClass('active') ) {
                            curElem.addClass( 'active' );
                        } else {
                            curElem.removeClass( 'active' );
                        }
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
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

    var LabelAnimate = function ( obj ) {

        //private properties
        var _self = this,
            _obj = obj,
            _items = _obj.find( '.label-animate__item' ),
            _input = _obj.find( 'input, textarea' );

        //private methods
        var _constructor = function () {
                _obj[0].list = _self;
                _onEvents();

                _items.each( function() {
                    var curElem = $( this );
                    _createDataPlaceholderAttr( curElem );
                } );
            },
            _animate = function ( input, state ) {
                var curParrent = input.parent();

                if ( input.val() == '' && state ) {

                    curParrent.addClass( 'active' );

                } else if ( input.val() == '' && !state ) {

                    curParrent.removeClass( 'active' );

                }

            },
            _createDataPlaceholderAttr = function ( elem ) {
                var elemField = elem.find( 'input, textarea' ),
                    curAttr = elemField.attr( 'placeholder' );
                elem.attr( 'data-placeholder', curAttr );

            },
            _onEvents = function () {

                _input.on( {
                    focus: function() {

                        _animate( $(this), true )

                    }
                } );

                _input.on( {
                    blur: function() {

                        _animate( $(this), false )

                    }
                } );
            };

        //public properties

        //public methods

        _constructor();
    };

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' ),
            _item = _obj.find( '.menu__item' ),
            _wrap = _obj.find( '.menu__wrap' ),
            _scrollConteiner = $( 'html' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _showMenu();
                        } else {
                            _hideMenu();
                        }
                    }
                });

                _item.on({
                    'click': function() {
                        event.preventDefault();
                        var elem = $( this ),
                            id = elem.attr( 'href' ),
                            way = $( id ).offset().top - $( '.site__header' ).outerHeight() + 1,
                            duration = 1000,
                            scrollWrap = $( 'body, html' );

                        if ( !elem.hasClass( 'active' ) ) {
                            scrollWrap.animate( { scrollTop: way }, duration );

                            setTimeout( function () {
                                scrollWrap.animate( { scrollTop: way - 1 }, 1 );
                            }, duration );

                            _item.removeClass( 'active' );
                            elem.addClass( 'active' );
                            _hideMenu();
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
            _showMenu = function() {
                _obj.addClass( 'active' );
                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );
            },
            _hideMenu = function() {
                _obj.removeClass( 'active' );
                _wrap.css( {
                    overflowY: 'hidden'
                } );
                _scrollConteiner.css( {
                    overflowY: 'auto',
                    paddingRight: 0
                } );
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
            _window = $( window ),
            _autoPlayDuration = _slider.attr( 'data-autoPlayDuration' );

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
                    loop: true,
                    autoplay: _autoPlayDuration,
                    autoplayDisableOnInteraction: false,
                    // loop: true,
                    paginationClickable: true
                });
            };

        //public properties

        //public methods

        _constructor();
    };

    var Site = function(obj) {

        //private properties
        var _obj = obj,
            _header = _obj.find( '.site__header' ),
            _siteContent = _obj.find( '.site__content' ),
            _menuItems = $( '.menu__item' ),
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
                    winFirstBlock = _siteContent.children().eq(0),
                    winHeight = winFirstBlock.outerHeight();

                if ( winScroll >= winHeight ) {
                    _header.addClass( 'fixed' );
                } else {
                    _header.removeClass( 'fixed' );
                }
            },
            _checkActiveMenu = function() {
                var winScrollTop = _window.scrollTop() + _window.outerHeight()*0.5,
                    siteBloks = _siteContent.children(),
                    activeID;

                siteBloks.each( function () {
                    var curElem = $(this),
                        curElemTop = curElem.offset().top;

                    if ( winScrollTop > curElemTop ) {
                        activeID = '#' + curElem.attr( 'id' );
                    }
                } );

                _menuItems.removeClass( 'active' );

                _menuItems.each( function() {
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