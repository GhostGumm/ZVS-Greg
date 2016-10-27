import { Injectable } from '@angular/core'
import { VideoInterface, VideoClass } from './video.interface'
import { services } from 'zetapush-js'
import { DomSanitizer } from '@angular/platform-browser'
// import 'webrtc-adapter'

import { ICE_SERVERS, RTC_CHANNEL } from '../../../utils/utils.rtc'

@Injectable()
export class VideoService {
  
  peers:any = {}
  iceServers:any = ICE_SERVERS

  videoInProgress:boolean = false
  stream:any = null

  local:any = {
    stream:null,
    source:null
  }

  pc:any = null
  offerOptions:any = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  }

  zpMessaging:any

  context = null
  
  constructor(private sanitizer:DomSanitizer) { // public ZetaPushClient, public context

    // this.zpMessaging = ZetaPushClient.createService({
    //   // type: services.Messaging,
    //   listener: {
    //     rtc: (e) => {
    //       this.onMessage(e)
    //     }
    //   },
    //   deploymentId: 'messaging_1'
    // })
  }

  onMessage(msg) {
    const { source, target, data } = msg.data
    const { context, verb } = data
    console.debug('WebRtc::onMessage', verb, `${source}:${context} -> ${target}`, msg)

    if (context != this.context)
      return

    var pc = null

    switch (verb) {
    case 'hangup':
      console.debug('WebRtc::hangup', this.peers[source])
      this.removePeer(source)
      break

    case 'sdp-offer':
      console.debug('WebRtc::sdp-offer', this.peers[source])
      //this.answer(source, data)
      break

    case 'sdp-answer':
      pc= this.getPeerConnection(source)
      pc.setRemoteDescription(new window.RTCSessionDescription(data.sdp), ()  =>{
        console.debug('WebRtc::Setting remote description by answer', pc)
      }, (e) => {
        console.error(e)
      })
      break

    case 'ice':
      pc= this.getPeerConnection(source)
      if (data.ice && pc.remoteDescription.sdp) { //  && pc.remoteDescription.sdp
        console.debug('WebRtc::Adding ice candidates', data, pc)
        pc.addIceCandidate(new window.RTCIceCandidate(data.ice))
      }
      break
    }
  }

  startVideo():Promise<any> {
    console.debug('WebRtc::startVideo')
    return new Promise((resolve, reject) => {
      const getUserMedia = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
      }) as Promise<any>

      getUserMedia.then((stream) => {
        this.local.stream = stream
        this.local.source = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(stream))
        resolve({
          stream,
          source: this.local.source
        })
      })
      .catch((error) => {
        reject(error)
      })
    })
  }

  getConnection(userId) {
    console.debug('WebRtc::getConnection', userId)
    if (this.peers[userId]) {
      return this.peers[userId].connection
    }
  }

  addPeerConnection(userId, connection) {
    console.debug('WebRtc::addPeerConnection', userId)
    if (!this.peers[userId]) {
      this.peers[userId]={}
    }
    this.peers[userId].connection= connection
  }

  addPeerStream(userId, stream) {
    console.debug('WebRtc::addPeerStream', { userId, stream })

    if (!this.peers[userId]) {
      this.peers[userId] = {}
    }
    this.peers[userId].url = URL.createObjectURL(stream)
    this.peers[userId].stream = stream
  }

  removePeer(userId) {
    console.debug('WebRtc::removePeer', userId)
    if (this.peers[userId]) {
      delete this.peers[userId]
      return true
    }
    else {
      return false
    }
  }

  getPeerConnection(userId) {
    console.debug('WebRtc::getPeerConnection', userId)

    if (this.peers[userId]) {
      return this.getConnection(userId)
    }

    var pc = new window.RTCPeerConnection(this.iceServers)

    pc.userId = userId
    this.addPeerConnection(userId, pc)

    pc.addTrack ? pc.addTrack(this.local.stream) : pc.addStream(this.local.stream)

    pc.onicecandidate = (evt) => {
      if (this.videoInProgress === false) {
        var answer={
          context: this.context,
          verb: 'ice',
          ice: evt.candidate
        }
        this.zpMessaging.send({
          RTC_channel:RTC_CHANNEL,
          target:userId,
          data:answer
        })
      }
      this.videoInProgress= true
    }

    pc.oniceconnectionstatechange= (evt) => {
      if (evt.target.iceConnectionState === 'connected' || evt.target.iceConnectionState === 'completed') {
        this.videoInProgress= true
      }
      if (evt.target.iceConnectionState === 'closed' || evt.target.iceConnectionState === 'disconnected') {
        this.removePeer(evt.target.userId)
        this.videoInProgress= false
      }
    }

    if (pc.ontrack) {
      pc.ontrack = (evt) => {
        this.addPeerStream(userId, evt.stream)
      }
    }
    else {
      pc.onaddstream = (evt) => {
        this.addPeerStream(userId, evt.stream)
      }
    }
    return pc
  }

  clearPeers() {
    for (let peer in this.peers) {
      console.warn('WebRtc::clearPeers', this.peers[peer])
      delete this.peers[peer]
    }
  }

  makeOffer(userId) {
    console.debug('WebRtc::makeOffer', userId, this.peers)

    var pc = this.getPeerConnection(userId)

    pc.createOffer((sdp) => {
      pc.setLocalDescription(sdp)

      var answer={
        context: this.context,
        verb: 'sdp-offer',
        sdp: sdp
      }

      this.zpMessaging.send({
        RTC_channel:RTC_CHANNEL,
        target:userId,
        data:answer
      })
    },(e) => {
      console.debug(e)
    },
    { mandatory: { OfferToReceiveVideo: true, OfferToReceiveAudio: true }})
  }

  answer(source, data) {
    console.debug('WebRtc::answer', source, data)

    if (this.peers[source] && !this.peers[source].url) {
      this.removePeer(source)
    }
    
    var pc = this.getPeerConnection(source)
    pc.setRemoteDescription(new window.RTCSessionDescription(data.sdp), () => {
      pc.createAnswer((sdp) => {
        pc.setLocalDescription(sdp)
        var answer={
          context: this.context,
          verb: 'sdp-answer',
          sdp: sdp
        }
        this.zpMessaging.send({
          RTC_channel:RTC_CHANNEL,
          target:source,
          data:answer
        })
      }, (error) => {
        console.error(error)
      }, { 'mandatory': { 'OfferToReceiveAudio': true, 'OfferToReceiveVideo': true }})
    })
  }

  hangup(userKey = null) {

    const closeConnection = (key) => {      
      if (this.peers[key]) {
        this.peers[key].connection.close()
      }
      var answer={
        context: this.context,
        verb: 'hangup'
      }
      this.zpMessaging.send({
        RTC_channel:RTC_CHANNEL,
        target:key,
        data:answer
      })
    }
    if (userKey) {
      console.debug('WebRtc::hangup', userKey, this.peers[userKey])
      closeConnection(userKey)
    }
    else {
      for (var key in this.peers) {
        console.debug('WebRtc::hangup', key, this.peers[key])
        closeConnection(key)
      }
    }
  }

  closeTracks() {
    if (this.local.stream) {
      this.local.stream.getTracks().forEach((track) => {
        track.stop()
      })
    }  
  }

  destroy() {
    // this.ZetaPushClient.unsubscribe(this.zpMessaging)
    this.closeTracks()
    this.hangup()
  }
}
