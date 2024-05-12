document.addEventListener('DOMContentLoaded', function() {
    // Cambia lo sfondo della pagina
    document.body.style.backgroundColor = '#333333'; // Cambia lo sfondo in grigio scuro
    document.body.style.color = '#ffffff'; // Cambia il colore del testo in bianco
});

document.getElementById('enterText').addEventListener('click', function() {
    // Mostra il contenuto nascosto
    document.getElementById('contentToReveal').style.display = 'block';
    // Nascondi il testo "Click to enter"
    this.style.display = 'none';

    // Nomi delle immagini di sfondo (esempio)
    const imageNames = ['background_1.jpg', 'background_2.jpg', 'background_3.png', 'background_4.png'];

    // Genera un URL casuale per l'immagine di sfondo
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    const randomImageName = imageNames[randomIndex];
    const randomImageUrl = folderPath + randomImageName;

    // Imposta l'immagine di sfondo
    document.body.style.backgroundImage = `url('${randomImageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
});
