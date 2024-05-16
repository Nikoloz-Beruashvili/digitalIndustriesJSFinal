function fetchAPOD() {
    const dateInput = document.getElementById("dateInput").value;

    fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${dateInput}`)
        .then(response => response.json())
        .then(data => {
            if (data.media_type === "image") {
                const apodImageContainer = document.getElementById("apodImageContainer");
                apodImageContainer.innerHTML = `<h2>${data.title}</h2>
                                                <img src="${data.url}" alt="${data.title}" style="max-width: 100%;">`;
            } else {
                alert("APOD for the selected date is not an image.");
            }
        })
        .catch(error => {
            console.error('Error fetching APOD:', error);
            alert("Failed to fetch APOD. Please try again later.");
        });
}