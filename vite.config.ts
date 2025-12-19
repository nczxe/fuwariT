import type { Plugin } from 'vite';

export default {
  plugins: [
    {
      name: 'index-now-notification',
      apply: 'build',
      async buildEnd() {
        const siteUrl = 'https://blog.tncrr.us.kg';
        const indexNowKey = 'f5a35d993d654a85b9305b92b380c7f1';
        
        try {
          // 通知Bing IndexNow
          const bingResponse = await fetch(
            `https://api.indexnow.org/indexnow?url=${siteUrl}&key=${indexNowKey}`,
            { method: 'GET' }
          );
          console.log(`✅ IndexNow notification sent to Bing: ${bingResponse.status}`);
          
          // 通知Yandex IndexNow
          const yandexResponse = await fetch(
            `https://yandex.com/indexnow?url=${siteUrl}&key=${indexNowKey}`,
            { method: 'GET' }
          );
          console.log(`✅ IndexNow notification sent to Yandex: ${yandexResponse.status}`);
        } catch (error) {
          console.error('❌ Failed to send IndexNow notifications:', error);
        }
      }
    }
  ]
};
