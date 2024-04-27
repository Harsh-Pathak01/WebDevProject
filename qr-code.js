async function generateQRCode(text) {
    let url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;
    document.getElementById('qrCode').innerHTML = `<img src="${url}" alt="QR Code">`;
}
