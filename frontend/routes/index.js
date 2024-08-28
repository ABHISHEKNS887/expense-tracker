var express = require('express')
var router = express.Router()

router.get('/api/healthCheck', (req, res) => {
  res.json({
    success: true
  })
})

module.exports = router
