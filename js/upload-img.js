    const imageInput = document.getElementById('images');
    const previewContainer = document.getElementById('previewContainer');

    imageInput.addEventListener('change', function () {
      const files = Array.from(this.files);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });

      // Reset input supaya bisa upload file yang sama lagi
      this.value = '';
    });