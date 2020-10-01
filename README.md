### Adjusted for REDAXO CMS needs

#### Lokal entwickeln

1. klonen
2. `.env.local` anlegen und auf eigene Umgebung anpassen
   ```dotenv
    VUE_APP_STANDALONE_REMOTE_HOST=http://exmaple.org/my-subpath-to-redaxo-root/redaxo/index.php?page=debug
    VUE_APP_STANDALONE_REMOTE_PATH=/my-subpath-to-redaxo-root/redaxo/index.php?page=structure&rex-api-call=debug&request=
    ```
3. `vue.config.local.js` anlegen und den Host der REDAXO Installation angeben
    ```js
    module.exports = {
        "devServer": {
            "proxy": 'http://example.org'
        }
    }
    ```
4. `yarn` oder `npm install` ausführen
5. `yarn serve` oder `npm run serve` ausführen

#### Frontend ins REDAXO Repo übernehmen

Die Änderungen müssen im branch `redaxo` (dieses Repo) verfügbar sein.

```bash
$ cd redaxo/src/addons/debug/fronted/
$ ./build.sh
```
(Wichtig: das Skript `build.sh` nicht außerhalb des `frontend` Ordners ausführen, da sonst die Pfadangaben nicht passen)

Um das neu kompilierte Frontend auszuprobieren einmal das Debug-AddOn reinstallieren, damit die Assets in den `/assets` Ordner kopiert werden.


### Changelog für Redaxo spezifische Änderungen

#### v5.11
- "bullhorn toggle" in performance tab entfernt - closes #3524
- workaround zum Verstecken der "unformatierten" Whats-new Anzeige entfernt und die Anzeige komplett deaktiviert
- im "Extension Point"-Tab werden die Ausgaben z.B. subject gekürzt dargestellt. Beim Klick wird der komplette Inhalt angezeigt. Zeigt besonders Wirkung bei `OUTPUT_FILTER`

---

<p align="center">
	<img width="300px" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/title.png">
	<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/screenshot.png">
</p>

> Clockwork is a development tool for PHP available right in your browser. Clockwork gives you an insight into your application runtime - including request data, performance metrics, log entries, database queries, cache queries, redis commands, dispatched events, queued jobs, rendered views and more - for HTTP requests, commands, queue jobs and tests.

> *This repository contains the client application component of Clockwork.*

> Check out on the [Clockwork website](https://underground.works/clockwork) for details.

<p align="center">
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-1.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-2.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-3.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-4.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-5.png">
	</a>
	<a href="https://underground.works/clockwork">
		<img width="100%" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/features-6.png">
	</a>
</p>

### Installation

Clockwork browser extension can be installed from official distribution channels:

- [Chrome](https://chrome.google.com/webstore/detail/clockwork/dmggabnehkmmfmdffgajcflpdjlnoemp)
- [Firefox](https://addons.mozilla.org/en-US/firefox/addon/clockwork-dev-tools/)

The server-side component also includes a full copy of the Clockwork app available at `your.app/__clockwork`.

Clockwork uses a server-side component, that gathers all the data and easily integrates with any PHP project, including out-of-the-box support for major frameworks.

Read the full installation guide on the [Clockwork website](https://underground.works/clockwork).

### Development

Use `npm run serve` to run a development server with hot reloading.

It might be useful to force a specific server-side url when running the development server. This can be done by creating a `.env.development` file:

```
VUE_APP_STANDALONE_REMOTE_HOST=http://127.0.0.1:8000
VUE_APP_STANDALONE_REMOTE_PATH=__clockwork/
```

The Clockwork app can be build for following targets:

- `npm run build-chrome` - build Chrome extension in `dist/chrome`
- `npm run build-firefox` - build Firefox extension in `dist/firefox`
- `npm run build-web` - build standalone web application in `dist/web`

To make a development build with source-maps append `-dev` to the target, eg. `build-chrome-dev`.

<p align="center">
	<a href="https://underground.works">
		<img width="150px" src="https://github.com/underground-works/clockwork-app/raw/master/.github/assets/footer.png">
	</a>
</p>
