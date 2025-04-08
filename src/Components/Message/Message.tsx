import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useGame } from "../../Context/GameContext";
import { Dispatch, SetStateAction } from "react";

type MessageProps = {
    setShowMessage: Dispatch<SetStateAction<boolean>>;
};

const Message = ({ setShowMessage }: MessageProps) => {
    const Game = useGame();
    const Navigate = useNavigate();
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center text-white fixed z-50 top-0 left-0 bg-black bg-opacity-50">
            <div className="flex items-center justify-center mb-20">
                <img src={logo} alt="logo photo" className="w-44 " />
            </div>
            <div className="px-4">
                <h2 className="text-center mb-10 text-2xl">
                    When you want to finish the game, the first place winner
                    will appear.
                </h2>
                <h2 className="text-center text-2xl mb-10 ">
                    Are you sure you want to finish the game?
                </h2>
            </div>

            <div className="flex justify-center items-center gap-5 mt-5">
                <button
                    className="button px-8 py-3 rounded-full hover:scale-110 transition-all cursor-pointer"
                    onClick={() => {
                        Game.endGame();
                        Navigate("/");
                    }}
                >
                    yes
                </button>
                <button
                    className="button px-8 py-3 rounded-full hover:scale-110 transition-all cursor-pointer"
                    onClick={() => {
                        setShowMessage(false);
                    }}
                >
                    no
                </button>
            </div>
        </div>
    );
};

export default Message;
