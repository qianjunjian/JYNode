module.exports = app => ({
    'get /detail': app.$ctrl.home.detail,
    "get /": app.$ctrl.home.index,
})