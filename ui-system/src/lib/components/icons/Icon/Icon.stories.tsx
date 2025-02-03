import React from 'react'
import { Icon, IconProps, ICON_VARIANT } from './Icon'
import { iconMapping } from '../iconMapping'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const iconNames = Object.values(iconMapping).map((icon) => icon.name)

const meta: Meta<typeof Icon> = {
  title: 'Icons/Icon',
  component: Icon,
  argTypes: {
    name: { control: 'select', options: iconNames },
    variant: objectValuesToControls(ICON_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Icon> = (args: IconProps) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
  name: iconMapping.AccountCircle.name,
  variant: 'DEFAULT',
  isOutlined: false,
  fillColor: '',
}
