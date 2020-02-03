function onLoadBloodPressure() {
}

function buttonClickBloodPressure(e) {
	if (e.target.id.startsWith("bppad-sys-")) {
		document.getElementById('input-bp-sys').value = e.target.id.substring(10);
	}
	if (e.target.id.startsWith("bppad-dia-")) {
		document.getElementById('input-bp-dia').value = e.target.id.substring(10);
	}
}
