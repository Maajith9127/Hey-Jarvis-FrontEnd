import React from 'react';
import { useSelector } from 'react-redux';
import { setChallengeData } from '../../../../ReduxToolkit/Slices/ChallengeSlice';
import { useDispatch } from 'react-redux';
import Webcam from 'react-webcam';
import { useRef } from "react";
import { useEffect } from 'react';
import { useState } from 'react';
import AccountabilitiesToVerify from './AccountabilitiesToVerify';
import { ChallengeTimer } from './HelperFunctions/TimeFormatter';

const Challenge = () => {

    const [UploadedImageId, setUploadedImageId] = useState(null)
    const [selectedAccId, setSelectedAccId] = useState(null);
    const [Challenge, setChallenge] = useState(null)
    const [timer, setTimer] = useState(0); // countdown timer
    const [timerRunning, setTimerRunning] = useState(false); // is timer active

    //Uploaded Images URL
    //

    const webcamRef = useRef(null);
    const ChallengeData = useSelector((state) => state.challenge.data);

    const Open = useSelector((state) => state.challenge.open);

    const CapturePhoto = async () => {
        console.log("accId", selectedAccId);
        const imageSrc = webcamRef.current.getScreenshot(); // base64 string

        const payload = {
            image: imageSrc, // directly sending base64
            TodoId: ChallengeData?.Todoid,
            SpecificEventId: ChallengeData?.SpecificEventid,
            collection: ChallengeData?.CollectionToCeck,
            Accountabilitiy: selectedAccId, // use the selected accountability ID
            ChallengeText: Challenge
        };
        await fetch("http://localhost:3000/apiLivePhotoVerfication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        console.log("Payload", payload);
    }

    useEffect(() => {
        let interval = null;
        if (timerRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            setTimerRunning(false);
        }

        return () => clearInterval(interval);
    }, [timerRunning, timer]);


    const GenerateChallenge = async () => {
        console.log("Challenge Generated")

        const payload = {
            TodoId: ChallengeData?.Todoid,
            collection: ChallengeData?.CollectionToCeck,
        };
        const res = await fetch("http://localhost:3000/apiLivePhotoVerfication/ChallengeGenerate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        })
        const data = await res.json();
        setChallenge(data.Challenge);
        //Now i want a timer bar that counts 30 seconds 
        // ⏱️ Backend timestamp
        const challengeGeneratedAt = Number(data.GeneratedAt);
        console.log("Challenge Generated At", challengeGeneratedAt);
        const now = Date.now();
        console.log("Current Time", now);
        const elapsedSeconds = Math.floor((now - challengeGeneratedAt) / 1000);
        console.log("Elapsed Seconds", elapsedSeconds);
        const remaining = 30 - elapsedSeconds > 0 ? 30 - elapsedSeconds : 0;
        console.log("Remaining Time", remaining);
        setTimer(remaining);
        setTimerRunning(true);
    }
    const dispatch = useDispatch();
    const CloseChallenge = () => {
        console.log("Close Challenge");
        dispatch(setChallengeData(null));
    }

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode: "user"  // front camera
    };

    if (!Open) return null;  // hide if not open

    return (
        <div className='fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
                {/* Header */}
                <div className='flex items-center justify-between p-6 border-b border-gray-200'>
                    <h2 className='text-xl font-semibold text-gray-900'>Verification Challenge</h2>
                    <button
                        onClick={CloseChallenge}
                        className='text-gray-400 hover:text-gray-600 transition-colors'
                    >
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                <div className='p-6 space-y-6'>
                    {/* Select Accountability Section */}
                    <div>
                        <h3 className='text-lg font-medium text-gray-900 mb-3'>Select Accountability to Verify</h3>
                        <AccountabilitiesToVerify onSelect={setSelectedAccId} />
                    </div>

                    {/* Timer Section */}
                    {timerRunning && (
                        <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
                            <ChallengeTimer timer={timer} />
                        </div>
                    )}

                    {/* Generate Challenge Button */}
                    <button
                        onClick={GenerateChallenge}
                        className='w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                    >
                        Generate Challenge
                    </button>

                    {/* Challenge Text */}
                    {Challenge && (
                        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
                            <h4 className='font-medium text-yellow-800 mb-2'>Challenge:</h4>
                            <p className='text-yellow-700'>{Challenge}</p>
                        </div>
                    )}

                    {/* Camera Section */}
                    <div className='text-center'>
                        {Challenge ? (
                            <div className='space-y-4'>
                                <Webcam
                                    ref={webcamRef}
                                    className="transform scale-x-[-1] mx-auto rounded-lg border border-gray-300 shadow-sm"
                                    audio={false}
                                    height={300}
                                    screenshotFormat="image/jpeg"
                                    width={400}
                                    videoConstraints={videoConstraints}
                                />
                                <button
                                    onClick={CapturePhoto}
                                    disabled={!Challenge || !timerRunning || timer <= 0 || !selectedAccId}
                                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${(!Challenge || !timerRunning || timer <= 0 || !selectedAccId)
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                        }`}
                                >
                                    Capture Verification Photo
                                </button>
                            </div>
                        ) : (
                            <div className='py-12'>
                                <div className='w-16 h-16 mx-auto mb-4 text-gray-300'>
                                    <svg fill='currentColor' viewBox='0 0 24 24'>
                                        <path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' />
                                    </svg>
                                </div>
                                <p className='text-gray-500'>Camera will appear here when activated</p>
                            </div>
                        )}
                    </div>

                    {/* Verification Status */}
                    <div className='bg-gray-50 rounded-lg p-4'>
                        <h4 className='font-medium text-gray-900 mb-2'>Verification Status</h4>
                        <p className='text-gray-600 text-sm'>
                            {Challenge
                                ? 'Ready to verify when challenge is completed'
                                : 'Waiting for challenge generation'
                            }
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenge;




// import React from 'react';
// import { useSelector } from 'react-redux';
// import { setChallengeData } from '../../../../ReduxToolkit/Slices/ChallengeSlice';
// import { useDispatch } from 'react-redux';
// import Webcam from 'react-webcam';
// import { useRef } from "react";
// import { useEffect } from 'react';
// import { useState } from 'react';
// import AccountabilitiesToVerify from './AccountabilitiesToVerify';
// import { ChallengeTimer } from './HelperFunctions/TimeFormatter';

// const Challenge = () => {

//     const [UploadedImageId, setUploadedImageId] = useState(null)
//     const [selectedAccId, setSelectedAccId] = useState(null);
//     const [Challenge, setChallenge] = useState(null)
//     const [timer, setTimer] = useState(0); // countdown timer
//     const [timerRunning, setTimerRunning] = useState(false); // is timer active

//     //Uploaded Images URL
//     //

//     const webcamRef = useRef(null);
//     const ChallengeData = useSelector((state) => state.challenge.data);

//     const Open = useSelector((state) => state.challenge.open);

//     const CapturePhoto = async () => {
//         console.log("accId", selectedAccId);
//         const imageSrc = webcamRef.current.getScreenshot(); // base64 string

//         const payload = {
//             image: imageSrc, // directly sending base64
//             TodoId: ChallengeData?.Todoid,
//             SpecificEventId: ChallengeData?.SpecificEventid,
//             collection: ChallengeData?.CollectionToCeck,
//             Accountabilitiy: selectedAccId, // use the selected accountability ID
//             ChallengeText: Challenge
//         };
//         await fetch("http://localhost:3000/apiLivePhotoVerfication", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         })
//         console.log("Payload", payload);
//     }

//     useEffect(() => {
//         let interval = null;
//         if (timerRunning && timer > 0) {
//             interval = setInterval(() => {
//                 setTimer(prev => prev - 1);
//             }, 1000);
//         } else if (timer === 0) {
//             clearInterval(interval);
//             setTimerRunning(false);
//         }

//         return () => clearInterval(interval);
//     }, [timerRunning, timer]);


//     const GenerateChallenge = async () => {
//         console.log("Challenge Generated")

//         const payload = {
//             TodoId: ChallengeData?.Todoid,
//             collection: ChallengeData?.CollectionToCeck,
//         };
//         const res = await fetch("http://localhost:3000/apiLivePhotoVerfication/ChallengeGenerate", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(payload),
//         })
//         const data = await res.json();
//         setChallenge(data.Challenge);
//         //Now i want a timer bar that counts 30 seconds
//         // ⏱️ Backend timestamp
//         const challengeGeneratedAt = Number(data.GeneratedAt);
//         console.log("Challenge Generated At", challengeGeneratedAt);
//         const now = Date.now();
//         console.log("Current Time", now);
//         const elapsedSeconds = Math.floor((now - challengeGeneratedAt) / 1000);
//         console.log("Elapsed Seconds", elapsedSeconds);
//         const remaining = 30 - elapsedSeconds > 0 ? 30 - elapsedSeconds : 0;
//         console.log("Remaining Time", remaining);
//         setTimer(remaining);
//         setTimerRunning(true);
//     }
//     const dispatch = useDispatch();
//     const CloseChallenge = () => {
//         console.log("Close Challenge");
//         dispatch(setChallengeData(null));
//     }

//     const videoConstraints = {
//         width: 400,
//         height: 300,
//         facingMode: "user"  // front camera
//     };

//     if (!Open) return null;  // hide if not open
//     return (
//         <div className='w-[100%] h-[100%] border border-e-white bg-black/50 absolute flex  z-50 justify-center items-center '>
//             <div className='border border-blue-500 absolute flex h-[100%] flex-col justify-  bg-black/80 w-[50%] h-[90%] p-5 text-white z-50'>
//                 <button onClick={CloseChallenge} className='border p-4'>Close</button>
//                 <AccountabilitiesToVerify onSelect={setSelectedAccId} />
//                 <ChallengeTimer timer={timer} />
//                 <button onClick={GenerateChallenge} className='border p-5'>Generate Challenge</button>
//                 <div>{Challenge}</div>
//                 <div>Time Remaining</div>
//                 <Webcam
//                     ref={webcamRef}
//                     className="-scale-x-100 m-auto rounded-lg"
//                     audio={false}
//                     height={300}
//                     screenshotFormat="image/jpeg"
//                     width={400}
//                     videoConstraints={videoConstraints}
//                 />
//                 <button
//                     onClick={CapturePhoto}
//                     disabled={!Challenge || !timerRunning || timer <= 0 || !selectedAccId}
//                     className={`border p-5 mt-4 ${(!Challenge || !timerRunning || timer <= 0 || !selectedAccId)
//                             ? 'opacity-50 cursor-not-allowed'
//                             : ''
//                         }`}
//                 >
//                     Capture
//                 </button>
//                 <div>Verfied Status</div>
//             </div>
//         </div>
//     );
// };

// export default Challenge;
