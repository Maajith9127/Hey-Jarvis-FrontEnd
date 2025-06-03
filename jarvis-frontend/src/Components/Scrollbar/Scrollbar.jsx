import React from 'react';
import { useSelector } from 'react-redux';

const Scrollbar = ({ hidden, title, className }) => {


  const photos = useSelector((state) => state.photo.Photos);
  const messages = useSelector((state) => state.message.messages);

  // const renderContent = () => {
  //   switch (title) {
  //     case 'LIVE PHOTO':
  //       return (
  //         <div className=''>
  //           <ul className="list-disc ml-5">
  //             {photos.map((photo) => (
  //               <div className='ScrollBar_Elements' key={photo.id} data-id={photo.id}> {photo.photoName} </div>
  //             ))}
  //           </ul>
  //         </div>
  //       );
  //     case 'MESSAGE':
  //       return (
  //         <div className=''>
  //           <ul className="list-disc ml-5">
  //             {messages.map((message) => (
  //               <div className='ScrollBar_Elements' key={message.AccountabilityId} data-id={message.AccountabilityId}> {message.message} </div>
  //             ))}
  //           </ul>
  //         </div>
  //       );
  //       default:
  //       return <p>No content selected.</p>;
  //   }
  // };

  const renderContent = () => {
    switch (title) {
      case 'LIVE PHOTO':
        return (
          <div>
            <ul className="list-disc ml-5 Todo-Draggable-Elements">
              {photos.map((photo) => (
                <div
                  className="ScrollBar_Elements"
                  key={photo.id}
                  data-id={photo.id}
                  data-collectiontype="PhotoCollection" // 👈 Add this
                >
                  {photo.photoName}
                </div>
              ))}
            </ul>
          </div>
        );
      case 'MESSAGE':
        return (
          <div>
            <ul className="list-disc ml-5 Accountability-Draggable-Elements">
              {messages.map((message) => (
                <div
                  className="ScrollBar_Elements"
                  key={message.AccountabilityId}
                  data-id={message.AccountabilityId}
                  data-collectiontype="MessageCollection" // 👈 Add this
                >
                  {message.message}
                </div>
              ))}
            </ul>
          </div>
        );
      default:
        return <p>No content selected.</p>;
    }
  };




  return (
    <div
      className={`absolute bg-white px-1  rounded-3xl right-10 bottom-[-45px] border w-[80%] h-[70%] overflow-y-scroll  ${className}  ${hidden ? 'hidden' : ''
        }`}
    >
      {renderContent()}
    </div>
  );
};

export default Scrollbar;
