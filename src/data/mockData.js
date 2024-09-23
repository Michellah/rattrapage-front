const patrimoinies = [
    {
        id: 1,
        name: "Cresus",
        tresorerie: [
            { id: '1a', name: 'compteCourant', value: 15000 },
            { id: '1b', name: 'epargne', value: 8000 },
            { id: '1c', name: 'espèces', value: -500 },
        ],
        immobilisations: [
            { id: '2a', name: 'maison', value: 250000 },
            { id: '2b', name: 'logiciel', value: 10000 },
        ],
        obligations: [
            { id: '3a', name: 'detteHypothécaire', value: 100000 },
            { id: '3b', name: 'créanc', value: 5000 },
        ],
        images: "/stat.png",
    },
];


export default patrimoinies;