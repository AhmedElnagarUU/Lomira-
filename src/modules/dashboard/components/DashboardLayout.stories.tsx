import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from './DashboardLayout';
import { mockDashboardResponse } from '../data/mockDashboardData';

const meta: Meta<typeof DashboardLayout> = {
  title: 'Dashboard/Layout',
  component: DashboardLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof DashboardLayout>;

export const Default: Story = {
  args: {
    initialData: mockDashboardResponse,
  },
};
