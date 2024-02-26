import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const { roomId } = useParams();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { auth } = useAuth();
    const socketInstance = useRef(io(`https://chat-1-vftl.onrender.com`));
    const messagesEndRef = useRef(null);

    const sendMessage = (e) => {
        e.preventDefault();
        const userId = auth.userId;
        const username = auth.username;
        socketInstance.current.emit("send message", { roomId, userId, message, username });
        setMessage('');
    };

    useEffect(() => {
        socketInstance.current.emit("join__room", { roomId });
        socketInstance.current.on("receive-message", (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });
    }, [roomId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div>
            <section className="msger">
                <header className="msger-header">
                    <div className="msger-header-title">
                        <i className="fas fa-comment-alt" /> SimpleChat
                    </div>
                    <div className="msger-header-options">
                        <span>
                            <i className="fas fa-cog" />
                        </span>
                    </div>
                </header>

                <main className="msger-chat">
                    {messages && messages.map((message, index) => (
                        <div key={index} className={message.userId === auth.userId ? "msg right-msg" : "msg left-msg"}>
                            <div className="msg-img" style={{}} />
                            <div className="msg-bubble">
                                {message.userId === auth.userId ?
                                    <div className="msg-info">
                                        <div className="msg-info-name">{auth.username}</div>
                                        <div className="msg-info-time">12:46</div>
                                    </div> : <div className="msg-info">
                                        <div className="msg-info-name">{message.username}</div>
                                        <div className="msg-info-time">12:46</div>
                                    </div>}
                                <div className="msg-text">{message.message}</div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </main>

                <form className="msger-inputarea">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="msger-input"
                        placeholder="Enter your message..."
                    />
                    <button
                        type="submit"
                        className="msger-send-btn"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </form>
            </section>
            <section className="room">
                <ul className="roomList">
                    <p>In rooms</p>
                    <li>List 1</li>
                    <li>List 2</li>
                </ul>
            </section>
            <section></section>
        </div>
    );
};

export default Home;
