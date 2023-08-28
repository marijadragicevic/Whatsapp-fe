import { useDispatch, useSelector } from "react-redux";
import { openOrCreateConversation } from "../../../features/ChatSlice";

const Contact = ({ contact }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const values = {
    receiverId: contact?._id,
    token: user?.token,
  };

  const openConversation = () => {
    dispatch(openOrCreateConversation(values));
  };

  return (
    <li
      onClick={openConversation}
      className="list-none h-[72px] w-full dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 transition ease-in duration-200 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* Container */}
      <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* Left */}
        <div className="flex items-center gap-x-3">
          {/* Contact user picture */}
          <div className="relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact?.picture}
              alt={contact?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Contact name and message */}
          <div className="w-full flex flex-col">
            {/* Contact name */}
            <h1 className="font-bold flex items-center gap-x-2">
              {contact?.name}
            </h1>
            {/* Contact message */}
            <div>
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>
                    {contact?.status?.length > 25
                      ? `${contact.status.substring(0, 25)}...`
                      : contact.status}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Border */}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
};

export default Contact;
