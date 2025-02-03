import React from 'react'
import { Text, TextProps, TEXT_VARIANT } from './Text'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Text> = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variant: objectValuesToControls(TEXT_VARIANT),
  },
}
export default meta

const Template: StoryFn<typeof Text> = (args: TextProps) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'string',
  variant: 'DEFAULT',
  isDisabled: false,
  small: false,
  customClasses: '',
  title: '',
}
