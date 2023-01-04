export function getBase64(file, then) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      then(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 } 