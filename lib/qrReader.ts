const getS3URL = async (fileName: String) => {
    return "https://skillbridge-s3.s3.us-east-1.amazonaws.com/014071184526APP07376.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDsaDmFwLXNvdXRoZWFzdC0xIkgwRgIhALuPF9F7h9jxVlm9h0F%2BqkNFKFOYlOoSeFVkwdFS3gSeAiEA0lXTAz5OjJhp%2FKH0dvBQ1flRncYnmnCu74CZv%2Blt8X4q5AIIRBAAGgwzODE0OTIxNTg1ODMiDI1EdB3gu%2FKKJD2e7CrBAnCLCHfNFYOanU1XFRrTeAnsiwuWgfPnH78KKUud1meAxyY7mW1dbe%2BEolt2nlHlargBtfKDsHVmz05Qo3ku%2B7ImHGkHUUD3yqcVZt5UfbDUrWiP4S8kVL73oRFanhN2ZFhYafQcUtEz77zVEk6h5PhJ18F%2Ft4ufTZ4VSfTLBM3n%2BFVPgSXEFsPgSDUNX%2BYSFfIVtv3EofvvlfN5L8FfZ9enVZ1U3PpzxGteN5mjyMA4vQymEaxw2JoAQD2P2wVvEzyr0Xe5PDnrofjgSFdthIkrl22bCxI0zy55fyEHpkZLxz1e2mcsHJv4M4cPU2IuQgACu6PH0ShtosY%2BrJwhHNA%2F%2Buts2xilSOwAJw1W38GHmcLGEQyebeHrQHJKhRRx9B81Y9wSMVdfVHL%2FMggJy4H2iCye5cshC9QFOrSVWo90ozDc5sCvBjqyAnWO8QizF6hzRgXbhTA3ZbRvsVsuO%2BK7pkAqIBKcSGaHRunpP%2Fw28M71WMBQb7guRtGHQrtpfuHxgaEk%2FVQKUQWf6YI5W5mENFd5akWmLf2Bobbzfx9UkZ%2B558CAyG9%2BjBTVaPqsjTuNQSsmzcdWeuI7ACeVIgGjI5eWXOXtNrmr%2Fu8gLmMFfNGy57NHnwVsW5%2F4CfpcBrpCF0Wf%2FX7KREQM52CWbLPQHVrPxK6aejjl9ybQoBYXHcdoqEpDaDuYflCgPiMCBYqm4TEpZjj%2FJNTCcPzubdmzsQLT2lCJOBPM82R489MRl%2Bwkr91SaUbzYmVzzIP7cSoyxk4yTdjuU3QRiMcBsUAER2nIVJ4wedpIs87Ayy7RqWH0Sdtqe6hSicB7cDs7c1FHiPebR%2BhflkiCIw%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240312T110735Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=ASIAVRUVUMB33EUVUS2E%2F20240312%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=a73f8fad2c78ee00d6bd1e8d9cff685584a2278324967f6de4e224ab24b1bd06"
}

export default async function qrReader(url: string) {
    const encodedUrl = encodeURIComponent(url);
    // http://api.qrserver.com/v1/read-qr-code/?fileurl=
    try {
        const res = await fetch(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${encodedUrl}`, {
            method: "GET"
        })
        console.log(encodedUrl)
        const response = await res.json();
        console.log(response)
    } catch (error) {
        throw new Error("Failed to read the QR code")
    }
}