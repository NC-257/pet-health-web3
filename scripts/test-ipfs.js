const fs = require("fs");
const path = require("path");
require("dotenv").config();

async function main() {
  const filePath = path.join(__dirname, "../test-lab.pdf");

  // Check file existence
  if (!fs.existsSync(filePath)) {
    throw new Error("File test-lab.pdf tidak ditemukan di root project!");
  }

  if (!process.env.PINATA_JWT) {
    throw new Error("PINATA_JWT belum dikonfigurasi pada file .env!");
  }

  console.log("Memulai proses upload file ke Pinata IPFS...");

  const buffer = fs.readFileSync(filePath);
  const form = new FormData();
  form.append(
    "file",
    new Blob([buffer], { type: "application/pdf" }),
    "test-lab.pdf"
  );

  // Endpoint Pinata Pinning API
  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    body: form,
  });

  const data = await res.json();

  if (res.ok) {
    console.log("\n================ UPLOAD SUCCESS ================");
    console.log("IPFS Hash (CID):", data.IpfsHash);
    console.log("Pin Size       :", data.PinSize, "bytes");
    console.log("Timestamp      :", data.Timestamp);
    console.log("================================================\n");
    console.log(`Cek file di Gateway: https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`);
  } else {
    console.error("Gagal mengunggah ke Pinata:", data);
  }
}

main().catch(console.error);