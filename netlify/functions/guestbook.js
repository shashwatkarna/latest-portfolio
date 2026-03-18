const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
    const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!REDIS_URL || !REDIS_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Environment variables REDIS_URL or REDIS_TOKEN are missing." })
        };
    }

    const { httpMethod, body } = event;

    try {
        if (httpMethod === "GET") {
            // Fetch comments
            const response = await fetch(`${REDIS_URL}/lrange/comments/0/49`, {
                headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
            });
            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } else if (httpMethod === "POST") {
            // Add comment
            const payload = JSON.parse(body);
            const comment = JSON.stringify({ 
                text: payload.text, 
                timestamp: Date.now() 
            });

            const response = await fetch(`${REDIS_URL}/lpush/comments/${encodeURIComponent(comment)}`, {
                headers: { Authorization: `Bearer ${REDIS_TOKEN}` }
            });
            const data = await response.json();
            return {
                statusCode: 200,
                body: JSON.stringify(data)
            };
        } else {
            return {
                statusCode: 405,
                body: "Method Not Allowed"
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
