document.getElementById("openModalInterest").addEventListener("click", function(){
    document.getElementById("modalOverlayInterest").classList.add("active")
})
document.getElementById("closeModalInterest").addEventListener("click", function(){
    document.getElementById("modalOverlayInterest").classList.remove("active")
})

function DetailInterest(id){
    document.getElementById("modalInterestsDetail").classList.add("active")
    const dataInteres = document.querySelectorAll("tr[data-id-interest='"+id+"'] td")
    const Interest = {
        "interest" : dataInteres[3].textContent,
        "years" : dataInteres[4].textContent
    }

    const inputInterests = document.querySelectorAll("#modalInterestsDetail input");
    inputInterests[0].value = Interest.interest
    inputInterests[1].value = Interest.years
}
document.getElementById("closeModalDetailInterest").addEventListener("click", function( ){
    document.getElementById("modalInterestsDetail").classList.remove("active")
})