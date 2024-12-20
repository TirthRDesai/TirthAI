import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { useAI } from "@/context/Context";

const AskQuestion = async ({
	generator,
	question,
}: {
	generator: ChatSession;
	question: string;
}) => {
	const { ResumeContent } = useAI();

	const prompt = `
        **Context:** ${ResumeContent}

        **Question:** ${question}

        **Instructions:** 
Respond professionally and naturally, as if engaged in a personal conversation. Share thoughtful, confident opinions on opinion-based questions, and use context or knowledge to answer appropriately. For unrelated or off-topic questions, employ witty humor or wordplay to keep the response engaging but respectful. Don't give out links unnecessarily. Ensure that links are easily identifiable. Format link text or phone number or email as '[Link to/Call/Email Link-Text/Number/Email]'(url/number/email). If a list is necessary, ensure that it is formatted correctly. Show your willingness to help and be professional.
			For example:
			- List item 1: Description
			- List item 2: Description
			- List item 3: Description
		`;

	const response = await generator.sendMessage(prompt);
	return response;
};

export { AskQuestion };
