import { Component, HostBinding, ViewChildren, OnInit, AfterViewInit, trigger } from '@angular/core'
import { fadeInOutView } from '../../../utils/utils.animation'

import * as Chartist from 'chartist'
import { ChartType, ChartEvent } from 'angular2-chartist'
import * as adapter from './adapter.js'
import { NotificationService } from '../../../services'

import { CARDS_TEMPLATE } from './home-view.template'

declare function require(path: string) : any;
declare function string(): string;

var server: string;
var janus: any;
var sfutest: any;
var zanus: any;
var myusername: any;
var myroom: any;
var numberofusers: any;
var mystream: any;
var feeds: any;
var bitrateTimer: any;
var registerUsername: any;
var started: any;
var transpoler: any;
var myid: any;
var $ = require("jquery");

let death: string;
//var ADP = require("../../../../js/adapter.js");
//var adapter: any;
export interface Chart {
  type: ChartType
  data: Chartist.IChartistData
  options?: any
  responsiveOptions?: any
  events?: ChartEvent
}

declare class Janus {
  constructor(elem: any);
  init();
  test();
  listDevices();
  logTest();
  isExtensionEnabled();
}

@Component({
  selector: 'zp-home-view',
  templateUrl: './home-view-test.component.html', //home-view.component.html
  styleUrls: ['./home-view.component.scss'],
  providers: [],
  animations: [
    trigger('routeAnimation', fadeInOutView)
  ]
})

export class HomeViewComponent implements OnInit, AfterViewInit {
  public Janus: any = window.Janus;
  public Adapter: any = window.adapter;
  public cards: any = CARDS_TEMPLATE
  //private sfutest: any;
  public server = null;
  private nr_div: any;
  private div_list: any;

  @ViewChildren('chart') charts

  @ViewChildren('videolocal') video: any;


  @HostBinding('@routeAnimation') get routeAnimation() {
    return true
  }

  constructor(
    private notifications: NotificationService) {
      //"ws://" + window.location.hostname + ":8188";
    //"ws://" + "167.114.250.229" + ":8188";
      if (window.location.protocol === 'http')
      server = "ws://" + "167.114.250.229" + ":8188";
      else if (window.location.protocol === 'https')
        server = "ws://" + "167.114.250.229" + ":8188";
      else
        server = "ws://" + "167.114.250.229" + ":8188";
      transpoler = this.Janus;
      feeds = [];
    }

