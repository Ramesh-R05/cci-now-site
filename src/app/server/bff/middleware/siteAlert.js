import logger from '../../../../logger';
import makeRequest from '../../makeRequest';

export default async function siteAlert(req, res, next) {
    try {
        const homepageData = await makeRequest(`${req.app.locals.config.services.remote.entity}/homepage`)
            .then(data => data)
            .catch(() => ({}));

        const {
            siteAlertTextColour,
            siteAlertBackgroundColour,
            siteAlertBackgroundImage,
            siteAlertButtonColour,
            siteAlertPrimaryText,
            siteAlertSecondaryText,
            siteAlertButtonLink,
            enableSiteAlert
        } = homepageData;

        req.data.siteAlert = {
            styles: {
                textColor: siteAlertTextColour,
                backgroundColor: siteAlertBackgroundColour,
                backgroundImage: siteAlertBackgroundImage && siteAlertBackgroundImage.url ? siteAlertBackgroundImage.url : '',
                buttonColor: siteAlertButtonColour
            },
            primaryText: siteAlertPrimaryText,
            secondaryText: siteAlertSecondaryText,
            link: siteAlertButtonLink,
            isEnabled: enableSiteAlert
        };
    } catch (error) {
        logger.error(error);
    }

    next();
}
