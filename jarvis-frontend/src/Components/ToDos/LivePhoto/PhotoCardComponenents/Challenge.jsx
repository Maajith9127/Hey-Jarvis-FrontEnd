
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChallengeData } from '../../../../ReduxToolkit/Slices/ChallengeSlice';
import Webcam from 'react-webcam';
import AccountabilitiesToVerify from './AccountabilitiesToVerify';
import { ChallengeTimer } from './HelperFunctions/TimeFormatter';
import { generateChallenge, verifyLivePhoto } from '../../../../services/verifyLivePhoto';

const Challenge = () => {
    const [UploadedImageId, setUploadedImageId] = useState(null);
    const [selectedAccId, setSelectedAccId] = useState(null);
    const [ChallengeText, setChallengeText] = useState(null);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [verificationReason, setVerificationReason] = useState('');
    const [facingMode, setFacingMode] = useState("user");

    const webcamRef = useRef(null);
    const ChallengeData = useSelector((state) => state.challenge.data);
    const Open = useSelector((state) => state.challenge.open);
    const photo = useSelector((state) => state.photo);
    const dispatch = useDispatch();

    useEffect(() => {
        let interval = null;
        if (timerRunning && timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        } else if (timer === 0) {
            clearInterval(interval);
            setTimerRunning(false);
        }
        return () => clearInterval(interval);
    }, [timerRunning, timer]);

    const CapturePhoto = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (!imageSrc || !ChallengeData) return;

        const payload = {
            image: imageSrc,
            TodoId: ChallengeData?.Todoid,
            SpecificEventId: ChallengeData?.SpecificEventid,
            collection: ChallengeData?.CollectionToCeck,
            Accountabilitiy: selectedAccId,
            ChallengeText,
        };

        try {
            const response = await verifyLivePhoto(payload);
            console.log("📩 Verification response:", response);
            const raw = response?.verification || response?.reason || "No response from server.";
            setVerificationReason(raw);
        } catch (err) {
            console.error("❌ Verification failed:", err);
            const fallback = err?.response?.data?.error || "Verification failed due to a system error.";
            setVerificationReason(fallback);
        }
    };

    const GenerateChallenge = async () => {
        if (!ChallengeData?.Todoid || !ChallengeData?.CollectionToCeck) return;

        try {
            const data = await generateChallenge({
                TodoId: ChallengeData.Todoid,
                collection: ChallengeData.CollectionToCeck,
            });

            setChallengeText(data.Challenge);
            setVerificationReason("");

            const challengeGeneratedAt = Number(data.GeneratedAt);
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - challengeGeneratedAt) / 1000);
            const remaining = 30 - elapsedSeconds > 0 ? 30 - elapsedSeconds : 0;

            setTimer(remaining);
            setTimerRunning(true);
        } catch (err) {
            console.error("❌ Challenge generation failed:", err);
        }
    };

    const CloseChallenge = () => {
        dispatch(setChallengeData(null));
    };

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode,
    };

    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    if (!Open) return null;

    return (
        <div className="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Verification Challenge
                        <span className="block text-sm text-gray-500">{formattedDateTime}</span>
                    </h2>
                    <button onClick={CloseChallenge} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Select Accountability */}
                    <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Select Accountability to Verify</h3>
                        <AccountabilitiesToVerify onSelect={setSelectedAccId} />
                    </div>

                    {/* Timer */}
                    {timerRunning && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <ChallengeTimer timer={timer} />
                        </div>
                    )}

                    {/* Challenge Generator */}
                    <button
                        onClick={GenerateChallenge}
                        disabled={timerRunning} //  blocks when timer is running
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 
        ${timerRunning
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'}`}
                    >
                        {timerRunning ? 'Challenge in Progress...' : 'Generate Challenge'}
                    </button>


                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-medium text-yellow-800 mb-2">Challenge:</h4>
                        <p className="text-yellow-700">{ChallengeText}</p>
                    </div>
                    {/*Previously Uploaded Photo */}

                    {ChallengeData?.Todoid && (
                        <div className="mb-4  text-center">
                            <h4 className="text  text-gray-600 mb-1">Original Photo to Match</h4>
                            {(() => {
                                const original = photo?.Photos?.find(p => p.id === ChallengeData.Todoid);
                                if (!original) return <p className="text-gray-400 text-xs">No matching photo found.</p>;

                                return (


                                    <img
                                        src={original.PhotoUrl}
                                        alt="Original Reference"
                                        className="mx-auto w-100 h-auto rounded-lg border border-gray-300 shadow-sm"

                                    />

                                );
                            })()}
                        </div>
                    )}
                    {/* Webcam + Controls (Always Visible) */}
                    <div className="text-center space-y-4">
                        <Webcam
                            ref={webcamRef}
                            className={`mx-auto rounded-lg border border-gray-300 shadow-sm 
    ${facingMode === "user" && window.innerWidth > 768 ? "transform scale-x-[-1]" : ""}`
                            }
                            audio={false}
                            height={300}
                            screenshotFormat="image/jpeg"
                            width={400}
                            videoConstraints={videoConstraints}
                        />

                        {/* Switch Camera */}
                        <button
                            onClick={() => setFacingMode(prev => (prev === "user" ? "environment" : "user"))}
                            className="text-sm text-blue-600 underline mb-1"
                        >
                            Switch to {facingMode === "user" ? "Back" : "Front"} Camera
                        </button>

                        <button
                            onClick={CapturePhoto}
                            disabled={!timerRunning || timer <= 0 || !selectedAccId}
                            className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${!timerRunning || timer <= 0 || !selectedAccId
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                                }`}
                        >
                            Capture Verification Photo
                        </button>
                    </div>

                    {/* Result */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        {verificationReason ? (
                            <p className="text-sm text-gray-800 font-medium whitespace-pre-line">{verificationReason}</p>
                        ) : (
                            <p className="text-gray-600 text-sm">
                                {ChallengeText
                                    ? 'Ready to verify when challenge is completed'
                                    : 'Waiting for challenge generation'}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenge;
