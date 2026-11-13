# Referee Card Reports

Web app for referees to record yellow, red and blue cards (and matches blown off) and produce a signed, tamper-evident report for disciplinary use. Based on the WPRU referee report form and the World Rugby Laws 2026.

## Publish on GitHub Pages
1. Create a repository and upload `index.html` and this `README.md`.
2. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
3. After a minute the site is live at `https://<username>.github.io/<repository>/`.

## Settings
Open `index.html` and edit the `APP_CONFIG` block near the top of the script (union name, discipline e-mail address).

## Data
There is no server. Reports are stored in the browser of the device used, not on GitHub. Referees send the PDF and JSON to the union after finalising; the dashboard can import JSON files to combine reports.

## Writing help (optional AI)
On the Incident step, the offence description has: **Build a draft from my answers** (no AI, uses the form answers), **Check my wording** (flags loaded words, missing detail), and **Improve with AI**. The AI only rewords the referee's own notes and is told never to add facts; the report records when AI-assisted wording was used. Each referee enters their own Anthropic API key under **AI settings** (stored in that browser only), or set `aiEndpoint` in the `APP_CONFIG` block to a union-run proxy so no keys are needed.
