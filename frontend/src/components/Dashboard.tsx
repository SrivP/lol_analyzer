const matches = [
  {
    champion: "Orianna",
    lane: "Mid",
    result: "Win",
    score: "7 / 2 / 11",
    kda: "9.0",
    cs: "236",
    vision: "31",
    duration: "31:44",
    note: "Baron setup won at 23:10",
  },
  {
    champion: "Kai'Sa",
    lane: "Bot",
    result: "Loss",
    score: "5 / 6 / 8",
    kda: "2.2",
    cs: "214",
    vision: "22",
    duration: "34:18",
    note: "Side waves collapsed after second drake",
  },
  {
    champion: "Sejuani",
    lane: "Jungle",
    result: "Win",
    score: "3 / 1 / 17",
    kda: "20.0",
    cs: "178",
    vision: "44",
    duration: "28:09",
    note: "Early path created top pressure",
  },
  {
    champion: "Jax",
    lane: "Top",
    result: "Win",
    score: "9 / 4 / 6",
    kda: "3.8",
    cs: "248",
    vision: "18",
    duration: "36:51",
    note: "Split threat forced elder rotation",
  },
  {
    champion: "Nautilus",
    lane: "Support",
    result: "Loss",
    score: "1 / 7 / 12",
    kda: "1.9",
    cs: "38",
    vision: "61",
    duration: "29:26",
    note: "Pick attempts lacked mid priority",
  },
];

const analytics = [
  ["Win rate", "60%", "+8.2 over baseline"],
  ["Gold at 15", "+412", "Lane phase average"],
  ["Objective control", "57%", "Drake and herald share"],
  ["Vision swing", "+13", "Wards cleared per match"],
];

const focusItems = [
  [
    "Tempo leak",
    "Recall windows after first item are costing one wave on average.",
  ],
  [
    "Best pattern",
    "Mid priority into river vision is converting cleanly before 16:00.",
  ],
  [
    "Draft flag",
    "Low engage comps underperform when jungle path starts blue side.",
  ],
];

