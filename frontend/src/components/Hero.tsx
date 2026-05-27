{
  /* generated using AI because I suck at UI design, navigation logic done by me tho!  😭 */
}
import { NavLink } from "react-router";
import { Modal } from "@heroui/react";

const telemetryRows = [
  ["LANE", "MID", "PRESSURE", "+18.4"],
  ["VISION", "BOT-RVR", "CONTROL", "72%"],
  ["JUNGLE", "TOP QUAD", "PATH", "RED > GANK"],
  ["OBJECTIVE", "DRAKE", "WINDOW", "01:42"],
];

function Hero() {
  return (
    <main className="app-shell">
      <section className="hero-grid" aria-labelledby="hero-title">
        <div className="topline">
          <samp>[ LOL_ANALYZER / LIVE MATCH INTEL ]</samp>
          <samp>PATCH SYNC: ACTIVE</samp>
          <samp>QUEUE MODEL: SOLO/DUO</samp>
        </div>

        <aside className="side-rail" aria-label="Analysis systems">
          <span>
            <a href="https://op.gg/">OP.GG FEED</a>
          </span>
          <span>VOD TRACE</span>
          <span>LANE DELTA</span>
          <span>DRAFT RISK</span>
        </aside>

        <div className="hero-copy">
          <p className="kicker">[ TACTICAL RIFT DIAGNOSTICS ]</p>
          <h1 id="hero-title">READ THE RIFT</h1>
          <p className="brief">
            Convert League matches into lane pressure, tempo windows, objective
            timing, and draft threat reports built for players who review fast.
          </p>

          <div className="command-row" aria-label="Primary actions">
            <Modal>
              <div className="primary-cta">
                <button>START ANALYSIS</button>
                <kbd>ENTER</kbd>
              </div>
            </Modal>
            <a className="secondary-cta" href="#intel">
              VIEW SAMPLE REPORT
            </a>
          </div>
        </div>

        <div
          className="rift-panel"
          id="intel"
          aria-label="Live analyzer preview"
        >
          <div className="panel-header">
            <samp>UNIT / SUMMONERS_RIFT</samp>
            <output>LIVE READINESS 94%</output>
          </div>

          <div className="rift-map" aria-hidden="true">
            <span className="node node-top">TOP</span>
            <span className="node node-mid">MID</span>
            <span className="node node-bot">BOT</span>
            <span className="node node-drake">DRK</span>
            <span className="crosshair crosshair-a">+</span>
            <span className="crosshair crosshair-b">+</span>
          </div>

          <dl className="telemetry-table">
            {telemetryRows.map(([label, area, metric, value]) => (
              <div className="telemetry-row" key={`${label}-${area}`}>
                <dt>{label}</dt>
                <dd>{area}</dd>
                <dd>{metric}</dd>
                <data value={value}>{value}</data>
              </div>
            ))}
          </dl>
        </div>

        <div className="bottom-strip">
          <span>/// DRAFT GAP DETECTION</span>
          <span>/// GOLD CURVE ANOMALY</span>
          <span>/// ROTATION TIMER</span>
        </div>
      </section>
    </main>
  );
}

export default Hero;
