import { Page } from "puppeteer";

export const autoScroll = async (page: Page): Promise<void> => {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      let scrollTries = 0;

      const timer = setInterval(
        () => {
          const distance = Math.floor(Math.random() * 400) + 200; // scroll 200–600 px
          window.scrollBy(0, distance);
          totalHeight += distance;

          const scrollHeight = document.body.scrollHeight;

          // 15% chance to scroll up slightly
          if (Math.random() < 0.15) {
            window.scrollBy(0, -Math.floor(Math.random() * 100)); // scroll up 0–100px
          }

          scrollTries++;

          // If we've tried enough and reached the bottom
          if (totalHeight >= scrollHeight || scrollTries > 30) {
            clearInterval(timer);
            resolve();
          }
        },
        Math.floor(Math.random() * 300) + 200
      ); // wait 200–500ms
    });
  });
};
