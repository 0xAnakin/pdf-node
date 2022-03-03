$(document).ready(() => {

    const $downloadButton = $('#download');
    const $fileNameInput = $('#filename');

    const base64ToArrayBuffer = (data) => {

        const bString = window.atob(data);
        const bLength = bString.length;
        const bytes = new Uint8Array(bLength);

        for (let i = 0; i < bLength; i++) {
            bytes[i] = bString.charCodeAt(i);
        }

        return bytes;

    }

    const downloadPDF = (fileName) => {

        $.get(`/pdf/${fileName}`).done((res) => {

            console.log(`${fileName}:`, res);

            const bufferArray = base64ToArrayBuffer(res.base64);
            const blobStore = new Blob([bufferArray], {
                type: "application/pdf"
            });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(blobStore);
                return;
            }

            const href = window.URL.createObjectURL(blobStore);
            const link = document.createElement('a');

            link.href = href;
            link.download = fileName;
            link.style.display = 'none';

            document.body.appendChild(link);

            link.click();

            window.URL.revokeObjectURL(href);

            link.remove();

        }).fail((err) => console.error(`[${err.status}] - ${err.responseJSON.message}`))

    }


    $downloadButton.on('click', (evt) => {

        evt.preventDefault();

        const fileName = $fileNameInput.val().trim();

        console.log(`Requesting the download of ${fileName}`);

        downloadPDF(fileName);

    })

})