
  import { launch } from "puppeteer";
  (async () => {
    const browser = await launch({ headless: true, args: ["--no-sandbox"] });
    const page = await browser.newPage();
    page.on("console", msg => {
      if(msg.type() === "error") console.log("PAGE ERROR:", msg.text());
      if(msg.text().includes("key")) console.log("KEY WARNING:", msg.text());
    });
    await page.goto("http://localhost:3000");
    // click around
    await page.waitForTimeout(2000);
    await browser.close();
  })();
