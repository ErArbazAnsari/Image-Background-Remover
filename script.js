let imageURL;

function submitHandler() {
    console.log("click");
    const fileInput = document.getElementById('fileInput');
    console.log(fileInput.files);
    const image = fileInput.files[0];

    if (!image) {
        alert('Please select an image file.');
        return;
    }

    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    const apiKey = "LvsJ1EzoGkFg7vmPY1bb6pmN";  // Replace with your actual API key

    fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    .then(response => response.blob())
    .then(blob => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        imageURL = url;
        const img = document.createElement('img');
        img.src = url;
        img.style.height = '200px';
        img.style.width = '250px';
        document.querySelector('.downImage').innerHTML = '';
        document.querySelector('.downImage').appendChild(img);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to remove background. Please try again.');
    });

    // Disable the file input to prevent selecting another image
    fileInput.disabled = true;
}

function downloadFile() {
    if (!imageURL) {
        alert('No image to download. Please upload and process an image first.');
        return;
    }

    var a = document.createElement('a');
    a.href = imageURL;
    a.download = 'bgremove.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function resetForm() {
    document.getElementById('imageForm').reset();
    document.querySelector('.downImage').innerHTML = '';
    document.getElementById('fileInput').disabled = false;
    document.getElementById('selectedImageText').innerText = '';
}

function imageSelected() {
    const fileInput = document.getElementById('fileInput');
    const image = fileInput.files[0];
    if (image) {
        document.getElementById('selectedImageText').innerText = 'Image selected: ' + image.name;
    }
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
    }
}
