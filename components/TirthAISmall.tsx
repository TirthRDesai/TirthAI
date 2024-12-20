import React from "react";
import styles from "@/styles/tirth-ai.module.css";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/use-is-mobile";
import { Almendra_Display, Atomic_Age } from "next/font/google";

const sedwickAve = Almendra_Display({
	variable: "--font-sedgwick-ave",
	subsets: ["latin"],
	weight: "400",
});

function TirthAISmall() {
	return (
		<motion.span
			className="w-fit h-30 font-extrabold"
			style={{
				fontFamily: sedwickAve.style.fontFamily,
				fontSize: "2rem",

				color: "lightblue",
				letterSpacing: "0.1rem",
				lineHeight: "1.5rem",
			}}
			initial={{
				opacity: 0,
				y: -100,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.5,
					delay: 1,
				},
			}}
			transition={{
				duration: 0.5,
			}}
		>
			Tirth AI
		</motion.span>
	);
}

export default TirthAISmall;
