export default function loadList(context, payload) {
    console.log('test deploy');
    return context.getService('list').read(payload).then(
        content => context.dispatch('LOAD_LIST', content),
        error => context.dispatch('LOAD_LIST_FAILED', error)
    );
}
