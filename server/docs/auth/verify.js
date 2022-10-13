module.exports = {
    get: {
        tags: ['Auth'],
        description: 'verify access token',
        operationId: 'verify',
        responses: {
            200: {
                description: 'Address',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/VerifyResponse',
                        },
                    },
                },
            },
        },
    },
};
