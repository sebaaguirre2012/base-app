import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sna.baseapp',
  appName: 'base-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
