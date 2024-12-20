import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import { AnimatePresence, motion } from "motion/react";
import TirthAI from "@/components/TirthAI";
import SampleQuestions from "@/components/SampleQuestions";
import { useAI } from "@/context/Context";
import UserBox from "@/components/User";
import ModelBox from "@/components/Model";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function Home() {
	const { isGenerating, history, setQuestion, setIsGenerating } = useAI();

	return (
		<motion.div className="w-screen h-svh bg-[#1c1c1c] overflow-hidden">
			<motion.div className="flex flex-col items-center justify-center h-full py-2 overflow-hidden w-full">
				<motion.section
					className="flex flex-col items-start justify-start gap-9 w-full px-4 lg:px-20 md:px-10 md:w-[85%]
                 lg:w-4/5 flex-1 text-center   scrollbar overflow-x-hidden"
					style={{
						fontFamily: geistMono.style.fontFamily,
						overflowY: history.length > 0 ? "scroll" : "hidden",
					}}
					id="ChatSection"
				>
					<AnimatePresence>
						{history.length === 0 && !isGenerating && (
							<motion.div
								className="w-full h-full flex flex-col items-center justify-start pt-10 gap-4"
								initial={{
									opacity: 0,
									y: 100,
								}}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.5,
									},
								}}
								transition={{
									duration: 0.5,
								}}
								exit={{
									opacity: 0,
									y: -100,
									transition: {
										duration: 0.5,
									},
								}}
							>
								<TirthAI />
							</motion.div>
						)}
					</AnimatePresence>
					{history.length === 0 && !isGenerating && (
						<SampleQuestions setIsGenerating={setIsGenerating} />
					)}
					<motion.div className="w-full h-full flex flex-col items-center justify-start pt-10 gap-4">
						{history.length > 0
							? history.map((message, index) => (
									<motion.div
										key={message.parts[0].text + index}
										style={{
											whiteSpace: "pre-wrap",
											textAlign: "left",
											fontSize: "0.9rem",
										}}
										className="text-white/60 w-full"
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
										<AnimatePresence>
											{message.role === "user" && (
												<motion.div
													key={index}
													className="w-full"
													initial={{
														opacity: 0,
														y: 100,
													}}
													animate={{
														opacity: 1,
														y: 0,
														transition: {
															duration: 0.5,
															delay:
																index == 0
																	? 0.5
																	: 0,
														},
													}}
													transition={{
														duration: 0.5,
													}}
												>
													<UserBox
														question={
															message.parts[0]
																.text
														}
													/>
												</motion.div>
											)}
											{message.role === "model" && (
												<ModelBox
													response={
														message.parts[0].text
													}
												/>
											)}
										</AnimatePresence>
									</motion.div>
							  ))
							: ""}
					</motion.div>
				</motion.section>
				<motion.section className="w-full h-fit flex flex-row items-center justify-center relative">
					<motion.input
						type="text"
						placeholder="Ask me anything..."
						id="QuestionInput"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								setQuestion(e.currentTarget.value);
								e.currentTarget.value = "";
							}
						}}
						style={{
							fontFamily: geistSans.style.fontFamily,
							fontSize: "0.9rem",
						}}
						className="w-full md-w-4/5 lg:w-3/4 text-white/90 text-left px-4 h-12 bg-transparent rounded-lg m-4 text-md border-0 border-b-2 border-blue-700 shadow-sm shadow-blue-600 ring-0 outline-none "
						initial={{
							y: 100,
						}}
						animate={{
							y: 0,
							transition: {
								duration: 0.3,
								delay: 5.5,
							},
						}}
						transition={{
							duration: 0.5,
						}}
					/>
					<motion.button
						className="hover:underline absolute top-7 right-8 lg:right-[calc(7.5%+5rem)] text-white/90 text-md"
						style={{ x: 0 }}
						initial={{
							x: 20,
							opacity: 0,
						}}
						animate={{
							x: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								delay: 5.7,
							},
						}}
						transition={{
							duration: 0.5,
						}}
						onClick={(e) => {
							const question = document.getElementById(
								"QuestionInput"
							) as HTMLInputElement;
							setQuestion(question.value);
							question.value = "";
						}}
					>
						Ask
					</motion.button>
				</motion.section>
			</motion.div>
		</motion.div>
	);
}
