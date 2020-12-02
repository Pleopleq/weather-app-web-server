document.addEventListener("DOMContentLoaded", function() {
    const locationForm = document.querySelector("form")
    const locationInput = document.querySelector("input")
    const fetchOutput = document.querySelector(".weather-result")
    
    locationForm.addEventListener("submit", (e) => {
        e.preventDefault()
        fetch(`http://localhost:3000/weather?address=${locationInput.value}`)
        .then((result) => {
        result.json()
            .then((jsonData) => {
                if(jsonData.error){
                    fetchOutput.innerHTML = `
                    <h2>${jsonData.error}</h2>
                    `
                } else {
                    fetchOutput.innerHTML = `
                        <h2>${jsonData.location}</h2>
                        <p>${jsonData.weather}</p>
                    `
                }
            })
        })
    })
});