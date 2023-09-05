import { useState } from "react";
import CallActions from "./CallActions";
import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";
import ringing from "../../../audio/ringing.mp3";

const Call = ({
  call,
  setCall,
  callAccepted,
  userVideo,
  myVideo,
  stream,
  answerCall,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall,
}) => {
  const { receivingCall, callEnded } = call;

  const [showActions, setShowActions] = useState(true);
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg
         ${receivingCall && !callAccepted ? "hidden" : ""}
         `}
        onMouseOver={() => setShowActions(true)}
        onMouseOut={() => setShowActions(false)}
      >
        {/* Container */}
        <div>
          <div>
            {/* Header */}
            <Header />
            {/* Call area */}
            <CallArea
              name={call.name}
              totalSecInCall={totalSecInCall}
              setTotalSecInCall={setTotalSecInCall}
            />
            {/* Call actions */}
            {showActions && <CallActions endCall={endCall} />}
          </div>
          {/* Video streams */}
          <div>
            {/* User video */}
            {callAccepted && !callEnded && (
              <div>
                <video
                  ref={userVideo}
                  playsInline
                  muted
                  autoPlay
                  className={toggle ? "smallVideoCall" : "largeVideoCall"}
                  onClick={() => setToggle((prevState) => !prevState)}
                ></video>
              </div>
            )}
            {/* My video */}
            {stream && (
              <div>
                <video
                  ref={myVideo}
                  playsInline
                  muted
                  autoPlay
                  className={`${toggle ? "largeVideoCall" : "smallVideoCall"} ${
                    showActions ? "moveVideoCall" : ""
                  }`}
                  onClick={() => setToggle((prevState) => !prevState)}
                ></video>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Ringing */}
      {receivingCall && !callAccepted && (
        <Ringing
          call={call}
          setCall={setCall}
          endCall={endCall}
          answerCall={answerCall}
        />
      )}
      {/* Calling ringtone */}
      {!callAccepted && show && <audio src={ringing} autoPlay loop></audio>}
    </>
  );
};

export default Call;
