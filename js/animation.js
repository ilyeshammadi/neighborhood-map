let isNavOpen = true;

$(document).ready(function () {

	if ($(window).width() <= 768) {
		closeSearchArea();
	} else {
		openSearchArea();
	}

	$(window).resize(function () {
		if ($(window).width() <= 768) {
			closeSearchArea();
		} else {
			openSearchArea();
		}
	})

	$('#nav-btn').click(function () {
		if (isNavOpen) {
			closeSearchArea();
		} else {
			openSearchArea();
		}
	});
});



function openSearchArea() {
	isNavOpen = true;
	// Show the search area
	$("#search-area").css({
		display: "inline-block"
	})
	// Chabge yhe map width
	$("#content").css({
		width: "calc(100vw - 280px)",
		marginLeft: "-4px"
	})
}

function closeSearchArea() {
	isNavOpen = false;
	// Hide the search area
	$("#search-area").css({
		display: "none"
	})
	// Chabge yhe map width
	$("#content").css({
		width: "100vw",
		marginLeft: "0"
	})
}

function alertError(message) {
	const compiled = _.template('<div class="alert alert-danger" role="alert"><%= message %></div>')
	$('#alert-message').html(compiled({'message' : message}));
}
