const jows = [
    {
        id: 0,
        name: 'Simeao David Lamine',
        phone: '19983028978',
        date: [Date],
        count: 2,
    },

    {
        id: 1,
        name: 'Macumbeiro',
        phone: '3591616848',
        date: [Date],
        count: 0,
    },

    {
        id: 2,
        name: 'Chessus',
        phone: '35999820583',
        date: [Date],
        count: 1,
    }

];

module.exports = {
    getJows: () => {
        return jows;
    },

    confirm: async ({id}) => {

        const index = jows.findIndex(jow => jow.id === id);
        jows[index].count = jows[index].count + 1;
        jow[index]['date'].append(new Date());
    }
};