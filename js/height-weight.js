function onLoadHeightWeight() {
	if (document.getElementById('input-weight-range') != null) {
		document.getElementById('input-weight-range').oninput = function() {
			document.getElementById('input-weight').value = document.getElementById('input-weight-range').value;
		};
	}
	if (document.getElementById('input-height-range') != null) {
		document.getElementById('input-height-range').oninput = function() {
			document.getElementById('input-height').value = document.getElementById('input-height-range').value;
		};
	}
}
