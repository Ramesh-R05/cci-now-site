import request from 'superagent';
import { canUseDOM } from 'exenv';

const host = canUseDOM ? '' : 'http://127.0.0.1:3001';

export default {

    read(params) {
        return request.get(`${host}/api/list`).query(params).then(
            response => response,
            error => error
        );
    }

};
