var Interop = require('../').Interop;

if (typeof QUnit == 'undefined') {
  QUnit = require('qunit-cli');
  QUnit.load();

  interop = require('..');
};

global.RTCSessionDescription = function (desc) {
  this.type = desc.type;
  this.sdp = desc.sdp;
}

var dumpSDP = function (description) {
  if (typeof description === 'undefined' || description === null) {
    return '';
  }
  return 'type: ' + description.type + '\r\n' + description.sdp;
};

QUnit.test('ChromePlanB2UnifiedPlan_1track', function (assert) {
  /*jshint multistr: true */
  var originPlanB =
    "v=0\r\n\
o=- 6352417452822806569 2 IN IP4 127.0.0.1\r\n\
s=-\r\n\
t=0 0\r\n\
a=group:BUNDLE audio video\r\n\
a=msid-semantic: WMS nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=setup:actpass\r\n\
a=mid:audio\r\n\
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=sendrecv\r\n\
a=rtcp-mux\r\n\
a=rtpmap:111 opus/48000/2\r\n\
a=fmtp:111 minptime=10; useinbandfec=1\r\n\
a=rtpmap:103 ISAC/16000\r\n\
a=rtpmap:104 ISAC/32000\r\n\
a=rtpmap:9 G722/8000\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=rtpmap:8 PCMA/8000\r\n\
a=rtpmap:106 CN/32000\r\n\
a=rtpmap:105 CN/16000\r\n\
a=rtpmap:13 CN/8000\r\n\
a=rtpmap:126 telephone-event/8000\r\n\
a=maxptime:60\r\n\
a=ssrc:3393882360 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:3393882360 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=ssrc:3393882360 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:3393882360 label:22345512-82de-4e55-b205-967e0249e8e0\r\n\
m=video 9 UDP/TLS/RTP/SAVPF 100 116 117 96\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=setup:actpass\r\n\
a=mid:video\r\n\
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=extmap:4 urn:3gpp:video-orientation\r\n\
a=sendrecv\r\n\
a=rtcp-mux\r\n\
a=rtpmap:100 VP8/90000\r\n\
a=rtcp-fb:100 ccm fir\r\n\
a=rtcp-fb:100 nack\r\n\
a=rtcp-fb:100 nack pli\r\n\
a=rtcp-fb:100 goog-remb\r\n\
a=rtpmap:116 red/90000\r\n\
a=rtpmap:117 ulpfec/90000\r\n\
a=rtpmap:96 rtx/90000\r\n\
a=fmtp:96 apt=100\r\n\
a=ssrc-group:FID 2560713622 1733429841\r\n\
a=ssrc:2560713622 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:2560713622 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:2560713622 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:2560713622 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:1733429841 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:1733429841 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:1733429841 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:1733429841 label:9203939c-25cf-4d60-82c2-d25b19350926"

  /*jshint multistr: true */
  var expectedUnifiedPlan =
    "v=0\r\n\
o=- 6352417452822806569 2 IN IP4 127.0.0.1\r\n\
s=-\r\n\
t=0 0\r\n\
a=msid-semantic: WMS *\r\n\
a=group:BUNDLE audio-3393882360 video-1733429841\r\n\
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:111 opus/48000/2\r\n\
a=rtpmap:103 ISAC/16000\r\n\
a=rtpmap:104 ISAC/32000\r\n\
a=rtpmap:9 G722/8000\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=rtpmap:8 PCMA/8000\r\n\
a=rtpmap:106 CN/32000\r\n\
a=rtpmap:105 CN/16000\r\n\
a=rtpmap:13 CN/8000\r\n\
a=rtpmap:126 telephone-event/8000\r\n\
a=fmtp:111 minptime=10; useinbandfec=1\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=setup:actpass\r\n\
a=mid:audio-3393882360\r\n\
a=msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=maxptime:60\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:3393882360 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:3393882360 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:3393882360 label:22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=rtcp-mux\r\n\
m=video 9 UDP/TLS/RTP/SAVPF 100 116 117 96\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:100 VP8/90000\r\n\
a=rtpmap:116 red/90000\r\n\
a=rtpmap:117 ulpfec/90000\r\n\
a=rtpmap:96 rtx/90000\r\n\
a=fmtp:96 apt=100\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=rtcp-fb:100 ccm fir\r\n\
a=rtcp-fb:100 nack\r\n\
a=rtcp-fb:100 nack pli\r\n\
a=rtcp-fb:100 goog-remb\r\n\
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=extmap:4 urn:3gpp:video-orientation\r\n\
a=setup:actpass\r\n\
a=mid:video-1733429841\r\n\
a=msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:1733429841 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:1733429841 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:1733429841 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:2560713622 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:2560713622 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:2560713622 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc-group:FID 2560713622 1733429841\r\n\
a=rtcp-mux\r\n"

  var interop = new Interop();

  var offer = new RTCSessionDescription({
    type: 'offer',
    sdp: originPlanB
  });

  var unifiedPlanDesc = interop.toUnifiedPlan(offer);
  assert.equal(unifiedPlanDesc.sdp, expectedUnifiedPlan,
    "Not expected Unified Plan output")
});

