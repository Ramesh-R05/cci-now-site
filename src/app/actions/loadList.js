import listService from '../services/list';

export default function loadList(context, payload) {
    return listService.read(payload).then(
        (content) => {
            if (content instanceof Error) context.dispatch('LOAD_LIST_FAILED', content);
            else context.dispatch('LOAD_LIST', { ...content, request: { payload } });
        },
        error => context.dispatch('LOAD_LIST_FAILED', error)
    );
}
