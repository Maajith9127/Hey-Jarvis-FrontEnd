// import React from 'react'
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';
// import { useEffect } from 'react';
// import { addMessageToRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
// import { updateMessageFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
// import { updateToAddressFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
// import { deleteMessageFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';

// const Message = () => {
//     let dispatch = useDispatch()

//     let Messages = (useSelector(state => state.message.messages))

//     //Note: This useEffect is used to fetch messages from the server when the component mounts
//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const res = await fetch("http://localhost:3000/apiAccountability/GetMessages", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });
//                 const data = await res.json();
//                 console.log("Fetched messages", data.Messages);
//                 // Dispatch the fetched messages to Redux
//                 data.Messages.map((message) => {
//                     console.log("Messages", message)
//                     dispatch(addMessageToRedux(message))
//                 })
//             } catch (error) {
//                 console.error("Error fetching messages", error);
//             }
//         };
//         fetchMessages();
//     }, []);
//     const SaveMessages = async () => {
//         console.log("Messages to save", Messages);
//         try {
//             const res = await fetch("http://localhost:3000/apiAccountability/SaveMessages", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ Accountability: Messages }),
//             });
//             const data = await res.json();
//             console.log("Response from server", data);
//         } catch (error) {
//             console.error("Error saving messages", error);
//         }


//     }

//     const AddMessageToRedux = (e) => {
//         let newMessage = {
//             AccountabilityId: uuidv4(),
//             message: "Message",
//             ToAddress: "Email",
//             CollectionType: "MessageCollection",
//         }
//         dispatch(addMessageToRedux(newMessage))
//     }

//     const UpdateMessageFromRedux = (e) => {
//         let payload = {
//             AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
//             newValue: e.target.value,
//         }
//         dispatch(updateMessageFromRedux(payload))
//     }

//     const UpdateToAddressFromRedux = (e) => {
//         let payload = {
//             AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
//             newValue: e.target.value,
//         }
//         dispatch(updateToAddressFromRedux(payload))

//     }

//     const DeleteMessageFromRedux = (e) => {
//         let payload = {
//             AccountabilityIdToDelete: e.target.getAttribute("data-id"),
//         }
//         dispatch(deleteMessageFromRedux(payload))

//     }


//     return (
//         <div className="p-4 md:p-7 max-w-7xl mx-auto">
//             {/* Header buttons */}
//             <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 mb-6">
//                 <button
//                     onClick={AddMessageToRedux}
//                     className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition"
//                 >
//                     ➕ Add Message
//                 </button>
//                 <button
//                     onClick={SaveMessages}
//                     className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-md transition"
//                 >
//                     💾 Save
//                 </button>
//             </div>

//             {/* Message List */}
//             <div className="rounded-3xl overflow-y-auto h-[75vh] bg-white/60 backdrop-blur-lg shadow-lg p-4 space-y-6 border border-slate-200">
//                 {Messages.map((e) => (
//                     <div
//                         key={e.AccountabilityId}
//                         className="flex flex-col md:flex-row gap-4 md:items-center border border-slate-300 rounded-2xl shadow-sm bg-white p-4"
//                     >
//                         {/* Message Input */}
//                         <input
//                             data-id={e.AccountabilityId}
//                             onChange={UpdateMessageFromRedux}
//                             value={e.message}
//                             type="text"
//                             placeholder="📨 Message content..."
//                             className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
//                         />

//                         {/* To Address Input */}
//                         <input
//                             data-id={e.AccountabilityId}
//                             onChange={UpdateToAddressFromRedux}
//                             value={e.ToAddress}
//                             type="text"
//                             placeholder="✉️ To (Email, SMS, WhatsApp)"
//                             className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
//                         />

//                         {/* Delete Button */}
//                         <button
//                             data-id={e.AccountabilityId}
//                             onClick={DeleteMessageFromRedux}
//                             className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition w-full md:w-auto"
//                         >
//                             🗑️
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };
// export default Message

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import {
    addMessageToRedux,
    updateMessageFromRedux,
    updateToAddressFromRedux,
    deleteMessageFromRedux,
    clearMessageDeltas,
    RebuildAddedFromMessages
} from '../../../ReduxToolkit/Slices/MessageSlice.jsx';

const Message = () => {
    const dispatch = useDispatch();
    const Messages = useSelector((state) => state.message.messages);
    const { added, updated, deleted } = useSelector((state) => state.message);

    // ✅ Load messages from backend and populate redux
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:3000/apiAccountability/GetMessages");
                const data = await res.json();
                const DbMessages = data.Messages;

                console.log("Fetched messages", DbMessages);

                dispatch(clearMessageDeltas());

                DbMessages.forEach((msg) => {
                    dispatch(addMessageToRedux({ ...msg, fromDb: true }));
                });

                dispatch(RebuildAddedFromMessages());
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };

        fetchMessages();
    }, []);

    // ✅ Save delta
    const SaveMessages = async () => {
        try {
            const payload = { added, updated, deleted };
            console.log("Payload to save:", payload);

            const res = await fetch("http://localhost:3000/apiAccountability/SaveMessages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            console.log("✅ Server response:", data);

            dispatch(clearMessageDeltas());
        } catch (error) {
            console.error("Error saving messages", error);
        }
    };

    // 🧠 Message actions
    const AddMessageToRedux = () => {
        const newMessage = {
            AccountabilityId: uuidv4(),
            message: "Message",
            ToAddress: "Email",
            CollectionType: "MessageCollection",
        };
        dispatch(addMessageToRedux(newMessage));
    };

    const UpdateMessageFromRedux = (e) => {
        const payload = {
            AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
            newValue: e.target.value,
        };
        dispatch(updateMessageFromRedux(payload));
    };

    const UpdateToAddressFromRedux = (e) => {
        const payload = {
            AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
            newValue: e.target.value,
        };
        dispatch(updateToAddressFromRedux(payload));
    };

    const DeleteMessageFromRedux = (e) => {
        const payload = {
            AccountabilityIdToDelete: e.target.getAttribute("data-id"),
        };
        dispatch(deleteMessageFromRedux(payload));
    };

    return (
        <div className="p-4 md:p-7 max-w-7xl mx-auto">
            {/* Header buttons */}
            <div className="flex flex-col sm:flex-row justify-center sm:justify-between gap-4 mb-6">
                <button
                    onClick={AddMessageToRedux}
                    className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition"
                >
                    ➕ Add Message
                </button>
                <button
                    onClick={SaveMessages}
                    className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl shadow-md transition"
                >
                    💾 Save
                </button>
            </div>

            {/* Message List */}
            <div className="rounded-3xl overflow-y-auto h-[75vh] bg-white/60 backdrop-blur-lg shadow-lg p-4 space-y-6 border border-slate-200">
                {Messages.map((e) => (
                    <div
                        key={e.AccountabilityId}
                        className="flex flex-col md:flex-row gap-4 md:items-center border border-slate-300 rounded-2xl shadow-sm bg-white p-4"
                    >
                        <input
                            data-id={e.AccountabilityId}
                            onChange={UpdateMessageFromRedux}
                            value={e.message}
                            type="text"
                            placeholder="📨 Message content..."
                            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
                        />
                        <input
                            data-id={e.AccountabilityId}
                            onChange={UpdateToAddressFromRedux}
                            value={e.ToAddress}
                            type="text"
                            placeholder="✉️ To (Email, SMS, WhatsApp)"
                            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
                        />
                        <button
                            data-id={e.AccountabilityId}
                            onClick={DeleteMessageFromRedux}
                            className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition w-full md:w-auto"
                        >
                            🗑️
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Message;
