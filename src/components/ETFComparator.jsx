import { useState, useEffect } from 'react'
import { Search, TrendingUp, DollarSign, PieChart, Info, Loader2, X, RotateCcw, Calendar } from 'lucide-react'
import { searchETFs, getETFData } from '../services/api'

const STORAGE_KEY = 'etf_comparator_state'

const ETFComparator = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedETFs, setSelectedETFs] = useState([])
  const [etfData, setEtfData] = useState({})
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.selectedETFs && parsed.etfData) {
          setSelectedETFs(parsed.selectedETFs)
          setEtfData(parsed.etfData)
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error)
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (selectedETFs.length > 0 || Object.keys(etfData).length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          selectedETFs,
          etfData,
        }))
      } catch (error) {
        console.error('Error saving state:', error)
      }
    }
  }, [selectedETFs, etfData])

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset? This will clear all selected ETFs and comparisons.')) {
      setSelectedETFs([])
      setEtfData({})
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

  const handleAddETF = async (etf) => {
    if (selectedETFs.find(e => e.symbol === etf.symbol)) {
      return // Already added
    }

    setLoading(true)
    try {
      const data = await getETFData(etf.symbol)
      const newETF = {
        symbol: etf.symbol,
        name: etf.name || data.name || etf.symbol,
        data: data,
      }
      setSelectedETFs([...selectedETFs, newETF])
      setEtfData({ ...etfData, [etf.symbol]: data })
    } catch (error) {
      console.error('Error fetching ETF data:', error)
      alert(`Failed to fetch data for ${etf.symbol}. Please try again.`)
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveETF = (symbol) => {
    setSelectedETFs(selectedETFs.filter(e => e.symbol !== symbol))
    const newData = { ...etfData }
    delete newData[symbol]
    setEtfData(newData)
  }

  const formatExpenseRatio = (er) => {
    if (er === null || er === undefined) return 'N/A'
    return `${(er * 100).toFixed(3)}%`
  }

  // Get most recent dividend - use the latest dividend from recent_dividends
  const getMostRecentDividend = (dividendInfo) => {
    // Use the most recent dividend from recent_dividends array
    // This is the most accurate and up-to-date dividend information
    if (dividendInfo?.recent_dividends && Array.isArray(dividendInfo.recent_dividends) && dividendInfo.recent_dividends.length > 0) {
      const mostRecent = dividendInfo.recent_dividends[0]
      if (mostRecent?.amount && mostRecent.amount > 0) {
        return mostRecent.amount
      }
    }
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              ETF Comparator
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Compare multiple ETFs side-by-side with key metrics
            </p>
          </div>
          {(selectedETFs.length > 0 || Object.keys(etfData).length > 0) && (
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

        {/* Search Section */}
        <div className="card mb-8">
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
                      disabled={loading || selectedETFs.find(e => e.symbol === etf.symbol)}
                      className="btn-primary text-sm"
                    >
                      {selectedETFs.find(e => e.symbol === etf.symbol) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selected ETFs Comparison */}
        {selectedETFs.length > 0 && (
          <div className="card border-gray-200 dark:border-gray-800 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Comparison ({selectedETFs.length} ETF{selectedETFs.length > 1 ? 's' : ''})
            </h2>
            
            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      ETF
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Expense Ratio
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedETFs.map((etf) => {
                    const data = etf.data
                    // Expense ratio is at top level, not in fund_operations
                    const expenseRatio = data?.expense_ratio || data?.fund_operations?.expense_ratio
                    
                    return (
                      <tr
                        key={etf.symbol}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white">
                          {etf.symbol}
                        </td>
                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                          {etf.name}
                        </td>
                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                          {formatExpenseRatio(expenseRatio)}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleRemoveETF(etf.symbol)}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Detailed ETF Cards */}
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              {selectedETFs.map((etf) => {
                const data = etf.data
                // API returns top_holdings, not holdings
                const holdings = data?.top_holdings?.slice(0, 10) || data?.holdings?.slice(0, 10) || []
                const sectors = data?.sector_weightings || {}
                const dividendInfo = data?.dividend_info || {}
                const mostRecentDividend = getMostRecentDividend(dividendInfo)
                
                return (
                  <div key={etf.symbol} className="card border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {etf.symbol}
                      </h3>
                      <button
                        onClick={() => handleRemoveETF(etf.symbol)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Expense Ratio
                        </span>
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatExpenseRatio(data?.expense_ratio || data?.fund_operations?.expense_ratio)}
                        </span>
                      </div>
                      {mostRecentDividend && mostRecentDividend > 0 && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 dark:text-gray-400 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Last Paid Out Dividend per Share
                          </span>
                          <span className="font-semibold text-gray-900 dark:text-white">
                            ${mostRecentDividend.toFixed(3)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Top Holdings */}
                    {holdings.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <PieChart className="h-4 w-4 mr-2" />
                          Top Holdings
                        </h4>
                        <div className="space-y-1">
                          {holdings.map((holding, idx) => (
                            <div
                              key={idx}
                              className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                            >
                              <span>{holding.name || holding.ticker || holding.symbol || 'N/A'}</span>
                              <span className="font-semibold">
                                {holding.weight !== undefined && holding.weight !== null 
                                  ? `${holding.weight.toFixed(2)}%` 
                                  : 'N/A'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sector Weightings */}
                    {Object.keys(sectors).length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-2" />
                          Sector Allocation
                        </h4>
                        <div className="space-y-1">
                          {Object.entries(sectors).slice(0, 5).map(([sector, weight]) => (
                            <div
                              key={sector}
                              className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                            >
                              <span>{sector}</span>
                              <span className="font-semibold">
                                {weight ? `${(weight * 100).toFixed(2)}%` : 'N/A'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recent Dividend History */}
                    {dividendInfo?.recent_dividends && Array.isArray(dividendInfo.recent_dividends) && dividendInfo.recent_dividends.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Recent Dividends
                        </h4>
                        <div className="space-y-1">
                          {dividendInfo.recent_dividends.slice(0, 4).map((dividend, idx) => {
                            const date = dividend.date ? new Date(dividend.date) : null
                            const formattedDate = date ? date.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            }) : dividend.date || 'N/A'
                            
                            return (
                              <div
                                key={idx}
                                className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                              >
                                <span>{formattedDate}</span>
                                <span className="font-semibold">
                                  ${dividend.amount ? dividend.amount.toFixed(3) : 'N/A'}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {selectedETFs.length === 0 && (
          <div className="card border-gray-200 dark:border-gray-800 text-center py-12">
            <Search className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-light">
              Search and add ETFs to start comparing
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ETFComparator

