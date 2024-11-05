// components/TextEditor.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TextEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        async function fetchDocuments() {
            try {
                const response = await fetch('http://localhost:5000/posts');
                if (response.ok) {
                    const docs = await response.json();
                    console.log(docs);
                    setDocuments(docs);
                } else {
                    console.error('Error fetching documents:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    
        fetchDocuments();
    }, []);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, content }),
            });
    
            if (response.ok) {
                const newDoc = await response.json();
                
                setDocuments(prevDocs => [
                    ...prevDocs,
                    { _id: newDoc.insertedId, title, content }
                ]);
                setTitle("");
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
                        <div key={doc._id}> {/* Använd _id som nyckel */}
                            <h2>{doc.title}</h2>
                            <p>{doc.content}</p>
                            <Link to={`/documents/${doc._id}`}>Visa dokument</Link> {/* Använd doc._id för att inkludera rätt ID */}
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
