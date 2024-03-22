export default async function qrReader(url: string) {
  const encodedUrl = encodeURIComponent(url);
  try {
    const res = await fetch(
      `http://api.qrserver.com/v1/read-qr-code/?fileurl=${encodedUrl}`,
      {
        method: "GET",
      },
    );
    const response = await res.json();
    const data = response[0].symbol[0].data;

    /* if the image has no qr code it will return with status 404 */
    return {
      message: data ? data : "QR code not found.",
      status: data ? 200 : 404,
    };
  } catch (error) {
    throw new Error("Failed to read the QR code.");
  }
}
