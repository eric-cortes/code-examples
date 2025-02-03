import React from 'react'
import { Input, InputProps, INPUT_VARIANT } from './Input'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  argTypes: {
    placeholder: { control: 'text' },
    label: { control: 'text' },
    supportingText: { control: 'text' },
    variant: objectValuesToControls(INPUT_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />

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
