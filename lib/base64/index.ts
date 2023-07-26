// export function dataURLtoFile(dataurl, filename) {
//     var arr = dataurl.split(','),
//         mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[arr.length - 1]),
//         n = bstr.length,
//         u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new File([u8arr], filename, { type: mime });
// }

// export async function dataURLToFile(dataUrl: string, fileName: string): Promise<File> {
//     const res: Response = await fetch(dataUrl);
//     const blob: Blob = await res.blob();
//     return new File([blob], fileName, { type: 'image/png' });
// }