"use client";

import React, { useState } from "react";
import AllUsersData from "./usersData/usersData";
import { useSocket } from "../../context/SocketProvider";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { addUsersData } from "../redux/usersDataSlice";
import { useSelector } from "react-redux";
import allUsersData from "./usersData/usersData";

interface Message {
  text: string;
  reciver: string;
  timestamp: string;
  sender: string;
}

const Users = () => {
  const users = allUsersData;
  const dispatch = useDispatch();
  const usersMsg = useSelector((state) => state.messagesData.userData);
  const soketConnectedUsers = useSelector((state) => state.usersData.users);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { sendMessage, messages } = useSocket();
  const [message, setMessage] = useState("");
  const [uname, setUname] = useState("User Name");
  const soketName =
    soketConnectedUsers.length !== 0
      ? soketConnectedUsers[soketConnectedUsers.length - 1].name
      : "UUU";
  console.log("{{{", usersMsg);
  console.log("SoCK", soketConnectedUsers);
  console.log("TotalMessage", messages);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getCurrentTime = (): string => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
      hour12: true, // Set to true to use 12-hour clock with AM/PM
    };

    return now.toLocaleTimeString([], options);
  };

  // const getCurrentTime = (): string => {
  //   const now = new Date();
  //   const hours = now.getHours().toString().padStart(2, "0");
  //   const minutes = now.getMinutes().toString().padStart(2, "0");
  //   return `${hours}:${minutes}`;
  // };

  const handleSendMessage = () => {
    const currentTime = getCurrentTime();
    sendMessage({
      sender: soketName,
      text: message,
      reciver: uname,
      timestamp: currentTime,
    });

    console.log("MMM", messages);
    dispatch(
      addUsersData([
        {
          sender: soketConnectedUsers[soketConnectedUsers.length - 1].name,
          text: message,
          reciver: uname,
          timestamp: currentTime,
        },
      ])
    );
    setMessage(""); // Clear the input field after sending a message
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // const filteredMessages = usersMsg.filter((msg) => msg.Rname === uname);

  // const filteredMessagesN = messages.filter(
  //   (message) => message.sender === user || message.reciver === user
  // );

  const filteredMessages = messages.filter(
    (msg) => msg.sender === uname || msg.reciver === uname
  );
  return (
    <div className=" mainComp container" style={{ maxHeight: "100vh" }}>
      <div className=" d-flex ">
        <div
          className=" border-2 "
          style={{ flexBasis: "30%", position: "sticky", top: "0" }}
        >
          <div
            className="navbar p-3 d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            {/* <div className=" "> */}
            <div className="usersImg">
              {soketConnectedUsers.length == 0 ? (
                <div
                  style={{
                    height: "40px",
                    width: "40px",
                    backgroundColor: "navy",
                    borderRadius: "50%",
                  }}
                ></div>
              ) : (
                <img
                  className=" img"
                  src={`${
                    soketConnectedUsers[soketConnectedUsers.length - 1]
                      .userImage
                  }`}
                  style={{
                    height: "40px",
                    width: "40px",
                    backgroundColor: "navy",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <div className="usersName d-flex column-gap-4">
              <span data-icon="community-outline">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                  color=" #54656f"
                >
                  <title>community-outline</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.37092 18.6728C6.22765 18.5403 6.10431 18.3762 6.00888 18.1973C5.88011 17.9559 5.80217 17.6876 5.79472 17.4335C5.77992 16.9291 5.75694 15.9341 5.81691 15.4918C5.84367 15.2944 5.89021 15.111 5.95079 14.9421C6.02312 14.7405 6.11792 14.5597 6.22835 14.3977C6.44698 14.077 6.72688 13.8296 7.01486 13.6386C7.04895 13.616 7.08314 13.5941 7.11736 13.5731C7.57933 13.2888 8.09602 13.1117 8.52831 12.9865C8.90306 12.878 9.34961 12.7693 9.85702 12.6823C10.485 12.5746 11.2062 12.5001 12 12.5001C12.7937 12.5001 13.5149 12.5746 14.1429 12.6823C14.6503 12.7693 15.0969 12.878 15.4716 12.9865C15.9039 13.1117 16.4206 13.2888 16.8826 13.5731C16.9168 13.5941 16.951 13.616 16.9851 13.6386C17.2731 13.8296 17.553 14.077 17.7716 14.3977C17.882 14.5597 17.9768 14.7405 18.0492 14.9421C18.1097 15.111 18.1563 15.2944 18.183 15.4918C18.243 15.9341 18.22 16.9291 18.2052 17.4335C18.1978 17.6876 18.1198 17.9559 17.9911 18.1973C17.8956 18.3762 17.7723 18.5403 17.629 18.6729C17.4138 18.872 17.1536 19 16.8756 19H7.12434C6.84632 19 6.58614 18.872 6.37092 18.6728ZM19.9606 15.4041C20.0099 15.9938 20.0031 16.2628 19.992 17C19.9887 17.22 19.985 17.3926 19.9822 17.4856C19.9692 17.9298 19.8643 18.6252 19.6869 19H22.6608C23.3769 19 23.9744 17.1535 23.9908 16.4244C24 16.0153 24.0117 16.2932 23.9736 15.9559C23.8921 15.2339 23.4788 14.7098 23.0245 14.3596C22.5875 14.0227 22.0691 13.8088 21.6087 13.6766C21.6029 13.675 21.5972 13.6733 21.5915 13.6717C21.5881 13.6707 21.5847 13.6698 21.5813 13.6688C21.5228 13.6524 21.4627 13.6362 21.401 13.6205C20.8883 13.49 20.2632 13.389 19.5555 13.389C19.5378 13.389 19.52 13.3891 19.5023 13.3892C19.4137 13.3898 19.3264 13.392 19.2405 13.3957C19.355 13.5637 19.4612 13.7454 19.5555 13.942C19.5647 13.9611 19.5738 13.9805 19.5828 13.9999C19.6332 14.1094 19.68 14.2234 19.7226 14.342C19.8237 14.6239 19.9007 14.9282 19.9447 15.253C19.9506 15.2963 19.9559 15.347 19.9606 15.4041ZM17.9339 11.4492C18.2894 11.7225 18.7156 11.9081 19.1802 11.9737C19.3028 11.991 19.4281 12 19.5555 12C20.1263 12 20.6553 11.8201 21.089 11.5141C21.7744 11.0305 22.2222 10.2319 22.2222 9.33C22.2222 7.85724 21.0283 6.67 19.5555 6.67C18.7591 6.67 18.0441 7.01722 17.5555 7.56905C17.1406 8.03762 16.8889 8.65371 16.8889 9.33C16.8889 9.57007 16.9206 9.80282 16.9801 10.0243C17.1343 10.5986 17.4753 11.0968 17.9339 11.4492ZM14.8977 9.61901C14.9641 9.52593 15.0262 9.42949 15.0835 9.33C15.3838 8.80927 15.5555 8.20499 15.5555 7.56C15.5555 7.36964 15.5406 7.18272 15.5117 7.00038C15.2434 5.30182 13.7733 4 12 4C10.2267 4 8.75657 5.30182 8.4882 7.00038C8.45939 7.18272 8.44443 7.36964 8.44443 7.56C8.44443 8.20499 8.61617 8.80927 8.91642 9.33C8.97378 9.42949 9.03584 9.52593 9.10229 9.61901C9.38894 10.0206 9.75728 10.3599 10.1831 10.6129C10.7148 10.9287 11.3362 11.11 12 11.11C12.6638 11.11 13.2851 10.9287 13.8168 10.6129C14.2427 10.3599 14.611 10.0206 14.8977 9.61901ZM7.01988 10.0243C7.07937 9.80282 7.1111 9.57007 7.1111 9.33C7.1111 8.65371 6.85934 8.03762 6.44443 7.56905C5.95581 7.01722 5.2409 6.67 4.44444 6.67C2.97168 6.67 1.77777 7.85724 1.77777 9.33C1.77777 10.2319 2.22555 11.0305 2.91093 11.5141C3.34469 11.8201 3.87362 12 4.44444 12C4.5718 12 4.6971 11.991 4.8197 11.9737C5.28435 11.9081 5.71054 11.7225 6.06606 11.4492C6.52463 11.0967 6.86561 10.5985 7.01988 10.0243ZM2.599 13.6205C2.53726 13.6362 2.47715 13.6524 2.41872 13.6688C2.41531 13.6698 2.41189 13.6707 2.40848 13.6717C2.40276 13.6733 2.39702 13.675 2.39128 13.6766C1.9309 13.8088 1.41245 14.0227 0.975466 14.3596C0.521192 14.7098 0.107939 15.2339 0.0263682 15.9559C-0.0117388 16.2932 2.95136e-05 17.0153 0.00922726 17.4244C0.0256195 18.1535 0.623061 19 1.33916 19H4.31303C4.13562 18.6252 4.03074 17.9298 4.01771 17.4856C4.01498 17.3926 4.01127 17.22 4.00795 17C3.99682 16.2628 3.99008 15.9938 4.03932 15.4041C4.04409 15.347 4.04938 15.2963 4.05525 15.253C4.09928 14.9282 4.17628 14.6239 4.27738 14.342C4.31992 14.2234 4.36671 14.1094 4.41718 13.9999C4.42615 13.9805 4.43524 13.9612 4.44444 13.942C4.53872 13.7454 4.64492 13.5636 4.7595 13.3957C4.67357 13.392 4.58626 13.3898 4.49762 13.3892C4.47995 13.3891 4.46224 13.389 4.44446 13.389C3.73676 13.389 3.11171 13.49 2.599 13.6205ZM12 14.5001C10.7893 14.5001 9.78078 14.706 9.08457 14.9076C8.70827 15.0166 8.39668 15.1342 8.16548 15.2764C7.94245 15.4137 7.86482 15.5296 7.83338 15.6173C7.81839 15.6591 7.80612 15.7064 7.79878 15.7605C7.79943 15.7557 7.7992 15.7596 7.7984 15.7735C7.79628 15.8102 7.79017 15.9159 7.78551 16.1142C7.77998 16.3491 7.77773 16.6382 7.77778 16.9391C7.77784 17.3256 7.78168 16.7121 7.78618 17H16.2138C16.2183 16.7121 16.2221 17.3256 16.2222 16.9391C16.2222 16.6383 16.22 16.3491 16.2144 16.1142C16.2098 15.9159 16.2037 15.8101 16.2016 15.7735C16.2007 15.7596 16.2005 15.7557 16.2012 15.7605C16.1938 15.7064 16.1816 15.6591 16.1666 15.6173C16.1351 15.5296 16.0575 15.4137 15.8345 15.2764C15.6033 15.1342 15.2917 15.0166 14.9154 14.9076C14.2192 14.706 13.2107 14.5001 12 14.5001ZM12 6C11.1441 6 10.4444 6.69763 10.4444 7.56C10.4444 8.41504 11.1368 9.11 12 9.11C12.8632 9.11 13.5555 8.41504 13.5555 7.56C13.5555 6.69763 12.8558 6 12 6Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span data-icon="status-unread-outline">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                  color=" #54656f"
                >
                  <title>status-unread-outline</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.71672 8.34119C3.23926 8.06362 3.07722 7.45154 3.35479 6.97407C4.33646 5.28548 5.79114 3.92134 7.53925 3.05006C9.28736 2.17878 11.2524 1.83851 13.1916 2.07126C13.74 2.13707 14.1312 2.63494 14.0654 3.18329C13.9995 3.73164 13.5017 4.12282 12.9533 4.05701C11.4019 3.87081 9.82989 4.14303 8.43141 4.84005C7.03292 5.53708 5.86917 6.62839 5.08384 7.97926C4.80626 8.45672 4.19419 8.61876 3.71672 8.34119Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.8569 10.115C21.4065 10.0604 21.8963 10.4616 21.9509 11.0112C22.144 12.9548 21.7638 14.9125 20.857 16.6424C19.9503 18.3724 18.5567 19.799 16.8485 20.746C16.3655 21.0138 15.7568 20.8393 15.489 20.3563C15.2213 19.8732 15.3957 19.2646 15.8788 18.9968C17.2454 18.2392 18.3602 17.0979 19.0856 15.714C19.811 14.33 20.1152 12.7639 19.9607 11.209C19.9061 10.6594 20.3073 10.1696 20.8569 10.115Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M6.34315 17.6568C7.89977 19.2135 9.93829 19.9945 11.9785 20C12.4928 20.0013 12.9654 20.3306 13.0791 20.8322C13.2105 21.4123 12.8147 21.9846 12.22 21.9976C9.58797 22.0552 6.93751 21.0796 4.92893 19.0711C2.90126 17.0434 1.92639 14.3616 2.00433 11.7049C2.02177 11.1104 2.59704 10.7188 3.17612 10.8546C3.67682 10.9721 4.00256 11.4471 4.00009 11.9614C3.99021 14.0216 4.77123 16.0849 6.34315 17.6568Z"
                    fill="currentColor"
                  ></path>
                  <circle cx="19.95" cy="4.05005" r="3" fill="#009588"></circle>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span data-icon="newsletter-unread-outline">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                  color=" #54656f"
                >
                  <title>newsletter-unread-outline</title>
                  <path
                    d="M19 7.5C19.8 7.5 20.56 7.18 21.12 6.62C21.68 6.06 22 5.29 22 4.5C22 3.71 21.68 2.94 21.12 2.38C20.56 1.82 19.79 1.5 19 1.5C18.21 1.5 17.44 1.82 16.88 2.38C16.32 2.94 16 3.71 16 4.5C16 5.29 16.32 6.06 16.88 6.62C17.44 7.18 18.21 7.5 19 7.5Z"
                    fill="#009588"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 4C7.58172 4 4 7.58172 4 12C4 12.5523 3.55228 13 3 13C2.44772 13 2 12.5523 2 12C2 6.47715 6.47715 2 12 2C12.3748 2 12.7451 2.02066 13.1099 2.06098C13.6588 2.12167 14.0546 2.61586 13.9939 3.1648C13.9333 3.71374 13.4391 4.10956 12.8901 4.04887C12.5982 4.0166 12.3012 4 12 4ZM20.8352 10.0061C21.3841 9.94537 21.8783 10.3412 21.939 10.8901C21.9793 11.2549 22 11.6252 22 12C22 17.5228 17.5228 22 12 22C11.4477 22 11 21.5523 11 21C11 20.4477 11.4477 20 12 20C16.4183 20 20 16.4183 20 12C20 11.6988 19.9834 11.4018 19.9511 11.1099C19.8904 10.5609 20.2863 10.0667 20.8352 10.0061Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 13.7 2.43 15.3 3.18 16.7C2.63 18.54 2 20.69 2 21C2 21.55 2.45 22 3 22C3.31 22 5.46 21.37 7.3 20.82C8.7 21.57 10.3 22 12 22C17.52 22 22 17.52 22 12H20C20 16.4154 16.4154 20 12 20C10.6412 20 9.36447 19.6571 8.24444 19.057L7.51743 18.6676L6.72722 18.9038C5.95126 19.1357 5.12931 19.3791 4.41748 19.5825C4.62086 18.8707 4.86428 18.0487 5.09622 17.2728L5.33243 16.4826L4.94296 15.7556C4.34295 14.6355 4 13.3588 4 12C4 7.58457 7.58457 4 12 4V2Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M15.8301 8.63404C16.3081 8.35745 16.9198 8.52076 17.1964 8.9988C17.7077 9.88244 18 10.9086 18 12C18 13.0914 17.7077 14.1176 17.1964 15.0012C16.9198 15.4792 16.3081 15.6425 15.8301 15.366C15.352 15.0894 15.1887 14.4776 15.4653 13.9996C15.8052 13.4122 16 12.7304 16 12C16 11.2696 15.8052 10.5878 15.4653 10.0004C15.1887 9.52237 15.352 8.91063 15.8301 8.63404Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.16995 8.63404C8.64798 8.91063 8.81129 9.52237 8.5347 10.0004C8.19484 10.5878 8 11.2696 8 12C8 12.7304 8.19484 13.4122 8.5347 13.9996C8.81129 14.4776 8.64798 15.0894 8.16995 15.366C7.69191 15.6425 7.08017 15.4792 6.80358 15.0012C6.29231 14.1176 6 13.0914 6 12C6 10.9086 6.29231 9.88244 6.80358 8.9988C7.08017 8.52076 7.69191 8.35745 8.16995 8.63404Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span data-icon="new-chat-outline">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  fill="none"
                  color=" #54656f"
                >
                  <title>new-chat-outline</title>
                  <path
                    d="M9.53277 12.9911H11.5086V14.9671C11.5086 15.3999 11.7634 15.8175 12.1762 15.9488C12.8608 16.1661 13.4909 15.6613 13.4909 15.009V12.9911H15.4672C15.9005 12.9911 16.3181 12.7358 16.449 12.3226C16.6659 11.6381 16.1606 11.0089 15.5086 11.0089H13.4909V9.03332C13.4909 8.60007 13.2361 8.18252 12.8233 8.05119C12.1391 7.83391 11.5086 8.33872 11.5086 8.991V11.0089H9.49088C8.83941 11.0089 8.33411 11.6381 8.55097 12.3226C8.68144 12.7358 9.09947 12.9911 9.53277 12.9911Z"
                    fill="currentColor"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.944298 5.52617L2.99998 8.84848V17.3333C2.99998 18.8061 4.19389 20 5.66665 20H19.3333C20.8061 20 22 18.8061 22 17.3333V6.66667C22 5.19391 20.8061 4 19.3333 4H1.79468C1.01126 4 0.532088 4.85997 0.944298 5.52617ZM4.99998 8.27977V17.3333C4.99998 17.7015 5.29845 18 5.66665 18H19.3333C19.7015 18 20 17.7015 20 17.3333V6.66667C20 6.29848 19.7015 6 19.3333 6H3.58937L4.99998 8.27977Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span data-icon="menu">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                  color=" #54656f"
                >
                  <title>menu</title>
                  <path
                    fill="currentColor"
                    d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"
                  ></path>
                </svg>
              </span>
            </div>
            {/* </div> */}
          </div>
          <div
            className=" border navbarSearch  d-flex justify-content-between align-items-center ps-2 pe-2"
            style={{ height: "50px" }}
          >
            <div
              className="inputSec "
              style={{ backgroundColor: "#f0f2f5", borderRadius: "10px" }}
            >
              <span data-icon="search" className=" ms-2">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                  color="#8696a0"
                >
                  <title>search</title>
                  <path
                    fill="currentColor"
                    d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"
                  ></path>
                </svg>
              </span>
              <input
                type="text"
                name=""
                id=""
                className=" p-1"
                style={{
                  border: "none",
                  backgroundColor: "#f0f2f5",
                  outline: "none",
                  borderRadius: "10px",
                }}
                placeholder="Search or start new chat"
              />
            </div>
            <div className="groupBtn">
              <span data-icon="filter">
                <svg
                  color="#8696a0"
                  viewBox="0 0 24 24"
                  height="20"
                  width="20"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                >
                  <title>filter</title>
                  <path
                    fill="currentColor"
                    d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"
                  ></path>
                </svg>
              </span>
            </div>
          </div>
          <div
            className="usersList overflow-auto"
            style={{
              maxHeight: "80vh",
              overflowY: "auto",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {users.map((user, index) => (
              <div
                key={index}
                className="border usersDetails d-flex justify-content-lg-between align-items-center  p-2"
                onClick={() => setUname(user.name)}
              >
                <div className=" d-flex column-gap-3">
                  <div className="usersImg">
                    <div
                      className=" img"
                      style={{
                        height: "49px",
                        width: "49px",
                        backgroundColor: "black",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div className="usersName">
                    <h4
                      className=" mt-1"
                      style={{ fontSize: "18px", fontFamily: "inherit" }}
                    >
                      {" "}
                      {user.name}
                    </h4>
                    {/* <div>
                      {uname !== "" &&
                        filteredMessages.map(
                          (msg, index) =>
                            (msg.sender === uname || msg.reciver === uname) && (
                              <p
                                key={index}
                                style={{ fontSize: "12px", opacity: "0.9" }}
                              >
                                {msg.text}
                              </p>
                            )
                        )}
                    </div> */}
                    <p  style={{ fontSize: "12px", opacity: "0.9" }}>Join the React project</p>
                  </div>
                </div>
                <div
                  className=" timing mb-2"
                  style={{ fontSize: "13px", opacity: "0.6" }}
                >
                  today
                </div>
              </div>
            ))}
          </div>
        </div>
        <div
          className=" border-2"
          style={{
            flexBasis: "70%",
          }}
        >
          <div
            className="chatNav border"
            style={{
              height: "72px",
              backgroundColor: "#f0f2f5",
            }}
          >
            <div className=" d-flex column-gap-3 align-items-center ps-4 pt-2">
              <div className="usersImg">
                <div
                  className=" img"
                  style={{
                    height: "49px",
                    width: "49px",
                    backgroundColor: "black",
                    borderRadius: "50%",
                  }}
                ></div>
              </div>
              <div className="usersName">
                <h4
                  className=" mt-1"
                  style={{ fontSize: "18px", fontFamily: "inherit" }}
                >
                  {" "}
                  {uname}
                </h4>
              </div>
            </div>
          </div>
          <div
            className="chatArea chatContainer border"
            ref={chatContainerRef}
            style={{
              backgroundColor: "white",
              height: "76vh",
              overflowY: "scroll",
              paddingBottom: "10px",
            }}
          >
            {" "}
            {filteredMessages.map((msg, index) => (
              <div
                key={index}
                className={`${
                  msg.sender === uname
                    ? "justify-content-start"
                    : "justify-content-end"
                } overflow-auto d-flex`}
                style={{ width: "100%", verticalAlign: "initial" }}
              >
                <div
                  style={{
                    padding: "6px 25px 6px 10px",
                    backgroundColor:
                      msg.sender === uname ?  "#f2f2f2" : "#4ada80" ,
                    margin: "5px",
                    borderRadius:
                      msg.sender === uname ? "0 5px 5px 5px" : "5px 0 5px 5px",
                    maxWidth: "60%",
                    textAlign: "left",
                    position: "relative",
                  }}
                >
                  <p style={{ marginRight: "30px" }} className="mb-0">
                    {msg.text}
                  </p>
                  <span
                    style={{
                      position: "absolute",
                      marginLeft: "10px",
                      bottom: "3px",
                      right: "6px",
                      fontSize: "10px",
                      opacity: "0.8",
                    }}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div
            className="chatbar border d-flex align-items-center justify-content-evenly"
            style={{
              // flexBasis: "70%",
              height: "72px",
              backgroundColor: "#f0f2f5",
              borderTop: "none",
            }}
          >
            <div className="imogies">
              <span data-icon="smiley" className="">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  className="ekdr8vow dhq51u3o"
                  version="1.1"
                  x="0px"
                  y="0px"
                  enableBackground="new 0 0 24 24"
                  color=" #54656f"
                >
                  <title>smiley</title>
                  <path
                    fill="currentColor"
                    d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679 S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551 c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959 c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217 s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354 c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z  M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="attachfile">
              <span data-icon="attach-menu-plus" className="">
                <svg
                  viewBox="0 0 24 24"
                  height="24"
                  width="24"
                  preserveAspectRatio="xMidYMid meet"
                  className=""
                  fill="none"
                  color=" #54656f"
                >
                  <title>attach-menu-plus</title>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M20.5 13.2501L20.5 10.7501L13.25 10.7501L13.25 3.5L10.75 3.5L10.75 10.7501L3.5 10.7501L3.5 13.2501L10.75 13.2501L10.75 20.5L13.25 20.5L13.25 13.2501L20.5 13.2501Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
            </div>
            <div className="input" style={{ width: "78%" }}>
              <input
                type="text"
                name=""
                id=""
                onKeyDown={handleKeyDown}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                style={{
                  border: "none",
                  outline: "none",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  width: "100%",
                }}
                value={message}
              />
            </div>
            <div className="sent">
              <button
                type="submit"
                style={{ border: "none" }}
                onClick={handleSendMessage}
              >
                <span data-icon="send" className="">
                  <svg
                    viewBox="0 0 24 24"
                    height="24"
                    width="24"
                    preserveAspectRatio="xMidYMid meet"
                    className=""
                    version="1.1"
                    x="0px"
                    y="0px"
                    enableBackground="new 0 0 24 24"
                    color=" #54656f"
                  >
                    <title>send</title>
                    <path
                      fill="currentColor"
                      d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="" style={{ flexBasis:'30%'}}></div> */}
      </div>
    </div>
  );
};

export default Users;
