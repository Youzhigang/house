const WebpackBuilder = require('../../../src/Builders/WebpackBuilder')

describe('WebpackBuilder.prototype.merge()', () => {
  test('merge', () => {
    const builder = new WebpackBuilder()
    builder.merge({
      entry: {
        app:[ 'main.js', 'polyfill.js' ]
      }
    })
    builder.merge({
      entry: {
        app:[ 'main.js' ]
      }
    })
    const webpack = builder.create()
    expect(webpack.entry).toEqual({
      app:[ 'main.js' ]
    })
  })
})

describe('WebpackBuilder.prototype.extend()', () => {
  test('success', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    builder.extend(webpack => {
      webpack.entry = expected
      return webpack
    })

    const webpack = builder.create()
    expect(webpack.entry).toEqual(expected)
  })

  test('throw undefined', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    expect(() => {
      builder.extend(webpack => {
        webpack.entry = expected
      })
    }).toThrowError('You need return a webpack config.')
  })

  test('throw need object value', () => {
    const builder = new WebpackBuilder()
    const expected = { app: 'main.js' }

    expect(() => {
      builder.extend(webpack => {
        return 'Hi, house.'
      })
    }).toThrowError('You need return a object webpack config')
  })
})

describe('WebpackBuilder.prototype.addExtension()', () => {
  const builder = new WebpackBuilder()

  test('addExtension', () => {
    builder.addExtension('.js')
    const webpack = builder.create()
    const expected = ['.js']
    expect(webpack.resolve.extensions).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.addExtensions()', () => {
  const builder = new WebpackBuilder()

  test('addExtensions', () => {
    const expected = ['.js', '.json', '.css']
    builder.addExtensions(expected)
    const webpack = builder.create()
    expect(webpack.resolve.extensions).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.addRule()', () => {
  const builder = new WebpackBuilder()

  test('addRule', () => {
    const expected = {
      $id: 'human'
    }

    builder.addRule(expected)
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual([ expected ])
  })
})

describe('WebpackBuilder.prototype.addRules()', () => {
  const builder = new WebpackBuilder()

  test('addRules', () => {
    const expected = [
      { $id: 'human' },
      { $id: 'robot' }
    ]

    builder.addRules(expected)
    const webpack = builder.create()
    expect(webpack.module.rules).toEqual(expected)
  })
})

describe('WebpackBuilder.prototype.addPlugin()', () => {
  test('addPlugin', () => {
    const builder = new WebpackBuilder()
    const expected = jest.fn()

    builder.addPlugin(expected)
    const webpack = builder.create()
    expect(webpack.plugins).toEqual(expect.arrayContaining([expected]))
  })
})

describe('WebpackBuilder.prototype.addPlugins()', () => {
  test('addPlugins', () => {
    const builder = new WebpackBuilder()
    const expected = [ jest.fn(), jest.fn() ]

    builder.addPlugins(expected)
    const webpack = builder.create()
    expect(webpack.plugins).toEqual(expect.arrayContaining(expected))
  })
})
