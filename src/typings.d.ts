// Typings reference file, see links for more information
// https://github.com/typings/typings
// https://www.typescriptlang.org/docs/handbook/writing-declaration-files.html

///<reference path="./zetapush.d.ts"/>

declare var System: any
declare var require: any;

interface Window {
  WebFont: any,
  RTCCertificate: any,
  RTCIceCandidate: any,
  RTCSessionDescription: any,
  RTCPeerConnection: any
}
