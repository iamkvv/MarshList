module.exports = {
  type: 'react-app',
  babel: {
    plugins: [["import", { "libraryName": "antd", "style": "css" }]]
  },
  webpack: {
    publicPath: '',
    extra: {
      devtool: 'source-map'
    }
  }
}