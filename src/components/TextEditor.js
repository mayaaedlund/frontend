import { useState } from 'react';


function TextEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    function clear(e) {
        e.preventDefault();

        setTitle("");
        setContent("");
    }

    return (
      <>
        <label htmlFor="title-field">Titel</label>
        <input type="text" id="title-field" name="title-field" value={title} 
        onChange={(e) => setTitle(e.target.value)} />

        <label htmlFor="content-field">Innehåll</label>
        <textarea id="content-field" value={content} 
        onChange={(e) => setContent(e.target.value)}></textarea>

        <button id="print-message" onClick={clear}>Rensa</button>

        <div id="output-container">
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
      </>
    );
  }
  
  export default TextEditor;