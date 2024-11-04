// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextEditor from './components/TextEditor';
import DocumentView from './components/DocumentView';

function App() {
  return (
      <Router>
          <div className="App">
              <h1>Välkommen</h1>
              <p>Skapa dokument nedan</p>
              <Routes>
                  <Route path="/" element={<TextEditor />} />
                  <Route path="/documents/:id" element={<DocumentView />} /> {/* Lägg till route för DocumentView */}
              </Routes>
          </div>
      </Router>
  );
}

export default App;
