import { GetResumeContent2 } from "@/utils/resume";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
// import OpenAI from "openai";

type HistoryType = {
	role: "model" | "user";
	parts: {
		text: string;
	}[];
};

interface ContextType {
	isGenerating: boolean;
	count: number;
	question: string;
	ResumeContent: string;
	history: HistoryType[];

	setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	setQuestion: React.Dispatch<React.SetStateAction<string>>;
}

const context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const Instructions = `Opinion based questions should be responded with your personal opinion. Do not respond to anything that is not related to the context. If the question is not related to the provided information, do some wordplay and respond with humor. Otherwise be concise and informative and professional. Imagine you are in a conversation about your career. Respond naturally as Tirth Desai. For general questions, answer based on your knowledge. For personal questions, answer based on the context provided. Respond as if you are communicating in person. Don't give out links unnecessarily. Format any links in the format [link url]('Go to ' referencename). Format any phone number as [tel:number](Correctly Formatted Phone Number). Format any email as [mailto:email](Correctly Formatted Email). Any required information from the header section should be given in list and also the link and text should exactly be the same. If a list is necessary, ensure that it is formatted correctly. Show your willingness to help and be professional. Don't give contact information unnecessarily. Focus on what is asked and provide a clear and concise response.
			For example:
			- List item 1: Description
			- List item 2: Description
			- List item 3: Description`;

	const [isGenerating, setIsGenerating] = useState<boolean>(false);
	const [count, setCount] = useState<number>(0);

	const [question, setQuestion] = useState<string>("");
	const [history, setHistory] = useState<HistoryType[]>([]);

	// Initialize Model
	const genAI = new GoogleGenerativeAI(
		process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
	);
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});
	const ResumeContent = GetResumeContent2();

	const [generator, setGenerator] = useState<ChatSession>(
		model.startChat({
			history: history,
		})
	);

	const AddToHistory = (role: "model" | "user", text: string) => {
		const newMessage: HistoryType = {
			role: role,
			parts: [{ text: text }],
		};

		setHistory((history) => [...history, newMessage]);
	};

	const AskQuestion = async () => {
		const prompt = `
        **Context:** ${ResumeContent}

        **Question:** ${question}

        **Instructions:** 
             ${Instructions}
		`;

		const response = await generator.sendMessage(prompt);

		console.log(response.response.text());
		return response;
	};

	useEffect(() => {
		const Generate = async () => {
			setIsGenerating(true);
			AddToHistory("user", question);
			const response = await AskQuestion();
			AddToHistory("model", response.response.text());
			setCount((count) => count + 1);
			setIsGenerating(false);
		};
		if (question.trim().length > 0 && !isGenerating) {
			Generate();
		}
	}, [question]);

	return (
		<context.Provider
			value={{
				isGenerating,
				count,
				question,
				ResumeContent,
				history,
				setIsGenerating,
				setCount,
				setQuestion,
			}}
		>
			{children}
		</context.Provider>
	);
};

export const useAI = () => {
	const currentContext = useContext(context);
	if (!currentContext) {
		throw new Error("useUser must be used within a ContextProvider");
	}
	return currentContext;
};
