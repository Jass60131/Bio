document.addEventListener('DOMContentLoaded', function() {

    document.body.style.backgroundColor = '#333333'; // Cambia lo sfondo in grigio scuro
    document.body.style.color = '#ffffff'; // Cambia il colore del testo in bianco
});

document.getElementById('enterText').addEventListener('click', function() {
   
    document.getElementById('contentToReveal').style.display = 'block';
  
    this.style.display = 'none';

   
    const imageNames = ['background_1.jpg', 'background_2.jpg', 'background_3.png', 'background_4.png'];


    const randomIndex = Math.floor(Math.random() * imageNames.length);
    const randomImageName = imageNames[randomIndex];
    const randomImageUrl = randomImageName; // URL diretto alla radice del progetto

  
    document.body.style.backgroundImage = `url('${randomImageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
});


const apiKey = '62a9ac1ba13aa2eb09acc7da023a5f59';
const username = 'jass787';

const apiUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json`;

function displayCurrentlyPlayingSong() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.recenttracks && data.recenttracks.track.length > 0) {
                const track = data.recenttracks.track[0];
                const artist = track.artist['#text'];
                const title = track.name;
                const duration = track.duration; // in seconds

                // Display the song information on your website
                const songElement = document.getElementById('current-song');
                songElement.textContent = `${title} - ${artist}`;

                // Calculate and display duration in mm:ss format
                const totalTimeElement = document.getElementById('total-time');
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                totalTimeElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            } else {
                const songElement = document.getElementById('current-song');
                songElement.textContent = 'No recent tracks found';
            }
        })
        .catch(error => {
            console.error('Error fetching recent tracks:', error);
            const songElement = document.getElementById('current-song');
            songElement.textContent = 'Error fetching data';
        });
}

displayCurrentlyPlayingSong();