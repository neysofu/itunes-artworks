function searchTerm() {
	var query = $("#query").val();
	$.ajax({
		url: "https://itunes.apple.com/search",
		type:"GET",
		data: $.param({term:query, limit:1}),
	  dataType: "jsonp",
		success: function(data) {
			if (data["results"].length == 0) {
				searchError();
			} else {
        var url = data["results"][0]["artworkUrl60"].replace("60x60", "1440x1440");
				$("#artwork").attr("src", url);
			}
		},
		error: function(a,b,c) {
			searchError();
		}
	});
};

function searchError() {
	$("#artwork").attr("src", "img/default-artowkr.png");
	$("#artwork").effect("shake", {distance:300});
}

$(document).ready(function() {
	$("form").submit(function(event) {
    event.preventDefault();
		$("#artwork").attr("src", "img/loading.gif");
    searchTerm();
	});
});
