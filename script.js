const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    console.log("Search button clicked");
    console.log("Input word:", inpWord);

    fetch(`${url}${inpWord}`)
        .then((response) => {
            console.log("Response status:", response.status);
            return response.json();
        })
        .then((data) => {
            console.log("API data received:", data);

            if (data.title === "No Definitions Found") {
                result.innerHTML = `<p>No definitions found for "${inpWord}". Please try another word.</p>`;
                return;
            }

            result.innerHTML = `
            <div class="word">
                <h3>${data[0].word}</h3>
                <button onClick="playSound()">
                    <i class="fa fa-volume-up" aria-hidden="true"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic || ""}/</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

            if (data[0].phonetics[0] && data[0].phonetics[0].audio) {
                sound.setAttribute("src", data[0].phonetics[0].audio);
            } else {
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<p>There was an error fetching the definition. Please try again later.</p>`;
        });
});

function playSound() {
    if (sound.src) {
        sound.play();
    }
}
