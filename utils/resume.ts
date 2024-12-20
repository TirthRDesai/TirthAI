import * as pdfjs from "pdfjs-dist";

pdfjs.GlobalWorkerOptions.workerSrc = `pdf.worker.mjs`;

// 2.6.347

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsworker;

export async function GetResumeContent() {
	const pdfUrl = "/contents/TirthResumeOverleaf.pdf";
	const pdf = await pdfjs.getDocument(pdfUrl).promise;

	// let fullText = "";
	let AllTextContents = [];

	for (let i = 1; i <= pdf.numPages; i++) {
		const page = await pdf.getPage(i);
		const textContent = await page.getTextContent();
		// console.log(textContent);
		// const pageText = textContent.items
		// 	.map((item) => {
		// 		console.log(item);

		// 		if ("str" in item) {
		// 			return item.str;
		// 		} else {
		// 			return;
		// 		}
		// 	})
		// 	.join("\n");
		// fullText += pageText + "\n";
		AllTextContents.push(textContent);
	}

	return AllTextContents;
}

export function GetResumeContent2() {
	return `Tirth Desai  
			Resume Link: [https://drive.google.com/file/d/1O2w5BliBh68V9nz7sBvMqcvkU14wcZfP/view?usp=sharing](Resume)
			Github Link: [https://github.com/TirthRDesai](Github)
            LinkedIn Link: [https://linkedin.com/in/tirthrdesai](LinkedIn)
            Portfolio Link: [https://portfolio-c1r9f5yor-tirth-desais-projects.vercel.app/](Portfolio)
            Contact Number: [tel:+17169948109]((716) 994-8109)
            Primary Email: [mailto:tirthrdesai05@gmail.com](tirthrdesai05@gmail.com)
            Student Email: [mailto:tirthrdesai05@gmail.com](tirthdes@buffalo.edu)

---

**Education**  
**State University of New York at Buffalo**  
Buffalo, NY  
*Bachelor of Arts in Computer Science*
GPA: 3.92/4
Aug. 2023 - Jul. 2027  

---

**Projects**  

1. **Image Generators:** Created a web application that uses AI models to transform user prompts into images, showcasing Creative AI. Integrated Hugging Face Models with the Inference API for seamless image generation. Stored generated images in Supabase Database. Built with Next.js, React.js, Tailwind CSS, and TypeScript, ensuring responsive design and smooth user interactions. Enabled users to visualize their imaginations using AI-driven technology.
2. **YouTube Kid-Friendly Chrome Extension:** Developed a Chrome extension to analyze and filter YouTube video comments in real-time, enhancing safety for young audiences. Utilized sentiment analysis models from Hugging Face to assess the tone of comments using NLP techniques. Implemented a filtering system to remove inappropriate language and offensive terms. Built using HTML, CSS, JavaScript, Flask, and Firebase Database, combining front-end and back-end technologies. Improved digital safety for children on YouTube by filtering harmful or offensive content.
3. **Blog Page:** Implemented user authentication, increasing engagement by 30% through personalized user experiences. Improved performance by reducing page load times by 40% using server-side rendering and code splitting. Built using Next.js, React.js, Supabase Database, and Tailwind CSS.
4. **Real-Time Chat Messaging:** Developed a real-time chat application with Socket.io for seamless message exchange. Integrated Express.js and Node.js for backend functionality. Built using Next.js, React.js, Supabase Database, Tailwind CSS, Node.js, Express.js, and Socket.io for a reliable and responsive messaging experience.
---

**Honors and Awards:**
*Best Use of AI/ML Award – UB Hacking (MLH Hackathon), Nov. 2023:* Recognized for innovative use of AI and machine learning in a hackathon setting, demonstrating advanced technical and problem-solving skills.
---

**Volunteer Experience:**
Volunteer, Red Cross Society: Volunteered at a Red Cross camp in India, distributing eyeglasses to underserved communities to support improved vision. Collaborated with team members to raise awareness about HIV/AIDS through campaigns, aiming to inform and reduce stigma in local communities.
---

**Technical Skills**  

- **Languages:** HTML5, CSS, Javascript, Typescript, Java, Python, SQL
- **Frameworks:** Flask, Django, NodeJS, React, NextJS, Express, Nextron
- **Libraries:** Spring Web, Tailwind Css, Bootstrap
- **Tools:** MySQL, SQLite, Supabase Database, Docker, GIT
- **Soft Skills:** Writing, Time Management, Problem Solving, Adaptability, Patience, Critical Thinking, Creativity

---

**Certifications**  

**AI For India**  
*Issued by:* Government of India  
*Date:* Aug. 2023  
- Completed an AI course using Python offered by the Government of India.  

**Python Certification**  
*Issued by:* Government of India  
*Date:* Aug. 2023  
- Completed a Python course offered by the Government of India.  
`;
}
