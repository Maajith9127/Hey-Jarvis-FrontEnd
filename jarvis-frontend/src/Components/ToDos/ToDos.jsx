import React from 'react';

// Reusable ToDoItem component
const ToDoItem = ({ title, imageSrc }) => {
    return (
        <div className=" borde flex items-center justify-between w-[90%] pl-1 py-9 rounded-2xl">
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
        <div className="border min-h-[100%] flex flex-col gap-4 justify-center items-center">
            <h1>TO DOS</h1>
            <ToDoItem title="LOCATION" imageSrc="src/assets/location.svg" />
            <ToDoItem title="KEEP ME AWAKE" imageSrc="src/assets/wake.svg" />
            <ToDoItem title="WEB BLOCKING" imageSrc="src/assets/website.svg" />
            <ToDoItem title="APP BLOCKING" imageSrc="src/assets/apps.svg" />
            <ToDoItem title="MEDIA" imageSrc="src/assets/media.svg" />
        </div>
    );
};

export default ToDos;
