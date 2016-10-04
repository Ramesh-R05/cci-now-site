export default function(context, payload) {
    context.dispatch('LOAD_CONTENT_FAILED', {response: {status: 404}});
}
