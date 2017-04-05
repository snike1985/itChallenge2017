"use strict";
( function(){

    $(function(){

        $('.menu').each( function() {
            new Menu( $(this) );
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

    });

    var Menu = function(obj) {

        //private properties
        var _obj = obj,
            _btn = _obj.find( '.menu__btn' );

        //private methods
        var _addEvents = function() {

                _btn.on({
                    'click': function() {

                        if ( !_obj.hasClass( 'active' ) ) {
                            _obj.addClass( 'active' );
                        } else {
                            _obj.removeClass( 'active' );
                        }
                    }
                });

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
            _sw = null;

        //private methods
        var _constructor = function () {
                _onEvents();
                _sliderInit();
                _obj[0].obj = _self;
            },
            _onEvents = function () {

            },
            _sliderInit = function () {
            console.log(1)
                _sw = new Swiper( _slider, {
                    pagination: '.swiper-pagination',
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

                    if( _window.scrollTop() > (topPos - windowH/1.8) && !curItem.hasClass( 'animation' ) ){

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
            _window = $( window );

        //private methods
        var _addEvents = function() {

                _window.on({
                    'scroll': function() {
                        var
                            collectionTop = $(this).scrollTop(),
                            collectionHeight = _obj.height(),
                            winHeight = $(window).height();
                        
                        // _paralax( _phone, 0, collectionTop, collectionHeight*0.2/(collectionHeight + winHeight));
                    }
                });

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
} )();