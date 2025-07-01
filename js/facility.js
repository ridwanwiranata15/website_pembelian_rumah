document.getElementById("openModalFacility").addEventListener("click", () => {
    document.getElementById("modalfacility").classList.add("active")
})
document.getElementById("closeModalfacility").addEventListener("click", () => {
    document.getElementById("modalfacility").classList.remove("active")
})

function Detailfacility(id){
    document.getElementById("modalfacilitiesDetail").classList.add("active")
    const facilities = document.querySelectorAll("tr[data-id-facility='"+id+"'] td")
    const facility = {
        "name" : facilities[1].textContent,
        "image" : facilities[2].querySelector("img").src
    }

    const InputFacility = document.querySelectorAll("#modalfacilitiesDetail input")
    InputFacility[0].value = facility.name
    document.getElementById("img-preview-detail-facility").src = facility.image
}
document.getElementById("closeModalDetailfacility").addEventListener("click", function(){
     document.getElementById("modalfacilitiesDetail").classList.remove("active")
})