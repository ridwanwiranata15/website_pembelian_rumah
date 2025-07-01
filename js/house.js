document.getElementById("openModalHouse").addEventListener("click", function(){
    document.getElementById("modalHouse").classList.add("active")
})
document.getElementById("closeModalHouse").addEventListener("click", function(){
    document.getElementById("modalHouse").classList.remove("active")
})

document.getElementById("nextModal").addEventListener("click", function(){
    const inputs = document.querySelectorAll(".slide01 input")
    console.log(inputs)
})