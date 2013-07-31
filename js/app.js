var en = new EchoNest("CXUQGUSG0ZNDWJQGH");

$("#search-artist").click(function() {
	if (!$("#search-artist").attr("disabled")) {
		$("#results").html("");
		searchArtist($("#artist").val());
	}
});

$("#reset-artist").click(function() {
	$("#results").html("");
	
	$("#search-artist").removeAttr("disabled");
	$("#artist").removeAttr("disabled");
	$("#artist").val("");
	$("#credit").css("visibility", "visible");
});

//  if user hits enter, return false but call searchArtist
$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
		event.preventDefault();
		if (!$("#search-artist").attr("disabled")) {
			$("#results").html("");
			searchArtist($("#artist").val());
		}
      return false;
    }
  });
});

function searchArtist(artist_name) {
	$(".artist-group").removeClass("active-group").addClass("frozen-group");
	$("#search-artist").attr("disabled", "disabled");
	$("#artist").attr("disabled", "disabled");
	$("#credit").css("visibility", "hidden");
	
	en.artist.search({name: artist_name},
		function(data) {
			//var _artists = _.template($("#artist-tmpl").html(), data.response);
			if (data && data.response && data.response.artists) {

				en.artist.similar({id: data.response.artists[0].id},
					function(data) {

						newHtml = _.template($("#artist-tmpl").html(), data.response);
						$("#results").append(newHtml);

						$(".active-group li").click(function() {
							$('li').off('click');
							$(this).addClass('active-artist');
							$(this).parent().parent().removeClass('hover-on');
							searchArtist($(this).html());
						});
					},
					function(err) {

					}
				);
			}
		}, 
		function(err) {

		}
	);
}