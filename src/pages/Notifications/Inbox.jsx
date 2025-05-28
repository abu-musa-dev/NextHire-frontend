import React, { useEffect, useState } from "react";
import { useDarkMode } from "../../context/DarkModeContext";

const Inbox = () => {
  const { darkMode } = useDarkMode();  // এখানে isDarkMode না, darkMode নিতে হবে
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const dummyMessages = [
      { id: 1, sender: "JobSeeker001", subject: "Application for Web Developer", content: "Hello, I'm very interested in the position. Please review my resume.", date: "2025-05-08" },
      { id: 2, sender: "JobSeeker002", subject: "Inquiry about the Data Analyst role", content: "Is this role remote-friendly?", date: "2025-05-07" },
      { id: 3, sender: "JobSeeker003", subject: "Follow-up on my application", content: "Just checking if my application was received. Thanks!", date: "2025-05-06" },
    ];
    setMessages(dummyMessages);
  }, []);

  const bgClass = darkMode ? "bg-gray-900" : "bg-white";
  const textClass = darkMode ? "text-gray-200" : "text-gray-900";
  const cardBgClass = darkMode ? "bg-gray-800" : "bg-white";
  const divideClass = darkMode ? "divide-gray-700" : "divide-gray-200";
  const subjectTextClass = darkMode ? "text-gray-100" : "text-gray-900";
  const senderTextClass = darkMode ? "text-gray-400" : "text-gray-600";
  const contentTextClass = darkMode ? "text-gray-300" : "text-gray-700";
  const dateTextClass = darkMode ? "text-gray-500" : "text-gray-500";
  const noMessageTextClass = darkMode ? "text-gray-400" : "text-gray-600";

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${bgClass} ${textClass}`}>
      <div className={`max-w-4xl mx-auto rounded-xl shadow-md p-6 ${cardBgClass}`}>
        <h2 className="text-2xl font-bold mb-4">📥 Inbox</h2>
        {messages.length === 0 ? (
          <p className={noMessageTextClass}>No messages yet.</p>
        ) : (
          <ul className={`divide-y transition-colors duration-300 ${divideClass}`}>
            {messages.map((msg) => (
              <li key={msg.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-lg font-semibold ${subjectTextClass}`}>
                      {msg.subject}
                    </h3>
                    <p className={`text-sm ${senderTextClass}`}>
                      From: {msg.sender}
                    </p>
                    <p className={`mt-1 text-sm ${contentTextClass}`}>
                      {msg.content}
                    </p>
                  </div>
                  <span className={`text-sm ${dateTextClass}`}>
                    {msg.date}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Inbox;
