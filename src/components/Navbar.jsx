import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Moon, Sun, Github, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import logo from '../assets/logo.png'

const Navbar = () => {
  const { theme, toggleTheme } = useTheme()
  const [toolsOpen, setToolsOpen] = useState(false)

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
          
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            
            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsOpen(!toolsOpen)}
                className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center"
              >
                Tools
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {toolsOpen && (
                <>
                  {/* Backdrop to close dropdown */}
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setToolsOpen(false)}
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg z-50">
                    <Link
                      to="/comparator"
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      ETF Comparator
                    </Link>
                    <Link
                      to="/combination"
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors border-t border-gray-200 dark:border-gray-800"
                    >
                      Portfolio Builder
                    </Link>
                    <Link
                      to="/intersection"
                      onClick={() => setToolsOpen(false)}
                      className="block px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors border-t border-gray-200 dark:border-gray-800"
                    >
                      Intersection Analyzer
                    </Link>
                  </div>
                </>
              )}
            </div>

            <a
              href="https://github.com/turinginvestor/react_turinginvestor"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="View on GitHub"
              title="View on GitHub"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
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

