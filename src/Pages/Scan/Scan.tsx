import { motion } from "framer-motion";
import { useState } from "react";
import Webcam from "react-webcam";
import pageVariants from "../../assets/pageVariants.json";

const videoConstraints = {
    facingMode: "environment", // Use back camera
};

const Scan = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={pageVariants}
            className="min-h-screen  flex flex-col items-center justify-center p-4"
        >
            <div className="justify-center items-center flex flex-col w-full">
                <div className="w-full border h-[300px] z-50">
                    {isCameraOpen ? (
                        <Webcam
                            className="w-full h-[300px]"
                            videoConstraints={videoConstraints}
                            onUserMediaError={() =>
                                alert("Camera access denied!")
                            }
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-700">
                            Camera is off
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-center justify-center mt-5">
                    <button
                        className="button px-10 rounded-full py-3 mt-5 hover:scale-110 transition-all cursor-pointer"
                        onClick={() => setIsCameraOpen(!isCameraOpen)}
                    >
                        {isCameraOpen ? "Done" : "Scan"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Scan;
