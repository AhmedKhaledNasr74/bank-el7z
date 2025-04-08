import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useRedirectIfGameClosed() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("scoreboard")) {
            navigate("/");
        }
    }, [localStorage]);
}

export default useRedirectIfGameClosed;
