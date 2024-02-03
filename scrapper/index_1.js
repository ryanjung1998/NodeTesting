const axios = require('axios');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs').promises;


async function fetchHTML(url) {
    try {
        const response = await axios.get(url);
        return response.data; // Returns the entire HTML content
    } catch (error) {
        console.error(`Error fetching HTML: ${error}`);
        return null;
    }
}

async function fetchJavaScriptRenderedHTML(url) {
    const browser = await puppeteer.launch();
    try {
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const content = await page.content(); // Returns the entire content after JavaScript rendering
        return content;
    } catch (error) {
        console.error(`Error fetching JavaScript-rendered HTML: ${error}`);
        return null;
    } finally {
        await browser.close();
    }
}

function extractData(html) {
    const $ = cheerio.load(html);
    const products = [];

    $('a[itemprop="url"]').each((i, element) => {
        const product = {};
        const $element = $(element);

        product.company = "Patagonia"

        // Extract the product URL
        product.url = `https://girlfriend.com/collections/leggings${$element.attr('href')}`;

        // Extract the product title
        product.title = $element.attr('title');

        // Extract the image URL from the meta tag
        const metaImage = $element.find('meta[itemprop="image"]').attr('content');
        if (metaImage) {
            product.imageUrl = metaImage;
        }

        // Extract image srcset
        const pictureSource = $element.find('picture source').attr('srcset');
        if (pictureSource) {
            product.imageSrcSet = pictureSource;
        }

        // Extract the price
        const price = $element.find('span.value[itemprop="price"]').text().trim();
        if (price) {
            product.price = price;
        }

        products.push(product);
    });

    return products;
}


async function scrape(url, { jsRendering = false } = {}) {
    const html = jsRendering ? await fetchJavaScriptRenderedHTML(url) : await fetchHTML(url);
    if (html) {
        const products = extractData(html);

        // Save to a JSON file
        try {
            await fs.writeFile('products.json', JSON.stringify(products, null, 2));
            console.log('Products saved to products.json');
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    }
}

async function test(){
    try {
        const res = await fetch("https://girlfriend.com/products/moss-compressive-pocket-legging?query=1881c0bd5ad1cd7c4cc96347c0f7718d&objectID=32287914557503")
        console.log(res)
    } catch (error) {
        console.log(error)
    }
}



// Usage example
scrape('https://www.patagonia.ca/home/', { jsRendering: true });
test()


