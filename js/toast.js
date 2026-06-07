function showToast(message, type = "info") {

    const container =
        document.getElementById("toastContainer");

    if(!container){
        console.error(
            "toastContainer not found"
        );
        return;
    }

    const toast =
        document.createElement("div");

    toast.className =
        `toast ${type}`;

    toast.textContent =
        message;

    container.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);
}

window.showToast = showToast;