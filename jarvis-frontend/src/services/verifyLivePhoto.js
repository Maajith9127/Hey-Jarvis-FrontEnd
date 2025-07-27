import axiosInstance from "./axiosInstance";

export const generateChallenge = async ({ TodoId, collection,Accountability }) => {
    const res = await axiosInstance.post("/apiLivePhotoVerfication/ChallengeGenerate", {
        TodoId,
        collection,
        Accountability
    });
    return res.data;
};

export const uploadVerificationPhoto = async (file) => {
    const formData = new FormData();
    formData.append("VerficationPhoto", file);

    const res = await axiosInstance.post("/api/upload", formData); // Content-Type auto-handled
    return res.data; // expects { Url: "..." }
};

export const verifyLivePhoto = async ({ image, TodoId, SpecificEventId, collection, Accountabilitiy, ChallengeText, userId }) => {
    const res = await axiosInstance.post("/apiLivePhotoVerfication", {
        image,
        TodoId,
        SpecificEventId,
        collection,
        Accountabilitiy,
        ChallengeText,
        userId, //  include userId here
    });
    return res.data;
};
