import logger from '../../../../logger';
import makeRequest from '../../makeRequest';

export default async function siteAlert(req, res, next) {
    try {
        const homepageData = await makeRequest(`${req.app.locals.config.services.remote.entity}/homepage`);
        req.data = req.data || {};
        req.data.siteAlert = {
            styles: {
                textColor: homepageData.siteAlertTextColour,
                backgroundColor: homepageData.siteAlertBackgroundColour,
                backgroundImage: homepageData.siteAlertBackgroundImage.url,
                buttonColor: homepageData.siteAlertButtonColour
            },
            primaryText: homepageData.siteAlertPrimaryText,
            secondaryText: homepageData.siteAlertSecondaryText,
            link: homepageData.siteAlertButtonLink,
            isEnabled: homepageData.enableSiteAlert
        };
    } catch (error) {
        logger.error(error);
    }

    next();
}
