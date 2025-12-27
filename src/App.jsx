import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import ETFComparator from './components/ETFComparator'
import PortfolioBuilder from './components/PortfolioBuilder'
import IntersectionAnalyzer from './components/IntersectionAnalyzer'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/comparator" element={<ETFComparator />} />
            <Route path="/combination" element={<PortfolioBuilder />} />
            <Route path="/intersection" element={<IntersectionAnalyzer />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

