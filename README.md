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
	<img width="412px" src="https://underground.works/clockwork/images/github/title.png">
	<img src="https://underground.works/clockwork/images/github/clockwork-intro.png">
</p>


### What is Clockwork?

Clockwork is a browser extension, providing tools for debugging and profiling your PHP applications, including request data, application log, database queries, routes, visualisation of application runtime and more.

Clockwork uses a server-side component, that gathers all the data and easily integrates with any PHP project, including out-of-the-box support for major frameworks.

Read more and try it out on the [Clockwork website](https://underground.works/clockwork).

*This repository contains the Clockwork client application.*

The Clockwork app can be build for following targets:

- Chrome extension - `npm run build-chrome`
- Firefox extension - `npm run build-firefox`
- standalone web application - `npm run build-web`

### Licence

Copyright (c) 2013 Miroslav Rigler

MIT License

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
