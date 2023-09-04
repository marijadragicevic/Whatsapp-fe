import CallArea from "./CallArea";
import Header from "./Header";
import Ringing from "./Ringing";

const Call = ({ call, setCall, callAccepted }) => {
  const { receivingCall, callEnded } = call;

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}
    >
      {/* Container */}
      <div>
        <div>
          {/* Header */}
          <Header />
          {/* Call area */}
          <CallArea name="Name" />
        </div>
      </div>
      {/* Ringing */}
      {receivingCall && !callAccepted && (
        <Ringing call={call} setCall={setCall} />
      )}
    </div>
  );
};

export default Call;
