import { useState } from "react";

function KeyInput({ letter, checkInput }) {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked) return;
        setIsClicked(true);
        checkInput(letter);
    }

    return (
        <button className={`w-10 h-10 text-white uppercase ${isClicked ? "bg-active cursor-not-allowed" : "bg-primary cursor-pointer"} p-3 flex justify-center items-center m-1 rounded-sm font-semibold text-xl`} onClick={handleClick} >{letter}</button>
    );
}

export default KeyInput;