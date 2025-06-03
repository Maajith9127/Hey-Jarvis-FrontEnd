import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { addMessageToRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
import { updateMessageFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
import { updateToAddressFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';
import { deleteMessageFromRedux } from '../../../ReduxToolkit/Slices/MessageSlice.jsx';

const Message = () => {
    let dispatch = useDispatch()

    let Messages = (useSelector(state => state.message.messages))

    //Note: This useEffect is used to fetch messages from the server when the component mounts
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("http://localhost:3000/apiAccountability/GetMessages", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                console.log("Fetched messages", data.Messages);
                // Dispatch the fetched messages to Redux
                data.Messages.map((message) => {
                    console.log("Messages", message)
                    dispatch(addMessageToRedux(message))
                })
            } catch (error) {
                console.error("Error fetching messages", error);
            }
        };
        fetchMessages();
    }, []);
    const SaveMessages = async () => {
        console.log("Messages to save", Messages);
        try {
            const res = await fetch("http://localhost:3000/apiAccountability/SaveMessages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Accountability: Messages }),
            });
            const data = await res.json();
            console.log("Response from server", data);
        } catch (error) {
            console.error("Error saving messages", error);
        }


    }

    const AddMessageToRedux = (e) => {
        let newMessage = {
            AccountabilityId: uuidv4(),
            message: "Message",
            ToAddress: "Email",
            CollectionType: "MessageCollection",
        }
        dispatch(addMessageToRedux(newMessage))
    }

    const UpdateMessageFromRedux = (e) => {
        let payload = {
            AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
            newValue: e.target.value,
        }
        dispatch(updateMessageFromRedux(payload))
    }

    const UpdateToAddressFromRedux = (e) => {
        let payload = {
            AccountabilityIdToUpdate: e.target.getAttribute("data-id"),
            newValue: e.target.value,
        }
        dispatch(updateToAddressFromRedux(payload))

    }

    const DeleteMessageFromRedux = (e) => {
        let payload = {
            AccountabilityIdToDelete: e.target.getAttribute("data-id"),
        }
        dispatch(deleteMessageFromRedux(payload))

    }


    return (
        <div className='borde p-7'>
            <div className='flex border justify-center gap-4 mb-3'>
                <button onClick={AddMessageToRedux} className='border w-[50%] py-5 px-5  rounded-2xl'>Add Message</button>
                <button onClick={SaveMessages} className='border py-5 px-5 rounded-2xl' type='submit '>Save</button>
            </div>
            <div className='border overflow-y-scroll rounded-4xl h-[80vh]'>
                {Messages.map((e) => {
                    return (
                        <>
                            <div className=' flex justify-center gap-10 p-6 ' data >
                                <div className='border rounded-2xl py-10 w-[50%]'>
                                    <input data-id={`${e.AccountabilityId}`} onChange={UpdateMessageFromRedux} value={e.message} type="text" placeholder='Message' />
                                </div>
                                <div className='border rounded-2xl py-10 w-[50%]'>
                                    <input data-id={`${e.AccountabilityId}`} onChange={UpdateToAddressFromRedux} value={e.ToAddress} type="text" />
                                </div>
                                <button data-id={`${e.AccountabilityId}`} onClick={DeleteMessageFromRedux} className='w-[20%] border rounded-2xl'>
                                    Delete
                                </button>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    );
};
export default Message