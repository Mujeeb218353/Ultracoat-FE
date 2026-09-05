export let globalAbortController = new AbortController();

export function resetAbortController() {
  globalAbortController = new AbortController();
}