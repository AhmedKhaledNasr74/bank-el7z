import { useNavigate } from "react-router-dom";
import click from "../../assets/click.wav";

const Card = () => {
    const Navigate = useNavigate();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-orange-400 flex-col">
            <div>
                <img src="/vite.svg" alt="" className="w-xl" />
            </div>

            <div className="flex gap-4">
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/game");
                        new Audio(click).play();
                    }}
                >
                    Scoreboard
                </button>
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/transfer");
                        new Audio(click).play();
                    }}
                >
                    Transfer
                </button>
            </div>
        </div>
    );
};

export default Card;
