function searchTerm() {
	var query = $(".search-bar").val();
	$.ajax({
		url: "https://itunes.apple.com/search",
		type:"GET",
		data: $.param({term:query}),
	   	dataType: "jsonp",
		success: function(data) {
			var url = data["results"][0]["artworkUrl60"].replace("60x60", "1440x1440");
			var img = $("#artwork").attr("src", url);
		}
	});
};

$(document).ready(function() {
	$(".search-bar").keypress(function(e) {
		if (e.which == 13) {
			searchTerm();
			return false;
		}
	});
});
