const Data = require('../models/dataModel');

// exports.filterData = async (req, res) => {
//     try {
//         const { startTime, endTime, interval } = req.query;

//         // Validate startTime, endTime, and interval
//         if (!startTime || !endTime || !interval) {
//             return res.status(400).json({ message: 'Start time, end time, and interval are required' });
//         }

//         // Define the aggregation pipeline stages based on the specified interval
//         let groupByStage;
//         switch (interval) {
//             case 'minute':
//                 groupByStage = {
//                     $group: {
//                         _id: {
//                             $dateToString: { format: '%Y-%m-%d %H:%M', date: '$timestamp' }
//                         },
//                         data: { $push: '$$ROOT' }
//                     }
//                 };
//                 break;
//             case 'hour':
//                 groupByStage = {
//                     $group: {
//                         _id: {
//                             $dateToString: { format: '%Y-%m-%d %H', date: '$timestamp' }
//                         },
//                         data: { $push: '$$ROOT' }
//                     }
//                 };
//                 break;
//             case 'day':
//                 groupByStage = {
//                     $group: {
//                         _id: {
//                             $dateToString: { format: '%Y-%m-%d', date: '$timestamp' }
//                         },
//                         data: { $push: '$$ROOT' }
//                     } 
//                 };
//                 break;
//             // Add cases for 'week', 'month', etc. as needed
//             default:
//                 return res.status(400).json({ message: 'Invalid interval' });
//         }

//         // Perform aggregation to group data based on the specified interval
//         const data = await Data.aggregate([
//             { $match: { timestamp: { $gte: new Date(startTime), $lte: new Date(endTime) } } },
//             groupByStage
//         ]);
//         console.log(data);
//         return res.json(data);
//     } catch (error) {
//         console.error('Error filtering data:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

exports.filterData = async (req, res) => {
    try {
        const { startTime, endTime } = req.query;

        // Validate startTime and endTime (assuming they are timestamps)
        if (!startTime || !endTime) {
            return res.status(400).json({ message: 'Start time and end time are required' });
        }
        console.log('Filtered data:', new Date(startTime));
        // Query the database to retrieve data within the specified time range
        const data = await Data.find({
            timestamp: { $gte: new Date(startTime), $lte: new Date(endTime) }
        });
        //console.log('Filtered data:', data);
        return res.json(data);

    } catch (error) {
        console.error('Error filtering data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};