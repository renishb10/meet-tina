import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  let browser;
  let page;
  jest.setTimeout(40000);
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 250, // slow actions by 250ms
      ignoreDefaultArgs: ["--disable-extensions"], // ignores default settings
    });

    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });
  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to seeits details", async () => {
    await page.click(".event .details-btn");

    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide its details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .event-details");
    expect(eventDetails).toBeNull();
  });
});