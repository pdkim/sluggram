'use strict'

util = module.exports = {}

logger = fn => name => (...args) => {
  console.log(`__${name}__`, ...args)
  return args.join(' ')
}

util.log = (...args) => logger(console.log)(...args)
util.log('cool')('yo!','whats up')

util.logError = (...args) => logger(console.error)
