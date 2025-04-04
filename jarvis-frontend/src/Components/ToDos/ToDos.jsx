import React from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from '../Scrollbar/Scrollbar';
import { useState } from 'react';

// Reusable ToDoItem component
const ToDoItem = ({ title, imageSrc }) => {
    
   const [scroll, setscroll] = useState(true)


     const scrolldown=(e)=>{
        console.log("The key is ",e.target.key)
        console.log("Toggled",title)
        if(scroll){
            setscroll(false)
        }
        else{
            setscroll(true)
        }
            
     }
    
    return (
        <div className="Todos border flex items-center justify-between w-[90%] pl-1 py-9 rounded-2xl relative ">
            <Scrollbar hidden={scroll} />
            <div className='flex justify-start items-center '>
                {imageSrc && <img src={imageSrc} width={"50px"} alt={title} />}
                <nav>
                    <Link to={`/${title.toLowerCase().replace(/\s+/g, '')}`}>{title}</Link>
                </nav>
            </div>
            <span className='pr-17 flex '>
                <img onClick={scrolldown} key={title} src="src/assets/scroll.svg" width={"45px"} alt="" srcset="" />
            </span>
        </div>
    );
};

const ToDos = () => {
    return (
        <div className="Todo-Draggable-Elements borde min-h-[100%] flex flex-col gap-4 justify-center items-center">
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
