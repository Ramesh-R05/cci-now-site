export function getPlaceholderImage(data) {
    const imagePlaceholderUrl = '/assets/placeholder/dolly-LHR-feed-placeholder.png';
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            data[key].contentImageUrl = data[key].contentImageUrl || imagePlaceholderUrl;
        }
    }
    return data;
}
