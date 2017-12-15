var calcMoves = function(initial) {
        $.ajax({
          url: 'http://localhost:8080/gateway/moves',
          type: 'get',
          contentType: 'application/json; charset=utf-8',
//          data: JSON.stringify({
//            position: initial
//          })
        }).then(
          function fulfillHandler(data) {
            var free_tiles = data.moves.split(";")
            for (var i=0; i < free_tiles.length ; i++ )
            {
                $('*[data-gridpos="'+free_tiles[i].replace(" ","")+'"]').addClass('legal');
                $('*[data-gridpos="'+free_tiles[i].replace(" ","")+'"]').addClass('free-move');
            }

          },
          function rejectHandler(jqXHR, textStatus, errorThrown) {
            // ...
          }
        ).catch(function errorHandler(error) {
          // ...
        });
    }


var createBoard = function()
{
	rank = ["H","G","F","E","D","C","B","A"];
	file = [8,7,6,5,4,3,2,1];

	var currentTile = {};

  	var count = 0;

    for (var j = 0; j < file.length; j++)
	  {
	    for(var i = 0; i < rank.length; i++)
	      {
	        if(count%8 == 0)
	        {
	          $("#chessboard").append('<div class="tile smoothfade" style="clear:left"></div>');

	        }else{
	          $("#chessboard").append('<div class="tile smoothfade"></div>');
	          }
	        $(".tile").eq(count).attr("data-gridpos",((rank[rank.length - (i +1)]+file[j])));

	        if(((i%2 == 0) && (j%2 != 0)) || ((i%2 != 0) && (j%2 == 0)))
	        {
	          $(".tile").eq(count).addClass("black");
	        }
	        else
	        {
	          $(".tile").eq(count).addClass("white");
	        }
	        count++;

	    }
	  }


}

var legalMove = function(piece)
{
	tiles.removeClass('legal');
	var gridpos = currentTile.attr('data-gridpos');
	var l_rank = ($.inArray(gridpos.charAt(0),rank));
	var l_file = ($.inArray(parseInt(gridpos.charAt(1)),file));
	var c_rank = gridpos.charAt(0);
	var c_file = gridpos.charAt(1);

	console.log("Rank : ("+rank[l_rank]+")"+l_rank+" || File "+l_file);

	if (piece == "rook")
	{
		for (var i = 0; i < 8; i++)
		{
			for (var j = 0; j < 8; j++)
			{
				if((c_rank == rank[i]) || (c_file == file[j]))
				{
					var ID = rank[i]+file[j];
					console.log("ID : "+ID);
					$('*[data-gridpos="'+ID+'"]').addClass('legal');
					currentTile.removeClass('legal');
				}

			}


		}

	}


	if (piece == "knight")
	{
		for (var i = l_rank-1; i < l_rank+2; i++)
		{
			for (var j = l_file-1; j < l_file+2; j++)
			{
			var ID = rank[i]+file[j];
			$('*[data-gridpos="'+ID+'"]').addClass('legal');
			currentTile.removeClass('legal');
			}
		}
	}


	if (piece == "pawn")
	{
		var ID = rank[l_rank+1]+file[l_file];
		$('*[data-gridpos="'+ID+'"]').addClass('legal');
		currentTile.removeClass('legal');
	}

}


jQuery(document).ready(function($) {
	createBoard();
	console.log("Created Chessboard");
	tiles = $(".tile");



	$(".smoothmove").on('click',function(){
		currentTile = $(this);
		calcMoves(currentTile.data("gridpos"))

		var midY = $(this).position().top += ( $(this).width() / 2 );
		var midX = $(this).position().left += ( $(this).width() / 2 );
		var player = $("#player");
		player.css({"top":midY - (0.5 * player.width()), "left":midX-(0.5*player.width())});

	});

	$(".tile").on('click',function(){
	    if ($(this).hasClass("free-move")) {
            currentTile = $(this);
            var midY = $(this).position().top += ( $(this).width() / 2 );
            var midX = $(this).position().left += ( $(this).width() / 2 );
            var player = $("#player");


            tiles.removeClass('legal');
            tiles.removeClass('free-move');
            console.log("X : "+midX + " || Y : "+midY);
            player.css({"top":midY - (0.5 * player.width()), "left":midX-(0.5*player.width())});
            player.attr("data-gridpos",currentTile.data("gridpos"))
            console.log("Last Clicked Tile : "+currentTile.data("gridpos"));
        }else{
            tiles.removeClass('legal');
            tiles.removeClass('free-move');
        }

	});

	$(".tile").on('mouseenter',function(){
		$(this).addClass('hover');
	})
	.on('mouseleave',function(){
		$(this).removeClass('hover');
	});

	var displaylegal = $("#controlbox > ul > li");


	displaylegal.on('click',function(){
		console.log($(this).attr('id'))
		legalMove($(this).attr('id'));
	})

	$('*[data-gridpos="A1"]').trigger('click');
});