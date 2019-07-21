import { Router } from 'express';
import { WorkspaceComponent } from '../components';

const router: Router = Router();

router.get('/', WorkspaceComponent.getAll);

export default router;

