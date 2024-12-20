import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<link
					rel="icon"
					href="/logo.png"
				/>
				<title>Tirth AI</title>
				<meta
					name="description"
					content="Tirth AI is a generative AI model that can answer your questions."
				/>
				<meta
					name="keywords"
					content="Tirth AI, AI, Generative AI, Chatbot, Chat, Chatbot AI, AI Chatbot, AI Chat"
				/>
				<meta
					name="author"
					content="Tirth Desai"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0"
				/>
				<meta
					name="google-site-verification"
					content="kszQkDx1MaBpLfiTQZAFtR7z_q2_0anq6vtCfdbBe1M"
				/>
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
