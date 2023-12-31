# font-flooding-playground

## Steps to Reproduce

1. Run `npm install`
2. Run `npm run server`
3. Launch a fresh session of chrome with a fresh `user-data-dir` and `disk-cache-dir`
   1. On a Mac `<path-to-chrome> about:blank --user-data-dir='<path-to-empty-user-data-dir>' --disk-cache-dir='<path-to-empty-disk-cach-dir-dir>'`
4. Open up DevTools and navigate to the Network tab
5. Navigate to `http://localhost:8080/maxage`
6. Notice that there is only one entry for the font resource

<img src="https://github.com/cypress-io/font-flooding-playground/blob/main/no-extra-font-request.png?raw=true" width="400" />

8. Refresh the page until `style.css?flavor=maxage` shows as loaded from `(memory cache)`
9. Notice that there are two entries for the font resource

<img src="https://github.com/cypress-io/font-flooding-playground/blob/main/extra-font-request.png?raw=true" width="400" />
