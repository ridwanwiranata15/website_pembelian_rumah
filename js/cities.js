document.getElementById("openModalCity").addEventListener("click", () =>{
    document.getElementById("modalCity").classList.add("active")
})
document.getElementById("closeModalCity").addEventListener("click", () => {
    document.getElementById("modalCity").classList.remove("active")
})

function DetailCity(id){
    document.getElementById("modalcitiesDetail").classList.add("active");
    const cities = document.querySelectorAll("tr[data-id-City='"+id+"'] td")
    const city = {
         "name"  : cities[1].textContent,
         "image" : cities[2].querySelector("img").src,
    }
    const InputCities = document.querySelectorAll("#modalcitiesDetail input");
    InputCities[0].value = city.name
    document.getElementById("img-preview-detail-city").src = city.image
}
document.getElementById("closeModalDetailCity").addEventListener("click", () => {
    document.getElementById("modalcitiesDetail").classList.remove("active");
})