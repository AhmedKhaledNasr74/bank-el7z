import Scoreboard from "../../Components/Scoreboard/Scoreboard";
import useRedirectIfGameClosed from "../../Hooks/useRedirectIfGameClosed";
import { motion } from "framer-motion";
import pageVariants from "../../assets/pageVariants.json";

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
