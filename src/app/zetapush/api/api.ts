import { services } from 'zetapush-js'

class MandatoryError extends Error {
  constructor() {
    super('Missing mandatory parameters')
  }
}

export class Api extends services.Macro {}

export const ASSERT_IS_MANDATORY = () => {
  throw new MandatoryError()
}