function Dashboard() {
  return (
    <main className="dashboard-view">
      <style>{`
        .dashboard-view {
          min-height: 100vh;
          background: #0a0a0a;
          color: #eaeaea;
          font-family: "SF Pro Display", "Geist Sans", "Helvetica Neue", Arial, sans-serif;
          padding: 28px;
        }

        .dashboard-shell {
          max-width: 1280px;
          margin: 0 auto;
          border: 1px solid #2a2a2a;
          background: #101010;
        }

        .dashboard-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          padding: 30px 32px 28px;
          border-bottom: 1px solid #2a2a2a;
        }

        .eyebrow,
        .meta,
        .metric-label,
        .history-head,
        .match-row,
        .tag,
        .focus-label {
          font-family: "Geist Mono", "SF Mono", "JetBrains Mono", Consolas, monospace;
          letter-spacing: 0;
        }

        .eyebrow {
          margin: 0 0 12px;
          color: #8b8b8b;
          font-size: 11px;
          text-transform: uppercase;
        }

        .dashboard-title {
          max-width: 760px;
          margin: 0;
          color: #f4f4f0;
          font-family: "Newsreader", "Lyon Text", Georgia, serif;
          font-size: clamp(42px, 6vw, 82px);
          line-height: 1.04;
          letter-spacing: 0;
          font-weight: 500;
        }

        .header-meta {
          display: grid;
          align-content: end;
          gap: 8px;
          min-width: 230px;
          color: #8b8b8b;
          font-size: 12px;
        }

        .meta {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          padding-bottom: 8px;
          border-bottom: 1px solid #2a2a2a;
        }

        .meta strong {
          color: #eaeaea;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(300px, 0.85fr);
          min-height: 680px;
        }

        .history-panel {
          border-right: 1px solid #2a2a2a;
        }

        .section-heading {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 18px;
          min-height: 54px;
          padding: 0 24px;
          border-bottom: 1px solid #2a2a2a;
        }

        .section-heading h2 {
          margin: 0;
          color: #f4f4f0;
          font-size: 14px;
          font-weight: 650;
        }

        .section-heading span {
          color: #8b8b8b;
          font-size: 12px;
        }

        .analytics-strip {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          border-bottom: 1px solid #2a2a2a;
        }

        .metric {
          min-height: 116px;
          padding: 18px 20px;
          border-right: 1px solid #2a2a2a;
        }

        .metric:last-child {
          border-right: 0;
        }

        .metric-label {
          margin: 0 0 18px;
          color: #8b8b8b;
          font-size: 11px;
          text-transform: uppercase;
        }

        .metric-value {
          display: block;
          color: #ff2a2a;
          font-size: 34px;
          line-height: 1;
          font-weight: 620;
        }

        .metric-note {
          display: block;
          margin-top: 10px;
          color: #8b8b8b;
          font-size: 12px;
        }

        .history-table {
          width: 100%;
        }

        .history-head,
        .match-row {
          display: grid;
          grid-template-columns: 1.2fr 0.55fr 0.58fr 0.85fr 0.5fr 0.5fr 0.62fr 1.35fr;
          align-items: center;
          column-gap: 16px;
        }

        .history-head {
          min-height: 38px;
          padding: 0 20px;
          border-bottom: 1px solid #2a2a2a;
          color: #747474;
          font-size: 10px;
          text-transform: uppercase;
        }

        .match-row {
          min-height: 68px;
          padding: 0 20px;
          border-bottom: 1px solid #2a2a2a;
          color: #bdbdbd;
          font-size: 12px;
        }

        .match-row:hover {
          background: #141414;
        }

        .match-row:last-child {
          border-bottom: 0;
        }

        .champion {
          display: grid;
          gap: 4px;
          font-family: "SF Pro Display", "Geist Sans", "Helvetica Neue", Arial, sans-serif;
        }

        .champion strong {
          color: #f4f4f0;
          font-size: 14px;
          font-weight: 650;
        }

        .champion span {
          color: #8b8b8b;
          font-size: 12px;
        }

        .tag {
          width: fit-content;
          padding: 3px 8px;
          border-radius: 9999px;
          font-size: 10px;
          text-transform: uppercase;
          border: 1px solid transparent;
        }

        .tag-win {
          background: rgba(255, 42, 42, 0.12);
          color: #ff8a8a;
          border-color: rgba(255, 42, 42, 0.28);
        }

        .tag-loss {
          background: #181818;
          color: #9c9c9c;
          border-color: #343434;
        }

        .side-panel {
          display: grid;
          grid-template-rows: auto 1fr;
        }

        .summary-block {
          padding: 24px;
          border-bottom: 1px solid #2a2a2a;
        }

        .summary-number {
          margin: 0;
          color: #ff2a2a;
          font-family: "Newsreader", "Lyon Text", Georgia, serif;
          font-size: 64px;
          line-height: 0.95;
          letter-spacing: 0;
        }

        .summary-copy {
          margin: 16px 0 0;
          color: #bdbdbd;
          font-size: 14px;
          line-height: 1.55;
        }

        .focus-list {
          display: grid;
          align-content: start;
        }

        .focus-item {
          display: grid;
          gap: 8px;
          padding: 20px 24px;
          border-bottom: 1px solid #2a2a2a;
        }

        .focus-label {
          color: #f4f4f0;
          font-size: 11px;
          text-transform: uppercase;
        }

        .focus-item p {
          margin: 0;
          color: #bdbdbd;
          font-size: 14px;
          line-height: 1.5;
        }

        .draft-note {
          margin: 24px;
          padding: 18px;
          border: 1px solid #2a2a2a;
          background: #151515;
        }

        .draft-note h3 {
          margin: 0 0 10px;
          color: #f4f4f0;
          font-size: 13px;
        }

        .draft-note p {
          margin: 0;
          color: #bdbdbd;
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 1050px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .history-panel {
            border-right: 0;
            border-bottom: 1px solid #2a2a2a;
          }

          .analytics-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .metric:nth-child(2) {
            border-right: 0;
          }
        }

        @media (max-width: 760px) {
          .dashboard-view {
            padding: 12px;
          }

          .dashboard-header {
            grid-template-columns: 1fr;
            padding: 24px 18px;
          }

          .header-meta {
            min-width: 0;
          }

          .analytics-strip {
            grid-template-columns: 1fr;
          }

          .metric {
            border-right: 0;
          }

          .history-head {
            display: none;
          }

          .match-row {
            grid-template-columns: 1fr auto;
            row-gap: 8px;
            padding: 16px 18px;
          }

          .match-row > span:nth-child(n + 4) {
            display: none;
          }

          .match-row .tag {
            justify-self: end;
          }
        }
      `}</style>

      <section className="dashboard-shell" aria-labelledby="dashboard-title">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Match History / Analytics</p>
            <h1 className="dashboard-title" id="dashboard-title">
              A compact read on recent form and repeatable match patterns.
            </h1>
          </div>

          <div className="header-meta" aria-label="Dashboard metadata">
            <div className="meta">
              <span>Region</span>
              <strong>NA</strong>
            </div>
            <div className="meta">
              <span>Queue</span>
              <strong>Ranked Solo</strong>
            </div>
            <div className="meta">
              <span>Sample</span>
              <strong>Last 20 games</strong>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <section className="history-panel" aria-labelledby="history-title">
            <div className="section-heading">
              <h2 id="history-title">Recent matches</h2>
              <span>Sorted by newest</span>
            </div>

            <div className="analytics-strip" aria-label="Key analytics">
              {analytics.map(([label, value, note]) => (
                <article className="metric" key={label}>
                  <p className="metric-label">{label}</p>
                  <strong className="metric-value">{value}</strong>
                  <span className="metric-note">{note}</span>
                </article>
              ))}
            </div>

            <div
              className="history-table"
              role="table"
              aria-label="Match history"
            >
              <div className="history-head" role="row">
                <span>Champion</span>
                <span>Lane</span>
                <span>Result</span>
                <span>Score</span>
                <span>KDA</span>
                <span>CS</span>
                <span>Vision</span>
                <span>Read</span>
              </div>

              {matches.map((match) => (
                <div
                  className="match-row"
                  role="row"
                  key={`${match.champion}-${match.duration}`}
                >
                  <span className="champion">
                    <strong>{match.champion}</strong>
                    <span>{match.duration}</span>
                  </span>
                  <span>{match.lane}</span>
                  <span className={`tag tag-${match.result.toLowerCase()}`}>
                    {match.result}
                  </span>
                  <span>{match.score}</span>
                  <span>{match.kda}</span>
                  <span>{match.cs}</span>
                  <span>{match.vision}</span>
                  <span>{match.note}</span>
                </div>
              ))}
            </div>
          </section>

          <aside className="side-panel" aria-label="Analyst notes">
            <div className="summary-block">
              <p className="eyebrow">Performance Index</p>
              <p className="summary-number">74.8</p>
              <p className="summary-copy">
                The account is winning through early map control, but losses are
                clustering around stalled resets and late objective setup.
              </p>
            </div>

            <div className="focus-list">
              {focusItems.map(([label, copy]) => (
                <article className="focus-item" key={label}>
                  <span className="focus-label">{label}</span>
                  <p>{copy}</p>
                </article>
              ))}

              <article className="draft-note">
                <h3>Next review target</h3>
                <p>
                  Compare first herald rotations against bot lane wave state.
                  The strongest games show support moving first by 12:40.
                </p>
              </article>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
