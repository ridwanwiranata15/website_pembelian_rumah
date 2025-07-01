const modalCategory = document.getElementById("modalCategory");
const modalCategoriesDetail = document.getElementById("modalCategoriesDetail")
document.getElementById("openModalCategory").addEventListener("click", function(e){
    e.preventDefault()
    modalCategory.classList.add("active")
    document.body.style.overflow = 'hidden';
})
document.getElementById("closeModalCategory").addEventListener("click", function(e){
    e.preventDefault()
    modalCategory.classList.remove("active")
    document.body.style.overflow = 'hidden';
})

const DetailCategory = function(id){
    modalCategoriesDetail.classList.add("active")
    document.body.style.overflow = 'hidden';
    const categories = document.querySelectorAll("tr[data-id-category='"+id+"'] td")
    const category = {
        "name"  : categories[1].textContent,
        "image" : categories[2].querySelector("img").src,
    }
    const InputCategories = document.querySelectorAll("#modalCategoriesDetail input");
    InputCategories[0].value = category.name
    document.getElementById("img-preview-detail").src = category.image

}
document.getElementById("closeModalDetail").addEventListener("click", () => {
    modalCategoriesDetail.classList.remove("active")
    document.body.style.overflow = 'hidden';
})