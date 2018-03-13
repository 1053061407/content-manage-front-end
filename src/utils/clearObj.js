export function clearobj(obj) {
  for(var prop in obj) {
    if(obj.hasOwnProperty(prop) && typeof obj[prop] === 'object') {
      obj[prop] = clearobj(obj[prop])
    }
    else obj[prop] = ''
  }
  return obj
}
