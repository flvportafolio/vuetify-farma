import { notify } from "@kyvg/vue3-notification";

export enum TypeNotification {
  Ok = 'success',
  Warn = 'warn',
  Error = 'error',
}
export default function showNotify(title: string, text: string, type: TypeNotification) {
  notify({
    title,
    text,
    type,
  });
}
