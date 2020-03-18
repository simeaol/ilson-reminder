const jows = [
    {
        id: 0,
        name: 'Simeão David Lamine',
        phone: '----',
        date: [Date],
        count: 2,
    },

    {
        id: 1,
        name: 'Macumbeiro',
        phone: '----',
        date: [Date],
        count: 1,
    },

    {
        id: 2,
        name: 'Chessus',
        phone: '----',
        date: [Date],
        count: 0,
    },

    {
        id: 3,
        name: 'Cagão',
        phone: '----',
        date: [Date],
        count: 0,
    },

    {
        id: 4,
        name: 'Deidão',
        phone: '----',
        date: [Date],
        count: 0,
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
