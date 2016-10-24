declare namespace Handshake {

  interface HandshakeFields {
    ext: any
  }

  interface AbstractHandshakeOptions {
    authType: string
    sandboxId: string
    deploymentId: string
  }

  interface CredentialsHandshakeOptions {
    authType: string
    deploymentId: string
    login: string
    password: string
  }

  interface TokenHandshakeOptions {
    authType: string
    deploymentId: string
    token: string
  }

  interface AbstractHandshake {
    constructor(options: AbstractHandshakeOptions)
    authType: string
    authVersion: string
    sandboxId: string
    deploymentId: string
    getHandshakeFields(Client): HandshakeFields
  }

  interface CredentialsAuthData {
    login: string
    password: string
  }

  interface CredentialsHandshake extends AbstractHandshake {
    constructor(options: AbstractHandshakeOptions)
    login: string
    password: string
    authData: CredentialsAuthData
  }

  interface TokenAuthData {
    token: string 
  }

  interface TokenHandshake extends AbstractHandshake {
    constructor(options: AbstractHandshakeOptions)
    token: string
    authData: TokenAuthData
  }

  type Authentication = () => AbstractHandshake
}

declare module "zetapush-js" {

  type MacroPublisher = (method: string, parameters: any, hardFail?: boolean, debug?: number) => void
  
  type ServicePublisher = (method: string, parameters: any) => void

  interface Options {
    apiUrl: string
    sandboxId: string
    forceHttps?: boolean
    resource?: string
    transports?: Array<any>
  }

  interface ClientOptions extends Options{
    authentication: () => any
  }

  interface WeakClientOptions {
    deploymentId?: string
  }

  interface SmartClientOptions extends Options {

  }

  interface ConnectionStatusListener {
    onConnectionBroken?: () => void
    onConnectionClosed?: () => void
    onConnectionEstablished?: () => void
    onConnectionWillClose?: () => void
    onFailedHandshake?: (failure: any) => void
    onMessageLost?: () => void
    onSuccessfulHandshake?: (authentication: any) => void
  }

  interface Services {
    Macro: Macro
  }

  interface Service {
    $publish: ServicePublisher
    new($publish: ServicePublisher): Service
  }

  interface Macro extends Service {
    $publish: MacroPublisher
    new($publish: MacroPublisher): Macro
  }

  interface ServiceDeclaration {
    Type: Service
    deploymentId?: string
  }

  interface Token {
    token: string
  }

  interface Credentials {
    login: string
    password: string
  }

  interface ClientHelper {
    servers: Promise<Array<string>>
  }

  type ConnectionStatusHandler = number

  export class Client {
    helper: ClientHelper
    constructor(options: ClientOptions)
    addConnectionStatusListener(listener: ConnectionStatusListener): ConnectionStatusHandler
    connect(): void
    createService(ServiceDeclaration): Service
    disconnect(): void
    isConnected(): boolean
    getSandboxId(): string
    getResource(): string
    getUserId(): string
    removeConnectionStatusListener(listener: ConnectionStatusHandler)
    setAuthentication(authentication: Handshake.Authentication)
    setLogLevel(level: string)
    setResource(resource: string)
    unsubscribe(service: Service)
  }

  export class WeakClient extends Client {
    constructor(options: WeakClientOptions)
    getToken(): Token
  }

  export class SmartClient extends Client {
    constructor(options: SmartClientOptions)
    getCredentials(): any
    getSession(): any
    hasCredentials(): boolean
    isStronglyAuthenticated(session: any): void
    isWeaklyAuthenticated(session: any): void
    setCredentials(credentials: any): void
  }

  const services: Services
}