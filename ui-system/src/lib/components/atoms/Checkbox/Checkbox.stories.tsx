import React from 'react'
import { Checkbox, CheckboxProps, CHECKBOX_VARIANT } from './Checkbox'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    placeholder: { control: 'text' },
    variant: objectValuesToControls(CHECKBOX_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Checkbox> = (args: CheckboxProps) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  placeholder: 'Checkbox',
  variant: 'DEFAULT',
  isDisabled: false,
  isError: false,
}
