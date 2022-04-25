const check = document.getElementById("check");

//dynamic-value
check.onchange = function() {
	this.value = this.checked;
	this.setAttribute('checked', this.checked);
}