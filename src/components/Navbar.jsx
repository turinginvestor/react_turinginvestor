import { Link } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import logo from '../assets/logo.png'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-36">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Turing Investor" 
              className="h-32 w-auto"
            />
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/comparator"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ETF Comparator
            </Link>
            <Link
              to="/combination"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Portfolio Builder
            </Link>
            <Link
              to="/intersection"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Intersection Analyzer
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-800"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-gray-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

