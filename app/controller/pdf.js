'use strict'

const Controller = require('egg').Controller
const toArray = require('stream-to-array')
// const path = require('path')

class PdfController extends Controller {
  async index() {
    await this.ctx.render('index.nj')
  }
  async upload() {
    const stream = await this.ctx.getFileStream()
    let buf
    try {
      const parts = await toArray(stream)
      buf = Buffer.concat(parts)
    } catch (err) {
      // await sendToWormhole(stream)
      throw err
    }
    const result = await this.ctx.service.pdf.parsePDF(buf)
    this.ctx.body = {
      result,
    }
  }
}

module.exports = PdfController
