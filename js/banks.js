 // Toggle sidebar on mobile
        const menuToggle = document.getElementById('menuToggle');
        const sidebar = document.querySelector('.sidebar');
        
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Modal functionality
        const openModal = document.getElementById('openModal');
        const closeModal = document.getElementById('closeModal');
        const cancelModal = document.getElementById('cancelModal');
        const modalOverlay = document.getElementById('modalOverlay');

        openModal.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        cancelModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Responsive adjustments
        function handleResize() {
            if (window.innerWidth > 992) {
                sidebar.classList.remove('active');
            }
        }

        window.addEventListener('resize', handleResize);

         document.addEventListener('DOMContentLoaded', function() {
            const fileInput = document.getElementById('fileInput');
            const dropArea = document.getElementById('dropArea');
            const previewContainer = document.getElementById('previewContainer');
            const previewImage = document.getElementById('previewImage');
            const fileInfo = document.getElementById('fileInfo');
            const removeBtn = document.getElementById('removeBtn');
            const uploadBtn = document.getElementById('uploadBtn');
            const statusText = document.getElementById('statusText');
            
            // Prevent default drag behaviors
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false);
            });
            
            function preventDefaults(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            
            // Highlight drop area when item is dragged over it
            ['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false);
            });
            
            function highlight() {
                dropArea.classList.add('drag-over');
            }
            
            function unhighlight() {
                dropArea.classList.remove('drag-over');
            }
            
            // Handle dropped files
            dropArea.addEventListener('drop', handleDrop, false);
            
            function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
                if (files.length) {
                    fileInput.files = files;
                    handleFiles(files);
                }
            }
            
            // Handle selected files
            fileInput.addEventListener('change', function() {
                handleFiles(this.files);
            });
            
            function handleFiles(files) {
                const file = files[0];
                
                if (!file.type.match('image.*')) {
                    statusText.textContent = 'Please select an image file';
                    statusText.className = 'text-sm text-red-500';
                    return;
                }
                
                if (file.size > 5 * 1024 * 1024) {
                    statusText.textContent = 'File size exceeds 5MB limit';
                    statusText.className = 'text-sm text-red-500';
                    return;
                }
                
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    previewContainer.style.display = 'block';
                    
                    // Display file info
                    fileInfo.innerHTML = `
                        <p><strong>Name:</strong> ${file.name}</p>
                        <p><strong>Type:</strong> ${file.type}</p>
                        <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
                    `;
                    
                    // Enable upload button
                    uploadBtn.disabled = false;
                    statusText.textContent = 'Ready to upload';
                    statusText.className = 'text-sm text-green-500';
                };
                
                reader.readAsDataURL(file);
            }
            
            // Remove image
            removeBtn.addEventListener('click', function() {
                previewImage.src = '#';
                previewContainer.style.display = 'none';
                fileInput.value = '';
                uploadBtn.disabled = true;
                statusText.textContent = 'No file selected';
                statusText.className = 'text-sm text-gray-500';
            });
            
            // Upload button click
            uploadBtn.addEventListener('click', function() {
                if (!fileInput.files.length) return;
                
                // Simulate upload
                uploadBtn.disabled = true;
                statusText.textContent = 'Uploading...';
                statusText.className = 'text-sm text-blue-500';
                
                setTimeout(() => {
                    statusText.textContent = 'Upload complete!';
                    statusText.className = 'text-sm text-green-500';
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        statusText.textContent = '';
                    }, 2000);
                }, 1500);
            });
            
            // Helper function to format file size
            function formatFileSize(bytes) {
                if (bytes === 0) return '0 Bytes';
                
                const k = 1024;
                const sizes = ['Bytes', 'KB', 'MB', 'GB'];
                const i = Math.floor(Math.log(bytes) / Math.log(k));
                
                return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
            }
        });