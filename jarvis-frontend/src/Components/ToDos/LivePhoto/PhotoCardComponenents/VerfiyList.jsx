import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setChallengeData } from '../../../../ReduxToolkit/Slices/ChallengeSlice';

const VerfiyList = ({ photoid }) => {
  const dispatch = useDispatch();
  const CalendarEvents = useSelector((state) => state.calendar.CalendarEvents);

  const VerifyPhoto = async (event) => {
    const data = JSON.parse(event.target.dataset.id);
    dispatch(setChallengeData(data));
  };

  const sortedEvents = CalendarEvents
    .filter(event => event.TodoId === photoid)
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  if (sortedEvents.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <div className='w-12 h-12 mx-auto mb-4 text-gray-300'>
          <svg fill='currentColor' viewBox='0 0 24 24'>
            <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' />
          </svg>
        </div>
        <p>No verification events scheduled</p>
      </div>
    );
  }

  return (
    <div className='space-y-3 max-h-64 overflow-y-auto'>
      {sortedEvents.map((event) => {
        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : null;

        const dateFormatted = startDate.toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });

        const startTime = startDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        const endTime = endDate
          ? endDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })
          : 'TBD';

        return (
          <div key={event.SpecificEventId} className='bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200'>
            <div className='mb-3'>
              <h4 className='font-medium text-gray-900 mb-1'>Morning Gym Session</h4>
              <p className='text-sm text-gray-500'>{dateFormatted} | {startTime} - {endTime}</p>
            </div>

            <button
              onClick={VerifyPhoto}
              data-id={JSON.stringify({
                Todoid: event.TodoId,
                SpecificEventid: event.SpecificEventId,
                CollectionToCeck: 'Live Photos'
              })}
              className='w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium'
            >
              Verify Now
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default VerfiyList;



// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setChallengeData } from '../../../../ReduxToolkit/Slices/ChallengeSlice';

// const VerfiyList = ({ photoid }) => {
//   const dispatch = useDispatch();
//   const CalendarEvents = useSelector((state) => state.calendar.CalendarEvents);

//   const VerifyPhoto = async (event) => {
//     const data = JSON.parse(event.target.dataset.id);
//     dispatch(setChallengeData(data));
//   };

//   const sortedEvents = CalendarEvents
//     .filter(event => event.TodoId === photoid)
//     .sort((a, b) => new Date(a.start) - new Date(b.start));

//   return (
//     <div className='bg-gray-50 rounded-xl min-w-[200px] shadow-sm max-h-[100px] border  border-slate-300 overflow-y-auto'>
//       <div className='space-y-4'>
//         {sortedEvents.map((event) => {
//           const startDate = new Date(event.start);
//           const endDate = event.end ? new Date(event.end) : null;

//           const dateFormatted = startDate.toLocaleDateString('en-US', {
//             weekday: 'short',
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//           });

//           const startTime = startDate.toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//             hour12: true
//           });

//           const endTime = endDate
//             ? endDate.toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//               hour12: true
//             })
//             : 'TBD';

//           return (
//             <div key={event.SpecificEventId} className='bg-white border-slate-200 rounded-lg p-4 shadow-sm'>

//               <p className='text-sm text-gray-500'>{dateFormatted} | {startTime} - {endTime}</p>

//               <button
//                 onClick={VerifyPhoto}
//                 data-id={JSON.stringify({
//                   Todoid: event.TodoId,
//                   SpecificEventid: event.SpecificEventId,
//                   CollectionToCeck: 'Live Photos'
//                 })}
//                 className='mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'
//               >
//                 Verify Now
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default VerfiyList;
