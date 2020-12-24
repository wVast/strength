import { SyncHook } from 'tapable';

const hook = new SyncHook();
hook.tap('logPlugin', () => { console.log('is tap') })
hook.call();