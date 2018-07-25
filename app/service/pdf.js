'use strict'

const PDF = require('pdfjs-dist')
const Service = require('egg').Service

class PdfService extends Service {
  parseItem(items) {
    const result = []
    let i = 0
    const len = items.length

    while (i < len) {
      const item = items[i]
      if (!isNaN(+item.str) && item.str.replace(/ /g, '')) {
        const line = items.slice(i, i + 9)
        const strArr = line.map(info => info.str)
        result.push(strArr)
        i += 8
      }
      i++
    }
    return result
  }

  async parsePDF(url) {
    const pdf = await PDF.getDocument(url)
    const pageNumber = pdf.numPages
    let text = []
    for (let i = 0; i < pageNumber; i++) {
      const page = await pdf.getPage(i + 1)
      const { items } = await page.getTextContent()
      const arr = this.parseItem(items)
      text = [ ...text, ...arr ]
    }
    return text
  }
}

module.exports = PdfService
