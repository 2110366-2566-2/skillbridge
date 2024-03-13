export default async function qrReader(url: string) {
    const encodedUrl = encodeURIComponent(url);
    // http://api.qrserver.com/v1/read-qr-code/?fileurl=
    try {
        const res = await fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${encodedUrl}`, {
            method: "GET"
        })
        console.log(encodedUrl)
        const response = await res.json();
        // console.log(response)
        return response
    } catch (error) {
        throw new Error("Failed to read the QR code")
    }
}