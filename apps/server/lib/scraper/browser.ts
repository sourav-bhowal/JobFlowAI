import puppeteer from "puppeteer";

// This function is used to launch a headless browser using Puppeteer.
export const getBrowser = async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
    headless: true,
  });

  return browser;
};
