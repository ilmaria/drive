const { spawn } = require('child_process')

spawn('bsb -make-world -w', {
  stdio: 'inherit',
  shell: true,
})

spawn('webpack-dev-server --mode development --open', {
  stdio: 'inherit',
  shell: true,
})
