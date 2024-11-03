import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function DocumentView() {
    const { id } = useParams(); // Hämta id:t från URL:en
    const [document, setDocument] = useState(null);

    useEffect(() => {
        async function fetchDocument() {
            try {
                const response = await fetch(`http://localhost:5000/posts/${id}`);
                if (response.ok) {
                    const doc = await response.json();
                    setDocument(doc);
                } else {
                    console.error('Error fetching document:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchDocument();
    }, [id]);

    if (!document) return <p>Laddar...</p>;

    return (
        <div>
            <h1>{document.title}</h1>
            <p>{document.content}</p>
        </div>
    );
}

export default DocumentView;
