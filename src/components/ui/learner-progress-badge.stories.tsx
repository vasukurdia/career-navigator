import type { Meta, StoryObj } from "@storybook/react";
import { LearnerProgressBadge } from "./learner-progress-badge";

const meta: Meta<typeof LearnerProgressBadge> = {
  title: "UI/LearnerProgressBadge",
  component: LearnerProgressBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["default", "inProgress", "completed", "disabled"],
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof LearnerProgressBadge>;

export const Default: Story = {
  args: {
    status: "default",
  },
};

export const InProgress: Story = {
  args: {
    status: "inProgress",
  },
};

export const Completed: Story = {
  args: {
    status: "completed",
  },
};

export const Disabled: Story = {
  args: {
    status: "disabled",
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <LearnerProgressBadge status="default" />
      <LearnerProgressBadge status="inProgress" />
      <LearnerProgressBadge status="completed" />
      <LearnerProgressBadge status="disabled" />
    </div>
  ),
};