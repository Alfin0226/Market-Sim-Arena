# Market Sim Arena: The Trading Race

Welcome to **Market Sim Arena**! This is a fast-paced, cyberpunk-themed web game where you go head-to-head against an AI trading bot. Instead of just clicking buttons, you'll use real-world financial mechanics to try and outsmart both the market and the machine.

## Link to Game
xxx

## How the Game Works

Unlike simple stock simulators, you are trading **Contracts for Difference (CFDs)**, which introduces real-world risks and rewards into the game:

* **Leverage (The Multiplier)**: You can punch above your weight by choosing a multiplier of **1:5**, **1:10**, or **1:20**. This lets you trade far more than your starting cash of \$10,000, magnifying both your epic wins and your crushing losses.
* **Position Sizing**: You decide exactly how much of your available cash to risk on each trade, from a cautious **10%** up to an all-in **100%** margin allocation.
* **The Spread (Transaction Costs)**: Entering the market isn't completely free. You always buy at the higher **Ask** price and sell at the lower **Bid** price. Stable markets like the S&P 500 are cheap to trade, while wilder markets like Oil have a wider price gap.
* **Holding Fees (Swap Rate)**: Because leverage is essentially borrowed money, the game charges you a tiny, continuous fee for every tick you keep a trade open.
* **Getting Wiped Out (Margin Call)**: If your bad trades eat up too much of your cash buffer and your account equity drops below the required margin, the virtual broker steps in. Your screen will flash red, your trades will be forcibly liquidated at a loss, and you'll be slapped with a temporary lockout!

## The Markets

Every race lasts exactly **250 ticks**, simulating one full trading year (250 trading days). The price paths are freshly generated every time so no two races repeat, but each asset has its own distinct personality:

* **Nasdaq 100**: The trendy tech giant that loves to build strong, momentum-driven trends.
* **S&P 500**: The slow, steady, and generally more reliable index climber.
* **Gold**: A safe haven that is usually stable but is prone to massive upward spikes when the virtual market panics.
* **Oil (WTI)**: The total wild card. Expect extreme volatility and sudden, dramatic jumps/drops in price.
* **Silver**: Gold's erratic cousin. Closely follows gold's general direction, but with much more chaotic and unpredictable swings.

## Choose Your Opponent Bot

Before launching a race, you choose which automated algorithm you want to race against:

* **EMA Cross Bot**: Classic trend rider. Watches 5-period and 20-period Exponential Moving Averages, reacting swiftly to crossings.
* **Turtle Breakout Bot**: Classic breakout channel trader. Enters trades on 15-day price highs or lows. Excellent at riding massive shocks (especially in Oil).
* **MACD Trend Bot**: Sophisticated trend follower. Places trades based on MACD Line / Signal crossover signals for smooth, medium-term trend captures.
* **Adaptive Regime Bot**: Smart hybrid engine. Measures recent market volatility: uses EMA crossovers during trending periods, but flips to RSI mean-reversion (buying oversold, selling overbought) during quiet consolidations.

## The Scoreboard

When the 250-day race is over, the game judges you and the bot on professional financial metrics:

1. **Total Return**: The raw percentage of profit or loss made from the starting baseline of \$10,000.
2. **Max Drawdown**: The single largest, most terrifying peak-to-trough percentage drop your account balance suffered.
3. **Annualized Sharpe Ratio**: The "smart risk" score. It measures whether your profits were actually worth the stressful, volatile swings you took to get them.