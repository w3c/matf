function removeSectionNumbering() {
	var tocEl = document.querySelector(".tocline > a[href=\"#guidance\"]").parentNode.querySelector("ol");
	tocEl.querySelectorAll("bdi.secno").forEach(function(node){node.remove();});

	document.querySelectorAll("section#guidance > section bdi.secno").forEach(function(node){node.remove();});
}

// scripts after Respec has run
function postRespec() {
	removeSectionNumbering();
}