QUnit.test('ChromePlanB2UnifiedPlan_2tracks', function (assert) {
  /*jshint multistr: true */
  var originPlanB =
    "v=0\r\n\
o=- 6352417452822806569 2 IN IP4 127.0.0.1\r\n\
s=-\r\n\
t=0 0\r\n\
a=group:BUNDLE audio video\r\n\
a=msid-semantic: WMS 0ec45b31-e98d-49fa-b695-7631e004843a nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=setup:actpass\r\n\
a=mid:audio\r\n\
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=sendrecv\r\n\
a=rtcp-mux\r\n\
a=rtpmap:111 opus/48000/2\r\n\
a=fmtp:111 minptime=10; useinbandfec=1\r\n\
a=rtpmap:103 ISAC/16000\r\n\
a=rtpmap:104 ISAC/32000\r\n\
a=rtpmap:9 G722/8000\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=rtpmap:8 PCMA/8000\r\n\
a=rtpmap:106 CN/32000\r\n\
a=rtpmap:105 CN/16000\r\n\
a=rtpmap:13 CN/8000\r\n\
a=rtpmap:126 telephone-event/8000\r\n\
a=maxptime:60\r\n\
a=ssrc:3393882360 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:3393882360 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=ssrc:3393882360 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:3393882360 label:22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=ssrc:2998362345 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:2998362345 msid:0ec45b31-e98d-49fa-b695-7631e004843a 96a45cea-7b24-401f-b12b-92bead3bf181\r\n\
a=ssrc:2998362345 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:2998362345 label:96a45cea-7b24-401f-b12b-92bead3bf181\r\n\
m=video 9 UDP/TLS/RTP/SAVPF 100 116 117 96\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=setup:actpass\r\n\
a=mid:video\r\n\
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=extmap:4 urn:3gpp:video-orientation\r\n\
a=sendrecv\r\n\
a=rtcp-mux\r\n\
a=rtpmap:100 VP8/90000\r\n\
a=rtcp-fb:100 ccm fir\r\n\
a=rtcp-fb:100 nack\r\n\
a=rtcp-fb:100 nack pli\r\n\
a=rtcp-fb:100 goog-remb\r\n\
a=rtpmap:116 red/90000\r\n\
a=rtpmap:117 ulpfec/90000\r\n\
a=rtpmap:96 rtx/90000\r\n\
a=fmtp:96 apt=100\r\n\
a=ssrc-group:FID 2560713622 1733429841\r\n\
a=ssrc:2560713622 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:2560713622 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:2560713622 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:2560713622 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:1733429841 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:1733429841 msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:1733429841 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:1733429841 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc-group:FID 3792658351 624578865\r\n\
a=ssrc:3792658351 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:3792658351 msid:0ec45b31-e98d-49fa-b695-7631e004843a 6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=ssrc:3792658351 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:3792658351 label:6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=ssrc:624578865 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:624578865 msid:0ec45b31-e98d-49fa-b695-7631e004843a 6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=ssrc:624578865 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:624578865 label:6f961540-d5ee-46da-a5b7-b42b97211905"

  /*jshint multistr: true */
  var expectedUnifiedPlan =
    "v=0\r\n\
o=- 6352417452822806569 2 IN IP4 127.0.0.1\r\n\
s=-\r\n\
t=0 0\r\n\
a=msid-semantic: WMS *\r\n\
a=group:BUNDLE audio-2998362345 audio-3393882360 video-624578865 video-1733429841\r\n\
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:111 opus/48000/2\r\n\
a=rtpmap:103 ISAC/16000\r\n\
a=rtpmap:104 ISAC/32000\r\n\
a=rtpmap:9 G722/8000\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=rtpmap:8 PCMA/8000\r\n\
a=rtpmap:106 CN/32000\r\n\
a=rtpmap:105 CN/16000\r\n\
a=rtpmap:13 CN/8000\r\n\
a=rtpmap:126 telephone-event/8000\r\n\
a=fmtp:111 minptime=10; useinbandfec=1\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=setup:actpass\r\n\
a=mid:audio-2998362345\r\n\
a=msid:0ec45b31-e98d-49fa-b695-7631e004843a 96a45cea-7b24-401f-b12b-92bead3bf181\r\n\
a=maxptime:60\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:2998362345 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:2998362345 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:2998362345 label:96a45cea-7b24-401f-b12b-92bead3bf181\r\n\
a=rtcp-mux\r\n\
m=audio 9 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 126\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:111 opus/48000/2\r\n\
a=rtpmap:103 ISAC/16000\r\n\
a=rtpmap:104 ISAC/32000\r\n\
a=rtpmap:9 G722/8000\r\n\
a=rtpmap:0 PCMU/8000\r\n\
a=rtpmap:8 PCMA/8000\r\n\
a=rtpmap:106 CN/32000\r\n\
a=rtpmap:105 CN/16000\r\n\
a=rtpmap:13 CN/8000\r\n\
a=rtpmap:126 telephone-event/8000\r\n\
a=fmtp:111 minptime=10; useinbandfec=1\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=setup:actpass\r\n\
a=mid:audio-3393882360\r\n\
a=msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=maxptime:60\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:3393882360 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:3393882360 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:3393882360 label:22345512-82de-4e55-b205-967e0249e8e0\r\n\
a=rtcp-mux\r\n\
m=video 9 UDP/TLS/RTP/SAVPF 100 116 117 96\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:100 VP8/90000\r\n\
a=rtpmap:116 red/90000\r\n\
a=rtpmap:117 ulpfec/90000\r\n\
a=rtpmap:96 rtx/90000\r\n\
a=fmtp:96 apt=100\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=rtcp-fb:100 ccm fir\r\n\
a=rtcp-fb:100 nack\r\n\
a=rtcp-fb:100 nack pli\r\n\
a=rtcp-fb:100 goog-remb\r\n\
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=extmap:4 urn:3gpp:video-orientation\r\n\
a=setup:actpass\r\n\
a=mid:video-624578865\r\n\
a=msid:0ec45b31-e98d-49fa-b695-7631e004843a 6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:624578865 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:624578865 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:624578865 label:6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=ssrc:3792658351 cname:XvUdN+mQ3KWuNJNu\r\n\
a=ssrc:3792658351 mslabel:0ec45b31-e98d-49fa-b695-7631e004843a\r\n\
a=ssrc:3792658351 label:6f961540-d5ee-46da-a5b7-b42b97211905\r\n\
a=ssrc-group:FID 3792658351 624578865\r\n\
a=rtcp-mux\r\n\
m=video 9 UDP/TLS/RTP/SAVPF 100 116 117 96\r\n\
c=IN IP4 0.0.0.0\r\n\
a=rtpmap:100 VP8/90000\r\n\
a=rtpmap:116 red/90000\r\n\
a=rtpmap:117 ulpfec/90000\r\n\
a=rtpmap:96 rtx/90000\r\n\
a=fmtp:96 apt=100\r\n\
a=rtcp:9 IN IP4 0.0.0.0\r\n\
a=rtcp-fb:100 ccm fir\r\n\
a=rtcp-fb:100 nack\r\n\
a=rtcp-fb:100 nack pli\r\n\
a=rtcp-fb:100 goog-remb\r\n\
a=extmap:2 urn:ietf:params:rtp-hdrext:toffset\r\n\
a=extmap:3 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time\r\n\
a=extmap:4 urn:3gpp:video-orientation\r\n\
a=setup:actpass\r\n\
a=mid:video-1733429841\r\n\
a=msid:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c 9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=sendrecv\r\n\
a=ice-ufrag:xHOGnBsKDPCmHB5t\r\n\
a=ice-pwd:qpnbhhoyeTrypBkX5F1u338T\r\n\
a=fingerprint:sha-256 58:E0:FE:56:6A:8C:5A:AD:71:5B:A0:52:47:27:60:66:27:53:EC:B6:F3:03:A8:4B:9B:30:28:62:29:49:C6:73\r\n\
a=ssrc:1733429841 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:1733429841 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:1733429841 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc:2560713622 cname:5YcASuDc3X86mu+d\r\n\
a=ssrc:2560713622 mslabel:nnnwYrPTpGmyoJX5GFHMVv42y1ZthbnCx26c\r\n\
a=ssrc:2560713622 label:9203939c-25cf-4d60-82c2-d25b19350926\r\n\
a=ssrc-group:FID 2560713622 1733429841\r\n\
a=rtcp-mux\r\n"

  var interop = new Interop();

  var offer = new RTCSessionDescription({
    type: 'offer',
    sdp: originPlanB
  });

  var unifiedPlanDesc = interop.toUnifiedPlan(offer);
  assert.equal(unifiedPlanDesc.sdp, expectedUnifiedPlan,
    "Not expected Unified Plan output")
});
