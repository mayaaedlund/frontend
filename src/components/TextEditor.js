import { useState, useEffect } from 'react';

function TextEditor() {
    const [title, setTitle] = useState(""); // State-variabel för titel
    const [content, setContent] = useState(""); // State-variabel för innehåll
    const [documents, setDocuments] = useState([]); // För att lagra hämtade dokument

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch('http://localhost:5000/posts'); // Se till att URL:en är korrekt
                if (response.ok) {
                    const docs = await response.json();
                    setDocuments(docs); // Sätt de hämtade dokumenten i state
                } else {
                    console.error('Error fetching documents:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchDocuments(); // Anropa funktionen för att hämta dokument
    }, []); // Tom array innebär att effekten bara körs en gång när komponenten laddas

    const handleSubmit = async (e) => {
        e.preventDefault(); // Förhindra att sidan laddas om

        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }), // Skapa ett objekt med dokumentets data
            });

            if (response.ok) {
                const newDoc = await response.json();
                console.log('Inserted document ID:', newDoc.id);
                setDocuments(prevDocs => [...prevDocs, { id: newDoc.id, title, content }]); // Lägg till det nya dokumentet i state
                setTitle(""); // Rensa fälten efter inlämning
                setContent("");
            } else {
                console.error('Error saving document:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                <h1>Skapade Dokument</h1>
                {documents.length > 0 ? (
                    documents.map(doc => (
                        <div key={doc.id}>
                            <h2>{doc.title}</h2>
                            <p>{doc.content}</p>
                        </div>
                    ))
                ) : (
                    <p>Inga dokument hittades.</p>
                )}
            </div>
        </>
    );
}

export default TextEditor;
