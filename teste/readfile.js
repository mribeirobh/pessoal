window.onload = function() {
		var fileInput = document.getElementById('fileInput');
		var fileDisplayArea = document.getElementById('fileDisplayArea');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
				    /*if (fileDisplayArea.innerText != null) {
						fileDisplayArea.innerText = reader.result;
					}
					else{
						fileDisplayArea.textContent=reader.result;
					}*/
					var html = reader.result;
					html = html.replace('<head>','<head><script type="text/javascript" src="D_MEGA.js"></script>')
					fileDisplayArea.innerHTML = html;
				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
