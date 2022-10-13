module.exports = {
    components: {
        schemas: {
            HexAddress: {
                type: 'string',
                description: 'Address',
                example:
                    '00d86a5efcde8c4129755d0d43b0fd87622a260d45b33bc04140772a532d14a4e1198cebde34e68f82b94f5068de44aa580ebf66cfaaef0698',
            },
            Address: {
                type: 'string',
                description: 'Address',
                example:
                    'addr_test1qpfufyatxx9e349at0ltac2h7vazctw0yafwsxx4trugvl25y50u28gj3jvqskzujhmxkrz3gmwalra0ardlz00x2a6qmwuqsm',
            },
            AccessToken: {
                type: 'string',
                description: 'Access token',
                example: '...access token...',
            },
            AppKey: {
                type: 'string',
                description: 'App key',
                example: 'dapp',
            },
            DappInfo: {
                type: 'object',
                description: 'Dapp info',
                properties: {
                    appKey: {
                        type: 'string',
                        description: 'App key',
                        example: 'dapp',
                    },
                    name: {
                        type: 'string',
                        description: 'Dapp name',
                        example: 'Dapp',
                    },
                    url: {
                        type: 'string',
                        description: 'Dapp url',
                        example: 'http://localhost:4000/',
                    },
                    redirect_url: {
                        type: 'string',
                        description: 'Dapp redirect url',
                        example: 'http://localhost:4000/',
                    },
                    logo: {
                        type: 'string',
                        description: 'Dapp logo',
                        example: 'http://localhost:4000/logo.png',
                    },
                },
            },
            DappInfoResponse: {
                type: 'object',
                description: 'Dapp info response',
                properties: {
                    data: {
                        $ref: '#/components/schemas/DappInfo',
                    },
                },
            },
            RandomNumberResponse: {
                type: 'object',
                description: 'Random number response',
                properties: {
                    data: {
                        type: 'object',
                        description: 'Access token with random number',
                        properties: {
                            access_token: {
                                $ref: '#/components/schemas/AccessToken',
                            },
                        },
                    },
                },
            },
            LoginRequestData: {
                type: 'object',
                description: 'Login request data',
                properties: {
                    randomNumber: {
                        type: 'number',
                        description: 'Random number',
                        example: '0.9008389232827',
                    },
                    timestamp: {
                        type: 'number',
                        description: 'Timestamp',
                        example: '1589788983',
                    },
                    rememberMe: {
                        type: 'boolean',
                        description: 'Get access token with long term',
                        example: false,
                    },
                },
            },
            LoginRequest: {
                type: 'object',
                description: 'Login request',
                properties: {
                    data: {
                        $ref: '#/components/schemas/LoginRequestData',
                    },
                    signedData: {
                        type: 'string',
                        description: 'Signed data',
                        example: '...signed data...',
                    },
                    address: {
                        $ref: '#/components/schemas/HexAddress',
                    },
                },
            },
            LoginResponse: {
                type: 'object',
                description: 'Login response',
                properties: {
                    data: {
                        type: 'object',
                        description: 'Access token',
                        properties: {
                            access_token: {
                                $ref: '#/components/schemas/AccessToken',
                            },
                        },
                    },
                },
            },
            VerifyResponse: {
                type: 'object',
                description: 'Verify response',
                properties: {
                    data: {
                        type: 'object',
                        description: 'Address',
                        properties: {
                            address: {
                                $ref: '#/components/schemas/Address',
                            },
                        },
                    },
                },
            },
        },
    },
};
