// DOM Elements
        const openModalBtn = document.getElementById('openModalBtn');
        const openDetailModalBtn = document.getElementById('openDetailModalBtn');
        const createModal = document.getElementById('createModal');
        const detailModal = document.getElementById('detailModal');
        const closeBtns = document.querySelectorAll('.close');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const formSteps = document.querySelectorAll('.form-step');
        const progressSteps = document.querySelectorAll('.progress-step');
         function saveFormData() {
            // All data is already saved during validation
            console.log('Form data saved:', formData);
        }
        // Form data object to store all inputs
        const formData = {
            name: '',
            price: '',
            certificate: '',
            thumbnail: null,
            photos: [],
            facilities: [],
            about: '',
            city: '',
            category: '',
            electric: '',
            landArea: '',
            buildArea: '',
            bedroom: '',
            bathroom: ''
        };

        // Current step
        let currentStep = 1;

        // Open create modal
        openModalBtn.addEventListener('click', () => {
            createModal.style.display = 'block';
            resetForm();
        });

        // Open detail modal
        openDetailModalBtn.addEventListener('click', () => {
            updateDetailModal();
            detailModal.style.display = 'block';
        });

        // Close modals
        closeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                createModal.style.display = 'none';
                detailModal.style.display = 'none';
            });
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === createModal) {
                createModal.style.display = 'none';
            }
            if (e.target === detailModal) {
                detailModal.style.display = 'none';
            }
        });

        // Next button click
        // nextBtn.addEventListener('click', () => {
        //     if (validateStep(currentStep)) {
        //         currentStep++;
        //         updateForm();
        //     }
        // });
        function nextSlide(){
            alert("lanjut")
        }

        // Previous button click
        prevBtn.addEventListener('click', () => {
            currentStep--;
            updateForm();
        });

        // Submit button click
        submitBtn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                // Save all form data
                saveFormData();
                alert('Form submitted successfully!');
                createModal.style.display = 'none';
                updateDetailModal();
            }
        });

        // Thumbnail upload
        const thumbnailInput = document.getElementById('thumbnail');
        const thumbnailPreview = document.getElementById('thumbnailPreview');
        
        thumbnailInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    thumbnailPreview.innerHTML = `<img src="${e.target.result}" alt="Thumbnail">`;
                    formData.thumbnail = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Photos upload
        const photosInput = document.getElementById('photos');
        const photosPreview = document.getElementById('photosPreview');
        
        photosInput.addEventListener('change', (e) => {
            const files = e.target.files;
            photosPreview.innerHTML = '';
            formData.photos = [];
            
            if (files.length > 0) {
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        previewItem.innerHTML = `
                            <img src="${e.target.result}" alt="Photo ${i+1}">
                            <button class="remove-btn" data-index="${i}">&times;</button>
                        `;
                        photosPreview.appendChild(previewItem);
                        formData.photos.push(e.target.result);
                        
                        // Add event listener to remove button
                        previewItem.querySelector('.remove-btn').addEventListener('click', (e) => {
                            e.stopPropagation();
                            const index = parseInt(e.target.getAttribute('data-index'));
                            formData.photos.splice(index, 1);
                            photosPreview.removeChild(previewItem);
                            // Update data-index for remaining items
                            const items = photosPreview.querySelectorAll('.preview-item');
                            items.forEach((item, idx) => {
                                item.querySelector('.remove-btn').setAttribute('data-index', idx);
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                }
            }
        });

        // Add facility
        const facilitiesContainer = document.getElementById('facilitiesContainer');
        
        facilitiesContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('add-facility-btn')) {
                e.preventDefault();
                const newFacility = document.createElement('div');
                newFacility.className = 'facility-item';
                newFacility.innerHTML = `
                    <select class="facility-select">
                        <option value="">Select facility</option>
                        <option value="pool">Swimming Pool</option>
                        <option value="gym">Gym</option>
                        <option value="parking">Parking</option>
                        <option value="security">24/7 Security</option>
                    </select>
                    <button class="btn-secondary remove-facility-btn">-</button>
                `;
                facilitiesContainer.appendChild(newFacility);
                
                // Add event listener to remove button
                newFacility.querySelector('.remove-facility-btn').addEventListener('click', (e) => {
                    e.preventDefault();
                    facilitiesContainer.removeChild(newFacility);
                });
            }
        });

        // Update form display based on current step
        function updateForm() {
            // Hide all steps
            formSteps.forEach(step => {
                step.classList.remove('active');
            });
            
            // Show current step
            document.getElementById(`step-${currentStep}`).classList.add('active');
            
            // Update progress steps
            progressSteps.forEach((step, index) => {
                if (index < currentStep - 1) {
                    step.classList.remove('active');
                    step.classList.add('completed');
                } else if (index === currentStep - 1) {
                    step.classList.add('active');
                    step.classList.remove('completed');
                } else {
                    step.classList.remove('active');
                    step.classList.remove('completed');
                }
            });
            
            // Update buttons
            if (currentStep === 1) {
                prevBtn.style.display = 'none';
            } else {
                prevBtn.style.display = 'block';
            }
            
            if (currentStep === formSteps.length) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'block';
            } else {
                nextBtn.style.display = 'block';
                submitBtn.style.display = 'none';
            }
        }

        // Validate current step
        function validateStep(step) {
            let isValid = true;
            
            switch (step) {
                case 1:
                    const name = document.getElementById('name').value;
                    const price = document.getElementById('price').value;
                    
                    if (!name) {
                        alert('Please enter property name');
                        isValid = false;
                    }
                    if (!price) {
                        alert('Please enter price');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.name = name;
                        formData.price = price;
                    }
                    break;
                    
                case 2:
                    const certificate = document.getElementById('certificate').value;
                    
                    if (!certificate) {
                        alert('Please select certificate type');
                        isValid = false;
                    }
                    if (!formData.thumbnail) {
                        alert('Please upload thumbnail');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.certificate = certificate;
                    }
                    break;
                    
                case 3:
                    const facilitySelects = document.querySelectorAll('.facility-select');
                    const facilities = [];
                    
                    facilitySelects.forEach(select => {
                        if (select.value) {
                            facilities.push(select.value);
                        }
                    });
                    
                    if (facilities.length === 0) {
                        alert('Please add at least one facility');
                        isValid = false;
                    }
                    if (formData.photos.length === 0) {
                        alert('Please upload at least one photo');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.facilities = facilities;
                    }
                    break;
                    
                case 4:
                    const about = document.getElementById('about').value;
                    const city = document.getElementById('city').value;
                    
                    if (!about) {
                        alert('Please enter about property');
                        isValid = false;
                    }
                    if (!city) {
                        alert('Please enter city');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.about = about;
                        formData.city = city;
                    }
                    break;
                    
                case 5:
                    const category = document.getElementById('category').value;
                    const electric = document.getElementById('electric').value;
                    
                    if (!category) {
                        alert('Please select category');
                        isValid = false;
                    }
                    if (!electric) {
                        alert('Please enter electric capacity');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.category = category;
                        formData.electric = electric;
                    }
                    break;
                    
                case 6:
                    const landArea = document.getElementById('landArea').value;
                    const buildArea = document.getElementById('buildArea').value;
                    
                    if (!landArea) {
                        alert('Please enter land area');
                        isValid = false;
                    }
                    if (!buildArea) {
                        alert('Please enter build area');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.landArea = landArea;
                        formData.buildArea = buildArea;
                    }
                    break;
                    
                case 7:
                    const bedroom = document.getElementById('bedroom').value;
                    const bathroom = document.getElementById('bathroom').value;
                    
                    if (!bedroom) {
                        alert('Please enter number of bedrooms');
                        isValid = false;
                    }
                    if (!bathroom) {
                        alert('Please enter number of bathrooms');
                        isValid = false;
                    }
                    
                    if (isValid) {
                        formData.bedroom = bedroom;
                        formData.bathroom = bathroom;
                    }
                    break;
            }
            
            return isValid;
        }

        // Save all form data
        function saveFormData() {
            // All data is already saved during validation
            console.log('Form data saved:', formData);
        }

        // Update detail modal with form data
        function updateDetailModal() {
            document.getElementById('detail-name').textContent = formData.name || '-';
            document.getElementById('detail-price').textContent = formData.price ? `$${formData.price}` : '-';
            document.getElementById('detail-certificate').textContent = getCertificateText(formData.certificate) || '-';
            document.getElementById('detail-city').textContent = formData.city || '-';
            document.getElementById('detail-category').textContent = getCategoryText(formData.category) || '-';
            document.getElementById('detail-electric').textContent = formData.electric || '-';
            document.getElementById('detail-landArea').textContent = formData.landArea ? `${formData.landArea} m²` : '-';
            document.getElementById('detail-buildArea').textContent = formData.buildArea ? `${formData.buildArea} m²` : '-';
            document.getElementById('detail-bedroom').textContent = formData.bedroom || '-';
            document.getElementById('detail-bathroom').textContent = formData.bathroom || '-';
            document.getElementById('detail-about').textContent = formData.about || '-';
            
            // Facilities
            const facilitiesList = document.getElementById('detail-facilities');
            facilitiesList.innerHTML = '';
            if (formData.facilities.length > 0) {
                formData.facilities.forEach(facility => {
                    const li = document.createElement('li');
                    li.textContent = getFacilityText(facility);
                    facilitiesList.appendChild(li);
                });
            } else {
                facilitiesList.innerHTML = '<li>No facilities</li>';
            }
            
            // Thumbnail
            const detailThumbnail = document.getElementById('detail-thumbnail');
            if (formData.thumbnail) {
                detailThumbnail.innerHTML = `<img src="${formData.thumbnail}" alt="Thumbnail">`;
            } else {
                detailThumbnail.innerHTML = '<p>No thumbnail</p>';
            }
            
            // Gallery
            const detailGallery = document.getElementById('detail-gallery');
            detailGallery.innerHTML = '';
            if (formData.photos.length > 0) {
                formData.photos.forEach((photo, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    galleryItem.innerHTML = `<img src="${photo}" alt="Photo ${index + 1}">`;
                    detailGallery.appendChild(galleryItem);
                });
            } else {
                detailGallery.innerHTML = '<p>No photos</p>';
            }
        }

        // Helper functions to get display text
        function getCertificateText(value) {
            const certificates = {
                'shm': 'SHM (Sertifikat Hak Milik)',
                'hgb': 'HGB (Hak Guna Bangunan)',
                'shgb': 'SHGB (Sertifikat Hak Guna Bangunan)',
                'girik': 'Girik'
            };
            return certificates[value] || value;
        }

        function getCategoryText(value) {
            const categories = {
                'house': 'House',
                'apartment': 'Apartment',
                'villa': 'Villa',
                'land': 'Land'
            };
            return categories[value] || value;
        }

        function getFacilityText(value) {
            const facilities = {
                'pool': 'Swimming Pool',
                'gym': 'Gym',
                'parking': 'Parking',
                'security': '24/7 Security'
            };
            return facilities[value] || value;
        }

        // Reset form
        function resetForm() {
            currentStep = 1;
            updateForm();
            
            // Clear form inputs
            document.getElementById('name').value = '';
            document.getElementById('price').value = '';
            document.getElementById('certificate').value = '';
            document.getElementById('thumbnail').value = '';
            document.getElementById('photos').value = '';
            document.getElementById('about').value = '';
            document.getElementById('city').value = '';
            document.getElementById('category').value = '';
            document.getElementById('electric').value = '';
            document.getElementById('landArea').value = '';
            document.getElementById('buildArea').value = '';
            document.getElementById('bedroom').value = '';
            document.getElementById('bathroom').value = '';
            
            // Clear previews
            thumbnailPreview.innerHTML = '<p>No thumbnail selected</p>';
            photosPreview.innerHTML = '';
            
            // Reset facilities (keep one default)
            facilitiesContainer.innerHTML = `
                <div class="facility-item">
                    <select class="facility-select">
                        <option value="">Select facility</option>
                        <option value="pool">Swimming Pool</option>
                        <option value="gym">Gym</option>
                        <option value="parking">Parking</option>
                        <option value="security">24/7 Security</option>
                    </select>
                    <button class="btn-outline add-facility-btn">+</button>
                </div>
            `;
            
            // Reset form data
            for (const key in formData) {
                if (Array.isArray(formData[key])) {
                    formData[key] = [];
                } else if (typeof formData[key] === 'object') {
                    formData[key] = null;
                } else {
                    formData[key] = '';
                }
            }
        }