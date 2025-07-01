// Fungsi reusable untuk preview gambar
function setupImagePreview(inputId, previewContainerId) {
    const input = document.getElementById(inputId);
    const previewContainer = document.getElementById(previewContainerId);

    if (!input || !previewContainer) return;

    input.addEventListener('change', function () {
        previewContainer.innerHTML = ''; // Bersihkan kontainer

        const files = Array.from(input.files);
        if (files.length === 0) return;

        files.forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.width = '100px';
                img.style.margin = '5px';
                img.style.borderRadius = '8px';
                previewContainer.appendChild(img);
            }
            reader.readAsDataURL(file);
        });
    });
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    // Daftar input ID dan preview container ID
    setupImagePreview('imagesThumbnail', 'previewThumbnail');
    setupImagePreview('imagesGallery', 'previewGallery');
    setupImagePreview('imageDetail', 'previewContainerDetail');
});
