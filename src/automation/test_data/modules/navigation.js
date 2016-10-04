import DataManager from '../class/DataManager';

const navigation = {
    items: [
        {
            "url": "/celebrity",
            "name": "Celebrity"
        },
        {
            "url": "/fashion",
            "name": "Fashion"
        },
        {
            "url": "/beauty",
            "name": "Beauty"
        },
        {
            "url": "/dolly-doctor",
            "name": "Dolly Doctor"
        },
        {
            "url": "/lifestyle",
            "name": "Lifestyle"
        },
        {
            "url": "/video",
            "name": "Video"
        },
        {
            "url": "/win",
            "name": "Win"
        }
    ]
};

export default new DataManager(navigation);
