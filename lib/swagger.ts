import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'API Doc for Skillbridge Application',
                version: '1.0',
            },
            security: [],
        },
    })
    return spec
}