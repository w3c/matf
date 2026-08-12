function removeSectionNumbering() {
	var tocEl = document.querySelector(".tocline > a[href=\"#comments\"]").parentNode.querySelector("ol");
	tocEl.querySelectorAll("bdi.secno").forEach(function(node){node.remove();});

	document.querySelectorAll("section#comments > section bdi.secno").forEach(function(node){node.remove();});
}

// scripts after Respec has run
function postRespec() {
	removeSectionNumbering();
}