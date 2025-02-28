import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../Context/GameContext";

function useRedirectIfGameClosed() {
    const { isGameStarted } = useGame();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isGameStarted) {
            navigate("/"); // Redirect to the home page
        }
    }, [isGameStarted, navigate]);
}

export default useRedirectIfGameClosed;
