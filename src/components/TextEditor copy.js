import { useState } from 'react';

function TextEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const newDocument = { title, content };

        try {
            const response = await fetch('/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newDocument),
            });

            if (response.ok) {
                // Om dokumentet skapades framgångsrikt, rensa formuläret
                setTitle("");
                setContent("");
            } else {
                console.error('Error saving document:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title-field">Titel</label>
                <input
                    type="text"
                    id="title-field"
                    name="title-field"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="content-field">Innehåll</label>
                <textarea
                    id="content-field"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button type="submit">Spara dokument</button>
                <button type="button" onClick={() => { setTitle(""); setContent(""); }}>Rensa</button>
            </form>

            <div id="output-container">
                <h1>{title}</h1>
                <p>{content}</p>
            </div>
        </>
    );
}

export default TextEditor;
