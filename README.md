# Slingtide — launch & legal pages

Public launch site for **Slingtide**, the one-thumb slingshot defence game by **OctaBytes**. Published with GitHub Pages.

Base URL: **https://octabytes-studio.github.io/slingtide/**

## Live pages

| Page | URL | Used for |
|---|---|---|
| Home | https://octabytes-studio.github.io/slingtide/ | Marketing / developer website |
| Privacy policy | https://octabytes-studio.github.io/slingtide/privacy.html | App Store + Google Play privacy policy |
| Terms of service | https://octabytes-studio.github.io/slingtide/terms.html | Terms / EULA |
| Delete your data | https://octabytes-studio.github.io/slingtide/delete-account.html | Google Play data deletion link (not required; the game has no accounts) |
| Contact & support | https://octabytes-studio.github.io/slingtide/contact.html | App Store support URL; Play contact |
| Licences & credits | https://octabytes-studio.github.io/slingtide/licenses.html | Font, open-source and art notices |
| 404 | https://octabytes-studio.github.io/slingtide/404.html | Not-found page |
| Robots | https://octabytes-studio.github.io/slingtide/robots.txt | Crawler rules |
| Sitemap | https://octabytes-studio.github.io/slingtide/sitemap.xml | Search indexing |

The game has **no accounts** and the site is **pre-launch**, so the download buttons say “Coming soon” rather than linking to a store listing. The store URLs supplied during the build resolved to Angry Birds 2 (Rovio), not Slingtide, and were deliberately excluded. Replace the “Coming soon” blocks with real links when the listings are live.

## Store console fields

| Field | URL |
|---|---|
| Privacy Policy URL | https://octabytes-studio.github.io/slingtide/privacy.html |
| Support URL | https://octabytes-studio.github.io/slingtide/contact.html |
| Account Deletion URL | https://octabytes-studio.github.io/slingtide/delete-account.html (the game has no accounts; Data safety should say no account creation) |
| Marketing URL | https://octabytes-studio.github.io/slingtide/ |
| Developer Website | https://octabytes-studio.github.io/slingtide/ |
| app-ads.txt | `https://octabytes-studio.github.io/app-ads.txt` — a root file already exists with publisher ID `pub-2195537972404209`. Confirm this is the AdMob account you will use for Slingtide before relying on it. Do not add a second file under `/slingtide/`. |
| EULA | https://octabytes-studio.github.io/slingtide/terms.html |

## Before you submit to a store

- **Real store links:** add the App Store and Google Play URLs to `index.html` (hero, CTA), then remove the “Soon” tags.
- **ads:** `config/prod.json` currently has `ADS_ENABLED=true` with Google sample units and `ADS_TEST_UNITS=true`. Paste the real AdMob App IDs and eight unit IDs, set `ADS_TEST_UNITS=false`, and update the store Data safety / App Privacy answers to match this policy.
- **app-ads.txt:** the hostname root already serves `https://octabytes-studio.github.io/app-ads.txt` with publisher ID `pub-2195537972404209`. AdMob crawls the hostname of the developer website, so this file can satisfy the requirement if that publisher ID is the AdMob account for Slingtide. Confirm it; if not, replace the root file with the correct account's line. Do not publish a second copy under `/slingtide/`.
- **In-app privacy link:** the app's Settings → Privacy notice is text-only. Apple 5.1.1(i) and Google Play expect an easily accessible link to this policy inside the app.
- **iOS privacy manifest:** `ios/Runner/PrivacyInfo.xcprivacy` currently declares no tracking and no collected data while the app links AdMob and asks ATT for adults. Fix the manifest and App Privacy answers before submission.
- **Store kit:** the older `slingshot_game_store_listing/listing/compliance.md` says “no ads / no data collected / 13+”. It predates the AdMob enabling release; update it before entering console answers.
- **Tablet layout:** the store kit reports overflowing menus on 13-inch iPad / large tablets. Fix the layout or exclude tablets; do not claim tablet support until then.
- **Age rating:** re-answer the Apple and IARC questionnaires with advertising = yes and the mixed-audience declaration.

## Updating the site

Edit the HTML, CSS or assets in this repository, then run the launch-site validator from the game repository:

```sh
python3 ~/.config/opencode/skills/launch-site/scripts/check_site.py \
  --site .launch-site/site \
  --base-url https://octabytes-studio.github.io/slingtide \
  --readme .launch-site/site/README.md
```

Commit and push to `main`. GitHub Pages rebuilds on every push. Keep `privacy.html`, `terms.html`, `delete-account.html` and `contact.html` consistent: same entity (OctaBytes), same email (`octabytes.studio@gmail.com`), same effective date, same data list.

## Contact

**OctaBytes** — developer of Slingtide
Email: **octabytes.studio@gmail.com**
Privacy requests: subject “Privacy request”
Data deletion: subject “Slingtide data deletion request”
Security: subject “Security”

This site uses no cookies, analytics, third-party fonts or embedded media. The only external services are GitHub Pages (hosting) and Google AdMob (in the game, not on this site).
