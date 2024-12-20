import DOMPurify from "dompurify";
import { renderToString } from "react-dom/server";
import { FaExternalLinkAlt } from "react-icons/fa";
import { marked } from "marked";

const formatSpacings = (response: string) => {
	let output = response
		.split("\n")
		.map((line) => line.replace(/\s+/g, " ").trim())
		.join("\n");
	return output;
};

const formatLinks = (response: string) => {
	const regex = /\[([^\]]+)\]\((https?:\/\/[^\s]+)\)/gm;

	return response.replace(regex, (match, text, url) => {
		const iconHtml = renderToString(
			<FaExternalLinkAlt
				className="inline ml-0 w-fit h-fit"
				size={12}
				fontSize={12}
			/>
		);
		return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="link-text">${text.trim()} ${iconHtml}</a>`;
	});
};

const formatPhoneNumber = (response: string) => {
	const regex = /\[tel:(\d+)\]\((\d+)\)/gm;

	return response.replace(regex, (match, text, url) => {
		return `<a href="tel:${url}" class="link-text">${text.trim()}</a>`;
	});
};

const formatEmail = (response: string) => {
	const regex = /\[mailto:([^\]]+)\]\(([^)]+)\)/gm;

	return response.replace(regex, (match, text, url) => {
		return `<a href="mailto:${url}" class="link-text">${text.trim()}</a>`;
	});
};

const formatMarked = async (response: string) => {
	return await marked(response);
};

const formatResponseBolding = (response: string) => {
	let output = response.replace(
		/\*\*(.+?)\*\*|\*\*([^*]+)$/gm,
		(match, group1, group2) => {
			if (group1) {
				return `<strong>${group1}</strong>`; // Full bold tag
			} else if (group2) {
				return `<strong>${group2}</strong>*`; // Incomplete bold tag, keep trailing *
			}
			return match; // No match, return original
		}
	);

	return output;
};

const formatHeadings = (response: string) => {
	let output = response
		.replace(/^# (.+?)$/gm, "<h1>$1</h1>")
		.replace(/^## (.+?)$/gm, "<h2>$1</h2>")
		.replace(/^### (.+?)$/gm, "<h3>$1</h3>")
		.replace(/^#### (.+?)$/gm, "<h4>$1</h4>")
		.replace(/^##### (.+?)$/gm, "<h5>$1</h5>")
		.replace(/^###### (.+?)$/gm, "<h6>$1</h6>");
	return output;
};

const formatResponseWithLists = (response: string) => {
	if (!response) return "";

	let output = response.replace(
		/^(-|\*|\d+\.) (.+?)(?=\n|$)/gm,
		"<li>$2</li>"
	);

	// 3. Wrap in <ul> or <ol> if list items are found
	if (output.includes("<li>")) {
		if (response.match(/<li.*?>\d+\. /)) {
			output = `<ol>${output}</ol>`;
		} else {
			output = `<ul>${output}</ul>`;
		}
	} else {
		//If it is not a list, convert new lines to paragraph tags
		output = response.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");

		// 4. Wrap in <p> if not already wrappeD
		if (!output.includes("<p>")) {
			output = `<p>${output}</p>`;
		}
	}

	// 5. Sanitize the HTML (VERY IMPORTANT!)
	output = DOMPurify.sanitize(output);
	return output;
};

const formatItalic = (response: string) => {
	let formattedWithItalics = response.replace(/\*(.+?)\*/g, "<em>$1</em>"); // Replace *text* with <em>text</em>
	formattedWithItalics = formattedWithItalics.replace(
		/_(.+?)_/g,
		"<em>$1</em>"
	); // Replace _text_ with <em>text</em>

	return formattedWithItalics;
};

export {
	formatSpacings,
	formatLinks,
	formatResponseBolding,
	formatHeadings,
	formatResponseWithLists,
	formatItalic,
	formatMarked,
	formatPhoneNumber,
	formatEmail,
};
