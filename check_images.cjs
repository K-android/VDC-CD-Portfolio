const ids = [
  "15PC8VWAy4JFodE0-KTaP30Ia9E1eTuYq",
  "1B7h-ILSYXZPvks0bRpi5gNrx4P4bDqAF",
  "1DtpG-KYGPcAip9_ur36zRRCqGrizYzIz",
  "1GiDevLRVc7XvQ4fM069fYI0Qnhn1fxTQ",
  "1KhfoMMmKBYsC0Yleq3D_7gnvQecK6XLS",
  "1ME7kSn66aGLdTylUAMQXC89YmC2DPNWu",
  "1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXf",
  "1OIlJfC6l_24rlCK1Yo_Iqcsih3SAyH6c",
  "1OltK1rwcNMrySIKYSvf-f3CQngN4tseQ",
  "1tD9Mn4t6fnxL_HhmlBBH8IUka-og-RJE",
  "1Tr8vZlSXrsEa7LiN4-Y3DNvBFq_n-hxY",
  "1vSOTIYB045RMebKu-dYVgODfRVHDBD4s"
];

const { execSync } = require('child_process');

for (const id of ids) {
    try {
        const out = execSync(`curl -sL "https://lh3.googleusercontent.com/d/${id}" | head -c 20`);
        const str = out.toString();
        if (str.includes("<!doctype html>") || str.includes("<!DOCTYPE html>")) {
            console.log(id, "PRIVATE OR ERROR");
        } else if (str.includes("Not Found")) {
            console.log(id, "NOT FOUND");
        } else {
            console.log(id, "OK");
        }
    } catch(e) {
        console.log(id, "FAIL");
    }
}
