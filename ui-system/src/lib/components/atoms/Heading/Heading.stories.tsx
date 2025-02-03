import React from 'react'
import { Heading, HeadingProps, HEADING_VARIANT } from './Heading'
import { objectValuesToControls } from '../../../storybook-utils'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

const meta: Meta<typeof Heading> = {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    label: {},
    variant: objectValuesToControls(HEADING_VARIANT),
    customClasses: {},
  },
}
export default meta

const Template: StoryFn<typeof Heading> = (args: HeadingProps) => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'Heading',
  variant: 'h1',
  customClasses: '',
}
