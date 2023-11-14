# font-flooding-playground

## Steps to Reproduce

1. Run `yarn`
2. Run `yarn server`
3. Launch a fresh session of chrome with a fresh `user-data-dir` and `disk-cache-dir`
   a. On a Mac `<path-to-chrome> about:blank --user-data-dir='<path-to-empty-user-data-dir>' --disk-cache-dir='<path-to-empty-disk-cach-dir-dir>'`
4. Open up DevTools and navigate to the Network tab
5. Navigate to `http://localhost:8080/maxage`
6. Notice that there is only one entry for the font resource
![image](https://github.com/cypress-io/font-flooding-playground/assets/4873279/d0725f2f-177a-4ab9-9300-e26b988b8bc8)
8. Refresh the page until `style.css?flavor=maxage` shows as loaded from `(memory cache)`
9. Notice that there are two entries for the font resource
![image](https://github.com/cypress-io/font-flooding-playground/assets/4873279/db9ddf7c-6961-4072-bfcb-275b2d0bd8f6)
