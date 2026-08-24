import fs from "fs";

const RESULTS_PATH = "test-results/results.json";

function formatDuration(ms) {
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

function buildMessage(stats) {
  const total = stats.expected + stats.unexpected + stats.flaky + stats.skipped;
  const passed = stats.expected;
  const failed = stats.unexpected;
  const failing = failed > 0;

  const repo = process.env.GITHUB_REPOSITORY || "local run";
  const branch = process.env.GITHUB_REF_NAME || "local";
  const shortSha = (process.env.GITHUB_SHA || "").slice(0, 7);
  const runUrl =
    process.env.GITHUB_SERVER_URL &&
    process.env.GITHUB_REPOSITORY &&
    process.env.GITHUB_RUN_ID
      ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : null;

  const pipeline = process.env.PIPELINE_LABEL || "Playwright Tests";

  const lines = [
    `${failing ? "❌" : "✅"} ${pipeline} — ${failing ? "FAILED" : "PASSED"}`,
    `Repo: ${repo}`,
    `Branch: ${branch}${shortSha ? ` (${shortSha})` : ""}`,
    `Tests: ${passed} passed, ${failed} failed, ${stats.flaky} flaky, ${stats.skipped} skipped (${total} total)`,
    `Duration: ${formatDuration(stats.duration)}`,
  ];

  if (runUrl) lines.push(`Run: ${runUrl}`);

  return lines.join("\n");
}

async function sendTelegramMessage(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Telegram API responded ${response.status}: ${body}`);
  }
}

async function main() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  // Notification is a side channel, not a quality gate — missing config or a
  // failed send should never fail the pipeline on its own.
  if (!token || !chatId) {
    console.warn(
      "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set — skipping Telegram notification."
    );
    return;
  }

  if (!fs.existsSync(RESULTS_PATH)) {
    console.warn(`${RESULTS_PATH} not found — skipping Telegram notification.`);
    return;
  }

  const { stats } = JSON.parse(fs.readFileSync(RESULTS_PATH, "utf-8"));
  const message = buildMessage(stats);

  await sendTelegramMessage(token, chatId, message);
  console.log("Telegram notification sent.");
}

main().catch((error) => {
  console.error("Telegram notification error:", error.message);
});
