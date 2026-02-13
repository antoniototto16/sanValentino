// Funzione per andare alla pagina successo
function vaiSuccesso() {
    window.location.href = "successo.html";
}
document.addEventListener("DOMContentLoaded", () => {

    // Pulsanti DOM
    const noBtn = document.getElementById("noBtn");
    const siBtn = document.getElementById("siBtn");

    // Frasi del pulsante NO
    const frasiNo = [
        "Ma sei sicura?",
        "Prenditi un attimo per riflettere meglio",
        "Daiiiiiii",
        "😿",
		"Nuuuuuu",
        "Sicuramente una risposta affrettata",
        "P L I A N G O",
        "Sicuramente un errore",
        "Pleeeease",
        "Infingarda!",
        "Non lo fare plisiii!",
        "Mi faresti questo?",
        "L'altro pulsante è più carino",
        "😭",
		"Ma perchèèèèè...",
        "Riprova per favore"
    ];

    let isMoving = false;       // evita trigger multipli

    // ---- preparazione frasi random ----
    let frasiRandom = [...frasiNo];  // copia dell'array originale
    shuffleArray(frasiRandom);       // mescola l'array
    let frasiIndex = 0;              // indice della frase corrente

    // funzione per mescolare un array (Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Animazione pulsante NO
    if (noBtn && siBtn) {
        noBtn.addEventListener("mouseenter", function() {
            if (isMoving) return;
            isMoving = true;

            noBtn.style.position = "fixed";

            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;
            const maxX = window.innerWidth - btnWidth;
            const maxY = window.innerHeight - btnHeight;

            const x = Math.random() * maxX;
            const y = Math.random() * maxY;

            noBtn.style.left = x + "px";
            noBtn.style.top = y + "px";

            // ---- assegna la frase successiva dal mazzo mescolato ----
            noBtn.innerText = frasiRandom[frasiIndex];
            frasiIndex++;

            // se abbiamo finito tutte le frasi, ricrea un mazzo mescolato
            if (frasiIndex >= frasiRandom.length) {
                frasiIndex = 0;
                shuffleArray(frasiRandom);
            }

            // ---- ingrandimento pulsante SI ----
            const currentSize = parseFloat(window.getComputedStyle(siBtn).fontSize);
            siBtn.style.fontSize = (currentSize * 1.3) + "px";

            setTimeout(() => { isMoving = false; }, 200);
        });
    }

    // -------------------------
    // Cascata di cuoricini nella pagina successo
    // -------------------------
    const heartsContainer = document.querySelector(".hearts-container");

    if (heartsContainer) {
        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart-falling");
            heart.innerHTML = "❤️";

            // posizione orizzontale casuale
            heart.style.left = Math.random() * 100 + "vw";

            // dimensione casuale
            const size = Math.random() * 20 + 20; // px
            heart.style.fontSize = size + "px";

            // durata caduta casuale
            const duration = Math.random() * 2 + 4; // 3-5 secondi
            heart.style.animationDuration = duration + "s";

            heartsContainer.appendChild(heart);

            // rimuovi il cuoricino dopo l'animazione
            setTimeout(() => heart.remove(), duration * 1000);
        }, 300);
    }

});
