import WorkspaceService from './services';

export function getAll(req: any, res: any) {
    WorkspaceService.getAll(req, res);
}