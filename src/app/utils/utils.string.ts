/**
 * Alpha numeric dictionary
 */
const DICTIONARY = 'abcdefghijklmnopqrstuvwxyz0123456789'

/**
 * Get random id
 */
export const uuid = (entropy = 7, dictionary: string = DICTIONARY): string => Array.from(Array(entropy)).reduce((previous) => {
  const next = dictionary.charAt(Math.floor(Math.random() * dictionary.length))
  return `${previous}${next}`
}, '')