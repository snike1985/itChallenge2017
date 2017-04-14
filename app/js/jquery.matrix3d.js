"use strict";
( function(){

    $(function(){

        $('.matrix').each( function() {
            new Matrix( $(this) );
        } );

    });

    var Matrix = function(obj) {

        //private properties
        var _obj = obj;

        //private methods
        var _addEvents = function() {

                _obj.on({
                    'mousemove': function (e) {
                        var transformFactor = 0.1,
                            squareW = _obj.width(),
                            squareH = _obj.height(),
                            x = e.pageX - _obj.offset().left,
                            y = e.pageY - _obj.offset().top,
                            scaledX = _scale(x / squareW, -1, 1),
                            scaledY = _scale(y / squareH, -1, 1);

                        _obj.css({
                            'transform': 'matrix3d(' +
                                        '1, 0, -' + scaledX * transformFactor + ', 0,' +
                                        '0, 1, -' + scaledY * transformFactor + ', 0,' +
                                        '0, 0, 1, 0,' +
                                        '0, 0, 0, 1)'});
                    },
                    'mouseleave': function () {
                        _obj.css({
                            'transform': 'matrix3d(' +
                                        '1, 0, 0, 0,' +
                                        '0, 1, 0, 0,' +
                                        '0, 0, 1, 0,' +
                                        '0, 0, 0, 1)'});
                    }
                });
            },
            _scale = function(n, min, max) {
                return n * (max - min) + min;
            },
            _init = function() {
                _addEvents();
            };

        //public properties

        //public methods

        _init();
    };

} )();