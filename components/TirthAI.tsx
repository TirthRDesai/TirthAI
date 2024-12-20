import React from "react";
import styles from "@/styles/tirth-ai.module.css";
import { motion } from "framer-motion";
import useIsMobile from "@/hooks/use-is-mobile";

function TirthAI() {
	return (
		<motion.div
			className={
				styles.wrapper +
				" md:flex md:flex-row md:justify-center md:items-center md:h-[200px] mt-10"
			}
			initial={{
				opacity: 0,
				y: 60,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 1,
					ease: "anticipate",
					type: "spring",
					stiffness: 200,
					damping: 20,
					bounce: 0.5,
				},
			}}
		>
			<svg className={styles.svg + " md:justify-self-end"}>
				<text
					x="50%"
					y="50%"
					dy=".35em"
					textAnchor="middle"
					className={styles.text + " md:text-[132px] text-[80px]"}
				>
					Tirth AI
				</text>
			</svg>
		</motion.div>
	);
}

export default TirthAI;
