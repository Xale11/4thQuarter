module.exports = {
    apps: [
      {
        name: '4th-Quarter',
        script: 'index.js', // Entry point to your Node.js app
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
        env_file: '../config4thqtr/app.env', // Specify the environment file
      },
    ],
  };