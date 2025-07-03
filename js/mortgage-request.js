let currentStepMortgage = 1
function DetailMortgageRquest(id){
    document.getElementById("modalMortgageRequestDetail").classList.add("active")
}
document.getElementById("closeModalDetailMortgageRequest").addEventListener("click", function(){
    document.getElementById("modalMortgageRequestDetail").classList.remove("active")
    
    
})
function updateFormDetailMortgage(){
    const formStepsDetailMortgage = document.querySelectorAll(".form-step-mortgage")
    const progressStepMortgage = document.querySelectorAll(".progress-step-mortgage")
    

    formStepsDetailMortgage.forEach(function(step){
        step.classList.remove("active-form-mortgage")
    })
    const currentStepMortgageElement = document.getElementById(`step-mortgage-${currentStepMortgage}`)
    if(currentStepMortgageElement){
        currentStepMortgageElement.classList.add("active-form-mortgage")
    }
     progressStepMortgage.forEach(function (mortgage, index) {
        if (index < currentStepMortgage) {
            mortgage.classList.add("active-step-mortgage");
        } else {
            mortgage.classList.remove("active-step-mortgage");
        }
    });
   
}

function prevBtnDetailMortgage() {
    if (currentStepMortgage > 1) {
        currentStepMortgage--;
        updateFormDetailMortgage();
    }
}

function NextBtnDetailMortgage() {
    const totalSteps = document.querySelectorAll(".form-step-mortgage").length;
    if (currentStepMortgage < totalSteps) {
        currentStepMortgage++;
        updateFormDetailMortgage();
    }
}