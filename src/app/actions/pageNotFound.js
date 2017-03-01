export default function (context) {
    context.dispatch('LOAD_CONTENT_FAILED', { response: { status: 404 } });
}
