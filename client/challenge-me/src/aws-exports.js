const config = {
    Auth: {
        region: 'eu-central-1',
        identityPoolId: 'eu-central-1:5851bc3d-fe84-4ee6-bd83-9b1d41f0fe47'
    },
    API: {
        endpoints: [
            {
                name: "ChallengeMeAPI",
                //endpoint: "https://94uwnllp22.execute-api.eu-central-1.amazonaws.com/production",
                endpoint: 'https://lsklh0nrd6.execute-api.eu-central-1.amazonaws.com/LATEST',
                region: 'eu-central-1'
            }
        ]
    }
};

export default config;