export function formatDateToAMPM(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}

export function isWithinTimeRange(start, end) {
    const now = new Date();
    return new Date(start) <= now && now <= new Date(end);
}

export const getBackgroundColor = (verified, start, end) => {
    const withinTime = isWithinTimeRange(start, end);

    if (verified) return withinTime ? 'bg-green-600' : 'bg-green-600 opacity-50';
    return withinTime ? 'bg-red-600 border border-black' : 'bg-red-600 opacity-50';
};

export const ChallengeTimer = ({ timer }) => {
    return (
        <div className="mt-4 w-full">
            <div className="text-lg mb-2">
                ⏳ Time Remaining: <span className="font-bold">{timer}</span> seconds
            </div>
            <div className="w-full h-3 bg-gray-700 rounded">
                <div
                    className="h-3 bg-green-500 rounded transition-all duration-200"
                    style={{ width: `${(timer / 30) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};