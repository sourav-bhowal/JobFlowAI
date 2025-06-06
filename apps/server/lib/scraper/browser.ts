import { Browser } from "puppeteer";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

// @ts-ignore
puppeteer.use(StealthPlugin());

// This function is used to launch a headless browser using Puppeteer.
export const getBrowser = async () => {
  // @ts-ignore
  const browser: Browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-http2"],
    headless: true, // Run in headless mode browser without GUI
  });

  return browser;
};
