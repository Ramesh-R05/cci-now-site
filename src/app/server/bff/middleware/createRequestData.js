export default function createRequestData(req, res, next) {
    req.data = {};

    next();
}
