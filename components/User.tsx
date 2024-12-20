import React from "react";
import { useAI } from "@/context/Context";
import { motion } from "framer-motion";
import avatar from "@/public/avatar.png";
import Image from "next/image";

const UserBox = ({ question }: { question: string }) => {
	return (
		<motion.div
			style={{
				whiteSpace: "pre-wrap",
				textAlign: "left",
				fontSize: "0.9rem",
			}}
			className=" w-full bg-transparent flex place-items-center gap-3"
			initial={{
				opacity: 0,
				y: 100,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					duration: 0.5,
				},
			}}
			transition={{
				duration: 0.5,
			}}
		>
			<motion.img
				src={avatar.src}
				alt="User"
				className="w-10 h-10 object-contain aspect-square rounded-full overflow-hidden hidden md:block"
				initial={{
					opacity: 0,
					x: -100,
				}}
				animate={{
					opacity: 1,
					x: 0,
					transition: {
						duration: 0.5,
					},
				}}
				transition={{
					duration: 0.5,
				}}
			/>
			<motion.div className="bg-blue-600/20 p-2 rounded-lg ml-2 w-full text-base min-h-[45px] flex items-center">
				<motion.span className="text-white/80 text-xs leading-5 tracking-tight md:text-base md:leading-6 md:tracking-normal ">
					{question}
				</motion.span>
			</motion.div>
		</motion.div>
	);
};

export default UserBox;
