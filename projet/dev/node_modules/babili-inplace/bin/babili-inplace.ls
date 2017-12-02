require! {
  fs
}

{execSync} = require 'child_process'

babel_path = require.resolve("babel-cli/bin/babel.js")
babili_path = require.resolve("babel-preset-babili")
base_command = "#{babel_path} --presets='#{babili_path}' --no-babelrc "

babili_inplace = (filename) ->
  console.log filename
  result_js = execSync(base_command + filename).toString()
  fs.writeFileSync filename, result_js
  return


do ->
  for x in process.argv[1 to]
    if not x.endsWith('.js')
      continue
    babili_inplace x
