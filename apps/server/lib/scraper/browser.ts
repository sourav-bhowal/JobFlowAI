import puppeteer from "puppeteer";
// import puppeteerCore from "puppeteer-core";
// import chromium from "@sparticuz/chromium-min";

// let browser: any;

// const remoteExecutablePath =
//   "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";

// export async function getBrowser() {
//   if (browser) return browser;

//   const isProd = process.env.BUN_ENV === "production";

//   browser = isProd
//     ? await puppeteerCore.launch({
//         args: chromium.args,
//         executablePath: await chromium.executablePath(remoteExecutablePath),
//         headless: true,
//       })
//     : await puppeteer.launch({
//         args: ["--no-sandbox", "--disable-setuid-sandbox"],
//         headless: false,
//       });

//   return browser;
// }

export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });

  return browser;
};
