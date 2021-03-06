/**
 * Created by zhengguo.chen on 16/11/23.
 * Apps controller
 */

var router = require('express').Router();

var appModel = require('../models/app');
var apiModel = require('../models/api');

router.route('/')
  // get app list
  .get((req, res) => {
    res.handleResult(appModel.getAppList());
  })
  // add app
  .post((req, res) => {
    res.handleResult(appModel.createApp(req.body));
  });

router.route('/:appId')
  // get app
  .get((req, res) => {
    res.handleResult(appModel.getApp(req.params.appId));
  })
  // update app
  .put((req, res) => {
    res.handleResult(appModel.updateApp(req.params.appId, req.body));
  })
  // delete app
  .delete((req, res) => {
    res.handleResult(appModel.deleteApp(req.params.appId));
  });

router.route('/:appId/api')
  // get api list by app id
  .get((req, res) => {
    res.handleResult(apiModel.getApiList(req.params.appId));
  })
  // add api to this app
  .post((req, res) => {
    res.handleResult(apiModel.createApi(req.params.appId, req.body));
  });

router.route('/:appId/api/:apiId')
  // get api list by app id
  .get((req, res) => {
    res.handleResult(apiModel.getApi(req.params.appId, req.params.apiId));
  })
  // add api to this app
  .put((req, res) => {
    res.handleResult(apiModel.updateApi(req.params.appId, req.params.apiId, req.body));
  })
  // delete api off this app
  .delete((req, res) => {
    var deleteApi = () => apiModel.deleteApi(req.params.appId, req.params.apiId);
    res.handleResult(appModel.getApp(req.params.appId).then(deleteApi));
  })

module.exports = router;

