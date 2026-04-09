/* TODO: Tratar Erros */

window.onload = init;

var createWrapper;
var createInfoContainer, uploadBtnWrapper;

var titleInput, descInput;

var imageUrl;

function init() {
    createWrapper = document.getElementById("create-wrapper");
    uploadBtnWrapper = document.getElementById("upload-btn-wrapper");
    createInfoContainer = document.getElementById("create-info-container");

    titleInput = document.getElementById("title-input");
    descInput = document.getElementById("description-input");
}

function createWrapperToggle() {
    createWrapper.classList.toggle("active");
}

function startCreating() {
    uploadBtnWrapper.style.display = "flex";
    createInfoContainer.style.display = "none";
    createWrapperToggle();
}

function nextCreatingStep() {
    createWrapper.classList.remove("active");

    setTimeout(() => {
        uploadBtnWrapper.style.display = "none";
        createInfoContainer.style.display = "flex";
        createWrapperToggle();
    }, 200);
}

function getImageUrl() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl = e.target.result;
                nextCreatingStep();
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function uploadImage(title, description) {
    fetch("/upload", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageUrl, title: title, description: description })
    })
    .then(response => response.json())
    .then(data => window.location.href = `/`)
    .catch(err => console.error("Upload failed:", err));
}

function uploadElement() {
    const title = titleInput.value.trim();
    const description = descInput.value.trim();
    uploadImage(title, description);
}