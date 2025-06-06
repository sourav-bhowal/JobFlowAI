import { Page } from "puppeteer";

// Auto-scroll function to scroll down the page
export const autoScroll = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 500;
      const timer = setInterval(() => {
        const scrollHeightBefore = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeightBefore) {
          clearInterval(timer);
          resolve();
        }
      }, 500);
    });
  });
};
