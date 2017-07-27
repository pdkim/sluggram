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