    startZanus()
    {
      started = true;
      if (!transpoler.isWebrtcSupported()){
        console.log("No WebRTC Support");
        return;
      }

      console.log("init is okay");
      zanus = new Janus({
        server: server,
        success: function() {
        zanus.attach({
          plugin:"zeta.plugin.videoroom",
          success: function(pluginHandle){
            sfutest = pluginHandle;
            transpoler.log("Plugin attached! (" + sfutest.getPlugin() + ", id=" + sfutest.getId() + ")");
            transpoler.log("  -- This is a publisher/manager");

            // Prepare the username registration
            $('#videos').removeClass('hide').show();
            $('#registernow').removeClass('hide').show();
            $('#register').click(registerUsername);
            $('#username').focus();
              myusername = (<HTMLInputElement>document.getElementById("username")).value;
              myroom = (<HTMLInputElement>document.getElementById("roomnumber")).value;
            $('#start').removeAttr('disabled').html("Stop")
              .click(function() {
                $(this).attr('disabled', true);
                janus.destroy();
              });
              //how to create a room and add a username
                // here call autoRegister //
                autoRegister();
          },
                error: function(error) {
            transpoler.error("  -- Error attaching plugin...", error);
            //bootbox.alert("Error attaching plugin... " + error);
          },
          consentDialog: function(on) {
            transpoler.debug("Consent dialog should be " + (on ? "on" : "off") + " now");
            if(on) {
              // Darken screen and show hint
              /*$.blockUI({
                message: '<div><img src="up_arrow.png"/></div>',
                css: {
                  border: 'none',
                  padding: '15px',
                  backgroundColor: 'transparent',
                  color: '#aaa',
                  top: '10px',*/
                  (navigator.mediaDevices.getUserMedia ? '-100px' : '300px')
                }
              },/*);*/
            //} /*else {
              // Restore screen
            //  $.unblockUI();
            //}*/
          //},
          mediaState: function(medium, on) {
            transpoler.log("Zanus " + (on ? "started" : "stopped") + " receiving our " + medium);
          },
          webrtcState: function(on) {
            transpoler.log("Zanus says our WebRTC PeerConnection is " + (on ? "up" : "down") + " now");
            //$("#videolocal").parent().parent().unblock();
          },
          onmessage: function(msg, jsep) {
            transpoler.debug(" ::: Got a message (publisher) :::");
            transpoler.debug(JSON.stringify(msg));
            var event = msg["videoroom"];
            transpoler.debug("Event: " + event);
            if(event != undefined && event != null) {
              if(event === "joined") {
                // Publisher/manager created, negotiate WebRTC and attach to existing feeds, if any
                myid = msg["id"];
                transpoler.log("Successfully joined room " + msg["room"] + " with ID " + myid);
                publishOwnFeed(true);
                // Any new feed to attach
                if(msg["publishers"] !== undefined && msg["publishers"] !== null) {
                  var list = msg["publishers"];
                  transpoler.debug("Got a list of available publishers/feeds:");
                  transpoler.debug(list);
                  for(var f in list) {
                    var id = list[f]["id"];
                    var display = list[f]["display"];
                    transpoler.debug("  >> [" + id + "] " + display);

                    newRemoteFeed(id, display)
                  }
                }
              } else if(event === "destroyed") {
                // The room has been destroyed
                transpoler.warn("The room has been destroyed!");
                //this.bootbox.alert(error, function() {
                  //window.location.reload();
                //});
              } else if(event === "event") {
                // Any new feed to attach to?
                if(msg["publishers"] !== undefined && msg["publishers"] !== null) {
                  var list = msg["publishers"];
                  transpoler.debug("Got a list of available publishers/feeds:");
                  transpoler.debug(list);
                  for(var f in list) {
                    var id = list[f]["id"];
                    var display = list[f]["display"];
                    transpoler.debug("  >> [" + id + "] " + display);
                    newRemoteFeed(id, display)
                  }
                } else if(msg["leaving"] !== undefined && msg["leaving"] !== null) {
                  // One of the publishers has gone away?
                  var leaving = msg["leaving"];
                  transpoler.log("Publisher left: " + leaving);
                  var remoteFeed = null; //maybe var is better
                  for(var i=1; i<0; i++) {
                    if(feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == leaving) {
                      remoteFeed = feeds[i];
                      break;
                    }
                  }
                  if(remoteFeed != null) {
                    transpoler.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                    $('#remote'+remoteFeed.rfindex).empty().hide();
                    $('#videoremote'+remoteFeed.rfindex).empty();
                    feeds[remoteFeed.rfindex] = null;
                    remoteFeed.detach();
                  }
                } else if(msg["unpublished"] !== undefined && msg["unpublished"] !== null) {
                  // One of the publishers has unpublished?
                  var unpublished = msg["unpublished"];
                  transpoler.log("Publisher left: " + unpublished);
                  if(unpublished === 'ok') {
                    // That's us
                    sfutest.hangup();
                    return;
                  }
                  var remoteFeed = null;
                  for(var i=1; i<500; i++) {
                    if(feeds[i] != null && feeds[i] != undefined && feeds[i].rfid == unpublished) {
                      remoteFeed = feeds[i];
                      break;
                    }
                  }
                  if(remoteFeed != null) {
                    transpoler.debug("Feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") has left the room, detaching");
                    $('#remote'+remoteFeed.rfindex).empty().hide();
                    $('#videoremote'+remoteFeed.rfindex).empty();
                    feeds[remoteFeed.rfindex] = null;
                    remoteFeed.detach();
                  }
                } else if(msg["error"] !== undefined && msg["error"] !== null) {
                  this.bootbox.alert(msg["error"]);
                }
              }
            }
            if(jsep !== undefined && jsep !== null) {
              transpoler.debug("Handling SDP as well...");
              transpoler.debug(jsep);
              sfutest.handleRemoteJsep({jsep: jsep});
            }
          },
          onlocalstream: function(stream) {
            transpoler.debug(" ::: Got a local stream :::");
            mystream = stream;
            transpoler.debug(JSON.stringify(stream));
            $('#videolocal').empty();
            $('#videojoin').hide();
            $('#videos').removeClass('hide').show();
            if($('#myvideo').length === 0) {
              $('#videolocal').append('<video class="rounded centered" id="myvideo" width="100%" height="100%" autoplay muted="muted"/>');
              // Add a 'mute' button
              $('#videolocal').append('<button class="btn btn-warning btn-xs" id="mute" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;">Mute</button>');
              $('#mute').click(toggleMute);
              // Add an 'unpublish' button
              $('#videolocal').append('<button class="btn btn-warning btn-xs" id="unpublish" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;">Unpublish</button>');
              $('#unpublish').click(unpublishOwnFeed);
            }
            $('#publisher').removeClass('hide').html(myusername).show();
            let test: string;
            adapter.attachMediaStream($('#myvideo').get(0), stream);
            $("#myvideo").get(0).muted = "muted";
            /*$("#videolocal").parent().parent().block({
              message: '<b>Publishing...</b>',
              css: {
                border: 'none',
                backgroundColor: 'transparent',
                color: 'white'
              }
            });*/
            var videoTracks = stream.getVideoTracks();
            if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0) {
              // No webcam
              $('#myvideo').hide();
              console.log("appending");
              $('#videolocal').append(
                '<div class="no-video-container">' +
                  '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
                  '<span class="no-video-text" style="font-size: 16px;">No webcam available</span>' +
                '</div>');
            }
          },
          onremotestream: function(stream) {
            // The publisher stream is sendonly, we don't expect anything here
          },
          oncleanup: function() {
            transpoler.log(" ::: Got a cleanup notification: we are unpublished now :::");
            mystream = null;
            $('#videolocal').html('<button id="publish" class="btn btn-primary">Publish</button>');
            $('#publish').click(function() { publishOwnFeed(true); });
           //$("#videolocal").parent().parent().unblock();
          }
        });
    },
    error: function(error) {
      transpoler.error(error);
      //this.Janus.bootbox.alert(error, function() {
        //window.location.reload();
      //});
    },
    destroyed: function() {
      window.location.reload();
      }
    });

    }

    getURLParameter(name) {
    	//RegExp sorcery :3
            return decodeURI(
                (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
            );
    }

    ngOnInit() {
    this.notifications.listUserNotification().then(({ notifications, page }) => {
      console.debug('listUserNotification', { notifications, page })
    })
  }

  ngAfterViewInit() {
    this.refreshData()
    transpoler.init({debug: true, callback: function(){}});
}

  refreshData() {
    // setInterval(() => {
    //   this.charts._results.forEach((chart) => {
    //     let series = chart.data.series
    //     for(let serie in series) {
    //       if (chart.type == 'Pie') {
    //         series.splice(serie, 1, Math.round(Math.random()*2 + 8))
    //       }
    //     }
    //     chart.update(series)
    //   })
    // }, 1000)
  }

}

