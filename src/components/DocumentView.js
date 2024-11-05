import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DocumentView() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { title, content } = e.target.elements;
    
        try {
            const response = await fetch(`http://localhost:5000/posts/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: document._id,
                    title: title.value,
                    content: content.value,
                }),
            });
    
            if (!response.ok) {
                throw new Error('Fel vid uppdatering av dokument');
            }

            navigate(`/`);
        } catch (err) {
            setError(err.message);
        }
    };
    

    if (loading) return <p>Laddar dokument...</p>;
    if (error) return <p>Fel: {error}</p>;

    return (
        <div>
            <h1>Uppdatera Dokument</h1>
            <form onSubmit={handleUpdate}>
                <input type="hidden" name="id" value={document._id} /> {/* Dölja ID:t */}
                
                <label htmlFor="title">Titel</label>
                <input type="text" name="title" defaultValue={document.title} required />

                <label htmlFor="content">Innehåll</label>
                <textarea name="content" required defaultValue={document.content}></textarea>

                <input type="submit" value="Uppdatera" />
            </form>
        </div>
    );
}

export default DocumentView;
