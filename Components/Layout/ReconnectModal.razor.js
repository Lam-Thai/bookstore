// Set up event handlers
const reconnectModal = document.getElementById("components-reconnect-modal");
reconnectModal.addEventListener("components-reconnect-state-changed", handleReconnectStateChanged);

const retryButton = document.getElementById("components-reconnect-button");
retryButton.addEventListener("click", retry);

const resumeButton = document.getElementById("components-resume-button");
resumeButton.addEventListener("click", resume);

const reconnectStateClass = {
    show: "components-reconnect-show",
    retrying: "components-reconnect-retrying",
    failed: "components-reconnect-failed",
    paused: "components-reconnect-paused",
    "resume-failed": "components-reconnect-resume-failed"
};

function handleReconnectStateChanged(event) {
    const state = event.detail.state;

    if (state === "show") {
        reconnectModal.className = reconnectStateClass.show;
        reconnectModal.showModal();
    } else if (state === "hide") {
        reconnectModal.className = "";
        if (reconnectModal.open) {
            reconnectModal.close();
        }
        document.removeEventListener("visibilitychange", retryWhenDocumentBecomesVisible);
    } else if (state === "failed") {
        reconnectModal.className = reconnectStateClass.failed;
        document.addEventListener("visibilitychange", retryWhenDocumentBecomesVisible);
    } else if (state === "rejected") {
        location.reload();
    } else {
        reconnectModal.className = reconnectStateClass[state] ?? "";
    }
}

async function retry() {
    document.removeEventListener("visibilitychange", retryWhenDocumentBecomesVisible);

    try {
        // Reconnect will asynchronously return:
        // - true to mean success
        // - false to mean we reached the server, but it rejected the connection (e.g., unknown circuit ID)
        // - exception to mean we didn't reach the server (this can be sync or async)
        const successful = await Blazor.reconnect();
        if (!successful) {
            // We have been able to reach the server, but the circuit is no longer available.
            // We'll reload the page so the user can continue using the app as quickly as possible.
            const resumeSuccessful = await Blazor.resumeCircuit();
            if (!resumeSuccessful) {
                location.reload();
            } else {
                reconnectModal.close();
            }
        }
    } catch (err) {
        // We got an exception, server is currently unavailable
        document.addEventListener("visibilitychange", retryWhenDocumentBecomesVisible);
    }
}

async function resume() {
    try {
        const successful = await Blazor.resumeCircuit();
        if (!successful) {
            location.reload();
        }
    } catch {
        reconnectModal.classList.replace("components-reconnect-paused", "components-reconnect-resume-failed");
    }
}

async function retryWhenDocumentBecomesVisible() {
    if (document.visibilityState === "visible") {
        await retry();
    }
}
