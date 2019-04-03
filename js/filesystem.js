document.addEventListener('drop', function (e) {
  e.preventDefault();
  e.stopPropagation();

  var dirs = []
  
  for (let f of e.dataTransfer.files) {
  	dirs.push(f.path)
  }
});

document.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.stopPropagation();
});
