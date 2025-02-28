import { useNavigate } from "react-router-dom";
import { useGame } from "../../Context/GameContext";
import useRedirectIfGameopened from "../../Hooks/useRedirectIfGameOpened";

const Start = () => {
    useRedirectIfGameopened();
    const Navigate = useNavigate();
    const Game = useGame();
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-yellow-300 to-orange-400">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-black mb-8">
                    مرحبًا بك في بنك الحظ
                </h1>
                <button
                    className="px-6 py-3 text-lg w-[150px] cursor-pointer font-semibold text-black bg-purple-600/90 rounded-lg shadow-lg hover:bg-purple-700/95 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-transform transform hover:scale-105"
                    onClick={() => {
                        Navigate("/game");
                        Game.startGame();
                    }}
                >
                    ابدأ اللعبة
                </button>
            </div>
        </div>
    );
};

export default Start;
