const axios = require('axios');
const licenseSdk = require('@greatminds/dp-license-sdk');
const {Version} = require("@greatminds/dp-license-sdk");

(async function () {

    function authenticate(username) {
        return axios.request({
            url: 'https://f23hudzsda.execute-api.us-east-1.amazonaws.com/v1/auth/i/passwordless',
            method: 'post',
            data: {
                "username": username,
                "secret": "$2a$10$MnCROw0ddMz6o8RMd2SrYuMwJEjnhOMT1fwT4oWf6TR9dp536hQyi",
            },
            headers: {
                'X-Api-Key': 'rv5iqdGwmg7wjcm0Q1P8j8X2HBInWQqI3ykum1to',
            }
        });
    }

    const auth = await authenticate("s1.licenses@yopmail.com");
    //const auth = await authenticate("dis.dev@yopmail.com");

    const licenseClient = licenseSdk.LicenseClientBuilder.getClient({
        hostURL: 'https://digital.dev.greatminds.dev',
        districtId: '38d8f29a-dd68-4847-8441-51151ae78ed3',
        user: {
            token: auth.data.AccessToken,
        },
        version: Version.V3
    });
    try {
        console.time('licenseClient.getFullLicenses()');
        console.log(await licenseClient.getFullLicenses());
        console.timeEnd('licenseClient.getFullLicenses()');

        console.time('licenseClient.getLicensesCurriculums()');
        console.log(await licenseClient.getLicensesCurriculums());
        console.timeEnd('licenseClient.getLicensesCurriculums()');

        console.time('licenseClient.getLicensesProducts()');
        console.log(await licenseClient.getLicensesProducts());
        console.timeEnd('licenseClient.getLicensesProducts()');

        console.time('licenseClient.hasALicenseToProduct([\'affirm\'])');
        console.log(await licenseClient.hasALicenseToProduct(['affirm']));
        console.timeEnd('licenseClient.hasALicenseToProduct([\'affirm\'])');

        console.time('licenseClient.hasALicenseToProduct([\'noexiste\'])');
        console.log(await licenseClient.hasALicenseToProduct(['noexiste']));
        console.timeEnd('licenseClient.hasALicenseToProduct([\'noexiste\'])');

        console.log("/* ---------------------------------------- */");

        const auth = await authenticate("dptest-dcst@yopmail.com");

        licenseClient.setDistrictId('7300e0f6-a132-42d7-abbb-4c1371a1eec9');
        licenseClient.setUser({
            token: auth.data.AccessToken,
        });

        console.time('licenseClient.getFullLicenses()');
        console.log(await licenseClient.getFullLicenses());
        console.timeEnd('licenseClient.getFullLicenses()');


        licenseClient.setDistrictId('noexiste');
        console.log(await licenseClient.getFullLicenses());

        // console.time('licenseClient.updateDistrictLicense()');
        // const seats = Math.floor(Math.random() * 50);
        // console.log(await licenseClient.updateDistrictLicense([{
        //     "op": "replace",
        //     "path": "$.seats",
        //     "value": seats
        // }], "38cd7e89-4abc-44c0-a0a8-df5112563688"));
        // console.timeEnd('licenseClient.updateDistrictLicense()');
        //
        // console.log(await licenseClient.getLicenseByID("38cd7e89-4abc-44c0-a0a8-df5112563688"));


    } catch (e) {
        console.log(e);
    }
})();
