import InputBox from "../../components/sidebar/InputBox.jsx";
import { Send } from "lucide-react";
import useSendMessage from "../../hooks/useSendMessage.js";

const colorClasses = {
  primary: "primary",
  secondary: "secondary",
};

const MessageSend = ({
  messageText,
  setMessageText,
  handleMessageChange,
  color = "primary",
}) => {
  const inputClass = colorClasses[color] || colorClasses.primary;
  const { loading, sendMessage } = useSendMessage();

  return (
    <form
      className="flex justify-between gap-2 p-4 border-t border-base-300"
      onSubmit={async (e) => {
        e.preventDefault();
        await sendMessage(messageText);
        setMessageText("");
      }}
    >
      <div className="flex-grow">
        <InputBox
          type="text"
          placeholder="Type a message..."
          name="message"
          value={messageText}
          onChange={handleMessageChange}
          inputColor={inputClass}
        />
      </div>
      <button
        className={`btn btn-circle btn-${inputClass} pr-[2px]`}
        type="submit"
        disabled={loading}
      >
        {loading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          <Send size={20} />
        )}
      </button>
    </form>
  );
};

export default MessageSend;
