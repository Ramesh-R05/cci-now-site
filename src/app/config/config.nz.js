export default {
	site: {
		host: 'http://dev.nznow-site.bauer-media.net.au',
		prodDomain: 'www.nowtolove.co.nz',
		prefix: 'NZNOW',
	},

	services: {
		remote: {
			entity: 'http://dev.entities.services.bauer-media.internal/v1/nznow',
			listings: 'http://dev.listings.services.bauer-media.internal/v1/nznow',
			module: 'http://dev.modules.services.bauer-media.internal/v1/nznow',
			sitemap: 'http://dev.sitemaps.services.bauer-media.internal/v1/nznow',
			trending: 'http://trending.bauer.mg/today?sites=nowtolove.co.nz',
			tag: 'http://dev.tags.services.bauer-media.internal/v1/nznow'
		}
	},
	
	brands: {
		uniheader: [
			{
		        "id": "nzww",
		        "title": "New Zealand's Women's Weekly",
		        "magazineTitle": "The NZ Women's Weekly",
		        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
		        "url": "/womensweekly",
		        "socialLinks": {
		            "facebookUrl": "https://www.facebook.com/womensweeklynz",
		            "twitterUrl": "https://twitter.com/womensweeklynz",
		            "instagramUrl": "https://instagram.com/womensweeklynz"
		        }
		    },
		    {
		        "id": "awwnz",
		        "title": "Australian Women's Weekly",
		        "magazineTitle": "The Australian Women's Weekly",
		        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
		        "url": "/aww",
		        "socialLinks": {
		            "facebookUrl": "https://www.facebook.com/WomensWeeklyMag",
		            "twitterUrl": "https://twitter.com/womensweeklymag",
		            "instagramUrl": "https://www.instagram.com/womensweeklymag"
		        }
		    },
		    {
		        "id": "next",
		        "title": "Next",
		        "magazineTitle": "Next Magazine",
		        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
		        "url": "/next",
		        "socialLinks": {
		            "facebookUrl": "https://www.facebook.com/nextmagazine/",
		            "twitterUrl": "https://twitter.com/nextmagazinenz",
		            "instagramUrl": "https://www.instagram.com/nextmagazinenz/"
		        }
		    },
		    {
		        "id": "nzgh",
		        "title": "New Zealand Good Health Choices",
		        "magazineTitle": "New Zealand Good Health Choices",
		        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
		        "url": "/nzgh",
		        "socialLinks": {
		            "facebookUrl": "https://www.facebook.com/goodhealthchoicesnz/",
		            "twitterUrl": "https://twitter.com/good_health_nz",
		            "instagramUrl": "https://www.instagram.com/goodhealthnz/"
		        }
		    },
		    {
		        "id": "nzwd",
		        "title": "New Zealand Woman's Day",
		        "magazineTitle": "New Zealand Woman's Day",
		        "imageUrl": "/assets/images/headerlogos/AWW-logo.svg",
		        "url": "/nzwd",
		        "socialLinks": {
		            "facebookUrl": "https://www.facebook.com/goodhealthchoicesnz/",
		            "twitterUrl": "https://twitter.com/WomansDayNZ",
		            "instagramUrl": "http://instagram.com/womansdaynz"
		        }
		    }
		]
	}
}