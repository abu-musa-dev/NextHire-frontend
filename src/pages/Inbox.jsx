import React, { useEffect, useState } from "react";

const Inbox = () => {
  const [messages, setMessages] = useState([]);

  // Dummy data for testing (can be replaced with real API)
  useEffect(() => {
    const dummyMessages = [
      {
        id: 1,
        sender: "JobSeeker001",
        subject: "Application for Web Developer",
        content: "Hello, I'm very interested in the position. Please review my resume.",
        date: "2025-05-08",
      },
      {
        id: 2,
        sender: "JobSeeker002",
        subject: "Inquiry about the Data Analyst role",
        content: "Is this role remote-friendly?",
        date: "2025-05-07",
      },
      {
        id: 3,
        sender: "JobSeeker003",
        subject: "Follow-up on my application",
        content: "Just checking if my application was received. Thanks!",
        date: "2025-05-06",
      },
    ];

    setMessages(dummyMessages);
  }, []);

  return (
    <div className="p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📥 Inbox</h2>
      {messages.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {messages.map((msg) => (
            <li key={msg.id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{msg.subject}</h3>
                  <p className="text-sm text-gray-600">From: {msg.sender}</p>
                  <p className="mt-1 text-sm text-gray-700">{msg.content}</p>
                </div>
                <span className="text-sm text-gray-500">{msg.date}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Inbox;
