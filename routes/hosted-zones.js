const express = require('express');
const router = express.Router();
const {route53} = require('../aws');

router.get('/', function(req, res, next) {
    // res.render('please-wait')
    Promise.resolve(route53.listHostedZones()).then(zones => {
        console.log('zones: ', zones);
        res.status(200).render('hosted-zones', { title: 'Hosted Zones', zones: JSON.stringify(zones)});
    }).catch(err => {
        console.log('err: ', err);
        res.status(500).send(err);
    })
    
})

router.get('/zone/:id', (req, res)=>{
    console.log('');
    res.render('zone', {
        zoneId: req.params.id,
        zoneRecords: route53.listHostedZoneRecords(req.params.id)
    })
})

module.exports = router;