function searchTerm() {
	var query = $("#query").val();
	$.ajax({
		url: "https://itunes.apple.com/search",
		type:"GET",
		data: $.param({term:query, limit:6}),
	  dataType: "jsonp",
		success: function(data) {
			if (data["results"].length == 0) {
				searchError();
      } else if (data["results"][0]["artworkUrl60"]) {
        var result = data["results"][0];
        var url = result["artworkUrl60"].replace("60x60", "1440x1440");
        $("#artwork").attr("src", url);
        var artist = result["artistName"] || "unknown";
        var name = result["collectionName"] || result["trackName"];
        $("#caption").text(name + " by " + artist);
      } else {
        searchError();
			}
		},
		error: function(a,b,c) {
			searchError();
		}
	});
};

function searchError() {
	$("#artwork").effect("shake", {distance:250}, 400);
	$("#artwork").attr("src", "img/default-artwork.png");
}

function reset() {
  $("#artwork").attr("src", "img/loading.gif");
  $("#caption").text("");
}

$(document).ready(function() {
	$("form").submit(function(event) {
    event.preventDefault();
    reset();
    searchTerm();
	});
	$("#download-btn").click(function(event) {
		event.preventDefault();
		$("#download").attr("href", $("#artwork").attr("src"));
		$("#download").attr("download", "");
		$("#download")[0].click();
	});
});
