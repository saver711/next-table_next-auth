import xior from 'xior';
import cachePlugin from 'xior/plugins/cache';
import errorRetryPlugin from 'xior/plugins/error-retry';
import MockPlugin from 'xior/plugins/mock';
import uploadDownloadProgressPlugin from 'xior/plugins/progress';
import throttlePlugin from 'xior/plugins/throttle';
import { getCurrentUser } from '../user/current-user';

const instance = xior.create({
  headers: async () => {
    const user = await getCurrentUser();
    const token = user?.accessToken;
    return { Authorization: `Bearer ${token}` };
  },
});
instance.plugins.use(errorRetryPlugin({}));
instance.plugins.use(cachePlugin({}));
instance.plugins.use(throttlePlugin({}));
instance.plugins.use(uploadDownloadProgressPlugin({}));
const mock = new MockPlugin(instance, { onNoMatch: 'passthrough' });

// instance.defaults.headers['Authorization'] = `Bearer zzz`;

instance.plugins.use((adapter) => {
  return async (config) => {
    const res = await adapter(config);
    return res;
  };
});

export { instance as soliXior };
