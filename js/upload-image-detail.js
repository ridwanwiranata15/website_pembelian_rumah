document.addEventListener("DOMContentLoaded", () => {
  const imageInputDetail = document.getElementById("imageDetail");
  const previewContainerDetail = document.getElementById("previewContainerDetail");

  if (!imageInputDetail || !previewContainerDetail) {
    console.log("Elemen input gambar atau container preview tidak ditemukan.");
    return;
  }

  imageInputDetail.addEventListener("change", function () {
    const files = Array.from(this.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        img.style.width = "120px";
        img.style.marginRight = "10px";
        img.style.borderRadius = "8px";
        img.style.border = "1px solid #ccc";
        previewContainerDetail.appendChild(img);
      };
      reader.readAsDataURL(file);
    });

    // Reset supaya bisa upload file yang sama lagi
    this.value = "";
  });
});
