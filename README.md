# Notes⚠️
Under different systems, the "build" command in the package.json file needs to be changed

Windows:
```json
"build": "parcel build index.html && xcopy /E /I i18n dist\\i18n"
```
Mac/Ubuntu:
```json
"build": "parcel build index.html && cp -r i18n dist/i18n"
```
