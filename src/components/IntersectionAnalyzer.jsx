import { useState, useEffect } from 'react'
import { Search, X, Loader2, TrendingUp, RotateCcw } from 'lucide-react'
import { searchETFs, getETFData } from '../services/api'

const STORAGE_KEY = 'intersection_analyzer_state'

const IntersectionAnalyzer = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedETFs, setSelectedETFs] = useState([])
  const [etfData, setEtfData] = useState({})
  const [loading, setLoading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [intersectionData, setIntersectionData] = useState(null)

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
    if (window.confirm('Are you sure you want to reset? This will clear all selected ETFs and intersection analysis.')) {
      setSelectedETFs([])
      setEtfData({})
      setIntersectionData(null)
      setSearchQuery('')
      setSearchResults([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    
    setSearching(true)
    setSearchResults([])
    try {
      const response = await searchETFs(searchQuery, 10)
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
      return
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
    setIntersectionData(null)
  }

  // Calculate intersections
  useEffect(() => {
    if (selectedETFs.length < 2) {
      setIntersectionData(null)
      return
    }

    const calculateIntersections = () => {
      try {
        // Get holdings for each ETF, filtering out "Others" or "OTHERS"
        const holdingsByETF = {}
        selectedETFs.forEach(etf => {
          if (!etf || !etf.data) {
            console.warn(`No data for ETF: ${etf?.symbol || 'unknown'}`)
            holdingsByETF[etf?.symbol || 'unknown'] = []
            return
          }
          const data = etf.data
          const holdings = data?.top_holdings || []
          
          // Normalize name for matching (remove common suffixes, extra spaces, etc.)
          // This is used when ticker is null to match holdings by name
          const normalizeName = (name) => {
            if (!name) return ''
            return name
              .toUpperCase()
              .replace(/\s+/g, ' ')
              .replace(/\b(INC|CORP|CORPORATION|CO|LTD|LLC|PLC|AG|SA|NV|AB|CLASS A|CLASS B|CLASS C)\b\.?/gi, '')
              .replace(/[^\w\s]/g, '')
              .trim()
          }
          
          holdingsByETF[etf.symbol] = holdings
            .filter(h => {
              if (!h) return false
              const rawTicker = h.ticker || h.symbol || null
              const ticker = rawTicker ? rawTicker.toUpperCase().trim() : ''
              const name = (h.name || '').toUpperCase()
              // Filter out "Others" holdings
              return ticker !== 'OTHERS' && 
                     ticker !== 'OTHER' &&
                     !name.includes('OTHER HOLDINGS') &&
                     !name.includes('OTHERS')
            })
            .map(h => {
              const rawTicker = h.ticker || h.symbol || null
              const ticker = rawTicker ? rawTicker.toUpperCase().trim() : null
              const name = h.name || ''
              // Create a unique identifier: use ticker if available, otherwise normalized name
              // This ensures holdings with null tickers are matched by name, not by empty string
              const identifier = ticker || normalizeName(name)
              
              return {
                ticker: ticker, // null if no ticker (not empty string)
                name: name,
                weight: h.weight || 0,
                identifier: identifier, // Unique key for matching
              }
            })
        })

      // Find intersections using proper matching
      // We'll match by ticker if both have tickers, otherwise by normalized name
      const allIdentifiers = new Set()
      selectedETFs.forEach(etf => {
        holdingsByETF[etf.symbol].forEach(h => {
          if (h.identifier) {
            allIdentifiers.add(h.identifier)
          }
        })
      })

      const intersections = {}
      const sharedHoldings = []

      allIdentifiers.forEach(identifier => {
        // Find ETFs that have this holding
        const etfsWithHolding = selectedETFs.filter(etf => 
          holdingsByETF[etf.symbol].some(h => h.identifier === identifier)
        )

        if (etfsWithHolding.length > 1) {
          const etfSymbols = etfsWithHolding.map(e => e.symbol).sort().join(' & ')
          if (!intersections[etfSymbols]) {
            intersections[etfSymbols] = []
          }

          const holdingData = {}
          let holdingName = null
          let holdingTicker = null
          
          etfsWithHolding.forEach(etf => {
            const holding = holdingsByETF[etf.symbol].find(h => h.identifier === identifier)
            if (holding) {
              holdingData[etf.symbol] = {
                weight: holding.weight,
                name: holding.name,
              }
              // Use the first non-null name and ticker we find
              if (!holdingName && holding.name) holdingName = holding.name
              if (!holdingTicker && holding.ticker) holdingTicker = holding.ticker
            }
          })

          // Use ticker if available, otherwise use name
          const displayName = holdingName || identifier
          const displayTicker = holdingTicker || identifier
          
          sharedHoldings.push({
            ticker: displayTicker,
            name: displayName,
            etfs: etfSymbols,
            weights: holdingData,
          })
        }
      })

      // Calculate weighted values assuming $100 invested in each ETF
      const baseAllocation = 100
      sharedHoldings.forEach(holding => {
        const etfSymbols = holding.etfs.split(' & ')
        const totalWeight = etfSymbols.reduce((sum, symbol) => {
          const weight = holding.weights[symbol]?.weight || 0
          return sum + (baseAllocation * weight / 100)
        }, 0)

        holding.weightedValue = totalWeight
      })

        setIntersectionData({
          intersections,
          sharedHoldings: sharedHoldings.sort((a, b) => {
            if (a.weightedValue && b.weightedValue) {
              return b.weightedValue - a.weightedValue
            }
            return 0
          }),
          holdingsByETF,
        })
      } catch (error) {
        console.error('Error calculating intersections:', error)
        setIntersectionData(null)
      }
    }

    calculateIntersections()
  }, [selectedETFs, etfData])


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
              Intersection Analyzer
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
              Analyze shared holdings between ETFs with dynamic Venn diagrams
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
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Add ETFs to Analyze
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

        {/* Selected ETFs */}
        {selectedETFs.length > 0 && (
          <div className="card border-gray-200 dark:border-gray-800 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Selected ETFs {selectedETFs.length > 0 && `(${selectedETFs.length})`}
            </h2>
            <div className="space-y-4">
              {selectedETFs.map((etf) => (
                <div
                  key={etf.symbol}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {etf.symbol}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {etf.name}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveETF(etf.symbol)}
                    className="text-red-600 dark:text-red-400 hover:text-red-700 p-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shared Holdings Table */}
        {intersectionData && intersectionData.sharedHoldings.length > 0 && (
          <div className="card border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Shared Holdings ({intersectionData.sharedHoldings.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Company
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Shared By
                    </th>
                    {selectedETFs.map(etf => (
                      <th key={etf.symbol} className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        {etf.symbol} Weight
                      </th>
                    ))}
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">
                      Weighted Value ($100 each)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {intersectionData.sharedHoldings.map((holding, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {holding.name || holding.ticker}
                      </td>
                      <td className="py-3 px-4 text-gray-700 dark:text-gray-300 text-sm">
                        {holding.etfs}
                      </td>
                      {selectedETFs.map(etf => (
                        <td key={etf.symbol} className="py-3 px-4 text-gray-700 dark:text-gray-300">
                          {holding.weights[etf.symbol]?.weight !== undefined
                            ? `${holding.weights[etf.symbol].weight.toFixed(2)}%`
                            : 'N/A'}
                        </td>
                      ))}
                      <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                        {holding.weightedValue
                          ? `$${holding.weightedValue.toFixed(2)}`
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedETFs.length < 2 && (
          <div className="card border-gray-200 dark:border-gray-800 text-center py-12">
            <TrendingUp className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 font-light">
              Add at least 2 ETFs to analyze intersections
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default IntersectionAnalyzer

