import React from 'react'
import { Textarea, TextareaProps, TEXTAREA_VARIANT } from './Textarea'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Textarea> = {
  title: 'Atoms/Textarea',
  component: Textarea,
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    supportingText: { control: 'text' },
    variant: objectValuesToControls(TEXTAREA_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Textarea> = (args: TextareaProps) => <Textarea {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Input',
  supportingText: '',
  label: '',
  variant: 'DEFAULT',
  isRequired: false,
  isDisabled: false,
  isError: false,
  id: '',
}
