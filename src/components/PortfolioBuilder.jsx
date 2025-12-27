import { useState, useEffect } from 'react'
import { Search, Plus, X, TrendingUp, DollarSign, PieChart, Loader2, Calculator, RotateCcw } from 'lucide-react'
import { searchETFs, comparePortfolio } from '../services/api'

const STORAGE_KEY = 'portfolio_builder_state'

const PortfolioBuilder = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [allocations, setAllocations] = useState([])
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [comparing, setComparing] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.allocations) {
          setAllocations(parsed.allocations)
        }
        if (parsed.portfolioData) {
          setPortfolioData(parsed.portfolioData)
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (allocations.length > 0 || portfolioData) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          allocations,
          portfolioData,
        }))
      } catch (error) {
        console.error('Error saving state:', error)
      }
    }
  }, [allocations, portfolioData])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? This will clear all portfolio allocations and analysis.')) {
      setAllocations([])
      setPortfolioData(null)
      setSearchQuery('')
      setSearchResults([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setSearching(true)
    setSearchResults([]) // Clear previous results
    try {
      const response = await searchETFs(searchQuery, 10)
      // API returns { query: "...", results: [...] }
      const results = response?.results || response || []
      const resultsArray = Array.isArray(results) ? results : []
      setSearchResults(resultsArray)
      
      if (resultsArray.length === 0) {
        console.log('No results found for:', searchQuery)
      }
    } catch (error) {
      console.error('Search error:', error)
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to search ETFs. Please try again.'
      alert(errorMessage)
    } finally {
      setSearching(false)
    }
  }

  const handleAddETF = (etf) => {
    if (allocations.find(a => a.symbol === etf.symbol)) {
      return // Already added
    }
    
    const newAllocation = {
      symbol: etf.symbol,
      name: etf.name || etf.symbol,
      dollars: 0,
    }
    setAllocations([...allocations, newAllocation])
    setSearchQuery('')
    setSearchResults([])
  }

  const handleRemoveETF = (symbol) => {
    setAllocations(allocations.filter(a => a.symbol !== symbol))
    setPortfolioData(null)
  }

  const handleUpdateDollars = (symbol, dollars) => {
    setAllocations(
      allocations.map(a =>
        a.symbol === symbol ? { ...a, dollars: parseFloat(dollars) || 0 } : a
      )
    )
    setPortfolioData(null) // Clear previous results when updating
  }

  const handleCompare = async () => {
    const validAllocations = allocations.filter(a => a.dollars > 0)
    
    if (validAllocations.length === 0) {
      alert('Please add at least one ETF with a dollar amount greater than 0')
      return
    }

    setComparing(true)
    try {
      const result = await comparePortfolio(validAllocations)
      setPortfolioData(result)
    } catch (error) {
      console.error('Comparison error:', error)
      
      // Try to extract error message from various possible locations
      const errorData = error?.response?.data || {}
      const errorMessage = errorData?.detail || errorData?.message || error?.message || ''
      
      // Check if error mentions specific symbols
      let failedSymbols = []
      if (errorData?.failed_symbols) {
        failedSymbols = errorData.failed_symbols
      } else if (errorMessage) {
        // Try to extract symbols from error message
        const symbolMatch = errorMessage.match(/symbol[s]?:?\s*([A-Z]+(?:,\s*[A-Z]+)*)/i)
        if (symbolMatch) {
          failedSymbols = symbolMatch[1].split(',').map(s => s.trim())
        }
      }
      
      // Build user-friendly error message
      let userMessage = 'Failed to compare portfolio.'
      
      if (failedSymbols.length > 0) {
        userMessage = `Failed to fetch data for ${failedSymbols.join(', ')}. Please check the symbols and try again.`
      } else if (errorMessage.includes('Could not fetch data')) {
        // API returns this when ETFs can't be fetched
        const symbols = validAllocations.map(a => a.symbol).join(', ')
        userMessage = `Failed to fetch data for ${symbols}. Please verify the ETF symbols are correct and try again.`
      } else if (errorMessage.includes('404') || errorMessage.includes('not found')) {
        userMessage = `One or more ETFs could not be found. Please verify all ETF symbols are correct and try again.`
      } else if (errorMessage) {
        userMessage = `Failed to compare portfolio: ${errorMessage}`
      } else {
        userMessage = 'Failed to compare portfolio. Please verify all ETF symbols are correct and try again.'
      }
      
      alert(userMessage)
    } finally {
      setComparing(false)
    }
  }

  const totalDollars = allocations.reduce((sum, a) => sum + (a.dollars || 0), 0)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              Portfolio Builder
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Build and analyze ETF combinations with portfolio insights
            </p>
          </div>
          {(allocations.length > 0 || portfolioData) && (
            <button
              onClick={handleReset}
              className="btn-secondary flex items-center gap-2"
              title="Reset all data"
            >
              <RotateCcw className="h-4 w-4" />
              Reset
            </button>
          )}
        </div>

        {/* Search and Add Section */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Add ETFs to Your Portfolio
          </h2>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for ETFs (e.g., SPY, QQQ, VOO)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input-field"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={searching}
              className="btn-primary flex items-center"
            >
              {searching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Search className="h-5 w-5 mr-2" />
              )}
              Search
            </button>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Search Results
              </h3>
              <div className="space-y-2">
                {searchResults.map((etf) => (
                  <div
                    key={etf.symbol}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {etf.symbol}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {etf.name}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddETF(etf)}
                      disabled={allocations.find(a => a.symbol === etf.symbol)}
                      className="btn-primary text-sm flex items-center"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      {allocations.find(a => a.symbol === etf.symbol) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Portfolio Allocations */}
        {allocations.length > 0 && (
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Portfolio Allocations
            </h2>
            <div className="space-y-4">
              {allocations.map((allocation) => (
                <div
                  key={allocation.symbol}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {allocation.symbol}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {allocation.name}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={allocation.dollars || ''}
                      onChange={(e) => handleUpdateDollars(allocation.symbol, e.target.value)}
                      placeholder="0.00"
                      className="input-field w-32"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveETF(allocation.symbol)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Total Portfolio Value
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalDollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <button
                onClick={handleCompare}
                disabled={comparing || totalDollars === 0}
                className="btn-primary w-full flex items-center justify-center"
              >
                {comparing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Calculator className="h-5 w-5 mr-2" />
                    Analyze Portfolio
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Analysis Results */}
        {portfolioData && (
          <div className="space-y-6">
            {/* Summary Card */}
            <div className="card border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                Portfolio Analysis
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <DollarSign className="h-5 w-5 text-gray-900 dark:text-gray-100 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
                      Weighted Avg Expense Ratio
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolioData.weighted_expense_ratio || portfolioData.weighted_average_expense_ratio
                      ? `${((portfolioData.weighted_expense_ratio || portfolioData.weighted_average_expense_ratio) * 100).toFixed(3)}%`
                      : 'N/A'}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <PieChart className="h-5 w-5 text-gray-900 dark:text-gray-100 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
                      Unique Holdings
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolioData.merged_holdings?.length || 0}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center mb-2">
                    <TrendingUp className="h-5 w-5 text-gray-900 dark:text-gray-100 mr-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-400 font-light">
                      Portfolio ETFs
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(portfolioData.allocations || portfolioData.portfolio_breakdown)?.length || 0}
                  </div>
                </div>
              </div>

              {/* Portfolio Breakdown */}
              {(portfolioData.allocations || portfolioData.portfolio_breakdown) && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Portfolio Breakdown
                  </h3>
                  <div className="space-y-2">
                    {(portfolioData.allocations || portfolioData.portfolio_breakdown).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                      >
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {item.symbol}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            ${item.dollars.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({item.weight_percent || item.percentage ? (item.weight_percent || item.percentage).toFixed(2) : '0.00'}%)
                          </div>
                        </div>
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          ER: {item.expense_ratio ? `${(item.expense_ratio * 100).toFixed(3)}%` : 'N/A'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Merged Holdings */}
            {portfolioData.merged_holdings && portfolioData.merged_holdings.length > 0 && (
              <div className="card border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                  Combined Holdings (Top 20)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          Company
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          Combined Weight
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolioData.merged_holdings.slice(0, 20).map((holding, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="py-3 px-4 text-gray-900 dark:text-white">
                            {holding.name || holding.ticker || holding.symbol || 'N/A'}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                            {holding.weight !== undefined && holding.weight !== null
                              ? `${holding.weight.toFixed(2)}%`
                              : holding.combined_weight
                              ? `${(holding.combined_weight * 100).toFixed(2)}%`
                              : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {allocations.length === 0 && (
          <div className="card border-gray-200 dark:border-gray-800 text-center py-12">
            <Calculator className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-light">
              Search and add ETFs to build your portfolio
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PortfolioBuilder

