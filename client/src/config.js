const local = true;
export default {
    baseURL: local ? `http://localhost:4200` : `http://example.com`,
    apiUrl: local ?  `http://localhost:8100` : `http://example.com`,
}