var newRemoteFeed = (id, display) => {
  //updateFeedList();
  var remoteFeed = null;
  zanus.attach(
    {
      //Need to attach a puglin for the new user, allready connected users don t attach
      plugin: "zeta.plugin.videoroom",
      success: function(pluginHandle) {
        remoteFeed = pluginHandle;
        transpoler.log("Plugin attached! (" + remoteFeed.getPlugin() + ", id=" + remoteFeed.getId() + ")");
        transpoler.log("  -- This is a subscriber");
        // We wait for the plugin to send us an offer
        var listen = { "request": "join", "room": parseInt(myroom), "ptype": "listener", "feed": id };
        var list = {"request": "list"};
        remoteFeed.send({"message": listen});
      },
      error: function(error) {
        transpoler.error("  -- Error attaching plugin...", error);
        //bootbox.alert("Error attaching plugin... " + error);
      },
      onmessage: function(msg, jsep) {
        transpoler.debug(" ::: Got a message (listener) :::");
        transpoler.debug(JSON.stringify(msg));
        var event = msg["videoroom"];
        transpoler.debug("Event: " + event);
        if(event != undefined && event != null) {
          if(event === "attached") {
            // Subscriber created and attached
            for(var i=1;i<500;i++) {
              if(feeds[i] === undefined || feeds[i] === null) {
                feeds[i] = remoteFeed;
                remoteFeed.rfindex = i;
                break;
              }
            }
            remoteFeed.rfid = msg["id"];
            remoteFeed.rfdisplay = msg["display"];
            //if(remoteFeed.spinner === undefined || remoteFeed.spinner === null) {
              console.log('videoremote' + remoteFeed.rfindex);
              console.log("PAAAAAASES THROUGH 2 !!!");
              var target = document.getElementById('videoremote'+remoteFeed.rfindex);
              //remoteFeed.spinner = new Spinner({top:100}).spin(target);
            //} else {
              //remoteFeed.spinner.spin();
            //}
            transpoler.log("Successfully attached to feed " + remoteFeed.rfid + " (" + remoteFeed.rfdisplay + ") in room " + msg["room"]);
            $('#remote'+remoteFeed.rfindex).removeClass('hide').html(remoteFeed.rfdisplay).show();
          } else if(msg["error"] !== undefined && msg["error"] !== null) {
            console.log("error onmessage : L454")//bootbox.alert(msg["error"]);
          } else {
            // What has just happened?
          }
        }
        if(jsep !== undefined && jsep !== null) {
          transpoler.debug("Handling SDP as well...");
          transpoler.debug(jsep);
          // Answer and attach
          remoteFeed.createAnswer(
            {
              jsep: jsep,
              media: { audioSend: true, videoSend: true },	// We want recvonly audio/video
              success: function(jsep) {
                transpoler.debug("Got SDP!");
                transpoler.debug(jsep);
                var body = { "request": "start", "room": parseInt(myroom) };
                remoteFeed.send({"message": body, "jsep": jsep});
              },
              error: function(error) {
                transpoler.error("WebRTC error:", error);
                //bootbox.alert("WebRTC error... " + JSON.stringify(error));
              }
            });
        }
      },
      //Checks the state of the RTC connection throught attached C Plugin
      webrtcState: function(on) {
        transpoler.log("Janus says this WebRTC PeerConnection (feed #" + remoteFeed.rfindex + ") is " + (on ? "up" : "down") + " now");
      },
      onlocalstream: function(stream) {
        // The subscriber stream is recvonly, we don't expect anything here
      },
      onremotestream: function(stream) {
        transpoler.debug("Remote feed #" + remoteFeed.rfindex);
        if($('#remotevideo'+remoteFeed.rfindex).length === 0) {
          // No remote video yet
          $('#videoremote'+remoteFeed.rfindex).append('<video class="rounded centered" id="waitingvideo' + remoteFeed.rfindex + '" width=320 height=240 />');
          $('#videoremote'+remoteFeed.rfindex).append('<video class="rounded centered relative hide" id="remotevideo' + remoteFeed.rfindex + '" width="100%" height="100%" autoplay/>');
        }
        $('#videoremote'+remoteFeed.rfindex).append(
          '<span class="label label-primary hide" id="curres'+remoteFeed.rfindex+'" style="position: absolute; bottom: 0px; left: 0px; margin: 15px;"></span>' +
          '<span class="label label-info hide" id="curbitrate'+remoteFeed.rfindex+'" style="position: absolute; bottom: 0px; right: 0px; margin: 15px;"></span>');
        // Show the video, hide the spinner and show the resolution when we get a playing event
        $("#remotevideo"+remoteFeed.rfindex).bind("playing", function () {
          if(remoteFeed.spinner !== undefined && remoteFeed.spinner !== null)
            remoteFeed.spinner.stop();
          remoteFeed.spinner = null;
          $('#waitingvideo'+remoteFeed.rfindex).remove();
          $('#remotevideo'+remoteFeed.rfindex).removeClass('hide');
          var width = this.videoWidth;
          var height = this.videoHeight;
          $('#curres'+remoteFeed.rfindex).removeClass('hide').text(width+'x'+height).show();
          if(adapter.webrtcDetectedBrowser == "firefox") {
            // Firefox Stable has a bug: width and height are not immediately available after a playing
            setTimeout(function() {
              var width = $("#remotevideo"+remoteFeed.rfindex).get(0).videoWidth;
              var height = $("#remotevideo"+remoteFeed.rfindex).get(0).videoHeight;
              $('#curres'+remoteFeed.rfindex).removeClass('hide').text(width+'x'+height).show();
            }, 2000);
          }
        });

        adapter.attachMediaStream($('#remotevideo'+remoteFeed.rfindex).get(0), stream);
        var videoTracks = stream.getVideoTracks();
        if(videoTracks === null || videoTracks === undefined || videoTracks.length === 0 || videoTracks[0].muted) {
          // No remote video
          $('#remotevideo'+remoteFeed.rfindex).hide();
          $('#videoremote'+remoteFeed.rfindex).append(
            '<div class="no-video-container">' +
              '<i class="fa fa-video-camera fa-5 no-video-icon" style="height: 100%;"></i>' +
              '<span class="no-video-text" style="font-size: 16px;">No remote video available</span>' +
            '</div>');
        }
        if(adapter.webrtcDetectedBrowser == "chrome" || adapter.webrtcDetectedBrowser == "firefox") {
          $('#curbitrate'+remoteFeed.rfindex).removeClass('hide').show();
          bitrateTimer[remoteFeed.rfindex] = setInterval(function() {
            // Display updated bitrate, if supported
            var bitrate = remoteFeed.getBitrate();
            $('#curbitrate'+remoteFeed.rfindex).text(bitrate);
          }, 1000);
        }
      },
      oncleanup: function() {
        transpoler.log(" ::: Got a cleanup notification (remote feed " + id + ") :::");
        if(remoteFeed.spinner !== undefined && remoteFeed.spinner !== null)
          remoteFeed.spinner.stop();
        remoteFeed.spinner = null;
        $('#waitingvideo'+remoteFeed.rfindex).remove();
        $('#curbitrate'+remoteFeed.rfindex).remove();
        $('#curres'+remoteFeed.rfindex).remove();
        if(bitrateTimer[remoteFeed.rfindex] !== null && bitrateTimer[remoteFeed.rfindex] !== null)
          clearInterval(bitrateTimer[remoteFeed.rfindex]);
        bitrateTimer[remoteFeed.rfindex] = null;
      }
    });
}




