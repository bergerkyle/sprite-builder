const tailwindcss = require('@tailwindcss/postcss')

module.exports = {
  plugins: [
    tailwindcss({
      config: './tailwind.config.js'
    }),
    require('autoprefixer'),
  ],
}