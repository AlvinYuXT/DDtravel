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
      const parts = await toArray(stream)
      const buf = Buffer.concat(parts)
      const result = await this.ctx.service.pdf.parsePDF(buf)

      this.ctx.status = 200
      this.ctx.body = {
        code: 200,
        result,
      }
    } catch (error) {

      this.ctx.status = 200
      this.ctx.body = {
        code: 400,
        msg: error.message,
      }

    }
  }
}

module.exports = PdfController
