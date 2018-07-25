'use strict'

const Controller = require('egg').Controller
const toArray = require('stream-to-array')
// const path = require('path')

class PdfController extends Controller {
  async index() {
    await this.ctx.render('index.nj')
  }
  async upload() {
    let stream
    try {
      stream = await this.ctx.getFileStream()
    } catch (error) {
      this.ctx.status = 400
      this.ctx.body = {
        msg: error.message,
      }
      return
    }
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
