import { Link } from 'react-router-dom'
import { TrendingUp, DollarSign, Zap, BookOpen, Rocket, Calculator, GitBranch, Code, Heart, Users, Shield, Target, BarChart3, Search, AlertCircle } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            About Turing Investor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">
            Empowering Everyday Investors with Free Financial Tools
          </p>
        </div>

        {/* Mission */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight flex items-center">
            <Rocket className="h-6 w-6 mr-2" />
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
            To provide free or low-cost financial tools that other websites charge for, 
            making investing more accessible for everyone. We believe basic investment 
            tools shouldn't cost a fortune.
          </p>
        </div>

        {/* Philosophy */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Our Philosophy
          </h2>
          <div className="space-y-6">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Transparency First</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light">
                  All code is open-source and transparent. We believe financial tools should be clear about how they work.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <BookOpen className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Education Over Profit</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light">
                  We're not here to sell subscriptions or data. We're here to empower investors with knowledge and tools.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Users className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Driven</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light">
                  Built by investors, for investors. Our roadmap is shaped by real user needs and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Turing Investor */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
            Why Turing Investor?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <DollarSign className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Completely Free</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  Unlike other financial platforms that charge $50-200/month for similar tools, 
                  all our tools are free and open-source.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Zap className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Reliable & Useful</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  Built with standard financial calculations that are accurate and helpful.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Rocket className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast & Accessible</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  No subscriptions, no credit cards, no limitations. Just powerful tools at your fingertips.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Code className="h-5 w-5 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Educational</h3>
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  Learn how these tools work through our transparent, documented code and educational content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why ETFs Section */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight flex items-center">
            <TrendingUp className="h-6 w-6 mr-2" />
            Why ETFs?
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">What Are ETFs?</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Exchange-Traded Funds (ETFs) are investment funds that trade on stock exchanges, much like individual stocks. 
                They hold a collection of assets—stocks, bonds, commodities, or other securities—and allow investors to buy 
                exposure to an entire market, sector, or strategy with a single purchase.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Power of Diversification</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                One of the most fundamental principles of investing is diversification—not putting all your eggs in one basket. 
                ETFs provide instant diversification across hundreds or thousands of securities. When you buy a single share of 
                an S&P 500 ETF, you're effectively owning a small piece of 500 of America's largest companies. This diversification 
                reduces your risk compared to owning individual stocks.
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Example:</strong> If you invested $10,000 in a single stock and 
                that company went bankrupt, you'd lose everything. But if you invested $10,000 in a diversified ETF and one company 
                in that ETF went bankrupt, your loss would be minimal—perhaps 0.1% or less, depending on the ETF's holdings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Accessibility and Liquidity</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                ETFs trade throughout the day like stocks, giving you the flexibility to buy and sell at market prices whenever 
                the market is open. Unlike mutual funds, which only trade once per day at the closing price, ETFs offer real-time 
                pricing and immediate execution. This liquidity means you can access your money quickly if needed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Transparency</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                ETFs are required to disclose their holdings daily, so you always know exactly what you own. This transparency 
                allows you to make informed decisions and understand your exposure to different companies, sectors, and regions. 
                You can see every holding, its weight in the fund, and how it changes over time.
              </p>
            </div>
          </div>
        </div>

        {/* Why Low-Cost ETFs */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight flex items-center">
            <DollarSign className="h-6 w-6 mr-2" />
            Why Low-Cost ETFs Matter
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Hidden Cost of Fees</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Every dollar you pay in fees is a dollar that isn't working for you. Expense ratios—the annual fees charged by 
                funds—may seem small (0.1% to 2%+), but they compound over time and can significantly erode your returns. 
                <strong className="text-gray-900 dark:text-white"> This is one of the few things in investing you can control.</strong>
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm mb-2">
                  <strong className="text-gray-900 dark:text-white">The Math:</strong> If you invest $100,000 for 30 years:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 font-light text-sm space-y-1">
                  <li>At 7% return with 0.1% fees: <strong className="text-gray-900 dark:text-white">$761,225</strong></li>
                  <li>At 7% return with 1% fees: <strong className="text-gray-900 dark:text-white">$574,349</strong></li>
                  <li><strong className="text-gray-900 dark:text-white">Difference: $186,876 lost to fees</strong></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Active vs. Passive: The Evidence</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Most actively managed funds (where managers try to beat the market) charge higher fees (1-2%+) but consistently 
                fail to outperform their benchmarks after fees. Studies show that over 10-15 year periods, 
                <strong className="text-gray-900 dark:text-white"> 80-90% of actively managed funds underperform low-cost index funds.</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                Low-cost index ETFs simply track a market index (like the S&P 500) and don't try to beat it. They accept market 
                returns, which historically have been excellent over long periods. By avoiding the high fees and the uncertainty 
                of active management, you're more likely to achieve better results.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Boglehead Philosophy</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Named after Vanguard founder John Bogle, the Boglehead approach emphasizes:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 font-light space-y-2 mb-4">
                <li><strong className="text-gray-900 dark:text-white">Low costs:</strong> Minimize fees to maximize returns</li>
                <li><strong className="text-gray-900 dark:text-white">Broad diversification:</strong> Own the entire market</li>
                <li><strong className="text-gray-900 dark:text-white">Long-term focus:</strong> Time in the market beats timing the market</li>
                <li><strong className="text-gray-900 dark:text-white">Simplicity:</strong> A few low-cost index funds can build wealth</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                This philosophy has helped millions of investors build wealth without paying high fees or trying to outsmart the market.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">What Makes an ETF "Low-Cost"?</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Generally, expense ratios below 0.2% are considered low-cost. Many excellent index ETFs charge 0.03% to 0.15%. 
                When comparing ETFs, always check the expense ratio—it's one of the most important factors in long-term performance.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  <strong className="text-gray-900 dark:text-white">Rule of Thumb:</strong> If an ETF charges more than 0.5%, 
                  ask yourself: "What am I getting for this extra cost?" Unless it's a specialized strategy you specifically need, 
                  there's likely a cheaper alternative that will serve you better.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What Kind of Investor Are You */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight flex items-center">
            <Target className="h-6 w-6 mr-2" />
            What Kind of Investor Are You?
          </h2>
          <div className="space-y-6">
            <div>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-6">
                Understanding your investor profile helps you make better decisions. Most investors fall into one of these categories:
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Beginner Investor</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                You're just starting your investment journey. You may have a 401(k) or IRA, but you're not sure how to optimize it. 
                You want to build wealth but don't have time to research individual stocks. You're looking for a simple, proven strategy.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  <strong className="text-gray-900 dark:text-white">Your Strategy:</strong> Start with a broad market ETF like 
                  VTI (total U.S. stock market) or VOO (S&P 500). Add international exposure with VXUS. Keep it simple, keep costs low, 
                  and let time do the work. As you learn more, you can refine your strategy, but a simple 2-3 fund portfolio can 
                  serve you well for decades.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The DIY Investor</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                You enjoy researching investments and want control over your portfolio. You're willing to put in the time to understand 
                different asset classes, sectors, and strategies. You want to build a customized portfolio that matches your goals and 
                risk tolerance.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  <strong className="text-gray-900 dark:text-white">Your Strategy:</strong> Use our tools to compare ETFs, analyze 
                  overlaps, and build diversified portfolios. You might tilt toward value, growth, small-caps, or international markets 
                  based on your research. You understand that diversification doesn't mean owning everything—it means owning the right 
                  mix for your goals.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Cost-Conscious Investor</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                You understand that fees matter. You've seen the math on how 1-2% fees can cost you hundreds of thousands over a lifetime. 
                You want maximum returns, which means minimizing costs. You're not interested in paying for active management that 
                likely won't outperform.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  <strong className="text-gray-900 dark:text-white">Your Strategy:</strong> Focus on expense ratios. Compare similar 
                  ETFs and always choose the lower-cost option when possible. Use our ETF Comparator to see expense ratios side-by-side. 
                  Remember: two ETFs tracking the same index should perform similarly—the one with lower fees will win.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Long-Term Wealth Builder</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                You're investing for retirement, financial independence, or long-term goals (10+ years). You understand that markets 
                go up and down, but you're focused on the long-term trend. You're not trying to time the market or chase hot stocks.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm">
                  <strong className="text-gray-900 dark:text-white">Your Strategy:</strong> Build a diversified portfolio of low-cost 
                  ETFs, contribute regularly (dollar-cost averaging), and stay the course. Rebalance periodically, but don't react to 
                  market volatility. History shows that patient, disciplined investors who stay invested through downturns are rewarded.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">The Important Truth</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                <strong className="text-gray-900 dark:text-white">You can be all of these.</strong> Most successful investors combine 
                elements: they're cost-conscious, they do their own research, they think long-term, and they keep things simple. 
                The key is finding the approach that works for your situation, goals, and personality.
              </p>
            </div>
          </div>
        </div>

        {/* Importance of Research */}
        <div className="card border-gray-200 dark:border-gray-800 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight flex items-center">
            <Search className="h-6 w-6 mr-2" />
            The Critical Importance of Doing Your Own Research
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">No One Cares About Your Money More Than You</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Financial advisors, fund managers, and investment platforms have their own interests. They may earn commissions, 
                charge fees, or have incentives that don't align with your goals. <strong className="text-gray-900 dark:text-white">
                You are the only person who will always prioritize your financial well-being.</strong>
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                This doesn't mean you can't use advisors or platforms—but it means you need to understand what you're buying, 
                why you're buying it, and what it costs. Blindly following advice without understanding it is a recipe for poor outcomes.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Understanding What You Own</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                When you buy an ETF, you're not just buying a ticker symbol. You're buying exposure to specific companies, sectors, 
                and regions. Two ETFs with similar names can have vastly different holdings, costs, and risks.
              </p>
              <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 rounded my-4">
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm mb-2">
                  <strong className="text-gray-900 dark:text-white">Example:</strong> "Tech ETF" could mean:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 font-light text-sm space-y-1">
                  <li>QQQ: Large-cap tech, mostly U.S., 0.20% fee</li>
                  <li>FTEC: Tech sector, different methodology, 0.08% fee</li>
                  <li>Some "tech" ETF: 50% Apple/Microsoft, 1.5% fee</li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 font-light text-sm mt-2">
                  Without research, you might choose the expensive, concentrated option when a cheaper, better-diversified one exists.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Avoiding Costly Mistakes</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Research helps you avoid common pitfalls:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 font-light space-y-2 mb-4">
                <li><strong className="text-gray-900 dark:text-white">Overlapping holdings:</strong> You might think you're diversified, 
                but if your ETFs hold the same companies, you're not. Our Intersection Analyzer helps you see this.</li>
                <li><strong className="text-gray-900 dark:text-white">Hidden fees:</strong> Some ETFs have high expense ratios, 
                trading costs, or tax inefficiencies that aren't obvious at first glance.</li>
                <li><strong className="text-gray-900 dark:text-white">Style drift:</strong> An ETF might change its strategy over time. 
                Regular research keeps you informed.</li>
                <li><strong className="text-gray-900 dark:text-white">Concentration risk:</strong> Some ETFs are heavily weighted toward 
                a few stocks. If those stocks decline, your ETF will too.</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Building Confidence and Discipline</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                When markets crash or your portfolio declines, investors who understand their investments are more likely to stay the course. 
                Those who bought based on recommendations without understanding often panic and sell at the worst times.
              </p>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                <strong className="text-gray-900 dark:text-white">Knowledge is your anchor.</strong> If you know why you own what you own, 
                you're less likely to make emotional decisions during market volatility. You can remind yourself: "I own a diversified 
                portfolio of low-cost ETFs. Short-term declines are normal. I'm investing for the long term."
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">How to Research ETFs Effectively</h3>
              <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed mb-4">
                Use our tools as a starting point, but dig deeper:
              </p>
              <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 font-light space-y-3 mb-4">
                <li><strong className="text-gray-900 dark:text-white">Check the expense ratio:</strong> Compare it to similar ETFs. 
                Lower is almost always better.</li>
                <li><strong className="text-gray-900 dark:text-white">Review the holdings:</strong> What companies are in the ETF? 
                Are you comfortable with that concentration?</li>
                <li><strong className="text-gray-900 dark:text-white">Understand the index:</strong> What does the ETF track? 
                How is it constructed? Is it market-cap weighted, equal-weighted, or uses another methodology?</li>
                <li><strong className="text-gray-900 dark:text-white">Check for overlap:</strong> If you own multiple ETFs, 
                use our Intersection Analyzer to see how much overlap exists.</li>
                <li><strong className="text-gray-900 dark:text-white">Read the prospectus:</strong> Yes, it's dry, but it contains 
                important information about risks, fees, and strategy.</li>
                <li><strong className="text-gray-900 dark:text-white">Consider tax efficiency:</strong> For taxable accounts, 
                some ETFs are more tax-efficient than others.</li>
                <li><strong className="text-gray-900 dark:text-white">Look at long-term performance:</strong> Past performance doesn't 
                guarantee future results, but it shows how the ETF has behaved in different market conditions.</li>
              </ol>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-gray-900 dark:text-white mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-lg">A Final Word</h3>
                  <p className="text-gray-700 dark:text-gray-300 font-light leading-relaxed">
                    Doing your own research doesn't mean you need to become a financial expert. It means taking the time to understand 
                    what you're investing in, why it fits your goals, and what it costs. <strong className="text-gray-900 dark:text-white">
                    The tools on this site are designed to make that research easier and more accessible.</strong> Use them. Compare ETFs. 
                    Build portfolios. Understand overlaps. Make informed decisions. Your future self will thank you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center"
          >
            <Rocket className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About

