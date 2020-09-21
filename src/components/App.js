import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
	const [html, setHtml] = useLocalStorage("html", "");
	const [css, setCss] = useLocalStorage("css", "");
	const [js, setJs] = useLocalStorage("js", "");

	const [srcDoc, setSrcDoc] = useState("");

	// To prevent Codes from running immediately (real-time)
	useEffect(() => {
		const timeout = setTimeout(() => {
			setSrcDoc(`
      		  <html>
      		    <body>${html}</body>
      		    <style>${css}</style>
      		    <script>${js}</script>
      		  </html>
      		`);
		}, 250); // Run after 250ms

		// To anticipate changes happened during 250ms, below is the code to cancel timeout function.
		return () => clearTimeout(timeout); // In other words, this will cancel previous changes and override it with the latest changes.
	}, [html, css, js]);

	return (
		<>
			<div className="pane top-pane">
				<Editor
					language="xml"
					displayName="HTML"
					value={html}
					onChange={setHtml}
				/>
				<Editor
					language="css"
					displayName="CSS"
					value={css}
					onChange={setCss}
				/>
				<Editor
					language="javascript"
					displayName="JS"
					value={js}
					onChange={setJs}
				/>
			</div>
			<div className="pane">
				<iframe
					srcDoc={srcDoc}
					title="output"
					sandbox="allow-scripts" // security reason (e.g. Cookie Steal)
					frameBorder="0"
					width="100%"
					height="100%"
				/>
			</div>
		</>
	);
}

export default App;
