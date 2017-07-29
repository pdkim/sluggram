export const partial = (fn, ...defaults) => 
  (...args) => fn(...defaults, ...args)

export const partialRight = (fn, ...defaults) => 
  (...args) => fn(...args, ...defaults)

export const compose = (...fns) => 
  (arg) => fns.reduce((result, next) => next(result), arg)

export const promisify = (fn) => (...args) => 
  new Promise((resolve, reject) => 
    fn(...args, (err, data) => err ? reject(err) : resolve(data)))

export const log = (...args) => 
  process.env.DEBUG === 'true' ?  console.log(...args): undefined

export const logError = (...args) =>  
  process.env.DEBUG === 'true' ? console.error(...args) : undefined

export const daysToMilliseconds = (days) => days * 1000 * 60 * 60 * 24

export const map = (list, cb) => 
  Array.prototype.map.call(list, cb)

export const filter = (list, cb) => 
  Array.prototype.filter.call(list, cb)

export const reduce = (list, ...args) => 
  Array.prototype.reduce.apply(list, args)

export const each = (list, cb) => 
  Array.prototype.forEach.call(list, cb)
