

export const RTC_CHANNEL = 'rtc'

export const ICE_SERVERS = {
  // ,'iceTransportPolicy': 'relay' // Remove to force turn server
  'iceServers': [
    { 'url': 'stun:stun.l.google.com:19302' },
    { 'url': 'stun:stun1.l.google.com:19302' },
    { 'url': 'stun:stun2.l.google.com:19302' },
    { 'url': 'stun:stun3.l.google.com:19302' },
    { 'url': 'stun:stun4.l.google.com:19302' },
    { 'url': 'stun:stun01.sipphone.com' },
    { 'url': 'stun:stun.ekiga.net' },
    { 'url': 'stun:stun.fwdnet.net' },
    { 'url': 'stun:stun.ideasip.com' },
    { 'url': 'stun:stun.iptel.org' },
    { 'url': 'stun:vps279345.ovh.net:443', 'credential': 'c4878XzgQ54NhjsSNX', 'username': 'lesateliers' },
    { 'url': 'turn:vps279345.ovh.net:443?transport=udp', 'credential': 'c4878XzgQ54NhjsSNX', 'username': 'lesateliers' },
    { 'url': 'turn:vps279345.ovh.net:443?transport=tcp', 'credential': 'c4878XzgQ54NhjsSNX', 'username': 'lesateliers' }
  ]
}