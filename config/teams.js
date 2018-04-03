const teams = {
    'team-1': 'Portocaliu',
    'team-2': 'Bej',
    'team-3': 'Lila',
    'team-4': 'Verde',
    'team-5': 'Roz',
    'team-6': 'Maro'
};
module.exports = {
    teams,
    teamMapper: (teamId) => {
        return teams[teamId];
    }
}