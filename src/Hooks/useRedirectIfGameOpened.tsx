import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectIfGameopened() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("scoreboard")) navigate("/game");
    }, [localStorage]);
}

export default useRedirectIfGameopened;
