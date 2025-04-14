import React from 'react';
import { Link } from 'react-router-dom';
import Scrollbar from '../Scrollbar/Scrollbar';
import { useState } from 'react';


// Reusable ToDoItem component
const ToDoItem = ({ title, imageSrc }) => {
    const [scroll, setscroll] = useState(true)
    const [key, setkey] = useState("")
    const scrolldown = (e) => {
        console.log("The key is ", e.target.key)
        console.log("Toggled", title)
        if (scroll) {
            setscroll(false)
            setkey(title)
        }
        else {
            setscroll(true)
        }
    }
    return (
        <div className="border flex items-center justify-between w-[90%] pl-1 py-9 rounded-2xl relative">
            <Scrollbar className='Scrollbar' hidden={scroll} title={key} />
            <div className='flex justify-start items-center'>
                {imageSrc && <img src={imageSrc} width={"50px"} alt={title} />}
                <Link to={`/${title.toLowerCase().replace(/\s+/g, '')}`}>{title}</Link>
            </div>
            <span className='pr-17 flex '>
                <img src="src/assets/scroll.svg" data-id={`${title}`} onClick={scrolldown} width={"45px"} alt="" srcset="" />
            </span>
        </div>

    );
};

const ToDos = () => {
    return (
        <div className=" Accountability-Draggable-Elements  borde min-h-[100%] flex flex-col gap-4 justify-center items-center">
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
