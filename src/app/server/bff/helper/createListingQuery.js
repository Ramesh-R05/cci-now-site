export default function createListingQuery(tagNames, { operator } = {}) {
    if (!Array.isArray(tagNames) || !tagNames.length || !['ne', 'eq'].includes(operator)) {
        return '';
    }

    const tagString = tagNames.join(',');

    return `tagsDetails/fullName ${operator} '${tagString}'`
        .replace(/ /g, '%20')
        .replace(/'/g, '%27')
        .replace(/:/g, '_');
}
