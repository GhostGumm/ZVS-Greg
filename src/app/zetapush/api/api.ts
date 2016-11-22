const { services } = ZetaPush

export class Api extends services.Macro {
  /**
   * FIX behavior due to https://github.com/Microsoft/TypeScript/issues/12059
   */
  static get DEFAULT_DEPLOYMENT_ID(): string {
    return services.Macro.DEFAULT_DEPLOYMENT_ID
  }
}
