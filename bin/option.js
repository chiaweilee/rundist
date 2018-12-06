const path = require('path')
const joi = require('joi')

const schema = joi.object().keys({
  httpPort: joi.number().port(),
  distPath: joi.string(),
  defaultPage: joi.string(),
  extendPath: joi.any()
})

const options = {
  httpPort: 3000,
  distPath: path.resolve('./dist/'),
  defaultPage: 'index.html',
  extendPath: undefined
}

const argv = process.argv.slice(2)

argv.forEach((arg, i) => {
  const next = argv[i + 1]
  switch (arg) {
    case '--port':
      if (next) {
        options.httpPort = next
      }
      break
    case '--dir':
      if (next) {
        options.distPath = path.resolve(next)
      }
      break
    case '--dirname':
      if (next) {
        options.distPath = path.resolve(`./${next}/`)
      }
      break
    case '--index':
      if (next) {
        options.defaultPage = next
      }
      break
    case '--extend':
      if (next) {
        options.extendPath = path.resolve(next)
      }
      break
    default:
      break
  }
})

joi.validate(options, schema, function (err) {
  if (err) {
    process.stderr.output(err)
    process.exit(1)
  }
})

module.exports = options
