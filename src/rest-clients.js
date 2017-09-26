import loopbackRestClient, { authClient as loopbackAuthClient } from 'aor-loopback';

export const BASE_URL = "https://cofi-api.herokuapp.com/api";

export const restClient = loopbackRestClient(BASE_URL);

export const authClient = loopbackAuthClient(BASE_URL);

const Jimp = window.Jimp;

const readFileAndProcess = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file.rawFile);

        reader.onload = () => {
            Jimp.read(reader.result).then(function (lenna) {
                lenna.resize(768, Jimp.AUTO)
                     .quality(98)
                     .getBase64(Jimp.AUTO, function (err, src) {
                        resolve(src);
                     });
            });
        }
        reader.onerror = reject;
    });

export const addUploadCapabilities = requestHandler => (type, resource, params) => {
    if (resource === 'coffees' && (type === 'UPDATE' || type === 'CREATE')){
        let pictures = Array.isArray(params.data.image) ? params.data.image: [params.data.image];
        if (pictures && pictures.length) {
            // only freshly dropped pictures are instance of File
            const formerPictures = pictures.filter(
                p => !p.rawFile
            );

            const newPictures = pictures.filter(
                p => p.rawFile && p.rawFile instanceof File
            );

            return Promise.all(newPictures.map(readFileAndProcess))
                .then(base64Pictures =>
                    base64Pictures.map(picture64 => ({
                        base64: picture64,
                    }))
                )
                .then(transformedNewPictures =>
                    requestHandler(type, resource, {
                        ...params,
                        data: {
                            ...params.data,
                            image: [
                                ...transformedNewPictures,
                                ...formerPictures,
                            ][0] || null,
                        },
                    })
                );
        }
    }

    return requestHandler(type, resource, params);
};

export default {
    restClient: addUploadCapabilities(restClient)
}