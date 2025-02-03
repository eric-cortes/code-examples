import React from 'react'
import { Button, ButtonProps, BUTTON_VARIANT, ICONBUTTON_VARIANT } from './Button'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { iconMapping } from '../../icons/iconMapping'

const iconNames = Object.values(iconMapping).map((icon) => icon.name)

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    label: { control: 'text' },
    variant: objectValuesToControls(BUTTON_VARIANT),
    iconName: { control: 'select', options: iconNames },
  },
}
export default meta

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Button',
  variant: 'DEFAULT',
  isDisabled: false,
  isOutlined: false,
}

export const Icon = Template.bind({})
Icon.args = {
  label: 'Button',
  variant: 'ICON',
  isOutlined: true,
  fillColor: '',
  iconName: iconMapping.AccountCircle.name,
}

export const IconPlus = Template.bind({})
IconPlus.args = {
  label: 'Button',
  variant: 'ICONPLUS',
  isDisabled: false,
  isOutlined: false,
  fillColor: '',
  iconName: iconMapping.AccountCircle.name,
}
