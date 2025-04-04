import React from 'react';

// Reusable ToDoItem component
const ToDoItem = ({ title, imageSrc }) => {
    return (
        <div className="border flex items-center justify-between w-[90%] pl-1 py-9 rounded-2xl">
            <div className='flex justify-start items-center'>
                {imageSrc && <img src={imageSrc} width={"50px"} alt={title} />}
                <h3>{title}</h3>
            </div>
            <span className='pr-17 flex '>
                <img src="src/assets/scroll.svg" width={"45px"} alt="" srcset="" />

            </span>
        </div>
    );
};

const ToDos = () => {
    return (
        <div className="borde min-h-[100%] flex flex-col gap-4 justify-center items-center">
            <h1> ACCOUNTABILITY</h1>
            <ToDoItem title="PAYMENT" imageSrc="src/assets/Dollar.svg" />
            <ToDoItem title="MESSAGE" imageSrc="src/assets/message.svg" />
            <ToDoItem title="PICTURE" imageSrc="src/assets/picture.svg" />
            <ToDoItem title="VIDEO" imageSrc="src/assets/video.svg" />
            <ToDoItem title="ACCOUNTABILITY PARTNER" imageSrc="src/assets/partner.svg" />
        </div>
    );
};

export default ToDos;
