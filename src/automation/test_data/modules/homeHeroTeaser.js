import DataManager from '../class/DataManager';

const hero = {
    id: "NOW-19532",
    title: "Prince Harry makes secret trip to see Meghan Markle in Toronto",
    dateCreated: "2016-11-03T20:44:00.00Z",
    imageUrl: "https://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/WomansDay/2016/11/04/17021/Prince-harry-meghan-markle-main.jpg",
    nodeType: "Article",
    summary: "It seems the loved-up royal can’t bear to be away from his new lady for too long.",
    source: "Woman's Day",
    url: "/royals/british-royal-family/prince-harry-makes-secret-trip-to-see-meghan-markle-19532",
    tagsDetails: [
        {
            name: "royalty:noble_person:Prince Harry",
            urlName: "prince-harry",
            fullName: "royalty_noble_person_Prince_Harry",
            displayName: "Prince Harry"
        },
        {
            name: "location:citytown:Toronto",
            urlName: "toronto",
            fullName: "location_citytown_Toronto",
            displayName: "Toronto"
        },
        {
            name: "common:topic:Dating",
            urlName: "dating",
            fullName: "common_topic_Dating",
            displayName: "Dating"
        }
    ]
};

export default new DataManager(hero);
