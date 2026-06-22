# Market Sim Arena: The Trading Race

Welcome to **Market Sim Arena**! This is a fast-paced, cyberpunk-themed web game where you go head-to-head against an AI trading bot. Instead of just clicking buttons, you'll use real-world financial mechanics to try and outsmart both the market and the machine.

## Link to Game
https://alfin0226.github.io/Market-Sim-Arena/

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

---

## Database & Live Leaderboard Setup (Secure Integration)

This game features a live global leaderboard powered by **Neon Serverless Postgres**. To keep your credentials secure, the connection string is managed via environment variables (never committed to git).

### 1. Create the Database Tables

Log into your [Neon Console](https://console.neon.tech/), create a new Postgres database, and run the following script in the Neon **SQL Editor** to initialize the player user accounts and the leaderboard:

```sql
-- 1. Create User Accounts Table
CREATE TABLE IF NOT EXISTS market_sim_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(12) UNIQUE NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Leaderboard Runs Table
CREATE TABLE IF NOT EXISTS market_sim_leaderboard (
    id SERIAL PRIMARY KEY,
    username VARCHAR(12) NOT NULL,
    market VARCHAR(10) NOT NULL,
    bot VARCHAR(50) NOT NULL,
    return_pct DOUBLE PRECISION NOT NULL,
    sharpe DOUBLE PRECISION NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Local Development (using `.env`)

1. Copy `.env.example` to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and replace the template connection string with your actual Neon database URL.
3. Start the secure development server:
   ```bash
   node dev.js
   ```
4. Open your browser and navigate to `http://localhost:3000`. The server will dynamically inject the connection string in-memory. Your `.env` file is ignored by Git, keeping your credentials safe.

### 3. Production Deployment (using GitHub Secrets)

This repository includes a GitHub Actions workflow `.github/workflows/deploy.yml` that securely deploys the game to GitHub Pages.

1. Go to your repository settings on GitHub.
2. Navigate to **Settings** -> **Secrets and variables** -> **Actions**.
3. Click **New repository secret**.
4. Name the secret **`NEON_DB_URL`** and paste your Neon database connection string as the value.
5. Push your code to the `main` branch. The GitHub Action will check out the code, securely inject the database URL into `index.html` during the build step, and deploy the clean build to the `gh-pages` branch.

### 4. Local Storage Fallback

If no `NEON_DB_URL` is found (for example, when running `index.html` directly from the filesystem without `dev.js`), the game automatically falls back to your browser's `LocalStorage`. This ensures offline play works out-of-the-box.