import { usuarioServices} from '../../services/usuario-service';
import { Usuario} from '../../services/common/usuario';
import { ResponseBody } from '../common/response-body';
import { Request, Response } from 'express';

export function signin(req: Request, res: Response, next) {
    let body: Usuario = req.body;
    usuarioServices.signin(body)
        .then(result => res.send(new ResponseBody(true)))
        .catch(err => res.status(500)
            .send(new ResponseBody(false, null, err)));
}