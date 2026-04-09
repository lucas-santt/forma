function logout() {
    fetch("/logout")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = "/";
    })
}

function deleteElement(elementId) {
    fetch(`/delete/${elementId}`, {
        method: "DELETE",
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        window.location.href = "/";
    })
    .catch(error => {
        console.error("Error deleting element:", error);
        alert("An error occurred while trying to delete the element. Please try again.");
    });
}