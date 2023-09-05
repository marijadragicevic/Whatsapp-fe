import { useEffect, useState } from "react";
import { CloseIcon, ValidIcon } from "../../../svg";
import ringtone from "../../../audio/ringtone.mp3";

const Ringing = ({ call, setCall, answerCall, endCall }) => {
  const { receivingCall, callEnded, name, picture } = call;

  const [timer, setTimer] = useState(0);
  let interval;

  const handlerTimer = () => {
    interval = setInterval(() => {
      setTimer((prevState) => prevState + 1);
    }, 1000);
  };

  useEffect(() => {
    if (timer <= 30) {
      handlerTimer();
    } else {
      setCall({ ...call, receivingCall: false });
    }

    return () => clearInterval(interval);
  }, [timer]);

  return (
    <div className="dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
        {/*Call infos*/}
        <div className="flex items-center gap-x-2">
          <img
            src={picture}
            alt={`caller profile picture`}
            className="w-28 h-28 rounded-full"
          />
          <div>
            <h1 className="dark:text-white">
              <b>{name}</b>
            </h1>
            <span className="dark:text-dark_text_2">WhatsApp video...</span>
          </div>
        </div>
        {/*  Call actions*/}
        <ul className="flex items-center gap-x-2">
          <li onClick={endCall}>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500"
              type="button"
            >
              <CloseIcon className="fill-white w-5" />
            </button>
          </li>
          <li onClick={answerCall}>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500"
              type="button"
            >
              <ValidIcon className="fill-white w-6 mt-2" />
            </button>
          </li>
        </ul>
      </div>
      {/* Ringtone */}
      <audio src={ringtone} autoPlay loop></audio>
    </div>
  );
};

export default Ringing;
