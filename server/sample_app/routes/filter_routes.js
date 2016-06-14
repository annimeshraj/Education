var filter_routes  =[
					'/schools',
					'/school',
					'/school/:id',
					'/subject/:id',
					'/subjects',
					'/subject',
					'/questions',
					'/answers',
					'/answers/reply'
                    ];
var exclude_routes=[
					'/contact_us',
					'/subscriptions',
					'/questions',
					'/answers'
                    ];

module.exports = {
     filter_routes:filter_routes,
     exclude_routes:exclude_routes
};
