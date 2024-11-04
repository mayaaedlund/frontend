// components/DocumentViewer.js
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DocumentView() {
    const { id } = useParams(); // Hämta id från URL:en
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchDocument() {
            try {
                const response = await fetch(`http://localhost:5000/posts/${id}`);
                if (!response.ok) {
                    throw new Error('Dokumentet kunde inte hämtas');
                }
                const doc = await response.json();
                setDocument(doc);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDocument();
    }, [id]);

    if (loading) return <p>Laddar dokument...</p>;
    if (error) return <p>Fel: {error}</p>;

    return (
        <div>
            <h1>{document.title}</h1>
            <p>{document.content}</p>
        </div>
    );
}

export default DocumentView;
