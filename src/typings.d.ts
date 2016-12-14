// Typings reference file, you can add your own global typings here
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

///<reference path="./zetapush.d.ts"/>

declare var System: any

interface Window {
  WebFont: any,
  RTCCertificate: any,
  RTCIceCandidate: any,
  RTCSessionDescription: any,
  RTCPeerConnection: any,
  Notification: any
}
