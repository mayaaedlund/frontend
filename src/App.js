// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TextEditor from './components/TextEditor';
import DocumentView from './components/DocumentView';

function App() {
  return (
      <Router>
          <div className="App">
              <h1>Min app</h1>
              <Routes>
                  <Route path="/" element={<TextEditor />} />
                  <Route path="/documents/:id" element={<DocumentView />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
