import { findAll } from "../User";
import { get, put, post } from 'request-promise-native';


const  WorkspaceService = {
    getHeader() {
        return { 'Authorization': 'Bearer ' +  process.env.ASANA_APP_TOKEN};
    },

    getAll(req: any, res: any) {
        const requestOptions = {
            method: 'GET',
            headers: this.getHeader()
        };

        const options = {
            uri: `${process.env.ASANA_API_URL}/workspaces`,
            headers: this.getHeader(),
            json: true // Automatically parses the JSON string in the response
        };

        get(options)
        .then(function (data: any) {
            res.status(200).json(data);
        })
        .catch(function (err: any) {
           res.status(400).json({
               error: err
           })
        });
    },
}

export default  WorkspaceService;