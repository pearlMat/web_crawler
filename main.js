const { crawlPage } = require("./crawl")
const { printReport } = require("./report")

async function main() {
    if (process.argv.lenght < 3) {
        console.log("No website provided")
        process.exit(1)
    }

    if (process.argv.lenght > 3) {
        console.log("Too many commandline args")
        process.exit(1)
    }
    const baseUrl = process.argv(2)
    console.log(`Starting to crawl ${baseUrl}`)
    const pages = await crawlPage(baseUrl, baseUrl, {})
    printReport(pages)
}

main()