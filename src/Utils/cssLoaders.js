var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (options) {
  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.cssMinimize,
      sourceMap: options.cssSourceMap
    }
  }

  // generate loader string, object, array to be used with extract text plugin
  function generateLoaders (loader) {
    var loaders = [cssLoader]

    if (loader) {
      // wrap string & object to array
      if (typeof loader === 'string' ||
        (typeof loader === 'object' && loader.constructor === Object)) {
        loader = [loader]
      }

      loader.forEach(item => {
        loaders.push(handleLoader(item))
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.cssExtract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // generate loader string and object to loader config object
  function handleLoader (loader) {
    if (typeof loader === 'string') {
      return {
        loader: loader + '-loader',
        options: {
          sourceMap: options.cssSourceMap
        }
      }
    } else if (typeof loader === 'object' && loader.constructor === Object) {
      return loader
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders([
      {
        loader: 'sass-loader',
        options: {
          sourceMap: options.cssSourceMap,
          indentedSyntax: true
        }
      }
    ]),
    scss: generateLoaders([
      'sass'
      // you can need sass-resources-loader for your sass
      // {
      //   loader: 'sass-resources-loader',
      //   options: {
      //     // must choose a scss file
      //     resources: options.sassResourceFile
      //   }
      // }
    ]),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}
