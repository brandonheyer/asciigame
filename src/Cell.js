var _ = require( 'underscore' ),
    d3 = require( 'd3' );

function Cell( options ) {
    this.initialize( options );
}

_.extend( Cell.prototype, {
    value: undefined,
    el: undefined,

    initialize: function( options ) {
        this.game = options.game;

        this._x = options.x;
        this._y = options.y;
        this.value = options.value;
        this.el = options.el;
    },

    draw: function( el, tick ) {
        var classed = {};

        if ( !this.value ) {
            return;
        }

        if ( this.value === '*' ) {
            if ( Math.floor( Math.random() * 1000 ) < 100 ) {
                this.game.spawn( Cell, {
                    value: '*',
                    x: this.game.x( this._x + ( Math.floor( Math.random() * 3 ) - 1 ) ),
                    y: this.game.y( this._y + ( Math.floor( Math.random() * 3 ) - 1 ) )
                } );
            }
        }

        if ( this.value === '*' || this.value === '+' ) {
            el.attr( 'class', 'creep x-' + this._x + ' y-' + this._y );

            this._life -= tick;

            if ( this._life < 0 ) {
                return false;
            }
        }

        el.text( this.value );

        return true;
    },

    activate: function() {
        this._life = d3.random.normal( 2000, 1000 )();
    }
} );

module.exports = Cell;
