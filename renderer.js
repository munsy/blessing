// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var app = require('electron').remote;
var dialog = app.dialog;
var fs = require('fs');

document.getElementById('createButton').onclick = () => {
	dialog.showSaveDialog((fileName) => {
		if(fileName === undefined) {
			alert("You didn't save the file!");
			return;
		}

		var content = document.getElementById('content').value;

		fs.writeFile(fileName, content, (err) => {
			if(err) console.log(err);
			alert("The file has been successfully saved.");
		})
	});
};

document.getElementById('openButton').onclick = () => {
	dialog.showOpenDialog((fileNames) => {
		if(fileNames === undefined) {
			alert('No file selected');
		} else {
			readFile(fileNames[0]);
		}
	});
};

function readFile(filepath) {
	fs.readFile(filepath, 'utf-8', (err, data) => {
		if(err) {
			alert('An error occurred reading the file.');
			return;
		}

		var textArea = document.getElementById('output');

		textArea.value = data;
	});
}
