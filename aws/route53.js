const cp = require('child_process');

const route53 = {
    /**
     * List the route53 hosted zones
     */
    listHostedZones: function () {
        const zones = cp.execSync('aws route53 list-hosted-zones').toString(); // get zones with cli command
        return JSON.parse(zones).HostedZones.map( // remap each zone attr to one level
            zone => {
                zone.Comment = zone.Config.Comment; // remap comment
                zone.PrivateZone = zone.Config.PrivateZone; // remap Private zone
                delete zone.Config; // delete config attribute from object
                return zone; // return
            }
        );
    },

    listHostedZoneRecords: function (id) {
        return cp.execSync(`aws route53 list-resource-record-sets --hosted-zone-id ${id}`)
    }
};

module.exports = route53;