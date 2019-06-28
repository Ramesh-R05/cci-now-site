import { parseEntities } from './parseEntity';

export default function createReapeatableList({ host, basePath, pageNo, skip, items, totalCount, listName, startFrom, additionalParams = {} } = {}) {
    if (
        basePath === undefined ||
        pageNo === undefined ||
        skip === undefined ||
        items === undefined ||
        totalCount === undefined ||
        listName === undefined ||
        startFrom === undefined
    ) {
        return {};
    }

    let previousPage = null;
    let nextPage = null;

    if (pageNo > 1) {
        const path = pageNo === 2 ? basePath : `${basePath}?pageNo=${pageNo - 1}`;
        previousPage = {
            path,
            url: `${host}${path}`
        };
    }

    if (skip + items.length < totalCount) {
        const path = `${basePath}?pageNo=${pageNo + 1}`;
        nextPage = {
            path,
            url: `${host}${path}`
        };
    }

    const path = pageNo > 1 ? `${basePath}?pageNo=${pageNo}` : basePath;

    const currentPage = {
        path,
        url: `${host}${path}`
    };

    return {
        listName,
        params: {
            pageNo,
            ...(additionalParams && additionalParams)
        },
        items: [parseEntities(items.slice(startFrom))],
        previous: previousPage,
        current: currentPage,
        next: nextPage
    };
}
