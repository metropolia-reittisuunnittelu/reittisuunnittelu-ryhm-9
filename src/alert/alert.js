import './alert.css';

export function alert(message) {
    const alertOverlay = document.createElement('div');
    alertOverlay.classList.add('alert-overlay');

    const alertBody = document.createElement('div');
    alertBody.classList.add('alert-body');

    const alertText = document.createElement('div');
    alertText.innerText = message;

    const closeButton = document.createElement('button');
    closeButton.innerText = 'close';

    closeButton.onclick = () => {
        alertOverlay.remove();
    }

    alertOverlay.append(alertBody);
    alertBody.append(alertText, closeButton);
    document.body.append(alertOverlay);
}
