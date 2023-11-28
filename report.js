const { convertMapsToIndexableObjects } = require("pnpm/dist/pnpm.cjs")

function printReport(pages){
    console.log("============")
    console.log("REPORT")
    console.log("============")

    const sortedPages = sortPages(pages)
    for(const sortedPage of sortPages){
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`found ${hits} links to page: ${url}`)
    }

    console.log("============")
    console.log("END REPORT")
    console.log("============")
}

function sortPages(pages){
    const arr = Object.entries(pages)
    arr.sort((a, b) =>{
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
   return arr
}

module.exports ={
    sortPages,
    printReport
}