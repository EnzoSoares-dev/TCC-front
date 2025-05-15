import './App.css';
import { Primary } from './components/primary';
import { Secondary } from './components/secondary';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        <Primary onClick={()=>{navigate("/login")}} content={"Login"}/>
        <br/>        
        <Secondary onClick={()=>{navigate("/register")}} content={"Cadastro"}/>
      </header>
    </div>
  );
}

export default App;
