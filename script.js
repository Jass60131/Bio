document.addEventListener('DOMContentLoaded', function() {
    document.body.style.backgroundColor = '#333333';
    document.body.style.color = '#ffffff';
});

document.getElementById('enterText').addEventListener('click', function() {
    document.getElementById('contentToReveal').style.display = 'block';
    this.style.display = 'none';

    const imageNames = ['background_1.jpg', 'background_2.jpg', 'background_3.png', 'background_4.png'];
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    const randomImageName = imageNames[randomIndex];
    const randomImageUrl = randomImageName;

    document.body.style.backgroundImage = `url('${randomImageUrl}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
});

document.addEventListener('DOMContentLoaded', function() {
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
                    const isNowPlaying = track['@attr'] && track['@attr'].nowplaying === 'true';
                    let imageUrl = '';

                    if (track.image.length > 0) {
                        imageUrl = track.image[2]['#text'];
                    }

                    const songElement = document.getElementById('current-song');
                    const trackImageElement = document.createElement('img');
                    trackImageElement.src = imageUrl;
                    trackImageElement.alt = 'Track Image';
                    trackImageElement.classList.add('track-image');

                    const songTextElement = document.createElement('span');
                    songTextElement.id = 'songText';
                    songTextElement.classList.add('track-text');

                    if (isNowPlaying) {
                        songTextElement.textContent = `Sto ascoltando: ${title} - ${artist}`;
                    } else {
                        songTextElement.textContent = `Ultima canzone ascoltata: ${title} - ${artist}`;
                    }

                    while (songElement.firstChild) {
                        songElement.removeChild(songElement.firstChild);
                    }

                    songElement.appendChild(trackImageElement);
                    songElement.appendChild(songTextElement);

                } else {
                    const songElement = document.getElementById('current-song');
                    const songTextElement = document.createElement('span');
                    songTextElement.id = 'songText';
                    songTextElement.classList.add('track-text');
                    songTextElement.textContent = 'Nessuna traccia ascoltata recentemente';

                    while (songElement.firstChild) {
                        songElement.removeChild(songElement.firstChild);
                    }

                    songElement.appendChild(songTextElement);
                }
            })
            .catch(error => {
                console.error('Errore nel recupero delle tracce recenti:', error);
                const songElement = document.getElementById('current-song');
                const songTextElement = document.createElement('span');
                songTextElement.id = 'songText';
                songTextElement.classList.add('track-text');
                songTextElement.textContent = 'Errore nel recupero dei dati';

                while (songElement.firstChild) {
                    songElement.removeChild(songElement.firstChild);
                }

                songElement.appendChild(songTextElement);
            });
    }

    displayCurrentlyPlayingSong();

    setInterval(displayCurrentlyPlayingSong, 1000);
});
