import APIUtils from '@bxm/api-utils';
import logger from '../../../../logger';

export default async function siteAlert(req, res, next) {
    try {
        const { config } = req.app.locals;
        const { getEntity } = new APIUtils(logger, config);
        const homepageData = await getEntity('homepage', { throwOnFailedRequest: false });

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
