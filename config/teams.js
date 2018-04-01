const teams = {
    'team-1': 'Red',
    'team-2': 'Yellow',
    'team-3': 'Blue',
    'team-4': 'Pink',
    'team-5': 'Orange',
    'team-6': 'Green'
};
module.exports = {
    teams,
    teamMapper: (teamId) => {
        return teams[teamId];
    }
}