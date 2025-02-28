import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../Context/GameContext";

function useRedirectIfGameopened() {
    const { isGameStarted } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        if (isGameStarted) {
            navigate("/game");
        }
    }, [isGameStarted, navigate]);
}

export default useRedirectIfGameopened;
