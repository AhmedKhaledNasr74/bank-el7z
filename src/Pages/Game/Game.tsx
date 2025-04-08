import Scoreboard from "../../Components/Scoreboard/Scoreboard";
import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";
import { motion } from "framer-motion";
const pageVariants = {
    hidden: { x: `-100vw` },
    visible: {
        x: 0,
        transition: { type: "spring", duration: 0.4 },
    },
    exit: {
        x: "100vw",
        transition: { type: "spring", duration: 0.2 },
    },
};

const Game = () => {
    useRedirectIfGameClosed();

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="flex items-center justify-center h-screen "
        >
            <div className="text-center w-full">
                <Scoreboard />
            </div>
        </motion.div>
    );
};

export default Game;
