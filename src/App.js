import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; // Importera Router och Route
import TextEditor from './components/TextEditor';
import DocumentView from './components/DocumentView';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Välkommen</h1>
        <p>Skapa dokument nedan</p>
        <Switch>
          <Route path="/" exact component={TextEditor} /> {/* Hemvyn */}
          <Route path="/document/:id" component={DocumentView} /> {/* Dokumentvisning */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
