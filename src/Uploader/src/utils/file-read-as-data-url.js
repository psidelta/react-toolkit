export default function fileReadAsDataURL(file) {
  if (typeof FileReader !== 'undefined') {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();

      reader.addEventListener('load', () => {
        resolve(reader.result);
      });

      reader.readAsDataURL(file);
    });
  }

  return Promise.resolve();
}
