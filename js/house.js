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

function NextForm1(){
    document.getElementById('form01').style.display = "none"
    document.getElementById('form02').style.display = "block"
    document.getElementById('prevModal').style.display = "block"
}

function PrevForm(){
    document.getElementById('form01').style.display = "block"
    document.getElementById('form02').style.display = "none"
    document.getElementById('prevModal').style.display = "none"
}