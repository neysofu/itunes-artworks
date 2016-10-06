$(document).ready(function() {
	$("#btn").on("click", function() {
		var inputterm = $('#track').val();
		$.ajax({
			url: "https://itunes.apple.com/search",
			type:"GET",
			data: $.param({term : inputterm}),
	    	dataType: "jsonp",
			success: function(data) {
				var url = data["results"][0]["artworkUrl60"].replace("60x60", "1440x1440");
				var img = $("#artwork").attr('src', url);
			}
		});
	});
});
