# WP Club Rugby – Referee Card Reports

One form for yellow, red and blue cards (and matches blown off) at club (community) level. The referee chooses the card type in the first section ("Details") and the later steps adapt to that card. The last step produces a written report ready for a disciplinary hearing.

Built from the WP referee incident report form, the World Rugby Laws 2026 (community-rugby provisions) and the WP Club Rugby Competition Format & Rules 2026 (rules 2.1, 4.1, 13, 15).

## Publish on GitHub Pages
1. Create a repository and upload `index.html` and this `README.md`.
2. **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
3. The site is live after a minute at `https://<username>.github.io/<repository>/`.

## How a referee uses it
1. **Details** – choose the card type, then match details. 2. **Player & law**. 3. **Incident** – the referee writes their own account (rough notes are fine). 4. **Decision** – card-specific questions (front-row / uncontested scrums, concussion confirmed by medical team, etc.). 5. **Evidence & officials**. 6. **Report & sign** – the AI writes the formal report from the answers and notes, the referee edits it, previews the whole report, ticks that they have checked it, signs and finalises.
- The AI is told to use only the referee's facts, never invent anything, and leave [bracketed prompts] for missing detail; finalising is blocked while any remain. Personal names are masked before anything is sent.
- The finished report records that AI helped with the wording, and keeps the referee's original notes as an appendix.
- Before printing, downloading or e-mailing, the app asks the referee to confirm they have checked the report.
- Finalising locks the report and seals it with a SHA-256 fingerprint; later changes are dated addenda.

## Settings (top of `index.html`, `APP_CONFIG`)
Union name, discipline e-mail address, AI service address (`aiEndpoint`) and **`aiPlugin`**, a function you can replace to use a different AI service. Without a service address, each referee enters their own Anthropic API key under **AI settings** (stored in that browser only). "Build a draft (no AI)" works without any key.

## Data
No server. Reports are stored in each referee's browser, not on GitHub. Referees send the PDF and JSON to the Union; the dashboard imports JSON files to combine reports and shows team discipline (reds, then yellows – the rule 13 tie-break).
