import { GetResumeContent2 } from "@/utils/resume";
import { GenerateContentResult } from "@google/generative-ai";
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
	list: {
		question: string;
		response: GenerateContentResult;
	}[];
	isGenerating: boolean;
	count: number;
	tempQuestion: string;
	response: string;
	question: string;
	finalResponse: string;
	ResumeContent: string;
	history: HistoryType[];

	setList: React.Dispatch<
		React.SetStateAction<
			{ question: string; response: GenerateContentResult }[]
		>
	>;
	setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
	setCount: React.Dispatch<React.SetStateAction<number>>;
	setTempQuestion: React.Dispatch<React.SetStateAction<string>>;
	setResponse: React.Dispatch<React.SetStateAction<string>>;
	setQuestion: React.Dispatch<React.SetStateAction<string>>;
	setFinalResponse: React.Dispatch<React.SetStateAction<string>>;
}

const context = createContext<ContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [list, setList] = useState<
		{
			question: string;
			response: GenerateContentResult;
		}[]
	>([]);

	const Instructions = ` Opinion based questions should be responded with your personal opinion. Do not respond to anything that is not related to the context. If the question is not related to the provided information, respond with sarcastic humor or do some wordplay and then give out funny reponse. Be concise and informative and professional. Imagine you are in a conversation about your career. Respond naturally as Tirth Desai. For general questions, answer based on your knowledge. For personal questions, answer based on the context provided. Respond as if you are communicating in person. Don't give out links unnecessarily. Ensure that links are easily identifiable. Format link text or phone number or email as '[Link to/Call/Email Link-Text/Number/Email]'(url/number/email). If a list is necessary, ensure that it is formatted correctly. Show your willingness to help and be professional.
			For example:
			- List item 1: Description
			- List item 2: Description
			- List item 3: Description`;

	const [isGenerating, setIsGenerating] = useState<boolean>(false);
	const [count, setCount] = useState<number>(0);
	const [tempQuestion, setTempQuestion] = useState<string>("");

	const [response, setResponse] = useState<string>("");
	const [question, setQuestion] = useState<string>("");
	const [finalResponse, setFinalResponse] = useState<string>("");
	const [history, setHistory] = useState<HistoryType[]>([]);

	// Initialize Model
	const genAI = new GoogleGenerativeAI(
		process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
	);
	const model = genAI.getGenerativeModel({
		model: "gemini-1.5-flash",
	});

	const [generator, setGenerator] = useState<ChatSession>(
		model.startChat({
			history: history,
		})
	);

	const ResumeContent = GetResumeContent2();

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

			setGenerator(
				model.startChat({
					history: history,
				})
			);
		};
		if (question.trim().length > 0 && !isGenerating) {
			Generate();
		}
	}, [question]);

	return (
		<context.Provider
			value={{
				list,
				isGenerating,
				count,
				tempQuestion,
				response,
				question,
				finalResponse,
				ResumeContent,
				history,

				setList,
				setIsGenerating,
				setCount,
				setTempQuestion,
				setResponse,
				setQuestion,
				setFinalResponse,
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
