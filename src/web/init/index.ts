import '@mantine/charts/styles.css';

import { Input, Modal } from '@mantine/core';
import { appProviderConfigs } from '@roxavn/core/web';
import { webModule as projectWebModule } from '@roxavn/module-project/web';

export default function () {
  projectWebModule.adminPluginRegisters.push(() => import('./project.js'));
  appProviderConfigs.mantineProvider.options = {
    theme: {
      components: {
        Modal: Modal.extend({
          styles: () => ({
            content: {
              border: '1px solid #0026a1',
              borderRadius: 10,
              backgroundColor: '#001351',
            },
            header: {
              backgroundColor: '#001351',
            },
            title: {
              fontWeight: 'bold',
            },
          }),
          defaultProps: {
            centered: true,
          },
        }),
        Input: Input.extend({
          styles: () => ({
            input: {
              backgroundColor: '#020B28',
            },
          }),
        }),
      },
    },
    withGlobalClasses: true,
    forceColorScheme: 'dark',
  };
}
