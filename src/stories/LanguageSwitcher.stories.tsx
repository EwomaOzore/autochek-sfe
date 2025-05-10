import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { LanguageSwitcher } from '../components/common/LanguageSwitcher';
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Components/Common/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A language switcher component that allows users to change the application language.'
      }
    }
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div className="p-4 bg-white dark:bg-gray-800 rounded">
          <Story />
        </div>
      </I18nextProvider>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

export const Default: Story = {}; 