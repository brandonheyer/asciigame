var config = {
    width: 25,
    height: 25
};

function Game( config ) {
    this.initialize( config );
}

_.extend( Game.prototype, {
    _drawCells: function( tick ) {
        this._creeps = this._board.selectAll( 'div.creep' ).data( this._creepData );

        var creepData = this._creepData;

        this._creeps
            .enter()
                .append( 'div' )
                .classed( 'creep', true )

        this._creeps
            .exit()
                .remove();

        this._creeps.each( function( d, i ) {
            if ( !( d.draw( d3.select( this ), tick ) ) ) {
                creepData[ i ] = undefined;
            };
        } );

        this._creepData = _.compact( this._creepData );

        this._counter.text( this._creepData.length );
        this._fps.text( Math.floor( 1000 / d3.mean( this._frames ) ) );
    },

    _populateBoard: function() {
        for ( var y = 0; y < config.height; y++ ) {
            this._boardData.push( [] );
            for ( var x = 0; x < config.width; x++ ) {
                this._boardData[ y ].push(
                    new Cell(
                        {
                            board: this._boardData,
                            x: x,
                            y: y,
                            value: 'o'
                        }
                    )
                );

                this._cellData.push( this._boardData[ y ][ x ] );
            }
        }
    },

    initialize: function( config ) {
        this._width = config.width;
        this._height = config.height;


        this._boardData = [];
        this._cellData = [];
        this._creepData = [];
        this._frames = [];
        this._frames.length = 10;

        this._populateBoard();

        this._board = d3.select( '#board' )
            .style( {
                width: ( 12 * this._width ) + 'px'
            } );

        this._cells = this._board.selectAll( 'div.cell' ).data( this._cellData );
        this._creeps = this._board.selectAll( 'div.creep' ).data( this._creepData );
        this._counter = d3.select( '#counter' );
        this._fps = d3.select( '#fps' );

        this._cells
            .enter()
                .append( 'div' )
                .classed( 'cell', true )
                .on( 'click', _.bind( function( d ) {
                    this.spawn( Cell, {
                        value: '*',
                        x: d._x,
                        y: d._y
                    } );
                }, this ) );

        this._cells.each( function( d, i ) {
            d.draw( d3.select( this ) );
        } );

        _.bindAll( this, 'run' );
        this._last = 0;

        d3.timer( this.run );
    },

    spawn: function( Class, options ) {
        var creep = new Class(
            _.extend( options, { game: this } )
        );

        this._creepData.push( creep );

        creep.activate();
    },

    run: function( time ) {
        this._frames.unshift();
        this._frames.push( time - this._last );

        this._drawCells( time - this._last );
        this._last = time;
    },

    x: function( x ) {
        if ( x < 0 ) {
            return x + this._width;
        }

        return x % this._width;
    },

    y: function( y ) {
        if ( y < 0 ) {
            return y + this._height;
        }

        return y % this._height;
    }
} );

new Game( config );
