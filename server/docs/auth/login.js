module.exports = {
    post: {
        tags: ['Auth'],
        description: 'Login',
        operationId: 'login',
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/LoginRequest',
                    },
                },
            },
        },
        responses: {
            200: {
                description: 'Access token',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/LoginResponse',
                        },
                    },
                },
            },
        },
    },
};
