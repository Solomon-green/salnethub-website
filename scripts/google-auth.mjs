// One-time helper: signs you in to Google and prints the refresh token the booking calendar needs.
// Usage: node scripts/google-auth.mjs <GOOGLE_CLIENT_ID> <GOOGLE_CLIENT_SECRET>
import http from "node:http";

// Strip whitespace: long IDs often pick up line breaks when pasted into a terminal.
const [clientId, clientSecret] = process.argv.slice(2).map((s) => s.replace(/\s+/g, ""));
if (!clientId || !clientSecret) {
  console.error("Usage: node scripts/google-auth.mjs <GOOGLE_CLIENT_ID> <GOOGLE_CLIENT_SECRET>");
  process.exit(1);
}

const PORT = 53682;
const redirectUri = `http://127.0.0.1:${PORT}`;
const scopes = [
  "https://www.googleapis.com/auth/calendar.freebusy",
  "https://www.googleapis.com/auth/calendar.events",
  "https://www.googleapis.com/auth/gmail.send",
];

const authUrl =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: scopes.join(" "),
    access_type: "offline",
    prompt: "consent",
  });

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, redirectUri).searchParams.get("code");
  if (!code) {
    res.end("No code in the request. Close this tab and run the script again.");
    return;
  }
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: "authorization_code" }),
  });
  const json = await tokenRes.json();
  if (!json.refresh_token) {
    res.end("Google did not return a refresh token. See the terminal.");
    console.error(json);
  } else {
    res.end("Done. You can close this tab and go back to the terminal.");
    console.log("\nAdd this to Vercel as GOOGLE_REFRESH_TOKEN:\n");
    console.log(json.refresh_token, "\n");
  }
  server.close();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log("Open this link, sign in with the Google account that owns the calendar, and allow access:\n");
  console.log(authUrl, "\n");
});
