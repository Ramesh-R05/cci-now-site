import momentTimezone from 'moment-timezone';

export default function transformTeaserPageDateCreated(teasers) {
    if (!Array.isArray(teasers)) {
        return [];
    }

    return teasers.map(teaserData => ({
        ...teaserData,
        ...(teaserData.pageDateCreated && {
            pageDateCreated: momentTimezone.tz(teaserData.pageDateCreated, 'Australia/Sydney').format('YYYY-MM-DDTHH:mm:ss')
        })
    }));
}
