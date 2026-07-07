const images = [
  "https://lh3.googleusercontent.com/d/15PC8VWAy4JFodE0-KTaP30Ia9E1eTuYq",
  "https://lh3.googleusercontent.com/d/1B7h-ILSYXZPvks0bRpi5gNrx4P4bDqAF",
  "https://lh3.googleusercontent.com/d/1DtpG-KYGPcAip9_ur36zRRCqGrizYzIz",
  "https://lh3.googleusercontent.com/d/1GiDevLRVc7XvQ4fM069fYI0Qnhn1fxTQ",
  "https://lh3.googleusercontent.com/d/1KhfoMMmKBYsC0Yleq3D_7gnvQecK6XLS",
  "https://lh3.googleusercontent.com/d/1ME7kSn66aGLdTylUAMQXC89YmC2DPNWu",
  "https://lh3.googleusercontent.com/d/1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXf",
  "https://lh3.googleusercontent.com/d/1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c",
  "https://lh3.googleusercontent.com/d/1OltK1rwcNMrySIKYSvf-f3CQngN4tseQ",
  "https://lh3.googleusercontent.com/d/1tD9Mn4t6fnxL_HhmlBBH8IUka-og-RJE",
  "https://lh3.googleusercontent.com/d/1Tr8vZlSXrsEa7LiN4-Y3DNvBFq_n-hxY",
  "https://lh3.googleusercontent.com/d/1vSOTIYB045RMebKu-dYVgODfRVHDBD4s"
];

const getDriveId = (url) => {
  if (!url) return null;
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) return match[1];
  const match2 = url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match2) return match2[1];
  return null;
};

const keys = images.map((img, idx) => {
  const googleDriveId = getDriveId(img);
  return `gallery-${idx}-${googleDriveId || idx}`;
});
console.log(keys);
const duplicates = keys.filter((item, index) => keys.indexOf(item) !== index);
console.log("Duplicates:", duplicates);
