import React from "react";
import { motion } from "motion/react";
import { Stylish } from "next/font/google";
import { useAI } from "@/context/Context";

const stylish = Stylish({
	variable: "--font-stylish",
	subsets: ["latin"],
	weight: "400",
});

const QuestionUI = ({
	question,
	index,
	setIsGenerating,
}: {
	question: string;
	index: number;
	setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { setQuestion } = useAI();
	return (
		<motion.div
			className="text-white/70 text-sm border-2 border-white/40 rounded-lg w-full h-fit py-1 px-2 cursor-pointer"
			style={{ fontFamily: stylish.style.fontFamily }}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: 4.9 + index * 0.1,
				ease: "easeInOut",
			}}
			onClick={(e) => {
				setQuestion(question);
			}}
		>
			{question}
		</motion.div>
	);
};

function SampleQuestions({
	setIsGenerating,
}: {
	setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const SuggestedQuestions = [
		"What are your skills?",
		"Tell me about yourself.",
		"What are your strengths and weaknesses?",
		"How can I reach out to you?",
	];

	return (
		<motion.div className="flex flex-col items-center justify-center w-full md:w-full px-4 md:px-0 h-auto">
			<motion.h1
				className="text-white/70 text-xl md:text-3xl font-bold origin-center text-center overflow-hidden whitespace-nowrap "
				style={{ fontFamily: stylish.style.fontFamily }}
				initial={{ opacity: 0, width: 0 }}
				animate={{ opacity: 1, width: 300 }}
				transition={{
					duration: 1.2,
					delay: 3.7,
					ease: "easeInOut",
					type: "tween",
				}}
			>
				Suggested Questions
			</motion.h1>
			<motion.div className="grid grid-cols-1 md:grid-cols-2 w-full h-fit gap-x-4 gap-y-2 mt-6">
				{SuggestedQuestions.map((question, index) => (
					<QuestionUI
						key={index}
						question={question}
						index={index}
						setIsGenerating={setIsGenerating}
					/>
				))}
			</motion.div>
		</motion.div>
	);
}

export default SampleQuestions;
