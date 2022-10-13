module.exports = {
    get: {
        tags: ['Auth'],
        description: 'Fetch random number',
        operationId: 'getRandomNumber',
        responses: {
            200: {
                description: 'Access token with random number',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/RandomNumberResponse',
                        },
                    },
                },
            },
        },
    },
};
