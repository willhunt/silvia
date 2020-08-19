# Notes

## Colors
https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=B0BEC5
https://vuetifyjs.com/en/styles/colors/

Attempt at color theme
```js
{
  primary: #607d8b,
  secondary: #009688,
  accent: #ff5722,
  error: #f44336,
  warning: #e91e63,
  info: #9c27b0,
  success: #4caf50
}
```

# Serving
Test production using `http-server`:

```bash
$ cd frontend
$ npm run build
$ http-server ../silvia/silviacontrol/static/silviacontrol/vue
```

# Generate PWA assets
Use: [vue-pwa-asset-generator](https://www.npmjs.com/package/vue-pwa-asset-generator)
```bash
$ cd frontend
$ vue-asset-generate -a ./src/assets/will_silvia_icon.png -o ./public/img/icons
```

# Build for production
```bash
$ npm run build
```