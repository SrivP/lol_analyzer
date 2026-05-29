import { Modal } from "@heroui/react";
import { Button } from "@heroui/react";
import { Swords } from "lucide-react";
import { Form, useNavigate } from "react-router-dom";
import { useActionData } from "react-router";

const telemetryRows = [
  ["LANE", "MID", "PRESSURE", "+18.4"],
  ["VISION", "BOT-RVR", "CONTROL", "72%"],
  ["JUNGLE", "TOP QUAD", "PATH", "RED > GANK"],
  ["OBJECTIVE", "DRAKE", "WINDOW", "01:42"],
];

function Hero() {
  const actionData = useActionData();
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const gameName = (fd.get("gameName") as string | null)?.trim();
    const tagLine = (fd.get("tagLine") as string | null)?.trim();
    const region = (fd.get("region") as string | null)?.trim() || "americas";

    if (!gameName || !tagLine) return;

    const safeRegion = encodeURIComponent(region);
    const safeGameName = encodeURIComponent(gameName);
    const safeTagLine = encodeURIComponent(tagLine);

    navigate(`/${safeRegion}/${safeGameName}/${safeTagLine}`);
  }

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
              <Button className="primary-cta hero-modal-trigger">
                <span>START ANALYSIS</span>
                <kbd>ENTER</kbd>
              </Button>

              <Modal.Backdrop className="analysis-modal-backdrop">
                <Modal.Container className="analysis-modal-container">
                  <Modal.Dialog className="analysis-modal-dialog">
                    <Modal.CloseTrigger className="analysis-modal-close">
                      CLOSE
                    </Modal.CloseTrigger>

                    <Modal.Header className="analysis-modal-header">
                      <Modal.Icon className="analysis-modal-icon">
                        <Swords className="size-5" />
                      </Modal.Icon>
                      <div>
                        <samp>[ ACCESS NODE / RIOT API ]</samp>
                        <Modal.Heading className="analysis-modal-title">
                          Connect Riot Account
                        </Modal.Heading>
                      </div>
                    </Modal.Header>

                    <Form method="post" onSubmit={handleSubmit}>
                      <Modal.Body className="analysis-modal-body">
                        <p>
                          Enter the player credentials to pull live match data
                          and historical performance metrics.
                        </p>

                        <div className="analysis-form-grid">
                          <label className="analysis-field">
                            <span>Summoner Name</span>
                            <input
                              name="gameName"
                              placeholder="PLAYER NAME"
                              required
                            />
                          </label>
                          <label className="analysis-field analysis-field-tag">
                            <span>Tag</span>
                            <input name="tagLine" placeholder="NA1" required />
                          </label>
                          <label className="analysis-field analysis-field-region">
                            <span>Region</span>
                            <select
                              name="region"
                              defaultValue="americas"
                              required
                            >
                              <option value="americas">americas</option>
                              <option value="asia">asia</option>
                              <option value="europe">europe</option>
                              <option value="sea">sea</option>
                            </select>
                          </label>
                        </div>

                        <dl className="analysis-modal-meta">
                          <div>
                            <dt>REGION</dt>
                            <dd>AUTO</dd>
                          </div>
                          <div>
                            <dt>SCAN</dt>
                            <dd>MATCH HISTORY</dd>
                          </div>
                          <div>
                            <dt>MODE</dt>
                            <dd>RANKED</dd>
                          </div>
                        </dl>
                      </Modal.Body>

                      <Modal.Footer className="analysis-modal-footer">
                        <Button
                          className="analysis-modal-button analysis-modal-button-secondary"
                          variant="secondary"
                          slot="close"
                        >
                          Cancel
                        </Button>
                        {actionData?.error && (
                          <p className="text-red-500 text-sm font-semibold">
                            {actionData.error}
                          </p>
                        )}
                        <Button
                          className="analysis-modal-button analysis-modal-button-primary"
                          variant="primary"
                          type="submit"
                          slot="close"
                        >
                          Analyze
                        </Button>
                      </Modal.Footer>
                    </Form>
                  </Modal.Dialog>
                </Modal.Container>
              </Modal.Backdrop>
            </Modal>
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
