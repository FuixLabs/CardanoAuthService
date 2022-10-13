module.exports = {
    get: {
        tags: ['App'],
        description: 'Fetch DApp info',
        operationId: 'getDappInfo',
        parameters: [
            {
                name: 'app-key',
                in: 'query',
                schema: {
                    $ref: '#/components/schemas/AppKey',
                },
                required: true,
                description: 'app-key',
            },
        ],
        responses: {
            200: {
                description: 'Dapp info',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/DappInfoResponse',
                        },
                    },
                },
            },
        },
    },
};
