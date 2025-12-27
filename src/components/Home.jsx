import { Link } from 'react-router-dom'
import { TrendingUp, DollarSign, Zap, BookOpen, Rocket, Calculator, GitBranch } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
              Empowering Everyday Investors
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto font-light">
              Free financial tools for everyone. No subscriptions, no credit cards, no limitations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/comparator"
                className="btn-primary text-sm px-8 py-3 inline-flex items-center justify-center"
              >
                <Rocket className="mr-2 h-4 w-4" />
                Compare ETFs
              </Link>
              <Link
                to="/combination"
                className="btn-secondary text-sm px-8 py-3 inline-flex items-center justify-center"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Build Portfolio
              </Link>
              <Link
                to="/intersection"
                className="btn-secondary text-sm px-8 py-3 inline-flex items-center justify-center"
              >
                <GitBranch className="mr-2 h-4 w-4" />
                Intersection Analyzer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            To provide free or low-cost financial tools that other websites charge for, 
            making investing more accessible for everyone.
          </p>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
            Featured Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* ETF Comparator */}
            <div className="card border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <Rocket className="h-6 w-6 text-gray-900 dark:text-gray-100 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  ETF Comparator
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                Compare multiple ETFs side-by-side with key metrics including:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8 font-light">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Performance tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Expense ratios and fees</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Asset allocation basics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Basic dividend information</span>
                </li>
              </ul>
              <Link
                to="/comparator"
                className="btn-primary inline-block text-sm"
              >
                Try ETF Comparator
              </Link>
            </div>

            {/* ETF Combination Tool */}
            <div className="card border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <Calculator className="h-6 w-6 text-gray-900 dark:text-gray-100 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Portfolio Builder
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                Build and analyze ETF combinations with:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8 font-light">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Simple portfolio construction</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Basic risk metrics</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Correlation analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Rebalancing suggestions</span>
                </li>
              </ul>
              <Link
                to="/combination"
                className="btn-primary inline-block text-sm"
              >
                Try Portfolio Builder
              </Link>
            </div>

            {/* Intersection Analyzer */}
            <div className="card border-gray-200 dark:border-gray-800">
              <div className="flex items-center mb-6">
                <GitBranch className="h-6 w-6 text-gray-900 dark:text-gray-100 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Intersection Analyzer
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-light">
                Analyze shared holdings between ETFs with:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-8 font-light">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Dynamic Venn diagrams</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Shared holdings identification</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Weighted intersection analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-900 dark:text-gray-300">•</span>
                  <span>Overlap visualization</span>
                </li>
              </ul>
              <Link
                to="/intersection"
                className="btn-primary inline-block text-sm"
              >
                Try Intersection Analyzer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Turing Investor Section */}
      <section className="py-16 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
            Why Turing Investor?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <DollarSign className="h-8 w-8 text-gray-900 dark:text-gray-100 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Completely Free
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Unlike other platforms that charge $50-200/month, all our tools are free and open-source.
              </p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 text-gray-900 dark:text-gray-100 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Reliable & Useful
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Built with standard financial calculations that are accurate and helpful.
              </p>
            </div>
            <div className="text-center">
              <Zap className="h-8 w-8 text-gray-900 dark:text-gray-100 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Fast & Accessible
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                No subscriptions, no credit cards, no limitations. Just powerful tools at your fingertips.
              </p>
            </div>
            <div className="text-center">
              <BookOpen className="h-8 w-8 text-gray-900 dark:text-gray-100 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Educational
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-light">
                Learn how these tools work through our transparent, documented code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8 tracking-tight">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center leading-relaxed font-light">
            Spend a short time researching here instead of manually calculating everything yourself. 
            Our tools help you quickly compare ETFs, build combinations, and define your investment strategy. 
            Then go about your day knowing you've researched thoroughly and clearly defined how, 
            at what ratios, and what you'll invest in.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-50 dark:bg-black border-b border-gray-200 dark:border-gray-900">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 tracking-tight">
            Our Philosophy
          </h2>
          <div className="space-y-6">
            <div className="card border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Transparency First
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                All code is open-source and transparent. We believe financial tools should be clear about how they work.
              </p>
            </div>
            <div className="card border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Education Over Profit
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                We're not here to sell subscriptions or data. We're here to empower investors with knowledge and tools.
              </p>
            </div>
            <div className="card border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-light">
                Built by investors, for investors. Our roadmap is shaped by real user needs and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 text-gray-600 dark:text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm mb-4 font-light">
            <strong className="text-gray-900 dark:text-white">Turing Investor</strong> - Because sophisticated investing tools should be available to everyone, not just the wealthy.
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 font-light">
            All tools are released under the MIT License. Free to use, modify, and distribute.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home

