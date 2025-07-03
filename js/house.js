// Form & Step
const submitBtn = document.getElementById('submitBtn');
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const thumbnailInput = document.getElementById('thumbnail');
const thumbnailPreview = document.getElementById('thumbnailPreview');
const photosInput = document.getElementById('photos');
const photosPreview = document.getElementById('photosPreview');
const facilitiesContainer = document.getElementById('facilitiesContainer');
const imageDetailInput = document.getElementById('imageDetail');
const previewContainerDetail = document.getElementById('previewContainerDetail');

let currentStep = 1;

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

// Form step update
function updateForm() {
    formSteps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step-${currentStep}`).classList.add('active');

    progressSteps.forEach((step, index) => {
        step.classList.toggle('active', index === currentStep - 1);
        step.classList.toggle('completed', index < currentStep - 1);
    });

    document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'block';
    submitBtn.style.display = currentStep === formSteps.length ? 'block' : 'none';
    document.getElementById('nextBtn').style.display = currentStep === formSteps.length ? 'none' : 'block';
}

function nextSlide() {
    if (validateStep(currentStep)) {
        currentStep++;
        updateForm();
    }
}

// Validate per step
function validateStep(step) {
    let isValid = true;

    switch (step) {
        case 1:
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            if (!name || !price) {
                alert('Isi semua kolom di Step 1');
                isValid = false;
            } else {
                formData.name = name;
                formData.price = price;
            }
            break;

        case 2:
            const certificate = document.getElementById('certificate').value;
            if (!certificate) {
                alert('Pilih sertifikat');
                isValid = false;
            }
            if (!formData.thumbnail) {
                alert('Upload thumbnail terlebih dahulu');
                isValid = false;
            }
            if (isValid) formData.certificate = certificate;
            break;

        case 3:
            const facilities = Array.from(document.querySelectorAll('.facility-select')).map(select => select.value).filter(Boolean);
            if (facilities.length === 0) {
                alert('Pilih minimal 1 fasilitas');
                isValid = false;
            }
            if (formData.photos.length === 0) {
                alert('Upload minimal 1 foto');
                isValid = false;
            }
            if (isValid) formData.facilities = facilities;
            break;

        case 4:
            const about = document.getElementById('about').value;
            const city = document.getElementById('city').value;
            if (!about || !city) {
                alert('Isi semua kolom di Step 4');
                isValid = false;
            } else {
                formData.about = about;
                formData.city = city;
            }
            break;

        case 5:
            const category = document.getElementById('category').value;
            const electric = document.getElementById('electric').value;
            if (!category || !electric) {
                alert('Isi semua kolom di Step 5');
                isValid = false;
            } else {
                formData.category = category;
                formData.electric = electric;
            }
            break;

        case 6:
            const landArea = document.getElementById('landArea').value;
            const buildArea = document.getElementById('buildArea').value;
            if (!landArea || !buildArea) {
                alert('Isi semua kolom di Step 6');
                isValid = false;
            } else {
                formData.landArea = landArea;
                formData.buildArea = buildArea;
            }
            break;

        case 7:
            const bedroom = document.getElementById('bedroom').value;
            const bathroom = document.getElementById('bathroom').value;
            if (!bedroom || !bathroom) {
                alert('Isi semua kolom di Step 7');
                isValid = false;
            } else {
                formData.bedroom = bedroom;
                formData.bathroom = bathroom;
            }
            break;
    }

    return isValid;
}

// Preview thumbnail
thumbnailInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            thumbnailPreview.innerHTML = `<img src="${e.target.result}" style="max-width: 150px;">`;
            formData.thumbnail = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        thumbnailPreview.innerHTML = '<p>No thumbnail selected</p>';
        formData.thumbnail = null;
    }
});

// Preview banyak foto
photosInput.addEventListener('change', function () {
    photosPreview.innerHTML = '';
    formData.photos = [];

    Array.from(this.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '120px';
            img.style.margin = '5px';
            photosPreview.appendChild(img);
            formData.photos.push(e.target.result);
        };
        reader.readAsDataURL(file);
    });
});

// Preview foto di modal detail
imageDetailInput?.addEventListener('change', function () {
    previewContainerDetail.innerHTML = '';
    Array.from(this.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '120px';
            img.style.margin = '5px';
            previewContainerDetail.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

// Modal buka tutup
document.getElementById("openModalHouse").addEventListener("click", function () {
    document.getElementById("modalHouse").classList.add("active");
});
document.getElementById("closeModalHouse").addEventListener("click", function () {
    document.getElementById("modalHouse").classList.remove("active");
});

// Reset form
function resetForm() {
    currentStep = 1;
    updateForm();

    document.getElementById('DetailForm').reset();
    photosPreview.innerHTML = '';
    thumbnailPreview.innerHTML = '<p>No thumbnail selected</p>';
    previewContainerDetail.innerHTML = '';

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

    for (const key in formData) {
        if (Array.isArray(formData[key])) formData[key] = [];
        else formData[key] = key === "thumbnail" ? null : '';
    }
}



document.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('add-facility-btn')) {
        event.preventDefault();

        const newFacility = document.createElement('div');
        newFacility.classList.add('facility-item');

        newFacility.innerHTML = `
            <select class="facility-select">
                <option value="">Select facility</option>
                <option value="pool">Swimming Pool</option>
                <option value="gym">Gym</option>
                <option value="parking">Parking</option>
                <option value="security">24/7 Security</option>
            </select>
            <button class="btn-outline add-facility-btn">+</button>
            <button class="btn-outline remove-facility-btn">-</button>
        `;

        facilitiesContainer.appendChild(newFacility);
    }

    // Handler tombol hapus fasilitas
    if (event.target && event.target.classList.contains('remove-facility-btn')) {
        event.preventDefault();
        const item = event.target.closest('.facility-item');
        if (item && facilitiesContainer.children.length > 1) {
            item.remove();
        }
    }
});

function SubmitHouse(){
    alert("Assalamualaikum")
}

function DetailHouse(id){
    document.getElementById("modalHouseDetail").classList.add("active")
     const houseData = document.querySelectorAll("tr[data-id-House='"+id+"'] td")

    const house = {
        name: houseData[1].textContent, 
        price : houseData[2].textContent,
        certificate: houseData[3].textContent,
        thumbnail : houseData[4].querySelector('img').src,
        photos : houseData[5].querySelectorAll('img'),
        facilities:houseData[6].querySelectorAll("p"),
        about : houseData[7].textContent,
        city: houseData[8].textContent,
        category: houseData[9].textContent,
        electric: houseData[10].textContent,
        land_area: houseData[11].textContent,
        building_area: houseData[12].textContent,
        bathroom: houseData[13].textContent,
        bedroom: houseData[14].textContent
    }

    currentStepDetail = 1;
    updateFormDetail();

    document.getElementById("modalHouseDetail").classList.add("active");

    // Step 1
    document.querySelector(".name").value = house.name;
    document.querySelector('.price').value = house.price;

    // Step 2
    document.querySelector(".thumbnailPreviewDetail").innerHTML = `<img src="${house.thumbnail}" style="max-width: 150px;">`;

    // Step 3
    document.querySelector(".photosPreviewDetail").innerHTML = '';
    house.photos.forEach(img => {
        const previewImg = document.createElement('img');
        previewImg.src = img.src;
        previewImg.style.maxWidth = '120px';
        previewImg.style.margin = '5px';
        document.querySelector(".photosPreviewDetail").appendChild(previewImg);
    });

    const facilitiesHTML = Array.from(house.facilities).map(p => `<p>${p.textContent}</p>`).join('');
    document.querySelector(".facilitiesPreviewDetail").innerHTML = facilitiesHTML;

    // Step 4
    document.querySelector(".aboutDetail").value = house.about;
    document.querySelector(".cityDetail").value = house.city;

    // Step 5
    
    document.querySelector(".electricDetail").value = house.electric;

    // Step 6
    document.querySelector(".landAreaDetail").value = house.land_area;
    document.querySelector(".buildAreaDetail").value = house.building_area;

    // Step 7
    document.querySelector(".bedroomDetail").value = house.bedroom;
    document.querySelector(".bathroomDetail").value = house.bathroom;
}



document.getElementById("closeModalHouse").addEventListener("click",() => {
    document.getElementById("modalHouseDetail").classList.remove("active");
})
function HideModalDetailHouse(){
    document.getElementById("modalHouseDetail").classList.remove("active");
    
}

function updateFormDetail() {
    const formStepsDetail = document.querySelectorAll('.form-step-detail');
    const progressStepsDetail = document.querySelectorAll('.progress-step-detail');

    formStepsDetail.forEach(step => step.classList.remove('active'));
    document.querySelector(`.step-detail-${currentStepDetail}`).classList.add('active');

    progressStepsDetail.forEach((step, index) => {
        step.classList.toggle('active', index === currentStepDetail - 1);
        step.classList.toggle('completed', index < currentStepDetail - 1);
    });

    document.querySelector('.prevBtnDetail').style.display = currentStepDetail === 1 ? 'none' : 'block';
    document.querySelector('.nextBtnDetail').style.display = currentStepDetail === formStepsDetail.length ? 'none' : 'block';
}

function nextSlideDetail() {
    currentStepDetail++;
    updateFormDetail();
}

function prevSlideDetail() {
    currentStepDetail--;
    updateFormDetail();
}