import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { formatDateToAMPM } from './HelperFunctions/TimeFormatter'
import { getBackgroundColor } from './HelperFunctions/TimeFormatter'
import { isWithinTimeRange } from './HelperFunctions/TimeFormatter'

const AccountabilitiesToVerify = ({ onSelect }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleClick = (accId, accKey) => {
        if (selectedId === accId) {
            setSelectedId(null); // remove highlight
            onSelect(null); // clear selection
        }
    };

    const handleDoubleClick = (accId, accKey) => {
        setSelectedId(accId); // add highlight
        onSelect(accKey);
    };

    const [AccountabilitiesToVerify, setAccountabilitiesToVerify] = useState([])
    const Accountabilities = useSelector((state) => {
        return state.challenge.data
    })

    const TodoId = Accountabilities?.Todoid
    const SpecificEventId = Accountabilities?.SpecificEventid

    const FetchAccountabilities = async () => {
        try {
            const response = await fetch("http://localhost:3000/GetTodoCollision", {
                method: "POST", // switched to POST
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    TodoId: TodoId,
                    SpecificEventId: SpecificEventId,
                }),
            });
            const data = await response.json();
            const fetchedAccountabilities = data.OtherAccountabilitiesInCollisionWith;
            setAccountabilitiesToVerify(fetchedAccountabilities);
        } catch (error) {
            console.error("Error fetching accountabilities:", error);
        }
    };

    useEffect(() => {
        FetchAccountabilities();
    }, []); // ← empty array means "run once on mount"

    return (
        <div className='border w-[100%] scroll min-h-[20%] overflow-y-scroll'>
            {
                AccountabilitiesToVerify.map((accountability, index) => {
                    const bg = getBackgroundColor(accountability.verified, accountability.start, accountability.end);
                    const accId = accountability.AccountabilityId + accountability.SpecificEventId;
                    const accKey = {
                        AccountabilityId: accountability.AccountabilityId,
                        SpecificEventId: accountability.SpecificEventId
                    };
                    const isSelected = selectedId === accId;
                    const withinTime = new Date(accountability.start) <= new Date() && new Date() <= new Date(accountability.end);

                    return (
                        <div
                            onClick={withinTime ? () => handleClick(accId, accKey) : undefined}
                            onDoubleClick={withinTime ? () => handleDoubleClick(accId, accKey) : undefined}
                            key={index}
                            className={`${bg} ${isSelected ? 'border-4 border-red-700' : 'border'} p-5 rounded-2xl m-5 cursor-pointer transition-all`}
                            style={{ cursor: withinTime ? 'pointer' : 'not-allowed' }}
                        >
                            <h1 className=''>
                                {accountability.title}
                                <p>Time: {formatDateToAMPM(accountability.start)} - {formatDateToAMPM(accountability.end)}</p>
                            </h1>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default AccountabilitiesToVerify




























// // import React, { useState } from 'react'
// // import { useSelector } from 'react-redux'
// // import { useEffect } from 'react'
// // import { formatDateToAMPM } from './HelperFunctions/TimeFormatter'
// // import { getBackgroundColor } from './HelperFunctions/TimeFormatter'
// // import { isWithinTimeRange } from './HelperFunctions/TimeFormatter'


// // const AccountabilitiesToVerify = ({ onSelect }) => {

// //     const [selectedId, setSelectedId] = useState(null);
// //     const handleClick = (accId,accKey) => {
// //         if (selectedId === accId) {
// //             setSelectedId(null); // remove highlight
// //             onSelect(null); // clear selection

// //         }
// //     };

// //     const handleDoubleClick = (accId,accKey) => {
// //         setSelectedId(accId); // add highlight
// //         onSelect(accKey);
// //     };

// //     const [AccountabilitiesToVerify, setAccountabilitiesToVerify] = useState([])
// //     const Accountabilities = useSelector((state) => { return state.challenge.data })

// //     const TodoId = Accountabilities?.Todoid
// //     const SpecificEventId = Accountabilities?.SpecificEventid

// //     const FetchAccountabilities = async () => {
// //         try {
// //             const response = await fetch("http://localhost:3000/GetTodoCollision", {
// //                 method: "POST", //  switched to POST
// //                 headers: {
// //                     "Content-Type": "application/json",
// //                 },
// //                 body: JSON.stringify({
// //                     TodoId: TodoId,
// //                     SpecificEventId: SpecificEventId,
// //                 }),
// //             });
// //             const data = await response.json();
// //             const fetchedAccountabilities = data.OtherAccountabilitiesInCollisionWith;
// //             setAccountabilitiesToVerify(fetchedAccountabilities);
// //         } catch (error) {
// //             console.error("Error fetching accountabilities:", error);
// //         }
// //     };
// //     useEffect(() => {
// //         FetchAccountabilities();
// //     }, []); // ← empty array means "run once on mount"



// //     return (
// //         <div className='border w-[100%] scroll min-h-[20%] overflow-y-scroll'>
// //             {
// //                 AccountabilitiesToVerify.map((accountability, index) => {

// //                     const bg = getBackgroundColor(accountability.verified, accountability.start, accountability.end);
// //                     const accId = accountability.AccountabilityId + accountability.SpecificEventId;
// //                     const accKey = {
// //                         AccountabilityId: accountability.AccountabilityId,
// //                         SpecificEventId: accountability.SpecificEventId
// //                     };
// //                     const isSelected = selectedId === accId;
// //                     const withinTime = new Date(accountability.start) <= new Date() && new Date() <= new Date(accountability.end);

// //                     return <>
// //                         <div onClick={withinTime ? () => handleClick(accId,accKey) : undefined} onDoubleClick={withinTime ? () => handleDoubleClick(accId,accKey) : undefined} key={index} className={`${bg} ${isSelected ? 'border-4 border-red-700' : 'border'} p-5 rounded-2xl m-5 cursor-pointer transition-all`} style={{ cursor: withinTime ? 'pointer' : 'not-allowed' }} >
// //                             <h1 className=''>
// //                                 {accountability.title}
// //                                 <p>Time: {formatDateToAMPM(accountability.start)} - {formatDateToAMPM(accountability.end)}</p>
// //                             </h1>
// //                         </div>
// //                     </>
// //                 })
// //             }
// //         </div>
// //     )
// // }

// // export default AccountabilitiesToVerify
