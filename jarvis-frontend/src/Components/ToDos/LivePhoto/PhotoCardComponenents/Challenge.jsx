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
        <div className='w-[100%] h-[100%] border border-e-white bg-black/50 absolute flex justify-center items-center '>
            <div className='border border-blue-500 absolute flex h-[100%] flex-col justify-  bg-black/80 w-[50%] h-[90%] p-5 text-white z-50'>
                <button onClick={CloseChallenge} className='border p-4'>Close</button>
                <AccountabilitiesToVerify onSelect={setSelectedAccId} />
                <ChallengeTimer timer={timer} />
                <button onClick={GenerateChallenge} className='border p-5'>Generate Challenge</button>
                <div>{Challenge}</div>
                <div>Time Remaining</div>
                <Webcam
                    ref={webcamRef}
                    className="-scale-x-100 m-auto rounded-lg"
                    audio={false}
                    height={300}
                    screenshotFormat="image/jpeg"
                    width={400}
                    videoConstraints={videoConstraints}
                />
                <button
                    onClick={CapturePhoto}
                    disabled={!Challenge || !timerRunning || timer <= 0 || !selectedAccId}
                    className={`border p-5 mt-4 ${(!Challenge || !timerRunning || timer <= 0 || !selectedAccId)
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                        }`}
                >
                    Capture
                </button>
                <div>Verfied Status</div>
            </div>
        </div>
    );
};

export default Challenge;
