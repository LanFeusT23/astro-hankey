module.exports = {
    pwa: {
        name: "Jonathan Hankey Astrophotography",
        iconPaths: {
            favicon16: 'favicon.ico',
        },
        manifestOptions: {
            icons: []
        },
        workboxPluginMode: 'GenerateSW',
        workboxOptions: {
            skipWaiting: true
        }
    }
}