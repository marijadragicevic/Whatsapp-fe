import moment from "moment";
import { TriangleIcon } from "../../../svg";

const Message = ({ message, me }) => {
  return (
    <div
      className={`w-full flex mt-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* Container */}
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded-lg ${
            me ? "bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* Message */}
          <p className="float-left h-fit text-sm pb-5 pr-8">
            {message?.message}
          </p>
          {/* Message date */}
          <span className=" absolute right-1.5 bottom-1.5 text-xs pt-6 text-dark_text_5">
            {moment(message.createdAt).format("HH:MM")}
          </span>
          {/*Triangle */}
          {!me && (
            <span>
              <TriangleIcon className="dark:fill-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
