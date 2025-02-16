import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { receiveMessage, setOnlineUsers } from "../Redux/chatSlice";
import { logout } from "../Redux/authenticationSlice"; // Import logout action
import socket from "../utils/socketClient";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, onlineUsers } = useSelector((state) => state.chat);
  const username = useSelector((state) => state.authentication?.username || "Guest");
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (username) {
      socket.emit("join", username);
    }

    socket.on("receiveMessage", (message) => {
      dispatch(receiveMessage(message));
    });

    socket.on("onlineUsers", (users) => {
      dispatch(setOnlineUsers(users));
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
    };
  }, [dispatch, username]);

  const handleSend = () => {
    if (message.trim() && username) {
      const messageData = {
        sender: username,
        text: message,
        timestamp: new Date(),
        recipient: selectedUser,
      };
      socket.emit("sendMessage", messageData);
      setMessage("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove from storage
    dispatch(logout()); // Clear username from Redux
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-white shadow-md flex flex-col">
        <div className="p-4 font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-t-xl">
          Chats
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {onlineUsers.length === 0 ? (
            <div className="text-gray-500 text-center">No users online</div>
          ) : (
            onlineUsers.map((user, index) => (
              <div
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedUser === user ? "bg-green-100" : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedUser(user)}
              >
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-blue-400 flex items-center justify-center text-white font-semibold shadow-md">
                    {user.charAt(0)}
                  </div>
                  <div className="h-3 w-3 rounded-full bg-blue-500 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
                </div>
                <span className="text-gray-700 font-medium">
                  {user === username ? `${user} (You)` : user}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col h-full">
        <div className="p-4 bg-gradient-to-r from-blue-500 to-green-700 text-white font-bold text-lg flex justify-between shadow-md">
          <span>Chat Room</span>
          <div className="flex gap-4">
            {/* Username Button (Not Clickable) */}
            <button className="bg-blue-700 px-4 py-1 text-white rounded-md cursor-default">
              {username}
            </button>

            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="bg-blue-500 px-4 py-1 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages
            .filter(
              (msg) =>
                !msg.recipient || msg.recipient === username || msg.sender === username
            )
            .map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === username ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs p-4 rounded-lg shadow-md transition-all duration-300 ${
                    msg.sender === username
                      ? "bg-blue-500 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.sender !== username && (
                    <div className="text-xs font-semibold text-gray-600">
                      {msg.sender}
                    </div>
                  )}
                  <div className="text-sm">{msg.text}</div>
                  <div className="text-xs text-gray-400 text-right mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="p-4 bg-white flex items-center border-t">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
          <button
            onClick={handleSend}
            className="ml-3 bg-blue-500 text-white px-5 py-2 rounded-full hover:bg-green-600 shadow-md transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
