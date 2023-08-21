import * as fs from "fs";
import * as qrcode from "qrcode";

// Define your list of text locations
const locations = [
  "SHELF-1-NA0-A1-1",
  "SHELF-1-NA0-A1-2",
  "SHELF-1-NA0-A1-3",
  "SHELF-1-NA0-A1-4",
  "SHELF-1-NA0-A1-5",
];

// Function to generate QR code for a text location and save it as a PNG file
async function generateQRCode(text: string, filename: string) {
  try {
    const options: qrcode.QRCodeToDataURLOptions = {
      errorCorrectionLevel: "L", // You can change the error correction level if needed
      type: "image/png",
      margin: 1, // Adjust the margin as needed
    };
    const qrCodeDataUrl = await qrcode.toDataURL(text, options);

    // Save the QR code as a PNG file
    fs.writeFileSync(filename, qrCodeDataUrl.split(",")[1], "base64");
    console.log(`QR code generated and saved as ${filename}`);
  } catch (error) {
    console.error(`Error generating QR code: ${error}`);
  }
}

// Generate QR codes for each location in the list
for (const location of locations) {
  const filename = `${location}.png`;
  generateQRCode(location, filename);
}