var updateFeedList = () => {
    //To update the users list when newcomer enter the room
    var body = { "request": "list" };
    JSON.stringify(body);
    //no need to attach send directly through C plugin_handle
    sfutest.send({"message": body, success: function(result) {
    setTimeout(function() {
    }, 500);
    if(result === null || result === undefined) {
      //bootbox.alert("Updater Failure, is the Gateway down ? ");
      console.log("Updater just failed, is the Gateway dead ?");
      return;
    }
    //Parsing stuff
    if(result["list"] !== undefined && result["list"] !== null) {
      var list = result["list"];
      //transpoler.log("Got a list of available streams");
    //  transpoler.debug(list);
      var temp;
      for(var i=0; i<list.length; i++) {
        temp = list[i];
      }
      numberofusers = temp["num_participants"];
    }
    return numberofusers;
    }});
}

var toggleMute = () => {
  var muted = sfutest.isAudioMuted();
  transpoler.log((muted ? "Unmuting" : "Muting") + " local stream...");
  if(muted)
    sfutest.unmuteAudio();
  else
    sfutest.muteAudio();
  muted = sfutest.isAudioMuted();
  $('#mute').html(muted ? "Unmute" : "Mute");
}

var autoRegister = () => {

  var register: any;
//myusername = getURLParameter("username");
if (myusername != null)
  register = { "request": "join", "room": parseInt(myroom), "ptype": "publisher", "display": myusername };
else
  register = { "request": "join", "room": parseInt(myroom), "ptype": "publisher", "display": "Ghost" };

var createRoom = {
"request": "create",
"record": true,
"publishers": 100,
"room": parseInt(myroom),
"bitrate": parseInt("1024000"),
};
//I don't catch the answer because it can't fail.
sfutest.send({"message": createRoom});
setTimeout(function(){
  //here i registered a room number and asked for a new one.
  }, 500);
//This how to perform a communication with the C plugin
//For a more detailed call and catch for a communication see function updateFeedList
sfutest.send({"message": register});

}


var unpublishOwnFeed = () => {
  $('#unpublish').attr('disabled', true).unbind('click');
  var unpublish = { "request": "unpublish" };
  sfutest.send({"message": unpublish});
}

var publishOwnFeed = (useAudio) => {

  $('#publish').attr('disabled', true).unbind('click');
  sfutest.createOffer(
    {    //Fundamental stream configuration
      media: { audioRecv: false, videoRecv: false, audioSend: useAudio, videoSend: true},	// Publishers are sendonly
      success: function(jsep) {
        //this.Janus.debug("Got publisher SDP!");
        //this.Janus.debug(jsep);
        var publish = { "request": "configure", "audio": useAudio, "video": true, "bitrate":parseInt("1024000")};
        sfutest.send({"message": publish, "jsep": jsep});
},
error: function(error) {
  this.Janus.error("WebRTC error:", error);
  if (useAudio) {
     publishOwnFeed(false);
  } else {
    //bootbox.alert("WebRTC error... " + JSON.stringify(error));
    $('#publish').removeAttr('disabled').click(function() { publishOwnFeed(true); });
  }
}
});
}
