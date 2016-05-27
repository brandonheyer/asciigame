var _ = require( 'underscore' ),
    d3 = require( 'd3' ),
    Base = require( './Base.js' );

module.exports = Base.extend( {
    value: undefined,
    el: undefined,

    initialize: function( options ) {
        this.game = options.game;

        this._x = options.x;
        this._y = options.y;
        this.value = options.value;
        this.el = options.el;

        return this.sup( 'initialize', [ options ] );
    },

    update: function( el, tick ) {
        if ( !this.value ) {
            return;
        }

        if ( this.value === '*' ) {
            if ( Math.floor( Math.random() * 1000 ) < 100 ) {
                this.game.spawn( this.constructor, {
                    value: ( Math.floor( Math.random() * 1000 ) < 500 ) ? '*' : '+',
                    x: this.game.x( this._x + ( Math.floor( Math.random() * 3 ) - 1 ) ),
                    y: this.game.y( this._y + ( Math.floor( Math.random() * 3 ) - 1 ) )
                } );
            }
        }

        if ( this.value === '*' || this.value === '+' ) {
            this._life -= tick;

            if ( this._life < 0 ) {
                return false;
            }
        }

        return true;
    },

    draw: function( el, tick ) {
        if ( this.value === '*' || this.value === '+' ) {
            el.attr( 'class', 'creep x-' + this._x + ' y-' + this._y );
        }

        el.text( this.value );
    },

    activate: function() {
        this._life = d3.random.normal( 2000, 1000 )();
    }
} );
