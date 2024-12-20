import React from "react";
import { useAI } from "@/context/Context";
import { motion } from "framer-motion";
import logo from "@/public/Logo.png";
import Image from "next/image";
import * as Formattings from "@/utils/Formattings";

const ModelBox = ({ response }: { response: string }) => {
	const [formattedResponse, setFormattedResponse] =
		React.useState<string>("");

	const ApplyFormats = async (response: string) => {
		let formattedResponse = response;
		formattedResponse = Formattings.formatSpacings(formattedResponse);
		formattedResponse =
			Formattings.formatResponseBolding(formattedResponse);
		formattedResponse = Formattings.formatItalic(formattedResponse);
		formattedResponse =
			Formattings.formatResponseWithLists(formattedResponse);
		// formattedResponse = await Formattings.formatMarked(formattedResponse);
		formattedResponse = Formattings.formatLinks(formattedResponse);
		formattedResponse = Formattings.formatPhoneNumber(formattedResponse);
		formattedResponse = Formattings.formatEmail(formattedResponse);
		const finalResponse = `<div>` + formattedResponse + `</div>`;
		setFormattedResponse(finalResponse);
	};

	React.useEffect(() => {
		ApplyFormats(response);
	}, [response]);

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
				src={logo.src}
				alt="User"
				className="w-10 h-10 object-contain aspect-square rounded-full overflow-hidden place-self-start hidden md:block"
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
			<motion.div className=" p-2 rounded-lg ml-2 w-full text-base min-h-[45px] flex items-center">
				<motion.div
					className="text-white/80 text-xs leading-5 tracking-tight md:text-base md:leading-6 md:tracking-normal"
					dangerouslySetInnerHTML={{ __html: formattedResponse }}
				></motion.div>
			</motion.div>
		</motion.div>
	);
};

export default ModelBox;
