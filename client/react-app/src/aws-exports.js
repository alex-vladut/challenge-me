const config = {
    Auth: {
        region: 'eu-central-1',
        identityPoolId: 'eu-central-1:9417e06d-8f42-413c-9f9c-55b0f495039e'
    },
    API: {
        endpoints: [
            {
                name: "ChallengeMeAPI",
                //endpoint: "https://94uwnllp22.execute-api.eu-central-1.amazonaws.com/production",
                endpoint: 'https://pmx92v7jw6.execute-api.eu-central-1.amazonaws.com/production',
                region: 'eu-central-1'
            }
        ]
    }
};

export default config;