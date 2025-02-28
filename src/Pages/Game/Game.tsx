import { useNavigate } from "react-router-dom";
import Scoreboard from "../../Components/Scoreboard/Scoreboard";
import { useGame } from "../../Context/GameContext";
import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";
import click from "../../assets/click.wav";

const Game = () => {
    useRedirectIfGameClosed();
    const Navigate = useNavigate();
    const Game = useGame();

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-orange-400">
            <div className="text-center w-full">
                <Scoreboard />
                <div className="space-y-4 space-x-4">
                    <button
                        className="px-6 py-3 cursor-pointer w-[150px] text-lg font-semibold text-black bg-purple-600/95 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                        onClick={() => {
                            Navigate("/transfer");
                            new Audio(click).play();
                        }}
                    >
                        تحويل
                    </button>
                    <button
                        className="px-6 py-3 w-[150px] cursor-pointer text-lg font-semibold text-black bg-red-500 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-transform transform hover:scale-105"
                        onClick={() => {
                            Game.endGame();
                            Navigate("/");
                        }}
                    >
                        إنهاء اللعبة
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Game;
