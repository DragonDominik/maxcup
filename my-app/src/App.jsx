import { useState } from 'react';
import './App.css';
import GridMotion from './components/GridMotion';

function App() {
  const [count, setCount] = useState(0);

  const items = [
  ];

  return (
     <div className="w-full min-h-[1024px] bg-gray-50">
      <GridMotion items={items} gradientColor="#fff" />
    </div>
  );
}

export default App;
