import mitt, { Emitter, EventType } from "mitt";
import { onBeforeUnmount } from "vue";
const emitter = mitt();

export default () => {
  const handler: { event: string; handler: any }[] = [];

  onBeforeUnmount(() => {
    handler.forEach((h) => emitter.off(h.event, h.handler));
  });

  return {
    on(event: string, handler: (v: any) => void) {
      emitter.on(event, handler);
    },
    emit(event: string, payload: any) {
      handler.push({ event, handler });
      emitter.emit(event, payload);
    },
  };
};
